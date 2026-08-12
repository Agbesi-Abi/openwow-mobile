import type { Category, Collection, Product, DeliveryOption, GhanaRegion } from '@/src/types';

const I = {
  nova1: 'https://images.pexels.com/photos/11031129/pexels-photo-11031129.png?auto=compress&cs=tinysrgb&h=650&w=940',
  nova2: 'https://images.pexels.com/photos/5670/wood-fashion-black-stylish.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  nova3: 'https://images.pexels.com/photos/10365596/pexels-photo-10365596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mira1: 'https://images.pexels.com/photos/8502482/pexels-photo-8502482.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mira2: 'https://images.pexels.com/photos/8502484/pexels-photo-8502484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mira3: 'https://images.pexels.com/photos/15059374/pexels-photo-15059374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  zuri1: 'https://images.pexels.com/photos/22434766/pexels-photo-22434766.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  zuri2: 'https://images.pexels.com/photos/22434773/pexels-photo-22434773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  zuri3: 'https://images.pexels.com/photos/22434759/pexels-photo-22434759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  luna1: 'https://images.pexels.com/photos/36365228/pexels-photo-36365228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  luna2: 'https://images.pexels.com/photos/36367488/pexels-photo-36367488.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  luna3: 'https://images.pexels.com/photos/36367484/pexels-photo-36367484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ava1: 'https://images.pexels.com/photos/33074938/pexels-photo-33074938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ava2: 'https://images.pexels.com/photos/8801089/pexels-photo-8801089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ava3: 'https://images.pexels.com/photos/8801091/pexels-photo-8801091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sora1: 'https://images.pexels.com/photos/22432991/pexels-photo-22432991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sora2: 'https://images.pexels.com/photos/22432985/pexels-photo-22432985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sora3: 'https://images.pexels.com/photos/22432989/pexels-photo-22432989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  maya1: 'https://images.pexels.com/photos/9267587/pexels-photo-9267587.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  maya2: 'https://images.pexels.com/photos/7953286/pexels-photo-7953286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  maya3: 'https://images.pexels.com/photos/23223830/pexels-photo-23223830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nala1: 'https://images.pexels.com/photos/17152271/pexels-photo-17152271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nala2: 'https://images.pexels.com/photos/18174586/pexels-photo-18174586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nala3: 'https://images.pexels.com/photos/15795858/pexels-photo-15795858.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vera1: 'https://images.pexels.com/photos/8396731/pexels-photo-8396731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vera2: 'https://images.pexels.com/photos/8989539/pexels-photo-8989539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vera3: 'https://images.pexels.com/photos/8801182/pexels-photo-8801182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kira1: 'https://images.pexels.com/photos/21897127/pexels-photo-21897127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kira2: 'https://images.pexels.com/photos/21897311/pexels-photo-21897311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kira3: 'https://images.pexels.com/photos/21897316/pexels-photo-21897316.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  amara1: 'https://images.pexels.com/photos/30466066/pexels-photo-30466066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  amara2: 'https://images.pexels.com/photos/23223849/pexels-photo-23223849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  amara3: 'https://images.pexels.com/photos/22432990/pexels-photo-22432990.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nia1: 'https://images.pexels.com/photos/18601568/pexels-photo-18601568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nia2: 'https://images.pexels.com/photos/21897145/pexels-photo-21897145.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  nia3: 'https://images.pexels.com/photos/21897314/pexels-photo-21897314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroEditorial: 'https://images.pexels.com/photos/16556203/pexels-photo-16556203.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroCollection: 'https://images.pexels.com/photos/21897142/pexels-photo-21897142.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroWelcome: 'https://images.pexels.com/photos/21897130/pexels-photo-21897130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroMini: 'https://images.pexels.com/photos/21897135/pexels-photo-21897135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroStatement: 'https://images.pexels.com/photos/32282720/pexels-photo-32282720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroCrossbody: 'https://images.pexels.com/photos/7810313/pexels-photo-7810313.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroTote: 'https://images.pexels.com/photos/26316185/pexels-photo-26316185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroEveryday: 'https://images.pexels.com/photos/16934394/pexels-photo-16934394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroShoulder: 'https://images.pexels.com/photos/30179605/pexels-photo-30179605.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const CATEGORIES: Category[] = [
  { id: 'cat-shoulder', slug: 'shoulder', name: 'Shoulder', description: 'Effortless carry for every day.', heroImage: I.heroShoulder },
  { id: 'cat-crossbody', slug: 'crossbody', name: 'Crossbody', description: 'Hands-free. Worry-free.', heroImage: I.heroCrossbody },
  { id: 'cat-mini', slug: 'mini', name: 'Mini', description: 'Small bags. Big energy.', heroImage: I.heroMini },
  { id: 'cat-tote', slug: 'tote', name: 'Tote', description: 'Carry it all. In style.', heroImage: I.heroTote },
  { id: 'cat-statement', slug: 'statement', name: 'Statement', description: 'Made to be noticed.', heroImage: I.heroStatement },
  { id: 'cat-everyday', slug: 'everyday', name: 'Everyday', description: 'Pieces worth carrying.', heroImage: I.heroEveryday },
];

export const COLLECTIONS: Collection[] = [
  { id: 'col-everyday', slug: 'everyday-edit', name: 'The Everyday Edit', description: 'Pieces that move with you, from morning to night.', heroImage: I.heroEveryday, productIds: ['p-nova', 'p-zuri', 'p-nala', 'p-mira'] },
  { id: 'col-mini', slug: 'mini-edit', name: 'The Mini Edit', description: 'Small bags with big personality.', heroImage: I.heroMini, productIds: ['p-ava', 'p-sora', 'p-luna', 'p-vera'] },
  { id: 'col-statement', slug: 'statement-edit', name: 'The Statement Edit', description: 'For the moments you want to be seen.', heroImage: I.heroStatement, productIds: ['p-maya', 'p-kira', 'p-amara', 'p-nia'] },
  { id: 'col-weekend', slug: 'weekend-edit', name: 'Weekend Edit', description: 'Easy pieces for your days off.', heroImage: I.heroCollection, productIds: ['p-luna', 'p-zuri', 'p-vera', 'p-nala'] },
];

const mc = (c: { name: string; hex: string; image: string }[]) => c;

export const PRODUCTS: Product[] = [
  { id: 'p-nova', name: 'Nova', subtitle: 'Structured Mini Shoulder Bag', description: 'The Nova is our signature structured mini. Clean lines, a sculpted handle, and just enough room for the essentials. Designed for the ones who keep it simple.', price: 250, category: 'shoulder', images: [I.nova1, I.nova2, I.nova3], colors: mc([{ name: 'Black', hex: '#1A1A1A', image: I.nova1 }, { name: 'Cream', hex: '#E8DCC8', image: I.nova2 }, { name: 'Violet', hex: '#5D4B8C', image: I.nova3 }]), variants: [{ id: 'v-nova-blk', color: 'Black', sku: 'OW-NOV-BLK', stock: 12, price: 250, image: I.nova1 }, { id: 'v-nova-crm', color: 'Cream', sku: 'OW-NOV-CRM', stock: 8, price: 250, image: I.nova2 }, { id: 'v-nova-vio', color: 'Violet', sku: 'OW-NOV-VIO', stock: 5, price: 250, image: I.nova3 }], stock: 25, dimensions: '22 x 15 x 8 cm', material: 'Vegan leather, gold-tone hardware', care: 'Wipe clean with a soft damp cloth. Store in dust bag.', tags: ['bestseller', 'structured', 'mini'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.8, reviewCount: 34, createdAt: '2025-01-15T00:00:00Z' },
  { id: 'p-mira', name: 'Mira', subtitle: 'Soft Leather Shoulder Bag', description: 'Mira is soft, slouchy, and effortlessly cool. The kind of bag that looks better the more you wear it. Roomy enough for your daily essentials.', price: 280, salePrice: 230, category: 'shoulder', images: [I.mira1, I.mira2, I.mira3], colors: mc([{ name: 'Cognac', hex: '#8B4513', image: I.mira1 }, { name: 'Dark Brown', hex: '#4A2C2A', image: I.mira2 }, { name: 'Tan', hex: '#B8860B', image: I.mira3 }]), variants: [{ id: 'v-mira-cog', color: 'Cognac', sku: 'OW-MIR-COG', stock: 10, price: 230, image: I.mira1 }, { id: 'v-mira-dbr', color: 'Dark Brown', sku: 'OW-MIR-DBR', stock: 7, price: 230, image: I.mira2 }, { id: 'v-mira-tan', color: 'Tan', sku: 'OW-MIR-TAN', stock: 0, price: 230, image: I.mira3 }], stock: 17, dimensions: '26 x 18 x 10 cm', material: 'Genuine leather, antique brass hardware', care: 'Condition leather monthly. Avoid water exposure.', tags: ['sale', 'soft', 'everyday'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.6, reviewCount: 22, createdAt: '2025-02-01T00:00:00Z' },
  { id: 'p-zuri', name: 'Zuri', subtitle: 'Classic Shoulder Bag', description: 'Zuri is timeless. A clean silhouette that works from the office to dinner. The bag you reach for when you want to look put together.', price: 220, category: 'shoulder', images: [I.zuri1, I.zuri2, I.zuri3], colors: mc([{ name: 'Caramel', hex: '#C19A6B', image: I.zuri1 }, { name: 'Walnut', hex: '#5C4033', image: I.zuri2 }, { name: 'Sand', hex: '#C2B280', image: I.zuri3 }]), variants: [{ id: 'v-zuri-car', color: 'Caramel', sku: 'OW-ZUR-CAR', stock: 15, price: 220, image: I.zuri1 }, { id: 'v-zuri-wal', color: 'Walnut', sku: 'OW-ZUR-WAL', stock: 9, price: 220, image: I.zuri2 }, { id: 'v-zuri-snd', color: 'Sand', sku: 'OW-ZUR-SND', stock: 6, price: 220, image: I.zuri3 }], stock: 30, dimensions: '24 x 17 x 9 cm', material: 'Vegan leather, silver-tone hardware', care: 'Wipe clean with a soft damp cloth.', tags: ['classic', 'everyday', 'work'], isFeatured: false, isNew: false, isSoldOut: false, rating: 4.7, reviewCount: 18, createdAt: '2025-01-20T00:00:00Z' },
  { id: 'p-luna', name: 'Luna', subtitle: 'Structured Tote', description: 'Luna holds everything you need and nothing you do not. A structured tote that stands on its own. For work, weekends, and everything between.', price: 320, category: 'tote', images: [I.luna1, I.luna2, I.luna3], colors: mc([{ name: 'Ivory', hex: '#FFFFF0', image: I.luna1 }, { name: 'Navy', hex: '#1B2845', image: I.luna2 }, { name: 'Camel', hex: '#C19A6B', image: I.luna3 }]), variants: [{ id: 'v-luna-ivory', color: 'Ivory', sku: 'OW-LUN-IVR', stock: 8, price: 320, image: I.luna1 }, { id: 'v-luna-navy', color: 'Navy', sku: 'OW-LUN-NVY', stock: 11, price: 320, image: I.luna2 }, { id: 'v-luna-camel', color: 'Camel', sku: 'OW-LUN-CML', stock: 4, price: 320, image: I.luna3 }], stock: 23, dimensions: '32 x 28 x 14 cm', material: 'Vegan leather, gold-tone hardware', care: 'Wipe clean. Use leather conditioner for shine.', tags: ['tote', 'work', 'spacious'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.9, reviewCount: 41, createdAt: '2025-01-10T00:00:00Z' },
  { id: 'p-ava', name: 'Ava', subtitle: 'Mini Top-Handle Bag', description: 'Ava is small but makes a statement. A mini top-handle bag with a detachable strap. For the days when less is more.', price: 190, category: 'mini', images: [I.ava1, I.ava2, I.ava3], colors: mc([{ name: 'Sage', hex: '#9CAF88', image: I.ava1 }, { name: 'Orange', hex: '#FF7F50', image: I.ava2 }, { name: 'Mustard', hex: '#FFDB58', image: I.ava3 }]), variants: [{ id: 'v-ava-sage', color: 'Sage', sku: 'OW-AVA-SGE', stock: 14, price: 190, image: I.ava1 }, { id: 'v-ava-org', color: 'Orange', sku: 'OW-AVA-ORG', stock: 6, price: 190, image: I.ava2 }, { id: 'v-ava-mus', color: 'Mustard', sku: 'OW-AVA-MUS', stock: 3, price: 190, image: I.ava3 }], stock: 23, dimensions: '18 x 12 x 7 cm', material: 'Vegan leather, gold-tone hardware', care: 'Wipe clean with a soft damp cloth.', tags: ['mini', 'new', 'colorful'], isFeatured: false, isNew: true, isSoldOut: false, rating: 4.5, reviewCount: 12, createdAt: '2025-03-01T00:00:00Z' },
  { id: 'p-sora', name: 'Sora', subtitle: 'Crossbody Mini', description: 'Sora is your go-anywhere mini crossbody. Lightweight, hands-free, and just the right amount of bold.', price: 210, category: 'crossbody', images: [I.sora1, I.sora2, I.sora3], colors: mc([{ name: 'Forest', hex: '#228B22', image: I.sora1 }, { name: 'Blush', hex: '#DE5D83', image: I.sora2 }, { name: 'Olive', hex: '#808000', image: I.sora3 }]), variants: [{ id: 'v-sora-for', color: 'Forest', sku: 'OW-SOR-FOR', stock: 9, price: 210, image: I.sora1 }, { id: 'v-sora-blu', color: 'Blush', sku: 'OW-SOR-BLU', stock: 7, price: 210, image: I.sora2 }, { id: 'v-sora-oli', color: 'Olive', sku: 'OW-SOR-OLI', stock: 5, price: 210, image: I.sora3 }], stock: 21, dimensions: '20 x 14 x 6 cm', material: 'Vegan leather, adjustable strap', care: 'Wipe clean with a soft damp cloth.', tags: ['crossbody', 'new', 'weekend'], isFeatured: false, isNew: true, isSoldOut: false, rating: 4.4, reviewCount: 8, createdAt: '2025-03-05T00:00:00Z' },
  { id: 'p-maya', name: 'Maya', subtitle: 'Statement Shoulder Bag', description: 'Maya does not whisper. She walks in. A bold shoulder bag with a sculpted handle and enough attitude to carry the room.', price: 340, category: 'statement', images: [I.maya1, I.maya2, I.maya3], colors: mc([{ name: 'Cobalt', hex: '#0047AB', image: I.maya1 }, { name: 'Ivory', hex: '#FFFFF0', image: I.maya2 }, { name: 'Emerald', hex: '#50C878', image: I.maya3 }]), variants: [{ id: 'v-maya-cob', color: 'Cobalt', sku: 'OW-MAY-COB', stock: 6, price: 340, image: I.maya1 }, { id: 'v-maya-ivory', color: 'Ivory', sku: 'OW-MAY-IVR', stock: 4, price: 340, image: I.maya2 }, { id: 'v-maya-eme', color: 'Emerald', sku: 'OW-MAY-EME', stock: 3, price: 340, image: I.maya3 }], stock: 13, dimensions: '25 x 16 x 10 cm', material: 'Vegan leather, gold-tone hardware', care: 'Wipe clean. Store in dust bag.', tags: ['statement', 'bold', 'featured'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.9, reviewCount: 27, createdAt: '2025-02-10T00:00:00Z' },
  { id: 'p-nala', name: 'Nala', subtitle: 'Minimalist Shoulder Bag', description: 'Nala is quiet confidence. No logos, no noise. Just a beautifully made bag that lets you do the talking.', price: 240, category: 'shoulder', images: [I.nala1, I.nala2, I.nala3], colors: mc([{ name: 'Black', hex: '#1A1A1A', image: I.nala1 }, { name: 'Silver', hex: '#C0C0C0', image: I.nala2 }, { name: 'Charcoal', hex: '#36454F', image: I.nala3 }]), variants: [{ id: 'v-nala-blk', color: 'Black', sku: 'OW-NAL-BLK', stock: 18, price: 240, image: I.nala1 }, { id: 'v-nala-slv', color: 'Silver', sku: 'OW-NAL-SLV', stock: 0, price: 240, image: I.nala2 }, { id: 'v-nala-chr', color: 'Charcoal', sku: 'OW-NAL-CHR', stock: 8, price: 240, image: I.nala3 }], stock: 26, dimensions: '23 x 16 x 8 cm', material: 'Vegan leather, matte hardware', care: 'Wipe clean with a soft damp cloth.', tags: ['minimal', 'everyday', 'classic'], isFeatured: false, isNew: false, isSoldOut: false, rating: 4.7, reviewCount: 19, createdAt: '2025-01-25T00:00:00Z' },
  { id: 'p-vera', name: 'Vera', subtitle: 'Soft Mini Crossbody', description: 'Vera is the bag you forget you are wearing. Soft, light, and just the right size for a phone, a card, and a little confidence.', price: 180, category: 'crossbody', images: [I.vera1, I.vera2, I.vera3], colors: mc([{ name: 'Beige', hex: '#F5F5DC', image: I.vera1 }, { name: 'Dove', hex: '#D3D3D3', image: I.vera2 }, { name: 'Amber', hex: '#FFBF00', image: I.vera3 }]), variants: [{ id: 'v-vera-bge', color: 'Beige', sku: 'OW-VER-BGE', stock: 12, price: 180, image: I.vera1 }, { id: 'v-vera-dov', color: 'Dove', sku: 'OW-VER-DOV', stock: 6, price: 180, image: I.vera2 }, { id: 'v-vera-amb', color: 'Amber', sku: 'OW-VER-AMB', stock: 4, price: 180, image: I.vera3 }], stock: 22, dimensions: '19 x 13 x 5 cm', material: 'Vegan leather, adjustable strap', care: 'Wipe clean with a soft damp cloth.', tags: ['crossbody', 'soft', 'lightweight'], isFeatured: false, isNew: false, isSoldOut: false, rating: 4.5, reviewCount: 15, createdAt: '2025-02-15T00:00:00Z' },
  { id: 'p-kira', name: 'Kira', subtitle: 'Embossed Shoulder Bag', description: 'Kira brings texture. An embossed finish that catches the light and the eye. For the ones who know that details make the outfit.', price: 290, category: 'statement', images: [I.kira1, I.kira2, I.kira3], colors: mc([{ name: 'Cognac', hex: '#8B4513', image: I.kira1 }, { name: 'Mocha', hex: '#4A2C2A', image: I.kira2 }, { name: 'Honey', hex: '#EBB434', image: I.kira3 }]), variants: [{ id: 'v-kira-cog', color: 'Cognac', sku: 'OW-KIR-COG', stock: 7, price: 290, image: I.kira1 }, { id: 'v-kira-moc', color: 'Mocha', sku: 'OW-KIR-MOC', stock: 5, price: 290, image: I.kira2 }, { id: 'v-kira-hon', color: 'Honey', sku: 'OW-KIR-HON', stock: 3, price: 290, image: I.kira3 }], stock: 15, dimensions: '24 x 16 x 9 cm', material: 'Embossed vegan leather, gold-tone hardware', care: 'Wipe clean with a soft damp cloth. Store in dust bag.', tags: ['statement', 'texture', 'featured'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.8, reviewCount: 21, createdAt: '2025-02-05T00:00:00Z' },
  { id: 'p-amara', name: 'Amara', subtitle: 'Geometric Tote', description: 'Amara plays with shape. A geometric tote that turns heads without trying too hard.', price: 360, category: 'tote', images: [I.amara1, I.amara2, I.amara3], colors: mc([{ name: 'Tri-color', hex: '#228B22', image: I.amara1 }, { name: 'Natural', hex: '#DEB887', image: I.amara2 }, { name: 'Dual', hex: '#1B2845', image: I.amara3 }]), variants: [{ id: 'v-amara-tri', color: 'Tri-color', sku: 'OW-AMA-TRI', stock: 5, price: 360, image: I.amara1 }, { id: 'v-amara-nat', color: 'Natural', sku: 'OW-AMA-NAT', stock: 4, price: 360, image: I.amara2 }, { id: 'v-amara-dual', color: 'Dual', sku: 'OW-AMA-DUL', stock: 3, price: 360, image: I.amara3 }], stock: 12, dimensions: '30 x 26 x 12 cm', material: 'Vegan leather, mixed hardware', care: 'Wipe clean. Use leather conditioner for shine.', tags: ['tote', 'geometric', 'new'], isFeatured: false, isNew: true, isSoldOut: false, rating: 4.6, reviewCount: 9, createdAt: '2025-03-10T00:00:00Z' },
  { id: 'p-nia', name: 'Nia', subtitle: 'Convertible Shoulder Bag', description: 'Nia adapts. Wear it as a shoulder bag or crossbody. The convertible strap means you can change your mind as often as you change your look.', price: 260, category: 'everyday', images: [I.nia1, I.nia2, I.nia3], colors: mc([{ name: 'Black/White', hex: '#1A1A1A', image: I.nia1 }, { name: 'Studio', hex: '#F5F5DC', image: I.nia2 }, { name: 'Editorial', hex: '#2F4F4F', image: I.nia3 }]), variants: [{ id: 'v-nia-bw', color: 'Black/White', sku: 'OW-NIA-BW', stock: 10, price: 260, image: I.nia1 }, { id: 'v-nia-stu', color: 'Studio', sku: 'OW-NIA-STU', stock: 6, price: 260, image: I.nia2 }, { id: 'v-nia-edi', color: 'Editorial', sku: 'OW-NIA-EDI', stock: 4, price: 260, image: I.nia3 }], stock: 20, dimensions: '25 x 17 x 9 cm', material: 'Vegan leather, convertible strap', care: 'Wipe clean with a soft damp cloth.', tags: ['convertible', 'everyday', 'versatile'], isFeatured: true, isNew: false, isSoldOut: false, rating: 4.7, reviewCount: 16, createdAt: '2025-01-30T00:00:00Z' },
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'accra', name: 'Accra', description: 'Greater Accra Region', estimatedDays: '1-2 business days', fee: 20 },
  { id: 'other-regions', name: 'Other Regions', description: 'Outside Greater Accra', estimatedDays: '2-5 business days', fee: 35 },
];

export const GHANA_REGIONS: GhanaRegion[] = [
  { name: 'Greater Accra', cities: ['Accra', 'Tema', 'Madina', 'East Legon', 'Spintex', 'Osu', 'Dansoman'] },
  { name: 'Ashanti', cities: ['Kumasi', 'Obuasi', 'Ejisu', 'Mampong'] },
  { name: 'Western', cities: ['Takoradi', 'Sekondi', 'Tarkwa'] },
  { name: 'Central', cities: ['Cape Coast', 'Winneba', 'Kasoa'] },
  { name: 'Eastern', cities: ['Koforidua', 'Nkawkaw', 'Akosombo'] },
  { name: 'Volta', cities: ['Ho', 'Kpando', 'Aflao'] },
  { name: 'Northern', cities: ['Tamale', 'Yendi', 'Savelugu'] },
  { name: 'Upper East', cities: ['Bolgatanga', 'Navrongo', 'Bawku'] },
  { name: 'Upper West', cities: ['Wa', 'Jirapa', 'Nandom'] },
  { name: 'Bono', cities: ['Sunyani', 'Berekum', 'Wenchi'] },
  { name: 'Bono East', cities: ['Techiman', 'Kintampo', 'Nkoranza'] },
  { name: 'Ahafo', cities: ['Goaso', 'Bechem', 'Keniesi'] },
  { name: 'Western North', cities: ['Sefwi Wiawso', 'Bibiani', 'Enchi'] },
  { name: 'Oti', cities: ['Dambai', 'Kete Krachi', 'Jasikan'] },
  { name: 'Savannah', cities: ['Damongo', 'Bole', 'Salaga'] },
  { name: 'North East', cities: ['Nalerigu', 'Walewale', 'Gambaga'] },
];

export const EDITORIAL_IMAGE = I.heroEditorial;
export const WELCOME_IMAGE = I.heroWelcome;
