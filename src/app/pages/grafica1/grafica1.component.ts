import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1: string[] = ['Pan', 'Mermelada', 'Cafe'];

  public data = [
    [10, 23, 59]
  ];




  constructor() { }

  ngOnInit(): void {
  }

}
