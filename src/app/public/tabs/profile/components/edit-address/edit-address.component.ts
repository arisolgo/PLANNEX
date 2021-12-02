import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PutService } from 'src/app/core/services/put.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  provider;

  address = {
    direccion1: '',
    direccion2: '',
  };

  constructor(
    private putService: PutService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log('PROVIDER', this.provider);
    this.setDirecciones();
    console.log('Address', this.address);
  }

  setDirecciones() {
    this.address.direccion1 = this.provider.Direccion1;
    this.address.direccion2 = this.provider.Direccion2;
  }

  setDireccion1(event) {
    this.address.direccion1 = event.detail.value;
  }
  setDireccion2(event) {
    this.address.direccion2 = event.detail.value;
  }

  update() {
    this.provider.Direccion1 = this.address.direccion1;
    this.provider.Direccion2 = this.address.direccion2;
    console.log('PROVIDER', this.provider);
    this.putService.updateProvider(this.provider).subscribe(
      (response: Response) => {},
      (error) => {
        console.log(error);
      }
    );
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
