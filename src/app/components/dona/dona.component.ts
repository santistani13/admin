import { Component, OnInit, Input, Output } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo : string = "";

  @Input('labels1') doughnutChartLabels: Label[] = [];

  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public colors: Color[] = [
    { backgroundColor: [ '#9E120E', '#FF5800', '#FFB414' ] }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
