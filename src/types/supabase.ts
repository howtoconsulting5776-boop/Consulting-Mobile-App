export interface IService {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  farm: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  dietary: string[];
}

export interface IProfile {
  id: string;
  academy: string | null;
  position: string | null;
  role: 'user' | 'admin' | 'manager';
}

export interface IConsultingRequest {
  id: string;
  userId: string;
  serviceName: string;
  applicantName: string;
  academyName: string;
  contactNumber: string;
  preferredDate: string;
  inquiry: string;
  status: '대기' | '상담완료';
}
