import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Provider, Response } from 'src/app/core/models/models';
import { ProveedoresService } from 'src/app/core/services/api/services';
import { PutService } from 'src/app/core/services/put.service';
import * as sectores from '../../../../../../assets/json/STODGO_sectores.json';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  provider;
  currentProvider: Provider;
  address = {
    direccion1: '',
    direccion2: '',
    ciudad: '',
    pais: '',
  };
  currentSectors = [];

  constructor(
    private putService: PutService,
    private modalController: ModalController,
    private providerService: ProveedoresService,
    private httpClient: HttpClient
  ) {}

  loadSectors() {
    return new Promise(() => {
      this.httpClient
        .get('../../../../assets/json/STODGO_sectores.json')
        .subscribe((result: any) => {
          this.currentSectors = result;
        });
    });
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.loadSectors();
    this.getCurrentProvider();
    console.log('PROVIDER', this.provider);
    this.setDirecciones();
    console.log('Address', this.address);
  }

  setDirecciones() {
    this.address.direccion1 = this.provider.Direccion1;
    this.address.direccion2 = this.provider.Direccion2;
    this.address.ciudad = this.provider.Ciudad;
    this.address.pais = this.provider.Pais;
  }

  setDireccion1(event) {
    this.address.direccion1 = event.detail.value;
  }
  setDireccion2(event) {
    this.address.direccion2 = event.detail.value;
  }
  setCiudad(event) {
    this.address.ciudad = event.detail.value;
  }

  getCurrentProvider() {
    this.providerService
      .getApiProveedoresId(this.provider.Id)
      .subscribe((result: Response) => {
        this.currentProvider = result.result;
      });
  }

  update() {
    this.currentProvider.direccion1 = this.address.direccion1;
    this.currentProvider.direccion2 = this.address.direccion2;
    this.putService.updateProvider(this.currentProvider).subscribe(
      (response: Response) => {},
      (error) => {
        console.log(error);
      }
    );
    this.close(this.currentProvider);
  }

  close(params?) {
    if (params) this.modalController.dismiss(params);
    else {
      this.modalController.dismiss();
    }
  }
  onClick() {
    console.log(this.address);
  }
}
