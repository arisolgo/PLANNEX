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
import { Response } from 'src/app/core/models/models';
import {
  ProveedorDisponibilidadesService,
  ProviderServiciosService,
  ScheduledServiceService,
  ServicesService,
} from 'src/app/core/services/api/services';
import { CalendarComponent } from 'ionic2-calendar';
import { formatDate } from '@angular/common';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { ScheduledService } from 'src/app/core/models/models';
import { stringify } from 'querystring';
import { BehaviorSubject, zip } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @Input() parentCall = false;
  @Input() providerEvents: any = {
    events: [],
    // serviceDuration: 25,
    // serviceName: 'Recorte',
    // startHour: '10:00 AM',
    // endHour: '11:00 PM',
  }; //events sent by parent component
  @Output() newEvents = new EventEmitter();
  eventSource;
  collapseCard: boolean = false;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
  };

  title: BehaviorSubject<string> = new BehaviorSubject('');
  // title: string;
  startTime = new Date();
  endTime = new Date();
  allDay: boolean;
  minutesToAdd: BehaviorSubject<number> = new BehaviorSubject(0);
  // eventSource = []
  //month-short-names:
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
  //day-short-names:
  dayShortNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  //minute-values:
  minuteValues = [0, 30];
  //hoursValues
  hourValues = [];
  tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  minDate = new Date(Date.now() - this.tzoffset).toISOString().slice(0, -1);
  selectedTime: any;
  selectedDate: any;

  viewTitle;

  calendar = {
    mode: 'week' as CalendarMode,
    currentDate: new Date(),
    // startHour: 0,
    // endHour: 0,
  };
  isEventInserted: boolean = false;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    if (router.getCurrentNavigation().extras.state) {
      console.log(router.getCurrentNavigation().extras.state);
    }
  }

  ngOnInit() {
    this.getScheduledServices();
  }

  // Create the right event format and reload source

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date range and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

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

  show(element) {
    console.log(element);
  }

  getNewEvents() {
    // this.newEvents.emit(this.providerEvents);
    // this.navCtrl.navigateForward('/appointment-confirmation');
  }

  async getScheduledServices() {
    //change 1 to Cliente.id

    this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(1)
      .subscribe((response: Response) => {
        console.log('Scheduled Services Response:', response.result);
        response.result.forEach((element: ScheduledService) => {
          console.log('Event 1:', element.providerServiceId);
          // let name: string = 'No entro';
          this.getScheduledServiceName(element.providerServiceId);
          //this.title = name;
          // console.log('Event Name:', this.title);
          zip(this.title, this.minutesToAdd).subscribe((responses) => {
            this.event.title = responses[0];
            this.event.startTime = new Date(this.startTime).toString();
            this.event.endTime = moment(this.startTime)
              .add(responses[1], 'm')
              .toDate()
              .toString();
            this.providerEvents.events.push(this.event);
            console.log(this.providerEvents);
          });

          // this.title.subscribe((title: string) => {});

          // this.startTime = element.scheduledDate;

          // this.event.startTime = new Date(this.startTime).toString();
          // let endTime = new Date(this.startTime);
          // endTime = new Date(endTime.getTime() + element.duration);
          // this.minutesToAdd.subscribe((minutesToAdd) => {
          //   console.log('Duration: ', minutesToAdd);
          //   this.event.endTime = moment(this.startTime)
          //     .add(minutesToAdd, 'm')
          //     .toDate()
          //     .toString();
          //   console.log('End TIME:', this.endTime);

          //   console.log('AFTER EVENT PUSH:', this.providerEvents);
          // });

          // console.log('PUSH ATTEMPT:', this.event);
        });
      });
  }

  getScheduledServiceName(id: number) {
    this.providerServicesService
      .getApiProviderServiciosProviderServiceIdGetProviderServiceById(id)
      .subscribe((response: Response) => {
        console.log('Response Name Method:', response.result);
        id = response.result.serviceId;
        this.minutesToAdd.next(response.result.duration);
        console.log('Response Name Method ID Assign:', id);
      });

    this.servicesService
      .getApiServicesId(id)
      .subscribe((response: Response) => {
        console.log('Response Name Method: ServiveAPI', response.result);
        this.title.next(response.result.description);
        console.log('NAME:', this.title);
        // this.event.title = this.title;
      });
  }
}
