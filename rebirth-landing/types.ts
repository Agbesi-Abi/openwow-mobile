
export type Page = 'home' | 'expertise' | 'work' | 'project' | 'contact';

export interface Service {
  id: string;
  title: string;
  description: string;
  alignment: 'left' | 'right' | 'center';
  marginTop: string;
}

export interface Client {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}
