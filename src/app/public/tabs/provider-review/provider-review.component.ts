import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { zip } from 'rxjs';
import { ProviderReview } from 'src/app/core/models/models';
import { ProveedoresService } from 'src/app/core/services/api/services';
import { PostService } from 'src/app/core/services/post.service';
import { PutService } from 'src/app/core/services/put.service';

@Component({
  selector: 'app-provider-review',
  templateUrl: './provider-review.component.html',
  styleUrls: ['./provider-review.component.scss'],
})
export class ProviderReviewComponent implements OnInit {
  client;
  scheduledService;
  providerName;
  @ViewChild('rating') rating: any;
  constructor(
    private modalController: ModalController,
    private proveedorService: ProveedoresService,
    private postService: PostService,
    private putService: PutService
  ) {}

  providerReview: ProviderReview = {
    proveedorId: 0,
    clienteId: 0,
    serviceRating: 0,
    comentario: '',
    scheduledServiceId: 0,
  };

  ngOnInit() {
    this.setClientProvider();
  }

  setClientProvider() {
    console.log(this.client);
    console.log(this.scheduledService);
    console.log(this.providerName);
    this.providerReview.clienteId = this.scheduledService.clientId;
    this.providerReview.proveedorId = this.scheduledService.providerId;

    console.log(this.providerReview);
  }

  setComentario(event) {
    this.providerReview.comentario = event.detail.value;
  }

  createReview() {
    this.providerReview.scheduledServiceId = this.scheduledService.id;
    console.log('antes de enviar', this.providerReview);
    this.postService.createProviderReview(this.providerReview).subscribe(() => {
      console.log('Calificado');
    });
  }

  close(skip?: boolean) {
    if (skip) {
      this.providerReview.serviceRating = 4;
      this.providerReview.comentario = 'Que malo! Jesu!';
    }
    this.createReview();
    this.modalController.dismiss();
  }

  setRating(event) {
    this.providerReview.serviceRating = event.detail.value;
  }
}
