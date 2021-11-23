import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { UiService } from 'src/app/core/services/ui.service';
import { PutService } from 'src/app/core/services/put.service';
import { PostService } from 'src/app/core/services/post.service';
import { Storage } from '@ionic/storage';
import { Response } from 'src/app/core/models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.scss'],
})
export class EditAvailabilityComponent implements OnInit {
  @Input('provider') provider;
  @Input('availabilities') availabilities;

  availabilitySchema = [
    {
      id: 0,
      dia: 0,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Domingo',
      works: false,
    },
    {
      id: 0,
      dia: 1,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Lunes',
      works: false,
    },
    {
      id: 0,
      dia: 2,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Martes',
      works: false,
    },
    {
      id: 0,
      dia: 3,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Miércoles',
      works: false,
    },
    {
      id: 0,
      dia: 4,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Jueves',
      works: false,
    },
    {
      id: 0,
      dia: 5,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Viernes',
      works: false,
    },
    {
      id: 0,
      dia: 6,
      horaDesde: null,
      horaHasta: null,
      horaDesdeF: new Date().toISOString(),
      horaHastaF: new Date().toISOString(),
      name: 'Sábado',
      works: false,
    },
  ];
  availabilityForm: FormGroup;
  errorMessage = '';
  validation_messages = {
    lunesHoraDesde: [{ type: 'required', message: 'Hora Desde Requerida' }],
    lunesHoraHasta: [{ type: 'required', message: 'Hora Hasta Requerida' }],
  };
  selectedRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private uiService: UiService,
    private putService: PutService,
    private postService: PostService,
    private datepipe: DatePipe,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log('PROVEEDOR:', this.provider);
    console.log('DISPONIBILIDAD:', this.availabilities);
    this.setAvailabilitySchema();
  }

  setAvailabilitySchema() {
    console.log('ENTRO AL SCHEMA');
    this.availabilitySchema.forEach((day) => {
      this.availabilities.forEach((element) => {
        if (element.dia === day.dia) {
          day.works = true;
          day.id = element.id;
          day.horaDesde = element.horaDesde;
          day.horaHasta = element.horaHasta;

          day.horaDesdeF = new Date(day.horaDesde).toISOString();
          day.horaHastaF = new Date(day.horaHasta).toISOString();

          console.log('ELEMENT: ', element, 'DAY:', day);
        } else if (!day.works) {
          day.horaDesdeF = null;
          day.horaHastaF = null;
        }
      });
    });
  }

  setStart(event, day) {
    console.log('MONDAY START:', event.detail.value);
    this.availabilitySchema[day].horaDesde = event.detail.value;
    console.log('SCHEMA:', this.availabilitySchema);
  }

  setEnd(event, day) {
    console.log('MONDAY START:', event.detail.value);
    this.availabilitySchema[day].horaHasta = event.detail.value;
    console.log('SCHEMA:', this.availabilitySchema);
  }

  update() {
    console.log('AVAILABILITY SCHEMA:', this.availabilitySchema);

    this.availabilitySchema.forEach((element) => {
      if (element.works) {
        console.log('Proveedor PUT:', this.provider);

        let availability = {
          id: element.id,
          proveedorId: this.provider.Id,
          dia: element.dia,
          horaDesde: new Date(element.horaDesde),
          horaHasta: new Date(element.horaHasta),
        };
        this.putService
          .updateAvailability(availability)
          .subscribe((response: Response) => {
            console.log('TRYING TO UPDATE', response.result);
          });
      } else if (!element.works && element.horaDesde && element.horaHasta) {
        console.log('ELSE IF');

        console.log('Proveedor POST:', this.provider);

        this.postService
          .createAvailability({
            proveedorId: this.provider.Id,
            dia: element.dia,
            horaDesde: element.horaDesde,
            horaHasta: element.horaHasta,
          })
          .subscribe(
            (response: Response) => {
              console.log('TRYING TO POST', response.result);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });

    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
