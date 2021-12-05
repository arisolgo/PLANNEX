import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Provider, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonCheckbox,
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
import { PutService } from 'src/app/core/services/put.service';
import { MapsComponent } from 'src/app/core/shared/components/maps/maps.component';
import { PaymentSelectionComponent } from 'src/app/core/shared/components/payment-selection/payment-selection.component';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  @ViewChild('serviceCheckBox') serviceCheckBox: IonCheckbox;
  provider: Provider;
  provider_aux: any;
  providerDisponibilidad: ProviderAvailability;
  providerServices: ProviderService[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  selectedServices: ProviderService[] = [];
  servicesNames = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private providerServiciosService: ProviderServiciosService,
    private servicioService: ServicesService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private putService: PutService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.provider_aux = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.providerServices = [];
    this.selectedServices = [];
    this.getServices(this.provider_aux.id);
  }

  getServices(providerId: number) {
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
          element.selected = false;
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
      component: PaymentSelectionComponent,
    });

    await modal.present();
  }

  async pickUpLocation() {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: {
        newProvider: this.provider_aux,
      },
    });

    await modal.present();
  }
}
