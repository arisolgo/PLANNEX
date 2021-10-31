import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  CalendarOptions,
  CalendarResult,
} from 'ion2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, zip } from 'rxjs';
import {
  Provider,
  ProviderAvailability,
  ProviderService,
  Response,
  ScheduledService,
} from 'src/app/core/models/models';
import {
  ProveedorDisponibilidadesService,
  ScheduledServiceService,
} from 'src/app/core/services/api/services';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  currentProvider: Provider;
  currentService: ProviderService;
  calendarOptions: any = {
    showMonthPicker: false,
    weekdays: ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'],
  };
  selectedHours = { startService: '', endService: '' };
  title: '';
  date: Date;
  type: 'moment';
  selectedDay: CalendarResult;
  isAvailableHourRange = { from: new Date(), to: new Date() };
  isAvailable = true;
  availableSpaces = [];

  //providerAvailabilities: ProviderAvailability[];
  providerAvailabilities: BehaviorSubject<ProviderAvailability[]> =
    new BehaviorSubject([]);
  providerScheduledServices: BehaviorSubject<ScheduledService[]> =
    new BehaviorSubject([]);
  public hoursAvailable: ProviderAvailability[];
  @ViewChild('hourButton') hourButton: IonButton;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private scheduledServices: ScheduledServiceService,
    public modalCtrl: ModalController,
    private providerAvailabilityService: ProveedorDisponibilidadesService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    if (router.getCurrentNavigation().extras.state) {
      let state = router.getCurrentNavigation().extras.state;
      this.currentProvider = state.provider;
      this.currentService = state.selectedService;
    }
  }

  ngOnInit() {
    // this.openCalendar();
    // this.getAvailabityAndServices();
    // this.getTwentyFourHourTime(
    //   this.providerEvents.startHour,
    //   this.providerEvents.endHour
    // );
    // this.resetEvent();
  }

  getDayAvailability(date: Date) {
    this.providerAvailabilities.subscribe(
      (availabilities: ProviderAvailability[]) => {
        this.hoursAvailable = availabilities;
        let hasDay = false;
        availabilities.forEach((element) => {
          if (date.getDay() === element.dia) {
            hasDay = true;
            this.isAvailableHourRange.from = new Date(element.horaDesde);
            this.isAvailableHourRange.to = new Date(element.horaHasta);
            this.getAvailableRequestHours(element);
          }
          if (hasDay === false) {
            this.isAvailable = false;
            console.log('No labora');
          }
        });
      }
    );
  }

  getAvailableRequestHours(availability: ProviderAvailability) {
    let dispStartHour = availability.horaDesde;
    let dispEndHour = availability.horaHasta;
    let duration = this.currentService.duration;
    let scheduled = false;
    let defaultOption = {
      start: new Date(availability.horaDesde),
      end: moment(availability.horaDesde).add(duration, 'm').toDate(),
    };
    let providerServices = this.providerScheduledServices.value;
    providerServices.sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
    );

    let tempStartTime = availability.horaDesde;
    providerServices.forEach((cita: ScheduledService) => {
      while (new Date(tempStartTime) < new Date(availability.horaHasta)) {
        let serviceEndTime = moment(cita.scheduledDate)
          .add(duration, 'm')
          .toDate();
        let rangeStartTime = dispStartHour;
        let rangeEndTime = serviceEndTime;
        let citaStart = new Date(cita.scheduledDate);
        let citaEnd = new Date(cita.scheduledEndDate);
        if (citaStart.getDay() === availability.dia) {
          scheduled = true;
          if (defaultOption.end < citaEnd && defaultOption.end > citaStart) {
            defaultOption.start = citaEnd;
            defaultOption.end = moment(defaultOption.start)
              .add(duration, 'm')
              .toDate();
            this.availableSpaces.push(defaultOption);
          } else if (
            defaultOption.start > citaStart &&
            defaultOption.start < citaEnd
          ) {
            defaultOption.start = citaEnd;
            defaultOption.end = moment(defaultOption.start)
              .add(duration, 'm')
              .toDate();
            this.availableSpaces.push(defaultOption);
          }
        } else {
          let obj = {
            start: new Date(tempStartTime),
            end: moment(tempStartTime).add(duration, 'm').toDate(),
          };
          this.availableSpaces.push(obj);
          tempStartTime = obj.end;
        }
      }
    });

    if (!scheduled) {
      while (new Date(tempStartTime) < new Date(availability.horaHasta)) {
        let obj = {
          start: new Date(tempStartTime),
          end: moment(tempStartTime).add(duration, 'm').toDate(),
        };
        let tempEndTime = obj.end;
        if (tempEndTime < new Date(availability.horaHasta)) {
          this.availableSpaces.push(obj);
          tempStartTime = moment(tempStartTime).add(duration, 'm').toDate();
        }
      }
    }
    console.log(this.availableSpaces);
    this.filterSpaces(providerServices);
  }

  filterSpaces(scheduledServices) {
    scheduledServices.forEach((scheduledService) => {
      this.availableSpaces.forEach((space) => {
        console.log('espacio->', space, 'scheduledService->', scheduledService);
        if (
          (new Date(space.start) > new Date(scheduledService.scheduledDate) &&
            new Date(space.start) <
              new Date(scheduledService.scheduledEndDate)) ||
          (new Date(space.end) > new Date(scheduledService.scheduledDate) &&
            new Date(space.end) < new Date(scheduledService.scheduledEndDate))
        ) {
          console.log('vamo a borra gente');
          let index = this.availableSpaces.indexOf(space);
          if (index != undefined) {
            this.availableSpaces.splice(index);
          }
        }
      });
    });
    console.log(this.availableSpaces);
  }

  /**
   * 
   *  providerServices.forEach((scheduledService) => {
        this.availableSpaces.forEach((space) => {
          if (
            (space.start > scheduledService.scheduledDate &&
              space.start < scheduledService.scheduledEndDate) ||
            (space.end > scheduledService.scheduledDate &&
              space.end < scheduledService.scheduledEndDate)
          ) {
            let index = this.availableSpaces.indexOf(space);
            if(index != undefined){
              this.availableSpaces.splice(index)
            }
          }
   * 
   */

  getAvailabityAndServices(date: Date) {
    zip(
      this.scheduledServices.getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
        this.currentProvider.id
      ),
      this.providerAvailabilityService.getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorId(
        this.currentProvider.id
      )
    ).subscribe((response: Response[]) => {
      this.providerAvailabilities.next(response[1].result);
      this.providerScheduledServices.next(response[0].result);
      this.getDayAvailability(date);
    });
  }

  pickDay($event) {
    let momentToDate = new Date($event.format());
    this.getAvailabityAndServices(momentToDate);
  }

  selectHour(el: IonButton, hour) {
    console.log(el);
    el.fill = 'solid';
    console.log(hour);
  }
}
