export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  features?: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  database: 'connected' | 'disconnected';
  developer: string;
}
