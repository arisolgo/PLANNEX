import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-selection',
  templateUrl: './payment-selection.component.html',
  styleUrls: ['./payment-selection.component.scss'],
})
export class PaymentSelectionComponent {
  constructor(private modalController: ModalController) {}
  @ViewChild('paymentRadioGroup') radioGroup: IonRadioGroup;
  parentPayment;
  paymentSelected: string = '';

  ionViewDidEnter() {
    if (this.parentPayment != '0') {
      this.radioGroup.value = this.parentPayment;
    }
  }

  close(paymentSelected?: string) {
    if (paymentSelected != this.parentPayment) {
      this.modalController.dismiss(paymentSelected);
    } else {
      this.modalController.dismiss();
    }
  }
  showSelected(event) {
    this.paymentSelected = event.detail.value;
  }
}
