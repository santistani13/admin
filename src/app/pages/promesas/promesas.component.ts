import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then((users) => {
      console.log(users);
    })
  }

  getUsers(){

    return new Promise((resolve) => {

      fetch('https://reqres.in/api/users')
       .then((users) => {
             users.json()
                     .then( body => resolve(body.data));
      })
    });

  }

}
