import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProveedorTiposService } from 'src/app/core/services/api/services/proveedor-tipos.service';
import { TiposService } from 'src/app/core/services/api/services';
import { ProveedoresService } from 'src/app/core/services/api/services'; 
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  providers: any = [];
  tipos: any [];
  tipoId = null;
  providersIds :any [];
  filterTerm;
  constructor(
    private router: Router, 
    public navCtrl: NavController, 
    private proveedorTipoService: ProveedorTiposService, 
    private tipoService: TiposService,
    private providerService: ProveedoresService) {
      console.log(router.getCurrentNavigation().extras.state);
    if (router.getCurrentNavigation().extras.state) {
      
      this.tipoId =
        this.router.getCurrentNavigation().extras.state.id;
    }
  }

  ngOnInit() {
    this.getProvidersByType();
    this.getTipos();
    
    //this.filterProvider(this.tipoId);
  }

  getTipos(){
    
  this.tipoService.getApiTipos().subscribe((response:any)=> {
    console.log(response.result);
    this.tipos = response.result;
    
  });
  }
  getProvidersByType(){
    console.log("REST1:",this.tipoId);
    this.proveedorTipoService.getApiProveedorTiposTipoIdGetProveedorTipoByTipoId(this.tipoId)
    .pipe(
      
      switchMap((proveedorTipos: any) => proveedorTipos.result.forEach(element => {
        
        this.providerService.getApiProveedoresId(element.proveedorId).subscribe((response:any) =>{
          this.providers.push(response.result)
        })
        //console.log("TEST",this.providerService.getApiProveedoresId(element.proveedorId))
       //this.providersIds.push(element.proveedorId)
       //console.log("PROVEEDOR:", this.getProvider(element.proveedorId))
      }))).subscribe(response=>console.log("RESPONSE:",response))
      
      //this.getProviders()
     // this.proveedorTipoService.getApiProveedorTiposTipoIdGetProveedorTipoByTipoId(this.tipoId).subscribe(response => console.log(response))
  }


  getProviders() {
    this.providersIds.forEach(element => {
      this.providerService.getApiProveedoresId(element).subscribe((response:any) =>{
        this.providers.push(response.result)
      })
    })
  }


  
  
  
  proveedoresTest: any[] = [
    {
      display_name: 'La Barbería',
      name: 'La barberia',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      profilePicture: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 1,
      services: [
        {
          serviceName: 'Corte Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Corte Sencillo',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },
    {
      display_name: 'La Barbería 2',
      name: 'La barberia 2',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      image: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 1,
      services: [
        {
          serviceName: 'Corte Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Corte Sencillo',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },

    {
      display_name: 'El Salón 3',
      name: 'La barberia 3',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      image: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 2,
      services: [
        {
          serviceName: 'Lavado Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Recorte Fenenino',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },
   
  ];
  

  filterProvider(tipoId) {
    if (tipoId) {
      this.tipos = this.tipos.filter((e) => e.tipoId == tipoId);
    }
  }

  //item: any = this.business.find(x => x.id === this.id_t);

  goToDetailPage(proveedor) {
    this.navCtrl.navigateForward('/business-detail', { state: proveedor });
  }
}
