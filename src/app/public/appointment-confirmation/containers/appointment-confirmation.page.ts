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
  scheduledService = new BehaviorSubject<number>(0);
  getCurrentUser = this.authService.getCurrentUser();
  currentUser: any = {};
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
    if (this.currentUser.Role == 1) {
      let postServices = [];
      this.selectedServices.forEach((element) => {
        postServices.push({ providerServiceId: element.id });
      });
      let newTimeSlot = new Date(this.selectedTimeSlot.value);
      newTimeSlot.setHours(newTimeSlot.getHours() - 4);
      this.postService
        .createScheduledService({
          registerTime: new Date(),
          scheduledDate: newTimeSlot,
          scheduledProviderServices: postServices,
          providerId: this.currentProvider.id,
          clientId: this.currentUser.Id,
        })
        .subscribe(() => {
          console.log(this.selectedTimeSlot.value);
          this.uiService.presentToast(
            'Orden de servicios realizada satisfactoriamente!',
            3000,
            'top'
          );
          this.navController.navigateRoot(['/tabs/home']);
        });
    }
  }

  ngOnInit() {
    this.getCurrentUser.then((user) => {
      this.currentUser = JSON.parse(user.value);
    });
  }

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
