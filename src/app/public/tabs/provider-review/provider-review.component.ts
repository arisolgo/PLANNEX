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
  };

  ngOnInit() {
    this.setClientProvider();
  }

  setClientProvider() {
    console.log(this.client);
    console.log(this.scheduledService);
    console.log(this.providerName);
    this.providerReview.clienteId = this.client.Id;
    this.providerReview.proveedorId = this.providerReview.proveedorId;

    console.log(this.providerReview);
  }

  setComentario(event) {
    this.providerReview.comentario = event.detail.value;
  }

  setRating(event) {
    this.providerReview.serviceRating = event.detail.value;
  }

  createReview() {
    this.scheduledService.rating = this.providerReview.serviceRating;
    zip(
      this.postService.createProviderReview(this.providerReview),
      this.putService.updateScheduledService(this.scheduledService)
    ).subscribe(() => {
      console.log('Calificado');
    });
  }

  close() {
    console.log(this.providerReview);
    this.providerReview.serviceRating = 4;
    this.createReview();
    this.modalController.dismiss();
  }
}
