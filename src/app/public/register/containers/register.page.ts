import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonRadioGroup, ModalController, NavController } from '@ionic/angular';
// import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';
import { forkJoin, Observable } from 'rxjs';
import { Response } from 'src/app/core/models/models';
import { TiposService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';
import { PutService } from 'src/app/core/services/put.service';
import { UiService } from 'src/app/core/services/ui.service';
import { MapsComponent } from 'src/app/core/shared/components/maps/maps.component';
import * as sectores from '../../../../assets/json/STODGO_sectores.json';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  validation_messages = {
    nombre: [{ type: 'required', message: 'El nombre es requerido.' }],
    apellido: [{ type: 'required', message: 'El apellido es requerido.' }],
    direccion1: [{ type: 'required', message: 'La dirección es requerida.' }],
    direccion2: [{ type: 'required', message: 'El sector es requerido' }],
    ciudad: [{ type: 'required', message: 'Ciudad es requerida.' }],
    pais: [{ type: 'required', message: 'País es requerido.' }],
    telefono: [{ type: 'required', message: 'Teléfono es requerido.' }],
    celular: [{ type: 'required', message: 'Celular es requerido.' }],
    sexo: [{ type: 'required', message: 'El sexo es requerido.' }],
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Email no válido.' },
    ],
    password: [
      { type: 'required', message: 'El password es requerido.' },
      { type: 'minlength', message: 'Minimo 5 caracteres.' },
    ],
  };
  countries = [{ id: 1, name: 'República Dominicana' }];
  selectedRole = 0;
  tipos = [];
  chosenTypes = [];
  currentSectors = [];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
    private uiService: UiService,
    private modalCtrl: ModalController,
    private tipoService: TiposService,
    private postService: PostService,
    private putService: PutService,
    private httpClient: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([Validators.required])),
      apellido: new FormControl('', Validators.compose([Validators.required])),
      direccion1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      direccion2: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      ciudad: new FormControl('', Validators.compose([Validators.required])),
      pais: new FormControl('', Validators.compose([Validators.required])),
      telefono: new FormControl('', Validators.compose([Validators.required])),
      celular: new FormControl('', Validators.compose([Validators.required])),
      sexo: new FormControl('', Validators.compose([Validators.required])),

      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  loadSectors() {
    return new Promise(() => {
      this.httpClient
        .get('../../../../assets/json/STODGO_sectores.json')
        .subscribe((result: any) => {
          this.currentSectors = result;
        });
    });
  }

  ionViewWillEnter() {
    this.loadSectors();
  }

  ngOnInit() {
    this.tipoService.getApiTipos().subscribe((result: Response) => {
      this.tipos = result.result;
    });
  }

  register(userData) {
    if (this.selectedRole == 1) {
      this.authService
        .createClient({
          email: userData.email,
          password: userData.password,
          nombres: userData.nombre,
          apellidos: userData.apellido,
          direccion1: userData.direccion1,
          direccion2: userData.direccion2,
          ciudad: userData.ciudad,
          pais: userData.pais,
          latitud: 0,
          longitud: 0,
          telefono: userData.telefono.toString(),
          celular: userData.celular.toString(),
          sexo: userData.sexo,
          status: 1,
          role: this.selectedRole,
        })
        .subscribe(
          (response: Response) => {
            console.log(response.result);
            this.navCtrl.navigateBack('/login');
          },
          (errorResponse) => {
            console.log(errorResponse);
            if (
              errorResponse.error.errorMessages[0].includes(
                'System.ArgumentException: Ya existe una cuenta con correo'
              )
            ) {
              this.uiService.presentAlert(
                'Ya existe un usuario con correo ' + userData.email,
                'Cuenta Duplicada'
              );
            }
          }
        );
    } else if (this.selectedRole == 2) {
      this.authService
        .createProvider({
          email: userData.email,
          password: userData.password,
          nombres: userData.nombre,
          apellidos: userData.apellido,
          direccion1: userData.direccion1,
          direccion2: userData.direccion2,
          ciudad: userData.ciudad,
          pais: userData.pais,
          latitud: 0,
          longitud: 0,
          telefono: userData.telefono.toString(),
          celular: userData.celular.toString(),
          sexo: userData.sexo,
          status: 1,
          emailConfirmed: 1,
          role: this.selectedRole,
        })
        .subscribe(
          (response: Response) => {
            this.chosenTypes.forEach((element) => {
              this.postService
                .createProviderType({
                  proveedorId: response.result.id,
                  tipoId: element,
                  creatorUserId: response.result.id,
                })
                .subscribe(() => {
                  console.log('Proveedor tipo creado');
                });
            });
            this.pickUpLocation(response.result);
          },
          (errorResponse) => {
            if (
              errorResponse.error.errorMessages[0].includes(
                'System.ArgumentException: Ya existe una cuenta con correo'
              )
            ) {
              this.uiService.presentAlert(
                'Ya existe un usuario con correo ' + userData.email,
                'Cuenta Duplicada'
              );
            }
          }
        );
    }
  }

  setRole(event) {
    this.selectedRole = event.detail.value;
    console.log(this.selectedRole);
  }

  async pickUpLocation(newUser) {
    const modal = await this.modalCtrl.create({
      component: MapsComponent,
      componentProps: {
        newProvider: newUser,
      },
    });

    await modal.present();

    modal.onWillDismiss().then((modal) => {
      if (modal.data) {
        this.putService.updateProvider(modal.data).subscribe(() => {
          this.navCtrl.navigateBack('/login');
        });
      }
    });
  }
}
