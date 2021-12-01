import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Response } from 'src/app/core/models/models';
import { ClientesService } from 'src/app/core/services/api/services';
import { PutService } from 'src/app/core/services/put.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    private putService: PutService,
    private clientService: ClientesService
  ) {}
  @Input('currentClient') currentClient: any = {};
  userList: any[] = [
    {
      name: '',
      last_name: '',
      profile_pic: '/assets/avatar.png',
      role: 'client',
      mail: '',
      phone: '',
      birthday: '',
    },
  ];

  setClientInfo() {
    this.clientService
      .getApiClientesId(this.currentClient.Id)
      .subscribe((response: Response) => {
        this.userList[0].name = response.result.nombres;
        this.userList[0].last_name = response.result.apellidos;
        this.userList[0].phone = response.result.celular;
        this.userList[0].mail = response.result.email;
      });
    // this.userList[0].name = this.currentClient.Nombres;
    // this.userList[0].last_name = this.currentClient.Apellidos;
    // this.userList[0].phone = this.currentClient.Celular;
  }

  changeName(event) {
    this.userList[0].name = event.detail.value;
  }
  changeLastName(event) {
    this.userList[0].last_name = event.detail.value;
  }

  changePhone(event) {
    this.userList[0].phone = event.detail.value;
  }

  close(skip?) {
    if (skip) {
      this.update();
    }
    this.modalController.dismiss();
  }

  update() {
    console.log('HERE', this.currentClient.Id);
    this.currentClient.Nombres = this.userList[0].name;
    this.currentClient.Apellidos = this.userList[0].last_name;
    this.currentClient.Celular = this.userList[0].phone;

    console.log('TO-UPDATE', this.currentClient);
    // let updateClient = {
    // id:this.currentClient.Id,
    // nombres:this.userList[0].name,
    // apellidos:this.userList[0].last_name,
    // ciudad:this.currentClient.Ciudad,
    // direccion1: this.currentClient.Direccion1,
    // direccion2: this.currentClient.Direccion2,
    // email: this.currentClient.Email,
    // latitud: this.currentClient.Latitud,
    // longitud: this.currentClient.Longitud,
    // status: this.currentClient.Status,
    // sexo: this.currentClient.Sexo,
    // telefono: this.currentClient.Telefono,
    // celular: this.userList[0].phone,
    // userId: this.currentClient.UserId,
    // }

    this.putService.updateClient(this.currentClient).subscribe(
      (response: Response) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.setClientInfo();
  }
}
