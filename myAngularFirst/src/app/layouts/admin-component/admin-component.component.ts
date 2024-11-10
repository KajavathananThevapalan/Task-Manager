import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponentComponent {

  constructor(private router: Router){

  }

  OnLogOut(){
    localStorage.removeItem("token");
    this.router.navigate([''])
  }
}
