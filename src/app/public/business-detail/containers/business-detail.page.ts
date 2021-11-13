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
    private routerOutlet: IonRouterOutlet
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.provider_aux = this.router.getCurrentNavigation().extras.state;
      console.log('PROVIDER:', this.provider_aux);
    }
  }
  ngOnInit() {
    // this.cartCount = this.cartService.getCartItemCount();
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
  goToSchedule() {
    this.navCtrl.navigateForward('/scheduler', {
      state: {
        provider: this.provider_aux,
        selectedServices: this.selectedServices,
      },
    });
  }

  getAmmount() {
    let ammount = 0;
    this.selectedServices.forEach((element) => {
      ammount += element.price;
    });
    return ammount;
  }

  addService(service: ProviderService) {
    service.selected = !service.selected;
    if (service.selected) {
      this.selectedServices.push(service);
    } else {
      let index = this.selectedServices.indexOf(service);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    this.getAmmount();
  }

  async openCart() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ShoppingCartComponent,
    });

    await modal.present();
  }
}
