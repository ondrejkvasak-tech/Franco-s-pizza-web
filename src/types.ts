export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'pasta' | 'drink' | 'salad';
  isFeatured?: boolean;
  isVegetarian?: boolean;
  popularityBadge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  category: 'pizza' | 'pasta' | 'restaurant' | 'garden' | 'drink';
  title: string;
  url: string;
}

export interface BookingForm {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  email: string;
  note?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
