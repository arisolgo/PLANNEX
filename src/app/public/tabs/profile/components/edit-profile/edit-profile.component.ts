import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  constructor(public modalController: ModalController) { }
  
  userList:any[]=[{
    name:"Ariel",
    last_name:"Gonzalez Batista",
    profile_pic: "/assets/avatar.png",
    role:"client",
    mail:"ariel@xyz.com",
    phone:"8099900000",
    birthday:"10-06-1999",
    citas_realizadas:34,
    citas_premiadas:5
    }]

  ngOnInit() {}

}
