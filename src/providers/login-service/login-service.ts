
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../shared/config';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../shared/user';
import { Events, ToastController } from 'ionic-angular/umd';


interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

@Injectable()
export class LoginServiceProvider {

  tokenKey: string = 'JWT';
 private isAuthenticated: boolean = false;
  username: string;
  authToken: string = undefined;
  constructor(public http: HttpClient,
  public event:Events) {
       console.log('Hello LoginServiceProvider Provider');
    this.loadUserCredentials();
  }

  private loadUserCredentials() {
    let credentials = JSON.parse(localStorage.getItem('TOKEN') || '{}');
    /* this.storage.get(environment.TOKEN_KEY).then(credentials => {
      
    }); */
    if (credentials) {
      if (credentials.token != undefined) {
        console.log("EsTa funcionando");
        this.isAuthenticated = true;
        //this.useCredentials(credentials);

      }
    } else
      console.log('Revisar!! no guarda usuario')
  }
  private storeUserCredentials(credentials) {
    localStorage.setItem('TOKEN', JSON.stringify(credentials));
    this.useCredentials(credentials);
  }
  private useCredentials(credentials) {
    this.isAuthenticated = true;
    this.username = credentials.usuario;
  }
  private destroyUserCredentials() {
    this.username = '';
    this.isAuthenticated = false;
    this.authToken = undefined;
    localStorage.removeItem('TOKEN');
  }
  logout() {

    this.destroyUserCredentials();
  }
  register(userData:Usuario){
    return this.http.post(baseUrl+'users/signup',userData);
  }
  login(userData){
    console.log(userData);
    this.http.post<AuthResponse>(baseUrl+'users/login',userData).subscribe(
      (usuario) => {
        console.log(usuario);
        let newCredentials={
          username:userData.username,
          token:usuario.token
        }
        this.storeUserCredentials(newCredentials)
        this.event.publish('user:Created',newCredentials, Date.now());
      },
      (error) => { console.log("LLL", error); }
      //let toast = this.ToastController.create({

      //})
    );
  }
  IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  //aun no se guarda el username.
  getUsername() {
    return this.username;
  };
  logOutFunction() {
    this.destroyUserCredentials();
  };
}