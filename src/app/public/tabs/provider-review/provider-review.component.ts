import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ProveedoresService } from 'src/app/core/services/api/services';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-provider-review',
  templateUrl: './provider-review.component.html',
  styleUrls: ['./provider-review.component.scss'],
})
export class ProviderReviewComponent implements OnInit {
  @Input('client') client;
  @Input('scheduledService') scheduledService;
  @Input('providerName') providerName;
  @ViewChild('rating') rating: any;
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private proveedorService: ProveedoresService,
    private postService: PostService
  ) {}

  providerReview = {
    proveedorId: 0,
    clienteId: 0,
    serviceRating: 0,
    reviewDate: new Date(),
    comentario: '',
  };

  ngOnInit() {
    this.setClientProvider();
  }

  setClientProvider() {
    this.providerReview.clienteId = this.client.Id;
    this.providerReview.proveedorId = this.providerReview.proveedorId;
    this.providerReview = this.providerName;
  }

  setComentario(event) {
    this.providerReview.comentario = event.detail.value;
  }

  setRating(event) {
    this.providerReview.serviceRating = event.detail.value;
  }

  createReview() {
    this.postService.createProviderReview(this.providerReview);
  }

  close() {
    this.modalController.dismiss();
  }
}
