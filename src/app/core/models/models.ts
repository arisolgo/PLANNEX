export interface User {
  userName: string;
  password: string;
}

export interface Client {
  id: number;
  nombres: string;
  apellidos: string;
  direccion1: string;
  direccion2: string;
  ciudad: string;
  pais: number;
  latitud: number;
  longitud: number;
  telefono: string;
  celular: string;
  sexo: string;
  status: number;
}

export interface Provider {
  id: number;
  email: string;
  nombres: string;
  apellidos: string;
  direccion1: string;
  direccion2: string;
  ciudad: string;
  pais: number;
  latitud: number;
  longitud: number;
  telefono: string;
  celular: string;
  sexo: string;
  status: number;
  rating: number;
  providerReviews: ProviderReview[];
}

export interface ProviderReview {
  id: number;
  proveedorId: number;
  clienteId: number;
  comentarioId: number;
  serviceRating: number;
}

export interface ProviderService {
  id: number;
  price: number;
  proveedorId: number;
  serviceId: number;
  creatorUserId: number;
}

export interface Comment {
  id: number;
  comment: string;
  creationTime: Date;
}

export interface ProviderAvailability {
  id: number;
  provideedorId: number;
  dia: number;
  horaDesde: Date;
  horaHaste: Date;
}

export interface ScheduledService {
  id: number;
  registerTime: Date;
  scheduledTime: Date;
  providerId: number;
  clientId: number;
  providerServiceId: number;
  status: number;
  rating: number;
}

export interface ServiceDto {
  id: number;
  description: string;
}

export interface ScheduledServiceRequired {
  id: number;
  scheduledServiceId: number;
  paymentId: number;
}

export interface ProviderTipo {
  id: number;
  proveedorId: number;
  tipoId: number;
  creatorUserId: number;
}
export interface Tipo {
  id: number;
  nombre: string;
}

export interface Response {
  isSuccess: boolean;
  result: any;
  displayMessage: string;
  errorMessages: string[];
}

export interface ServiceItem {
  serviceName: '';
  provider: { name: ''; events: [] };
  price: 0;
  startDate: '';
  endDate: '';
  serviceDuration: 0; //minutes
}
