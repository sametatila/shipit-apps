export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface RoomItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  amenities: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  category: string;
  date?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  snipcartId?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: SocialLinks;
}

export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}
