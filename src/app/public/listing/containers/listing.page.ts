import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  filterTerm: string

  constructor(private router: Router) { }

  


  
  business:any[]=[{
    id:1,
    display_name:"La Barbería",
    name:"la barberia",
    address:"Ave. 27 de Febrero #45, esq. Abraham Lincoln.",
    image: "https://via.placeholder.com/150 ",
    rating:4.8,
    category:"barberia",
    phone:"8099900000",
    days_hours:"Lunes-Viernes 8:00 AM - 7:00 PM"
    },
    {
      id:2,
      display_name:"El Salón",
      name:"el salon",
      address:"Ave. 27 de Febrero #45, esq. Abraham Lincoln.",
      image: "https://via.placeholder.com/150",
      rating:4.8,
      category:"salon",
      phone:"8099900000",
      days_hours:"Lunes-Viernes 8:00 AM - 7:00 PM"
      },
      {
        id:3,
        display_name:"La Barbería #2",
        name:"la barberia 2",
        address:"Ave. 27 de Febrero #45, esq. Abraham Lincoln.",
        image: "https://via.placeholder.com/150",
        rating:4.8,
        category:"barberia",
        phone:"8099900000",
        days_hours:"Lunes-Viernes 8:00 AM - 7:00 PM"
        }
  ]
  //item: any = this.business.find(x => x.id === this.id_t);
  ngOnInit() {
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }



}

