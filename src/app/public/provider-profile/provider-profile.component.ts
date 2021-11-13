import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  Provider,
  ProviderAvailability,
  ProviderReview,
  ProviderService,
  Response,
} from 'src/app/core/models/models';
import {
  ComentariosService,
  ProveedorDisponibilidadesService,
  ProveedoresService,
  ProveedorReviewsService,
  ProveedorTiposService,
  ProviderServiciosService,
  ScheduledProviderServiceService,
  ScheduledServiceService,
  ServicesService,
  TiposService,
} from 'src/app/core/services/api/services';
import { CartService } from 'src/app/core/services/cart.service';
import { ShoppingCartComponent } from 'src/app/core/shared/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss'],
})
export class ProviderProfileComponent implements OnInit {
  provider: Provider;
  weekday: string[];
  provider_aux: any;
  rating: number;
  providerDisponibilidad: ProviderAvailability[];
  providerComments: any[] = [];
  providerServices: any[] = [];
  providerTypes: any[] = [];
  types: any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  selectedServices: ProviderService[] = [];
  servicesNames = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private providerService: ProveedoresService,
    private providerServiciosService: ProviderServiciosService,
    private servicioService: ServicesService,
    private comentarioService: ComentariosService,
    private cartService: CartService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private providerReviewService: ProveedorReviewsService,
    private providerTypeService: ProveedorTiposService,
    private scheduledService: ScheduledServiceService,
    private providerAvailabilityService: ProveedorDisponibilidadesService,
    private typeService: TiposService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.provider_aux = this.router.getCurrentNavigation().extras.state;
      this.provider_aux = this.provider_aux.provider;
      console.log('PROVIDER:', this.provider_aux);
    }
  }
  ngOnInit() {
    // this.cartCount = this.cartService.getCartItemCount();
    this.setDays();
    this.getComments(this.provider_aux.id);
    this.getServices(this.provider_aux.id);
    this.getTipos(this.provider_aux.id);
    this.getProviderAvailability(this.provider_aux.id);
    this.setRating(this.provider_aux.id);
  }

  setRating(providerId: number) {
    this.providerService
      .putApiProveedoresSetRatingProveedorId(providerId)
      .subscribe((response: Response) => {
        this.rating = response.result.rating;
      });
  }

  getComments(providerId: number) {
    console.log('PROVIDER ID:', providerId);
    this.providerReviewService
      .getApiProveedorReviewsProveedorIdGetProveedorReviewsByProveedorId(
        providerId
      )
      .subscribe((response: Response) => {
        this.providerComments = response.result;
        console.log('Comments', response.result);
      });
  }

  getTipos(providerId: number) {
    this.providerTypeService
      .getApiProveedorTiposProveedorIdGetProveedorTipoByProveedorId(providerId)
      .subscribe((response: Response) => {
        this.providerTypes = response.result;
        console.log('Tipos', response.result);
      });

    this.providerTypes.forEach((element) => {
      this.typeService
        .getApiTiposId(element.tipoId)
        .subscribe((response: Response) => {
          this.types.push(response.result);
        });
    });
  }

  getServices(providerId: number) {
    console.log('PROVIDER ID:', providerId);
    this.providerServiciosService
      .getApiProviderServiciosProviderIdGetProviderServiceByProviderId(
        providerId
      )
      .subscribe((response: Response) => {
        this.setServices(response.result);
        console.log('Services', response.result);
      });
  }

  setServices(providerServices: ProviderService[]) {
    providerServices.forEach((element: ProviderService) => {
      this.servicioService
        .getApiServicesId(element.serviceId)
        .subscribe((response: Response) => {
          element.serviceName = response.result.description;
          this.providerServices.push(element);
        });
    });
  }

  getLocation() {
    //TO-DO
  }

  setDays() {
    this.weekday[0] = 'Sunday';
    this.weekday[1] = 'Monday';
    this.weekday[2] = 'Tuesday';
    this.weekday[3] = 'Wednesday';
    this.weekday[4] = 'Thursday';
    this.weekday[5] = 'Friday';
    this.weekday[6] = 'Saturday';
  }

  getDays(day: number) {
    return this.weekday[day];
  }

  getProviderAvailability(providerId: number) {
    this.providerAvailabilityService
      .getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorId(
        providerId
      )
      .subscribe((response: Response) => {
        response.result.forEach((element) => {
          let dayString = this.getDays(element.dia);
          let dateStart = new Date(element.horaDesde);
          let dateEnd = new Date(element.horaHasta);
          element.horaDesde = dateStart;
          element.horaHasta = dateEnd;
          element.dayString = dayString;
          this.providerDisponibilidad.push(element);
        });
        console.log(this.providerDisponibilidad);
      });
  }
}
