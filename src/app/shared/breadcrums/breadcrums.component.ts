import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnInit {

  public titulo: string = ''; 
  constructor( private router: Router ) {
    this.getArgumentosRuta();

   }

  ngOnInit(): void {
  }

  getArgumentosRuta(){
    this.router.events.pipe( 
       filter( (event: any ) => event instanceof ActivationEnd ),
       filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ), 
       map( (event: ActivationEnd) => event.snapshot.data ))
      .subscribe( data => {
        console.log(data);
        this.titulo = data.titulo;
        document.title = `AdminPro-${data.titulo}`;
    })
  }

}
