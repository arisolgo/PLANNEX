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
  IonContent,
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
  TimeSlot,
} from 'src/app/core/models/models';
import {
  ProveedorDisponibilidadesService,
  ScheduledServiceService,
} from 'src/app/core/services/api/services';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  currentProvider: Provider;
  currentServices: ProviderService[];
  calendarOptions: any = {
    showMonthPicker: false,
    weekdays: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  };
  selectedHours = { startService: '', endService: '' };
  title: '';
  date: Date;
  type: 'moment';
  selectedDay: Date;
  isAvailableHourRange = { from: new Date(), to: new Date() };
  isAvailable = true;
  availableSpaces: TimeSlot[] = [];

  //providerAvailabilities: ProviderAvailability[];
  providerAvailabilities: BehaviorSubject<ProviderAvailability[]> =
    new BehaviorSubject([]);
  providerScheduledServices: BehaviorSubject<ScheduledService[]> =
    new BehaviorSubject([]);
  public hoursAvailable: ProviderAvailability[];
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  selectedTimeSlot: Partial<TimeSlot> = null;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private uiService: UiService,
    private scheduledServices: ScheduledServiceService,
    public modalCtrl: ModalController,
    private providerAvailabilityService: ProveedorDisponibilidadesService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    if (router.getCurrentNavigation().extras.state) {
      let state = router.getCurrentNavigation().extras.state;
      this.currentProvider = state.provider;
      this.currentServices = state.selectedServices;
      console.log(this.currentServices);
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
    this.availableSpaces = [];
    let todayAvailability: ProviderAvailability;
    this.hoursAvailable = this.providerAvailabilities.value;
    this.providerAvailabilities.value.forEach((element) => {
      if (date.getDay() === element.dia) {
        todayAvailability = element;
      }
    });
    if (todayAvailability) {
      this.isAvailableHourRange.from = new Date(todayAvailability.horaDesde);
      this.isAvailableHourRange.to = new Date(todayAvailability.horaHasta);
      this.getAvailableRequestHours(todayAvailability);
    } else {
      this.isAvailable = false;
      this.uiService.presentAlert(
        'El proveedor seleccionado no labora este día, por favor intente seleccionar otro.',
        'No labora',
        'Proveedor sin disponibilidad'
      );
    }
  }

  getAvailableRequestHours(availability: ProviderAvailability) {
    let startTime = {
      hours: new Date(availability.horaDesde).getHours(),
      minutes: new Date(availability.horaDesde).getMinutes(),
    };
    let endTime = {
      hours: new Date(availability.horaHasta).getHours(),
      minutes: new Date(availability.horaHasta).getMinutes(),
    };
    const now = moment()
      .startOf('day')
      .hour(startTime.hours)
      .minute(startTime.minutes);
    const deadLine = moment()
      .startOf('day')
      .hour(endTime.hours)
      .minute(endTime.minutes);

    while (now.diff(deadLine) < 0) {
      if (now >= moment(now).hour(startTime.hours)) {
        this.availableSpaces.push({ value: now.toDate(), selected: false });
      }
      let duration = 0;
      this.currentServices.forEach((element) => {
        duration += element.duration;
      });
      now.add(duration, 'minutes');
    }
    this.setServicesSpaces();
  }

  setServicesSpaces() {
    this.providerScheduledServices.value.forEach((service) => {
      for (let i = 0; i < this.availableSpaces.length; i++) {
        if (
          new Date(service.scheduledDate) <= this.availableSpaces[i].value &&
          this.availableSpaces[i].value <= new Date(service.scheduledEndDate)
        ) {
          this.availableSpaces.splice(i - 1, 2);
        }
      }
    });
  }

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
      this.providerScheduledServices.next(
        response[0].result.filter((element) => {
          element.status == 1;
        })
      );
      this.getDayAvailability(date);
    });
  }

  pickDay($event) {
    this.selectedTimeSlot = null;
    console.log($event);
    let momentToDate = new Date($event.format());
    this.selectedDay = momentToDate;
    console.log(this.selectedDay);
    this.getAvailabityAndServices(momentToDate);
    this.scrollTo('timeSlots');
  }

  selectHour(availability: TimeSlot) {
    this.availableSpaces.forEach((element) => {
      element.selected = false;
    });
    availability.selected = true;
    availability.value = new Date(
      this.selectedDay.getFullYear(),
      this.selectedDay.getMonth(),
      this.selectedDay.getDate(),
      availability.value.getHours(),
      availability.value.getMinutes()
    );

    this.selectedTimeSlot = availability;
  }

  scrollTo(elementId: string) {
    let y = document.getElementById(elementId).offsetTop;
    this.content.scrollToPoint(0, y, 1500);
  }

  goToCheckout() {
    this.navCtrl.navigateForward('/appointment-confirmation', {
      state: {
        provider: this.currentProvider,
        services: this.currentServices,
        timeSlot: this.selectedTimeSlot,
      },
    });
  }
}
