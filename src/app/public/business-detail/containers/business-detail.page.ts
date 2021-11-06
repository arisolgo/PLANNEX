import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {
  ProviderAvailability,
  ProviderService,
  Response,
} from 'src/app/core/models/models';
import {
  ComentariosService,
  ProveedoresService,
  ServicesService,
} from 'src/app/core/services/api/services';
import { ProviderServiciosService } from 'src/app/core/services/api/services';
import { CartService } from 'src/app/core/services/cart.service';
import { ShoppingCartComponent } from 'src/app/core/shared/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  provider: Provider;
  provider_aux: any;
  providerDisponibilidad: ProviderAvailability;
  providerServices: any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  services = [];
  servicesNames = [];
  cartCount = new BehaviorSubject<number>(0);

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private providerService: ProveedoresService,
    private providerServiciosService: ProviderServiciosService,
    private servicioService: ServicesService,
    private comentarioService: ComentariosService,
    private cartService: CartService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.provider_aux = this.router.getCurrentNavigation().extras.state;
      console.log('PROVIDER:', this.provider_aux);
    }
  }
  ngOnInit() {
    this.cartCount = this.cartService.getCartItemCount();
    this.getServices(this.provider_aux.id);
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
  goToSchedule(service) {
    this.navCtrl.navigateForward('/scheduler', {
      state: { provider: this.provider_aux, selectedService: service },
    });
  }

  addToCart(service: ProviderService) {
    service.selected = !service.selected;
    if (service.selected) {
      this.cartService.addCartItem(service);
    } else {
      this.cartService.removeCartItem(service);
    }
  }

  async openCart() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ShoppingCartComponent,
    });

    await modal.present();
  }

  // this.services[0] = {
  //   name: 'Corte sencillo',
  //   img: 'https://via.placeholder.com/80x80',
  //   category: 'Recorte',
  //   price: 350.00,
  //   description:"Recorte de pelo + estilado",
  // };
  // this.services[1] = {
  //   name: 'Corte completo',
  //   img: 'https://via.placeholder.com/80x80',
  //   category: 'Recorte',
  //   price: 500.00,
  //   description:"Recorte de pelo, estilado y lavado",
  // };
  // this.services[2] = {
  //   name: 'Manicure',
  //   img: 'https://via.placeholder.com/80x80',
  //   category: 'Uñas',
  //   price: 800.00,
  //   description:"Corte y esmaltado de uñas de las manos.",
  // };
  // this.services[3] = {
  //   name: 'Pedicure',
  //   img: 'https://via.placeholder.com/80x80',
  //   category: 'Uñas',
  //   price: 800.00,
  //   description:"Corte y esmaltado de uñas de los pies.",
  // };
  // this.services[4] = {
  //   name: 'Servicio completo',
  //   img: 'https://via.placeholder.com/80x80',
  //   category: 'Uñas',
  //   price: 1500.00,
  //   description:"Corte y esmaltado de uñas de las manos y pies.",
  // };
}
