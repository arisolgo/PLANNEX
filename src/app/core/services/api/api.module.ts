/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { ClientesService } from './services/clientes.service';
import { ComentariosService } from './services/comentarios.service';
import { ProveedorDisponibilidadesService } from './services/proveedor-disponibilidades.service';
import { ProveedoresService } from './services/proveedores.service';
import { ProveedorReviewsService } from './services/proveedor-reviews.service';
import { ProveedorTiposService } from './services/proveedor-tipos.service';
import { ProviderServiciosService } from './services/provider-servicios.service';
import { ScheduledServiceService } from './services/scheduled-service.service';
import { ScheduledServiceRequiredService } from './services/scheduled-service-required.service';
import { ServicesService } from './services/services.service';
import { TiposService } from './services/tipos.service';
import { UserService } from './services/user.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    ClientesService,
    ComentariosService,
    ProveedorDisponibilidadesService,
    ProveedoresService,
    ProveedorReviewsService,
    ProveedorTiposService,
    ProviderServiciosService,
    ScheduledServiceService,
    ScheduledServiceRequiredService,
    ServicesService,
    TiposService,
    UserService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
