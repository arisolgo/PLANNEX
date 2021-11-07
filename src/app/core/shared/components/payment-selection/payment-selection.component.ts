import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-selection',
  templateUrl: './payment-selection.component.html',
  styleUrls: ['./payment-selection.component.scss'],
})
export class PaymentSelectionComponent implements OnInit {
  constructor(private modalController: ModalController) {}
  paymentSelected: string = '';
  ngOnInit() {}

  close(paymentSelected?: string) {
    this.modalController.dismiss(paymentSelected);
  }
  showSelected(event) {
    this.paymentSelected = event.detail.value;
  }
}
