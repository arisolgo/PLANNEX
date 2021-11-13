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
  ProveedoresService,
  ProveedorReviewsService,
  ProveedorTiposService,
  ProviderServiciosService,
  ScheduledProviderServiceService,
  ServicesService,
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
  provider_aux: any;
  providerDisponibilidad: ProviderAvailability;
  providerComments: any[] = [];
  providerServices: any[] = [];
  providerTypes: any[] = [];
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
    private scheduledProviderService: ScheduledProviderServiceService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.provider_aux = this.router.getCurrentNavigation().extras.state;
      console.log('PROVIDER:', this.provider_aux);
    }
  }
  ngOnInit() {
    // this.cartCount = this.cartService.getCartItemCount();
    this.getComments(this.provider_aux.id);
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
}
