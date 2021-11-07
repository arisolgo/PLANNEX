import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.page.html',
  styleUrls: ['./appointment-confirmation.page.scss'],
})
export class AppointmentConfirmationPage implements OnInit {
  selectedServices: ProviderService[] = [];
  currentProvider: Provider;
  selectedTimeSlot: TimeSlot;
  scheduledService = new BehaviorSubject<number>(0);
  constructor(
    private router: Router,
    private scheduledServiceService: ScheduledServiceService,
    private scheduledProviderServiceService: ScheduledProviderServiceService
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
}
