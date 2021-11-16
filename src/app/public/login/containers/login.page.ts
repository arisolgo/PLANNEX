import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Response } from 'src/app/core/models/models';
import { UserService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { Storage } from '@capacitor/storage';

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
    private authService: AuthService
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
    this.authService
      .login({ email: credentials.email, password: credentials.password })
      .subscribe(
        (response: Response) => {
          this.errorMessage = '';
          // const currentUser = JSON.parse(
          //   (await Storage.get({ key: 'currentUser' })).value
          // );
          console.log(response);
          if (this.authService.loggedUser.value.Role == 1)
            this.navCtrl.navigateForward('/tabs/home');
          else {
            this.navCtrl.navigateForward('/tabs/calendar');
          }
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Usuario y/o contraseña incorrectos.';
        }
      );
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
