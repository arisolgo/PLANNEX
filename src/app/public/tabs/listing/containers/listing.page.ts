import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProveedorTiposService } from 'src/app/core/services/api/services/proveedor-tipos.service';
import { TiposService } from 'src/app/core/services/api/services';
import { ProveedoresService } from 'src/app/core/services/api/services';
import { switchMap } from 'rxjs/operators';
import { Provider, ProviderTipo, Response } from 'src/app/core/models/models';
import { zip } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage {
  providers: Provider[] = [];
  tipos: any[];
  tipoId = null;
  providersIds: number[] = [];
  filterTerm;
  constructor(
    private router: Router,
    public navCtrl: NavController,
    private proveedorTipoService: ProveedorTiposService,
    private tipoService: TiposService,
    private providerService: ProveedoresService,
    private activatedRoute: ActivatedRoute
  ) {
    // console.log(router.getCurrentNavigation().extras.state);
    // if (router.getCurrentNavigation().extras.state) {
    //   this.tipoId = this.router.getCurrentNavigation().extras.state.id;
    //   console.log(this.tipoId);
    // }
  }

  ionViewWillEnter() {
    this.tipoId = this.activatedRoute.snapshot.paramMap.get('tipoId');
    this.providers = [];
    if (this.tipoId) {
      this.getProvidersByType();
      this.getTipos();
    } else {
      this.getAllProviders();
    }
  }

  getTipos() {
    this.tipoService.getApiTipos().subscribe((response: any) => {
      console.log(response.result);
      this.tipos = response.result;
    });
  }

  getAllProviders() {
    this.providerService.getApiProveedores().subscribe((result: Response) => {
      this.providers = result.result;
    });
  }

  getProvidersByType() {
    this.providers = [];
    this.proveedorTipoService
      .getApiProveedorTiposTipoIdGetProveedorTipoByTipoId(this.tipoId)
      .subscribe((response: Response) => {
        response.result.forEach((element: ProviderTipo) => {
          this.providerService
            .getApiProveedoresId(element.proveedorId)
            .subscribe((response: Response) => {
              this.providers.push(response.result);
            });
        });
      });
  }

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
