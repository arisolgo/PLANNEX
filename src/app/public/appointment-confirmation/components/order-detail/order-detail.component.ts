import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {

  constructor() { }
  order:any={
    provider_name:"Julián Encarncación",
    business_category:"Barbería",
    business_name: "La barbería #1",
    date:"09/08/2021",
    start_time:"6:00 PM",
    services:[{
      name: "Corte completo",
      price: 500,
    },{
      name:"Manicure",
      price: 800,
    },]
    }
  ngOnInit() {}

  subTotal(){
    let subTotal = 0;
    this.order.services.forEach((service) => {
    subTotal += service.price;
    });
    return subTotal;
  }

  itbs(){
    return 32;
  }

  Total(){
    
    return this.subTotal() + this.itbs();
  }

}
