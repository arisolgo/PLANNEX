import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult,
} from 'ion2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  date: string;
  type: 'string';
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.openCalendar();
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

  onChange($event) {
    console.log($event);
  }
  show() {
    let sample = new Date(this.date);
    console.log(sample.getDay());
  }
}
