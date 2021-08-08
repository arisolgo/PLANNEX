import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
  @Input() isParentCalling = false;
  @Input() providers = [];
  @Input() serviceCategory = '';
  filteredProviders = [];
  categories = ['Recorte', 'Uñas'];
  providersByCategory = [];
  service:any = {}

  constructor(private router:Router, private navCtrl:NavController) {
    if (router.getCurrentNavigation().extras.state) {
      this.service = this.router.getCurrentNavigation().extras.state;
      console.log(this.service);
    }
   }
  ngOnInit() {
    this.getProviders();
    this.setProviders(this.filteredProviders);
  }
  getProviders() {
    this.providers[0] = {
      startTime:'10:00 AM',
      endTime: '6:00 PM',
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte',
      events: [
        {
            "title": "Corte Sencillo",
            "startTime": new Date("2021-08-08T14:00:56.277Z"),
            "endTime": new Date("2021-08-08T14:25:56.277Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Corte Completo",
            "startTime": new Date("2021-08-08T15:00:09.815Z"),
            "endTime": new Date("2021-08-08T15:25:09.815Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Corte Infantil",
            "startTime": new Date("2021-08-08T18:00:33.977Z"),
            "endTime": new Date("2021-08-08T18:25:33.977Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        }
      ]
    };
    this.providers[1] = {
      startTime:'10:00 AM',
      endTime: '6:00 PM',
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte',
      events: [
        {
            "title": "Corte Sencillo",
            "startTime": new Date("2021-08-08T14:00:56.277Z"),
            "endTime": new Date("2021-08-08T14:25:56.277Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Corte Completo",
            "startTime": new Date("2021-08-08T15:00:09.815Z"),
            "endTime": new Date("2021-08-08T15:25:09.815Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Corte Infantil",
            "startTime": new Date("2021-08-08T18:00:33.977Z"),
            "endTime": new Date("2021-08-08T18:25:33.977Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        }
      ]
    };
    this.providers[2] = {
      startTime:'10:00 AM',
      endTime: '6:00 PM',
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas',
      events: [
        {
            "title": "Pedicure",
            "startTime": new Date("2021-08-08T14:00:56.277Z"),
            "endTime": new Date("2021-08-08T14:25:56.277Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Manicure",
            "startTime": new Date("2021-08-08T15:00:09.815Z"),
            "endTime": new Date("2021-08-08T15:25:09.815Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Pintado en Gel",
            "startTime": new Date("2021-08-08T18:00:33.977Z"),
            "endTime": new Date("2021-08-08T18:25:33.977Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        }
      ]
    };
    this.providers[3] = {
      startTime:'10:00 AM',
      endTime: '6:00 PM',
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas',
      events: [
        {
            "title": "Pedicure",
            "startTime": new Date("2021-08-08T14:00:56.277Z"),
            "endTime": new Date("2021-08-08T14:25:56.277Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Manicure",
            "startTime": new Date("2021-08-08T15:00:09.815Z"),
            "endTime": new Date("2021-08-08T15:25:09.815Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        },
        {
            "title": "Pintado en Gel",
            "startTime": new Date("2021-08-08T18:00:33.977Z"),
            "endTime": new Date("2021-08-08T18:25:33.977Z"),
            "allDay": false,
            "desc": "Ariel Solano"
        }
      ]
    };
    this.filteredProviders = this.providers;
  }

  setProviderByCategory(filteredProviders) {
    this.filteredProviders = filteredProviders;
    this.setProviders(filteredProviders);
  }

  setProviders(providersArray) {
    let i = 0;
    this.categories.forEach((category) => {
      this.providersByCategory[i] = providersArray.filter(
        (e) => e.category == category
      );
      i++;
    });
  }

  setAppointment(provider){
    // provider.events.forEach(element => {
    //   let start = element.startTime;
    //   let end = element.endTime  
    //   element.startTime = new Date(start);
    //   element.endTime = new Date(end);
    // });
    // let start = provider.startTime;
    // let end = provider.endTime
    let transferData = {
      events: provider.events ,
      serviceDuration: this.service.duration,
      serviceName: this.service.serviceName,
      startHour: '9:00 AM',
      endHour: '10:00 PM',
    }
    this.navCtrl.navigateForward('/scheduler', {state: transferData});
  }
}
