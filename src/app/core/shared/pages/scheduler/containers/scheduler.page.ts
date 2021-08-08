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
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  @Input() parentCall = false;
  @Input() providerEvents = {
    events: [],
    serviceDuration: 25,
    serviceName: 'Recorte',
    startHour: '10:00 AM',
    endHour: '11:00 PM',
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
    mode: 'week',
    currentDate: new Date(),
    startHour: 0,
    endHour: 0,
  };
  isEventInserted: boolean = false;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.getTwentyFourHourTime(
      this.providerEvents.startHour,
      this.providerEvents.endHour
    );
    this.resetEvent();
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
    this.providerEvents.events.forEach(element => {
       let formatElement = element.startTime.getUTCDate().toString() + element.startTime.getUTCMonth().toString() + element.startTime.getUTCFullYear().toString(); 
       formatElement += element.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

       let formatCurrentElement = eventCopy.startTime.getUTCDate().toString() + eventCopy.startTime.getUTCMonth().toString() + eventCopy.startTime.getUTCFullYear().toString(); 
       formatCurrentElement += eventCopy.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        if(formatElement == formatCurrentElement){
          alert("Ya hay una cita en esta hora");
          duplicate = true;
        }
    });
    if(!duplicate){
      this.providerEvents.events.push(eventCopy);
      this.isEventInserted = true
      this.myCal.loadEvents();
      this.resetEvent();
    }
    

  }

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

  // Selected date reange and hence title changed
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

  setEndTime(startTime) {
    let endTime = new Date(startTime);
    endTime.setMinutes(
      endTime.getMinutes() + this.providerEvents.serviceDuration
    );
    this.event.endTime = endTime.toISOString();
  }

  getTwentyFourHourTime(startHour, endHour) {
    let sHour = new Date('1/1/2013 ' + startHour);
    let eHour = new Date('1/1/2013 ' + endHour);
    this.calendar.startHour = sHour.getHours();
    this.calendar.endHour = eHour.getHours();

    for (let index = sHour.getHours(); index <= eHour.getHours(); index++) {
        this.hourValues.push(index);
    }
  }

  getNewEvents(){
      this.newEvents.emit(this.providerEvents);
  }
}
