import { Component, Input, OnInit } from '@angular/core';
import { ProviderServiciosService } from 'src/app/core/services/api/services';
import { PostService } from 'src/app/core/services/post.service';
import { PutService } from 'src/app/core/services/put.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.scss'],
})
export class EditServicesComponent implements OnInit {
  @Input('provider') provider;
  @Input('providerServices') providerServices;
  @Input('services') services;

  servicesAdded: any[] = [];
  servicesToAdd: any[] = [];

  serviceSelected = {
    id: null,
    serviceId: 0,
    servicePrice: null,
    new: true,
    duration: null,
    providerId: null,
    creatorUserId: null,
  };

  serviceToUpdateSelected = {
    id: null,
    serviceId: 0,
    servicePrice: null,
    new: true,
    duration: null,
    providerId: null,
    creatorUserId: null,
  };

  constructor(
    private putService: PutService,
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(
      'TODA LA INFO:',
      this.services,
      this.provider,
      this.providerServices
    );
    this.setServicesToAdd();
  }

  setServicesToAdd() {
    let registered = false;
    this.services.forEach((service) => {
      this.providerServices.forEach((providerService) => {
        if (service.id === providerService.serviceId) {
          console.log('SERVICE:', service, 'PROVIDER SERVICE', providerService);
          this.servicesAdded.push(service);
        }
      });
    });

    if (this.servicesAdded.length > 0) {
      this.services.forEach((service) => {
        if (!this.servicesAdded.includes(service)) {
          this.servicesToAdd.push(service);
        }
      });
    }
  }

  setUpdatedService(event) {
    let newService = true;
    this.serviceToUpdateSelected.serviceId = event.detail.value;
    this.providerServices.forEach((providerService) => {
      if (providerService.serviceId === event.detail.value) {
        this.serviceToUpdateSelected.id = providerService.id;
        this.serviceToUpdateSelected.servicePrice = providerService.price;
        this.serviceToUpdateSelected.duration = providerService.duration;
        this.serviceToUpdateSelected.providerId = providerService.proveedorId;
        this.serviceToUpdateSelected.creatorUserId =
          providerService.creatorUserId;
        console.log('Servicio SELECCIONADO:', this.serviceSelected);
        newService = false;
      }
    });

    this.serviceToUpdateSelected.new = newService;
  }

  setService(event) {
    let newService = true;
    this.serviceSelected.serviceId = event.detail.value;
    this.serviceSelected.new = newService;
  }

  setServicePrice(event) {
    this.serviceSelected.servicePrice = event.detail.value;
  }

  setServiceDuration(event) {
    this.serviceSelected.duration = event.detail.value;
  }

  setServiceToUpdatePrice(event) {
    this.serviceToUpdateSelected.servicePrice = event.detail.value;
  }

  setServiceToUpdateDuration(event) {
    this.serviceToUpdateSelected.duration = event.detail.value;
  }

  updateSave() {
    console.log(
      'TO UPDATE/CREATE',
      this.serviceSelected,
      this.serviceToUpdateSelected
    );

    if (this.serviceToUpdateSelected.id) {
      console.log('UPDATING');
      this.putService
        .updateProviderService({
          id: this.serviceToUpdateSelected.id,
          price: this.serviceToUpdateSelected.servicePrice,
          proveedorId: this.serviceToUpdateSelected.providerId,
          serviceId: this.serviceToUpdateSelected.serviceId,
          creatorUserId: this.serviceToUpdateSelected.creatorUserId,
          duration: this.serviceToUpdateSelected.duration,
        })
        .subscribe(
          (response: Response) => {},
          (error) => {
            console.log(error);
          }
        );
    }
    if (this.serviceSelected.serviceId) {
      console.log('CREATING');
      this.postService
        .createProviderService({
          price: this.serviceSelected.servicePrice,
          proveedorId: this.provider.Id,
          serviceId: this.serviceSelected.serviceId,
          creatorUserId: this.provider.Id,
          duration: this.serviceSelected.duration,
        })
        .subscribe(
          (response: Response) => {},
          (error) => {
            console.log(error);
          }
        );
    }

    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
}
