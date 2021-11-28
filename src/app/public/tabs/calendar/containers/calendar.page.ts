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
import { Response, ServiceEvent } from 'src/app/core/models/models';
import {
  ProveedorDisponibilidadesService,
  ProviderServiciosService,
  ScheduledServiceService,
  ServicesService,
} from 'src/app/core/services/api/services';
import { CalendarComponent } from 'ionic2-calendar';
import { formatDate } from '@angular/common';
import {
  AlertButton,
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { ScheduledService } from 'src/app/core/models/models';
import { stringify } from 'querystring';
import { BehaviorSubject, zip } from 'rxjs';
import * as moment from 'moment';
import { TabsService } from '../../services/tabs.service';
import { EditAppointmentComponent } from '../components/edit-appointment.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  @Input() parentCall = false;
  providerEvents: any = {
    events: [],
    // serviceDuration: 25,
    // serviceName: 'Recorte',
    // startHour: '10:00 AM',
    // endHour: '11:00 PM',
  }; //events sent by parent component
  @Output() newEvents = new EventEmitter();
  eventSource = [];
  collapseCard: boolean = false;
  event = {
    title: '',
    desc: '',
    startTime: new Date(),
    endTime: new Date(),
    allDay: false,
  };

  title: BehaviorSubject<string> = new BehaviorSubject('');
  // title: string;
  startTime = new Date();
  endTime = new Date();
  allDay: boolean;
  minutesToAdd: BehaviorSubject<number> = new BehaviorSubject(0);
  userRole: BehaviorSubject<number> = new BehaviorSubject(0);
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
  month = new Date();
  monthDisplay = this.monthShortNames[this.month.getMonth()];
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
  currentUser = {};
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private tabsService: TabsService,
    private modalController: ModalController,
    private navController: NavController,
    private authService: AuthService,
    private scheduledServices: ScheduledServiceService,

    @Inject(LOCALE_ID) private locale: string
  ) {
    if (router.getCurrentNavigation().extras.state) {
      console.log(router.getCurrentNavigation().extras.state);
    }
  }

  ngOnInit() {
    // this.tabsService.getUserScheduledServices(this.eventSource);
    // this.getScheduledServices();

    this.loadEvents();
  }

  ionViewDidEnter() {
    this.loadEvents();
    this.getScheduledServices();
    this.myCal.update();
  }

  getEventSource() {}

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
    this.loadEvents();
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
      message: 'Inicio: ' + start + '<br><br>Final: ' + end,
      buttons: [
        {
          text: 'EDITAR',
          handler: () =>
            this.editAppointment(
              event.title,
              event.startTime,
              event.endTime,
              event.scheduledServiceId
            ),
        },
        'OK',
      ],
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

  loadEvents(): void {
    this.eventSource = [];
    this.tabsService.userEvents.subscribe((result) => {
      this.eventSource = result;
      this.myCal.loadEvents();
    });
  }

  getScheduledServices() {}

  async editAppointment(title, start, end, sId) {
    console.log(this.userRole.getValue());
    const modal = await this.modalController.create({
      component: EditAppointmentComponent,
      componentProps: {
        appointmentDetail: {
          title: title,
          startTime: start,
          endTime: end,
          scheduledProviderServiceId: sId,
        },
      },
    });

    await modal.present();

    modal.onWillDismiss().then((modal) => {
      if (modal.data) {
        this.getUserScheduledServices();
      }
    });
  }

  getUserScheduledServices() {
    this.tabsService.resetUserEvents();
    this.authService.getCurrentUser().then((user) => {
      let userObj = JSON.parse(user.value);
      this.userRole.next(userObj.Role);
      if (userObj.Role == 1) {
        this.scheduledServices
          .getApiScheduledServiceClientIdGetScheduledServicesByClientId(
            userObj.Id
          )
          .subscribe((response: Response) => {
            response.result.forEach((element: ScheduledService) => {
              let servicesNames = '';
              let providerName = '';
              let counter = 0;
              let eventList = [];
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
                scheduledServiceId: element.id,
              };
              if (element.status == 1) {
                this.tabsService.addUserEvent(newEvent);
              }
            });
            this.loadEvents();
          });
      } else if (userObj.Role == 2) {
        this.scheduledServices
          .getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
            userObj.Id
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
                scheduledServiceId: element.id,
              };
              if (element.status == 1) {
                this.tabsService.addUserEvent(newEvent);
              }
            });
            this.loadEvents();
          });
      }
    });
  }
}
