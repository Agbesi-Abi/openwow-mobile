import { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Alert, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, CreditCard, Smartphone, Check } from 'lucide-react-native';
import { Text, DisplayText } from '@/src/components/OWText';
import { OWButton } from '@/src/components/OWButton';
import { Colors, Spacing, Typography, Radius, formatPrice } from '@/src/theme/tokens';
import { useResponsive } from '@/src/hooks/useResponsive';
import { useCart } from '@/src/state/CartContext';
import { useToast } from '@/src/state/ToastContext';
import { hapticNotify } from '@/src/utils/haptics';
import type { PaymentMethod, Address } from '@/src/types';

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const { contentPadding, isTablet } = useResponsive();
  const stepAnim = useRef(new Animated.Value(0)).current;
  const stepIndex = ['address', 'payment', 'review'].indexOf(step);

  useEffect(() => {
    stepAnim.setValue(0);
    Animated.timing(stepAnim, { toValue: 1, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [step]);

  const stepOpacity = stepAnim;
  const stepSlide = stepAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    region: '',
    city: '',
    area: '',
    address: '',
    notes: '',
  });

  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      hapticNotify('success');
      clearCart();
      showToast('Order placed successfully!', 'success');
      router.replace('/orders/confirmation');
    }, 1500);
  };

  const canProceedAddress = address.name && address.phone && address.region && address.city && address.address;
  const canProceedPayment = paymentMethod === 'momo' ? momoNumber.length >= 9 : cardNumber && cardName && cardExpiry && cardCvv;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navBar}>
        <Pressable onPress={() => { if (step === 'address') router.back(); else if (step === 'payment') setStep('address'); else setStep('payment'); }} style={styles.backBtn}>
          <ChevronLeft size={24} color={Colors.deepViolet} strokeWidth={2.5} />
        </Pressable>
        <Text size={17} weight="semiBold" color="deepViolet">{step === 'address' ? 'Delivery Details' : step === 'payment' ? 'Payment' : 'Review Order'}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        {(['address', 'payment', 'review'] as const).map((s, i) => {
          const stepIndex = ['address', 'payment', 'review'].indexOf(step);
          const isActive = i <= stepIndex;
          return (
            <View key={s} style={[styles.progressDot, isActive && styles.progressDotActive]}>
              {isActive && <Check size={14} color={Colors.deepViolet} strokeWidth={3} />}
            </View>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: contentPadding, maxWidth: isTablet ? 600 : undefined, alignSelf: 'center', width: '100%' }}>
        <Animated.View style={{ opacity: stepOpacity, transform: [{ translateY: stepSlide }] }}>
        {step === 'address' && (
          <View style={styles.form}>
            <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.md }}>Where should we deliver?</Text>
            <FormField label="Full Name" value={address.name} onChangeText={(v) => setAddress({ ...address, name: v })} placeholder="Ama Mensah" />
            <FormField label="Phone Number" value={address.phone} onChangeText={(v) => setAddress({ ...address, phone: v })} placeholder="024 123 4567" keyboardType="phone-pad" />
            <FormField label="Region" value={address.region} onChangeText={(v) => setAddress({ ...address, region: v })} placeholder="Greater Accra" />
            <FormField label="City" value={address.city} onChangeText={(v) => setAddress({ ...address, city: v })} placeholder="Accra" />
            <FormField label="Area" value={address.area} onChangeText={(v) => setAddress({ ...address, area: v })} placeholder="East Legon" />
            <FormField label="Street Address" value={address.address} onChangeText={(v) => setAddress({ ...address, address: v })} placeholder="House 12, Street Name" />
            <FormField label="Delivery Notes (optional)" value={address.notes} onChangeText={(v) => setAddress({ ...address, notes: v })} placeholder="Gate is blue..." multiline />

            <View style={styles.deliveryInfo}>
              <MapPin size={18} color={Colors.deepViolet} strokeWidth={2} />
              <View style={{ flex: 1 }}>
                <Text size={14} weight="semiBold" color="ink">Standard Delivery</Text>
                <Text size={13} color="inkMuted">1-2 business days · {formatPrice(deliveryFee)}</Text>
              </View>
            </View>

            <OWButton label="Continue to Payment" onPress={() => setStep('payment')} disabled={!canProceedAddress} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
          </View>
        )}

        {step === 'payment' && (
          <View style={styles.form}>
            <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.md }}>How would you like to pay?</Text>

            <Pressable onPress={() => setPaymentMethod('momo')} style={({ pressed }) => [styles.paymentOption, paymentMethod === 'momo' && styles.paymentOptionActive, pressed && { opacity: 0.9 }]}>
              <View style={styles.paymentIcon}><Smartphone size={22} color={Colors.deepViolet} strokeWidth={2} /></View>
              <View style={{ flex: 1 }}>
                <Text size={15} weight="semiBold" color="ink">Mobile Money</Text>
                <Text size={13} color="inkMuted">MTN, Vodafone, AirtelTigo</Text>
              </View>
              <View style={[styles.radio, paymentMethod === 'momo' && styles.radioActive]} />
            </Pressable>

            {paymentMethod === 'momo' && (
              <View style={styles.paymentFields}>
                <FormField label="MoMo Number" value={momoNumber} onChangeText={setMomoNumber} placeholder="024 123 4567" keyboardType="phone-pad" />
              </View>
            )}

            <Pressable onPress={() => setPaymentMethod('card')} style={({ pressed }) => [styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionActive, pressed && { opacity: 0.9 }]}>
              <View style={styles.paymentIcon}><CreditCard size={22} color={Colors.deepViolet} strokeWidth={2} /></View>
              <View style={{ flex: 1 }}>
                <Text size={15} weight="semiBold" color="ink">Card</Text>
                <Text size={13} color="inkMuted">Visa, Mastercard</Text>
              </View>
              <View style={[styles.radio, paymentMethod === 'card' && styles.radioActive]} />
            </Pressable>

            {paymentMethod === 'card' && (
              <View style={styles.paymentFields}>
                <FormField label="Card Number" value={cardNumber} onChangeText={setCardNumber} placeholder="0000 0000 0000 0000" keyboardType="numeric" />
                <FormField label="Name on Card" value={cardName} onChangeText={setCardName} placeholder="AMA MENSAH" />
                <View style={{ flexDirection: 'row', gap: Spacing.md }}>
                  <View style={{ flex: 1 }}>
                    <FormField label="Expiry" value={cardExpiry} onChangeText={setCardExpiry} placeholder="MM/YY" keyboardType="numeric" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <FormField label="CVV" value={cardCvv} onChangeText={setCardCvv} placeholder="123" keyboardType="numeric" secureTextEntry />
                  </View>
                </View>
              </View>
            )}

            <OWButton label="Review Order" onPress={() => setStep('review')} disabled={!canProceedPayment} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
          </View>
        )}

        {step === 'review' && (
          <View style={styles.form}>
            <Text size={15} weight="semiBold" color="ink" style={{ marginBottom: Spacing.md }}>Review your order</Text>

            <View style={styles.reviewCard}>
              <Text size={13} weight="semiBold" color="electricViolet" style={{ letterSpacing: 1 }}>DELIVERY TO</Text>
              <Text size={15} weight="semiBold" color="ink" style={{ marginTop: 4 }}>{address.name}</Text>
              <Text size={14} color="inkLight">{address.phone}</Text>
              <Text size={14} color="inkLight" style={{ marginTop: 2 }}>{address.address}, {address.area}</Text>
              <Text size={14} color="inkLight">{address.city}, {address.region}</Text>
            </View>

            <View style={styles.reviewCard}>
              <Text size={13} weight="semiBold" color="electricViolet" style={{ letterSpacing: 1 }}>PAYMENT</Text>
              <Text size={15} weight="semiBold" color="ink" style={{ marginTop: 4 }}>{paymentMethod === 'momo' ? 'Mobile Money' : 'Card'}</Text>
              <Text size={14} color="inkLight">{paymentMethod === 'momo' ? momoNumber : `**** ${cardNumber.slice(-4)}`}</Text>
            </View>

            <View style={styles.reviewCard}>
              <Text size={13} weight="semiBold" color="electricViolet" style={{ letterSpacing: 1 }}>ORDER SUMMARY</Text>
              <View style={styles.summaryRow}><Text size={14} color="inkLight">Subtotal ({items.length} items)</Text><Text size={14} weight="semiBold" color="ink">{formatPrice(subtotal)}</Text></View>
              <View style={styles.summaryRow}><Text size={14} color="inkLight">Delivery</Text><Text size={14} weight="semiBold" color="ink">{formatPrice(deliveryFee)}</Text></View>
              <View style={[styles.summaryRow, { marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border }]}>
                <Text size={16} weight="bold" color="deepViolet">Total</Text>
                <Text size={16} weight="bold" color="deepViolet">{formatPrice(total)}</Text>
              </View>
            </View>

            <OWButton label={processing ? "Processing..." : "Place Order"} onPress={handlePlaceOrder} loading={processing} fullWidth size="lg" style={{ marginTop: Spacing.lg }} />
          </View>
        )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function FormField({ label, value, onChangeText, placeholder, keyboardType, multiline, secureTextEntry }: { label: string; value: string; onChangeText: (v: string) => void; placeholder?: string; keyboardType?: 'default' | 'phone-pad' | 'numeric'; multiline?: boolean; secureTextEntry?: boolean }) {
  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Text size={13} weight="semiBold" color="ink" style={{ marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.inkMuted}
        keyboardType={keyboardType ?? 'default'}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        style={[styles.input, multiline && { height: 80, textAlignVertical: 'top' }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softWhite },
  navBar: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  progressDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  progressDotActive: { backgroundColor: Colors.electricLime },
  form: { paddingTop: Spacing.md },
  input: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.md - 2, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.ink },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.lavenderWhite, borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.md },
  paymentOption: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  paymentOptionActive: { borderColor: Colors.deepViolet, backgroundColor: Colors.lavenderWhite },
  paymentIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.lavenderWhite, alignItems: 'center', justifyContent: 'center' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.border },
  radioActive: { borderColor: Colors.deepViolet, backgroundColor: Colors.deepViolet },
  paymentFields: { marginTop: Spacing.sm, marginBottom: Spacing.md },
  reviewCard: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
});
