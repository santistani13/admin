import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/loginForm.interface';
import { tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';

const base_url = environment.base_url; 
declare const gapi: any ; 

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any; 
  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {
    this.googleInit(); 
   }
 
  crearUsuario( formData: RegisterForm ){
    return this.http.post( `${ base_url }/usuarios`, formData ); 
  }
    
  logIn( formData: loginForm  ){
    return this.http.post( `${ base_url }/login`, formData ); 
  }
 loginGoogle( token: string ){
  return this.http.post( `${ base_url }/login/google`, { token } ).pipe(tap( (resp: any) => {
    localStorage.setItem( 'token', resp.token )
  } )); 
 }

 logOut(){
   localStorage.removeItem('token'); 
   this.auth2.signOut().then( () => {
     this.ngZone.run( () =>{
      this.router.navigateByUrl('/login'); 
      console.log('Cerraste sesion '); 
     } ); 
       
   } )
 }
 googleInit(){
  gapi.load('auth2', () => {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    this.auth2 = gapi.auth2.init({
      client_id: '81325541145-rraivbsj5bruaofid3bptmfeqend5rh6.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin'
    });
  });
 }

}
