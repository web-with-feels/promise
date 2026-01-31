export interface PromiseItem {
  id: string;
  title: string;
  shortText: string;
  fullStory: string;
  icon: 'heart' | 'star' | 'moon' | 'sun';
}

export interface UserPromise {
  id: string;
  text: string;
  type: 'Love' | 'Support' | 'Growth' | 'Forever';
  x: number; // For star position
  y: number; // For star position
  createdAt: number;
}

export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date?: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
}
