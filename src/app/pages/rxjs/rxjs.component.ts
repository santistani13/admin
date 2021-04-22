import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
  
    //this.retornaObservable().subscribe(
      //valor => console.log('Subs: ', valor),
     // err => console.warn('Error', err),
   //);
  this.intervalSubs =  this.retornaInterval().subscribe( console.log );
  
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
  ngOnInit(): void {
  }


  retornaInterval(): Observable<number>{

    const interval$ = interval(500).pipe(map( valor => valor + 1),
                                         filter( valor => ( valor % 2 === 0 ) ? true : false  ));
                                        // take(10) 

    return interval$;
  }

  retornaObservable():Observable<number>{
    let i = -1; 

    const obs$ = new Observable<number>((observer) => {

      const intervalo = setInterval( () => {
         
        i++;
        observer.next(i);

        if( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }
        if ( i === 2 ){
          observer.error('I ha llegado a 2');
        }
     

      }, 1000 );
    });

   return obs$; 
  }
}
