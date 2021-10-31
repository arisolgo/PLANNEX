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
  CalendarOptions,
  CalendarResult,
} from 'ion2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { Moment } from 'moment';
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
  isAvailable = { from: new Date(), to: new Date() };
  //providerAvailabilities: ProviderAvailability[];
  providerAvailabilities: BehaviorSubject<ProviderAvailability[]> =
    new BehaviorSubject([]);
  public hoursAvailable: ProviderAvailability[];
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
        console.log(availabilities);
        this.hoursAvailable = availabilities;
        availabilities.forEach((element) => {
          if (date.getDay() === element.dia) {
            this.isAvailable.from = new Date(element.horaDesde);
            this.isAvailable.to = new Date(element.horaHasta);
          }
        });
      }
    );
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
      this.getDayAvailability(date);
    });
  }

  pickDay($event: Moment) {
    let momentTodate = new Date($event.format());
    console.log(momentTodate);
    this.getAvailabityAndServices(momentTodate);
  }
}
