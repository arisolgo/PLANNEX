import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, ReplaySubject, zip } from 'rxjs';
import { map, skip, skipWhile, switchMap, take } from 'rxjs/operators';
import {
  Response,
  ScheduledProviderService,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import {
  ServicesService,
  ScheduledServiceService,
  ProviderServiciosService,
  ScheduledProviderServiceService,
  ProveedoresService,
} from 'src/app/core/services/api/services';
import { TabsService } from './services/tabs.service';
import { Storage } from '@capacitor/storage';
import { AuthService } from 'src/app/core/services/auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ProviderReviewComponent } from './provider-review/provider-review.component';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService,
    private tabService: TabsService,
    private scheduledProviderService: ScheduledProviderServiceService,
    private providerService: ProveedoresService,
    private authService: AuthService,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController
  ) {}
  currentUser = this.authService.getCurrentUser();
  currentRole = 0;
  scheduledServicesForReview: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  ngOnInit() {
    this.getUserScheduledServices();
  }

  getUserScheduledServices() {
    this.currentUser.then((user) => {
      console.log(user);
      let userObj = JSON.parse(user.value);
      this.currentRole = userObj.Role;
      console.log(userObj);

      if (this.currentRole == 1) {
        this.scheduledServices
          .getApiScheduledServiceClientIdGetScheduledServicesByClientId(
            userObj.UserId
          )
          .subscribe((response: Response) => {
            response.result.forEach((element: ScheduledService) => {
              console.log(element);
              let servicesNames = '';
              let providerName = '';
              let counter = 0;
              element.scheduledProviderServices.forEach((element) => {
                servicesNames += ' ' + element.providerServiceName;
                if (counter > 0) {
                  servicesNames += ', ';
                }
                providerName = element.providerName;
                counter++;
              });

              let newEvent: ServiceEvent = {
                title: servicesNames,
                startTime: new Date(element.scheduledDate),
                endTime: new Date(element.scheduledEndDate),
                desc: 'Servicio a proveer por: ' + providerName,
                allDay: false,
              };

              console.log('PROVIDER NAME', providerName);

              this.tabService.addUserEvent(newEvent);
              if (element.status == 2) {
                this.openReviewModal(element, providerName);
              }
            });
          });
      } else if (this.currentRole == 2) {
        this.scheduledServices
          .getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
            userObj.UserId
          )
          .subscribe((response: Response) => {
            response.result.forEach((element: ScheduledService) => {
              let servicesNames = '';
              let providerName = '';
              let counter = 0;
              element.scheduledProviderServices.forEach((element) => {
                servicesNames += element.providerServiceName + ' ';
                if (counter > 0) {
                  servicesNames += ', ';
                }
                providerName = element.providerName;
                counter++;
              });
              let newEvent: ServiceEvent = {
                title: servicesNames,
                startTime: new Date(element.scheduledDate),
                endTime: new Date(element.scheduledEndDate),
                desc: 'Servicio a proveer por: ' + providerName,
                allDay: false,
              };

              this.tabService.addUserEvent(newEvent);
            });
          });
      }
    });
  }

  async openReviewModal(scheduledService, providerName) {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ProviderReviewComponent,
      componentProps: {
        client: this.currentUser,
        scheduledService: scheduledService,
        providerName: providerName,
      },
    });

    await modal.present();
  }
}
