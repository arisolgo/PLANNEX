import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/core/services/api/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  validation_messages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'Email no válido.' },
    ],
    password: [
      { type: 'required', message: 'El password es requerido.' },
      { type: 'minlength', message: 'Minimo 5 caracteres.' },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
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

  ngOnInit() {}

  loginUser(credentials) {
    //test@test.com
    //12345
    this.userService.postApiUserLogin().subscribe(
      (result) => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/menu/home');
      },
      (error) => {
        this.errorMessage = 'Login Incorrecto';
      }
    );
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
