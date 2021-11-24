import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { EditAvailabilityComponent } from '../edit-availability/edit-availability.component';
import { EditServicesComponent } from '../edit-services/edit-services.component';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss'],
})
export class ProviderProfileComponent implements OnInit {
  @Input() currentProvider: any = {};

  availabilities;
  provider: Provider;

  @Output() availabilityOutput = new BehaviorSubject<any>(null);
  @Output() providerServicesOutput = new BehaviorSubject<any>(null);
  @Output() providerOutput = new BehaviorSubject<any>(null);
  @Output() services = new BehaviorSubject<any>(null);

  weekday: string[] = [];
  rating: number;
  providerDisponibilidad: any[] = [];
  providerComments: any[] = [];
  providerServices: any[] = [];
  providerTypes: any[] = [];
  jornadas: any[] = [];
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
  ) {}
  ngOnInit() {
    // this.cartCount = this.cartService.getCartItemCount();
    console.log('CURRENT PROVIDER:', this.currentProvider);
    this.providerOutput.next(this.currentProvider);

    this.setDays();
    this.getRating(this.currentProvider.Id);
    this.getComments(this.currentProvider.Id);
    this.getServices(this.currentProvider.Id);
    this.getTipos(this.currentProvider.Id);
    this.getProviderAvailability(this.currentProvider.Id);
    this.getRegisteredServices();

    this.availabilities = this.providerDisponibilidad;
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
        this.setTipos(response.result);
      });
  }

  setTipos(providerTypes) {
    providerTypes.forEach((element) => {
      this.typeService
        .getApiTiposId(element.tipoId)
        .subscribe((response: Response) => {
          this.types.push(response.result);
          console.log('TIPOS SET:', response.result);
        });
    });
  }

  getRegisteredServices() {
    this.servicioService.getApiServices().subscribe((response: Response) => {
      this.services.next(response);
      console.log('SERVICIOS:', response);
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
          this.providerServicesOutput.next(this.providerServices);
        });
    });
  }

  getRating(providerId) {
    this.providerService
      .getApiProveedoresId(providerId)
      .subscribe((response: Response) => {
        this.rating = response.result.rating;
        this.currentProvider.Direccion1 = response.result.direccion1;
        this.currentProvider.Direccion2 = response.result.direccion2;
        console.log('GET RATING:', response.result);
      });
  }

  getLocation() {
    //TO-DO
  }

  getAllServices() {
    this.servicioService.getApiServices().subscribe((response: Response) => {
      this.services.next(response.result);
    });
  }

  openEditAddress() {
    console.log('Abriendo Edit Availability');
    this.openAddressModal();
  }

  openEditAvailability() {
    console.log('Abriendo Edit Availability');
    this.openModal();
  }

  openEditServices() {
    console.log('Abriendo Edit Services');
    this.openServicesModal();
  }

  setDays() {
    this.weekday[0] = 'Domingo';
    this.weekday[1] = 'Lunes';
    this.weekday[2] = 'Martes';
    this.weekday[3] = 'Miércoles';
    this.weekday[4] = 'Jueves';
    this.weekday[5] = 'Viernes';
    this.weekday[6] = 'Sábado';
  }

  getDays(day: number) {
    return this.weekday[day];
  }

  getJornadas() {
    let diffJornadas: any[] = [];

    this.providerDisponibilidad.forEach((element) => {
      console.log('Jornada Length:', this.jornadas.length);
      if (this.jornadas.length === 0) {
        this.jornadas.push(element);
      } else if (
        this.jornadas[0].horaDesde.getHours() ===
          element.horaDesde.getHours() &&
        this.jornadas[0].horaHasta.getHours() === element.horaHasta.getHours()
      ) {
        this.jornadas.push(element);
      } else {
        diffJornadas.push(element);
      }
    });
    console.log('JORNADA:', this.jornadas);
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
        this.availabilityOutput.next(this.providerDisponibilidad);
      });
  }

  async openModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditAvailabilityComponent,
      componentProps: {
        provider: this.currentProvider,
        availabilities: this.availabilityOutput.getValue(),
      },
    });

    await modal.present();
  }

  async openServicesModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditServicesComponent,
      componentProps: {
        provider: this.currentProvider,
        providerServices: this.providerServicesOutput.getValue(),
        services: this.services.getValue().result,
      },
    });

    await modal.present();
  }

  async openAddressModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditAddressComponent,
      componentProps: {
        provider: this.currentProvider,
      },
    });

    await modal.present();
  }
}
