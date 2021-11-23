import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
  Provider,
  ProviderService,
  Response,
  ScheduledService,
  TimeSlot,
} from 'src/app/core/models/models';
import {
  ScheduledProviderServiceService,
  ScheduledServiceService,
} from 'src/app/core/services/api/services';
import { PaymentSelectionComponent } from 'src/app/core/shared/components/payment-selection/payment-selection.component';
import { render } from 'creditcardpayments/creditCardPayments';
import { UiService } from 'src/app/core/services/ui.service';
import { map, switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/post.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.page.html',
  styleUrls: ['./appointment-confirmation.page.scss'],
})
export class AppointmentConfirmationPage implements OnInit {
  selectedServices: ProviderService[] = [];
  currentProvider: Provider;
  selectedTimeSlot: TimeSlot;
  selectedPayment: number = 0;
  loggedUser = this.authService.setCurrentUser();
  scheduledService = new BehaviorSubject<number>(0);
  currentUser = JSON.parse(this.authService.loggedUser.getValue());
  constructor(
    private router: Router,
    private navController: NavController,
    private scheduledServiceService: ScheduledServiceService,
    private scheduledProviderServiceService: ScheduledProviderServiceService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private uiService: UiService,
    private postService: PostService,
    private authService: AuthService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      let state = router.getCurrentNavigation().extras.state;
      console.log(state);
      this.selectedServices = state.services;
      this.currentProvider = state.provider;
      this.selectedTimeSlot = state.timeSlot;
    }
  }
  checkout() {
    if (true) {
      let postServices = [];
      this.selectedServices.forEach((element) => {
        postServices.push({ providerServiceId: element.id });
      });

      this.postService
        .createScheduledService({
          registerTime: new Date(),
          scheduledDate: this.selectedTimeSlot.value,
          scheduledProviderServices: postServices,
          providerId: this.currentProvider.id,
          clientId: 6,
        })
        .subscribe(() => {
          this.uiService.presentToast(
            'Orden de servicios realizada satisfactoriamente!',
            3000,
            'top'
          );
          this.navController.navigateRoot(['/tabs/home']);
        });
    }
  }

  ngOnInit() {}

  goHome() {}

  subTotal() {
    let subTotal = 0;
    this.selectedServices.forEach((service) => {
      subTotal += service.price;
    });
    return subTotal;
  }

  itbs() {
    return 32;
  }

  Total() {
    return this.subTotal() + this.itbs();
  }
  goToCheckout() {
    console.log('hola');
  }

  async openPayTypeModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: PaymentSelectionComponent,
      componentProps: {
        parentPayment: this.selectedPayment.toString(),
      },
    });

    await modal.present();

    modal.onWillDismiss().then((modal) => {
      if (modal.data) {
        this.selectedPayment = Number(modal.data);
      }
    });

    modal.onDidDismiss().then((modal) => {
      if (modal.data) {
        if (this.selectedPayment == 2) {
          render({
            id: '#paypal-buttons',
            currency: 'DOP',
            value: this.Total().toString(),
            onApprove: () => {
              this.uiService.presentToast(
                'Orden de servicios realizada satisfactoriamente!',
                3000,
                'top'
              );
              this.navController.navigateRoot(['/home']);
            },
          });
        }
      }
    });
  }
}
