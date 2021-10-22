export interface User {
  UserName: string;
  Password: string;
}

export interface Client {
  Id: number;
  Nombres: string;
  Apellidos: string;
  Direccion1: string;
  Direccion2: string;
  Ciudad: string;
  Pais: number;
  Latitud: number;
  Longitud: number;
  Telefono: string;
  Celular: string;
  Sexo: string;
  Status: number;
}

export interface Provider {
  Id: number;
  Email: string;
  Nombres: string;
  Apellidos: string;
  Direccion1: string;
  Direccion2: string;
  Ciudad: string;
  Pais: number;
  Latitud: number;
  Longitud: number;
  Telefono: string;
  Celular: string;
  Sexo: string;
  Status: number;
  Rating: number;
  ProviderReviews: ProviderReview[];
}

export interface ProviderReview {
  Id: number;
  ProveedorId: number;
  ClienteId: number;
  ComentarioId: number;
  ServiceRating: number;
}

export interface ProviderService {
  Id: number;
  Price: number;
  ProveedorId: number;
  ServiceId: number;
  CreatorUserId: number;
}

export interface Comment {
  Id: number;
  Comment: string;
  CreationTime: Date;
}

export interface ProviderAvailability {
  Id: number;
  ProvideedorId: number;
  Dia: number;
  HoraDesde: Date;
  HoraHaste: Date;
}

export interface ScheduledService {
  Id: number;
  RegisterTime: Date;
  ScheduledTime: Date;
  ProviderId: number;
  ClientId: number;
  ProviderServiceId: number;
  Status: number;
  Rating: number;
}

export interface ServiceDto {
  Id: number;
  Description: string;
}

export interface ScheduledServiceRequired {
  Id: number;
  ScheduledServiceId: number;
  paymentId: number;
}

export interface Tipo {
  Id: number;
  Nombre: string;
}

export interface ServiceItem {
  serviceName: '';
  provider: { name: ''; events: [] };
  price: 0;
  startDate: '';
  endDate: '';
  serviceDuration: 0; //minutes
}
