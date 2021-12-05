import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { ModalController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  latitude: number;
  longitude: number;

  newProvider;
  isNew: boolean = false;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    console.log(this.newProvider);
    this.isNew =
      this.newProvider.latitud == 0 && this.newProvider.longitud == 0;
    this.loadMap();
  }
  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        let latLng = this.isNew
          ? new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
          : new google.maps.LatLng(
              this.newProvider.latitud,
              this.newProvider.longitud
            );

        let mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        if (this.isNew)
          this.getAddressFromCoords(
            resp.coords.latitude,
            resp.coords.longitude
          );

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        if (!this.isNew) {
          this.addProviderLocMarker();
          this.getAddressFromCoords(
            this.newProvider.latitud,
            this.newProvider.longitud
          );
        } else {
          this.map.addListener('dragend', () => {
            this.latitude = this.map.center.lat();
            this.longitude = this.map.center.lng();

            this.getAddressFromCoords(
              this.map.center.lat(),
              this.map.center.lng()
            );
          });
        }
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  addProviderLocMarker() {
    return new google.maps.Marker({
      position: {
        lat: this.newProvider.latitud,
        lng: this.newProvider.longitud,
      },
      map: this.map,
      title: this.newProvider.nombres,
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    if (this.newProvider) {
      this.newProvider.latitud = lattitude;
      this.newProvider.longitud = longitude;
    }

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Dirección no disponible';
      });
  }

  close(success?) {
    if (success) {
      this.modalController.dismiss(this.newProvider);
    } else {
      this.modalController.dismiss();
    }
  }
}
