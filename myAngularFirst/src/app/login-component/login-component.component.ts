import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {

  loginForm :FormGroup;
  logInData : any;

  constructor(private fb : FormBuilder,private router : Router,private authorizationservice :AuthorizationService,private toastr : ToastrService)
  {
    this.loginForm =this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  
  onLogIn(){
    this.logInData = this.loginForm.value; 
    this.authorizationservice.logInUser(this.logInData).subscribe(data => {
      localStorage.setItem("token",data);
      this.router.navigate(['/admin/tasks'])
    },error => {
      this.toastr.error("err")
    }
  )    
  }


}
