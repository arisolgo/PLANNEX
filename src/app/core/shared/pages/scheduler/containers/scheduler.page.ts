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
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  CalendarResult,
} from 'ion2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { BehaviorSubject, zip } from 'rxjs';
import {
  Provider,
  ProviderAvailability,
  ProviderService,
  Response,
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
  @Input() parentCall = false;
  @Input() providerEvents: any = {
    // events: [],
    // serviceDuration: 25,
    // serviceName: 'Recorte',
    // startHour: '10:00 AM',
    // endHour: '11:00 PM',
  }; //events sent by parent component
  @Output() newEvents = new EventEmitter();
  collapseCard: boolean = false;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
  };
  // eventSource = []
  monthShortNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sept',
    'Oct',
    'Nov',
    'Dic',
  ];
  s = 10;
  e = 13;
  minuteValues = [0, 30];
  hourValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  tzoffset = new Date().getTimezoneOffset() * 240000; //offset in milliseconds
  minDate = new Date(Date.now() - this.tzoffset).toISOString().slice(0, -1);
  selectedTime: any;
  selectedDate: any;
  enabledHours: any = {};
  calendarSchedule = { startHour: 0, endHour: 0 };
  viewTitle;
  hide: boolean = false;

  calendar = {
    mode: 'day',
    currentDate: new Date(),
    locale: 'en_GB',
    // startHour: 0,
    // endHour: 0,
  };
  isEventInserted: boolean = false;
  currentProvider: Provider;
  currentService: ProviderService;
  selectedHours = { startService: '', endService: '' };
  title: '';
  //providerAvailabilities: ProviderAvailability[];
  providerAvailabilities: BehaviorSubject<ProviderAvailability[]> =
    new BehaviorSubject([]);
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(
    private alertCtrl: AlertController,
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
    this.openCalendar();
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
        availabilities.forEach((element) => {
          if (date.getDay() === element.dia) {
            console.log(element);
            this.enabledHours = {
              start: element.horaDesde,
              end: element.horaHasta,
            };
            let objectSchedule = {
              startHour: new Date(this.enabledHours.start).getHours(),
              endHour: new Date(this.enabledHours.end).getHours(),
            };
            this.calendarSchedule = objectSchedule;
          }
        });
      }
    );
  }

  resetEvent() {
    this.event = {
      title: this.providerEvents.serviceName, //service Name
      desc: 'Ariel Solano', //Logged user Name
      startTime: null,
      endTime: null,
      allDay: false,
    };
  }

  setEndTime(startTime) {
    let endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    this.selectedHours.endService = endTime.toISOString();
  }
  //Obtener dia
  //verificar la disponibilidad del dia que esta en calendario

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }

    let duplicate = false;
    this.providerEvents.events.forEach((element) => {
      let formatElement =
        element.startTime.getUTCDate().toString() +
        element.startTime.getUTCMonth().toString() +
        element.startTime.getUTCFullYear().toString();
      formatElement += element.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      let formatCurrentElement =
        eventCopy.startTime.getUTCDate().toString() +
        eventCopy.startTime.getUTCMonth().toString() +
        eventCopy.startTime.getUTCFullYear().toString();
      formatCurrentElement += eventCopy.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (formatElement == formatCurrentElement) {
        alert('Ya hay una cita en esta hora');
        duplicate = true;
      }
      console.log(this.providerEvents.events);
    });
    if (!duplicate) {
      this.providerEvents.events.push(eventCopy);
      this.isEventInserted = true;
      this.myCal.loadEvents();
      this.resetEvent();
    }
  }

  next() {
    let result = new Date();
    result.setDate(this.myCal.currentDate.getDate() + 1);
    this.getDayAvailability(result);
    this.myCal.slideNext();
    this.myCal.ngOnInit();
    // this.myCal.update();
    // this.hide = false;
  }

  back() {
    let result = new Date();
    result.setDate(this.myCal.currentDate.getDate() - 1);
    this.getDayAvailability(result);
    this.myCal.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
    return this.calendar.currentDate;
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
    // let result = new Date();
    // result.setDate(this.myCal.currentDate.getDate() + 1);
    // this.getDayAvailability(result);
  }
  onCurrentDateChanged = (ev: Date) => {
    // this.getDayAvailability(ev);
    // this.myCal.startHour = this.calendarSchedule.startHour;
    // this.myCal.endHour = this.calendarSchedule.endHour;
  };

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  // Time slot was clicked
  //(onTimeSelected)="onTimeSelected($event)"
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }

  show(element) {
    console.log(element);
  }

  getNewEvents() {
    // this.newEvents.emit(this.providerEvents);
    this.navCtrl.navigateForward('/appointment-confirmation');
  }

  getAvailabityAndServices() {
    zip(
      this.scheduledServices.getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
        this.currentProvider.id
      ),
      this.providerAvailabilityService.getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorId(
        this.currentProvider.id
      )
    ).subscribe((response: Response[]) => {
      this.providerAvailabilities.next(response[1].result);
      this.getDayAvailability(new Date());
    });
  }

  async openCalendar() {
    const options: CalendarModalOptions = {
      title: 'BASIC',
      weekdays: ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'],
    };

    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options },
    });

    myCalendar.present();

    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    console.log(date);
  }
}

// dayShortNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
