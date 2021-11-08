import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
// import {
//   PayPal,
//   PayPalPayment,
//   PayPalConfiguration,
// } from '@ionic-native/paypal/ngx';
import { render } from 'creditcardpayments/creditCardPayments';
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
  paymentAmount: string = '3.33';
  currency: string = 'INR';
  currencyIcon: string = '₹';
  constructor(
    private router: Router,
    private scheduledServiceService: ScheduledServiceService,
    private scheduledProviderServiceService: ScheduledProviderServiceService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
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
    this.scheduledServiceService
      .postScheduledService({
        registerTime: new Date(),
        scheduledDate: this.selectedTimeSlot.value,
        providerId: this.currentProvider.id,
        clientId: 1,
      })
      .subscribe((response: Response) => {
        // console.log(response);
        // this.scheduledService.next(response.result.id);
        this.selectedServices.forEach((element) => {
          console.log(
            'Scheduled Service',
            response.result.id,
            'elementId',
            element.id
          );
          this.scheduledProviderServiceService
            .postScheduledProviderService({
              scheduledServiceId: response.result.id,
              providerServiceId: element.id,
            })
            .subscribe((result) => {
              console.log(result);
            });
        });
      });
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
        console.log(this.selectedPayment);
      }
    });

    modal.onDidDismiss().then((modal) => {
      if (modal.data) {
        if (this.selectedPayment == 2) {
          render({
            id: '#paypal-buttons',
            currency: 'USD',
            value: '100.00',
            onApprove: (details) => {
              console.log(details);
              alert('Transaction successfull');
            },
          });
        }
      }
    });
  }
  // payWithPaypal() {
  //   this.payPal
  //     .init({
  //       PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
  //       PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID',
  //     })
  //     .then(
  //       () => {
  //         // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //         this.payPal
  //           .prepareToRender(
  //             'PayPalEnvironmentSandbox',
  //             new PayPalConfiguration({
  //               // Only needed if you get an "Internal Service Error" after PayPal login!
  //               //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  //             })
  //           )
  //           .then(
  //             () => {
  //               let payment = new PayPalPayment(
  //                 this.paymentAmount,
  //                 this.currency,
  //                 'Description',
  //                 'sale'
  //               );
  //               this.payPal.renderSinglePaymentUI(payment).then(
  //                 (res) => {
  //                   console.log(res);
  //                   // Successfully paid
  //                 },
  //                 () => {
  //                   // Error or render dialog closed without being successful
  //                 }
  //               );
  //             },
  //             () => {
  //               // Error in configuration
  //             }
  //           );
  //       },
  //       () => {
  //         // Error in initialization, maybe PayPal isn't supported or something else
  //       }
  //     );
  // }
}
