import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'; 

declare const gapi: any ; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public auth2: any; 
  public formSubmitted = false; 
 public loginForm = this.fb.group({
   email: [ localStorage.getItem('email') || '', Validators.required ],
   password: [ '',[ Validators.required, Validators.email] ],
   remember: [ false ]
 }); 
  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuariosService,
              private ngZone: NgZone ) { }

  ngOnInit(): void {
    this.renderButton(); 
  }

  logIn(){
    this.formSubmitted = true; 
    this.usuarioService.logIn( this.loginForm.value ).subscribe( res => {
      console.log(res);
      if( this.loginForm.get('remember')?.value ){
        localStorage.setItem('email', this.loginForm.get('email')?.value);
      }else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error'); 
    }  )
    
  
  } 

  
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp(); 
  }
   startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '81325541145-rraivbsj5bruaofid3bptmfeqend5rh6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin( document.getElementById( "my-signin2") );
    });
  };

   attachSignin( element: any ) {
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) =>  {
          const id_token = googleUser.getAuthResponse().id_token; 
          console.log(id_token); 
          this.usuarioService.loginGoogle( id_token ).subscribe( resp => {
            localStorage.setItem('token', id_token);
            this.ngZone.run( () => {
              this.router.navigateByUrl('/');
            } ); 
          } ); 
        
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}


//const id_token = googleUser.getAuthResponse().id_token;   