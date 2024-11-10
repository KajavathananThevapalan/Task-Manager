import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister, UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  isPasswordMatch : boolean = false;
  
  checkPassword(event: any) {
    console.log(event);
    if(this.password == event.target?.value){
      this.isPasswordMatch = true;
    }
  }

  registerForm: FormGroup;
  regUsers: IUserRegister[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserServiceService, private toastr: ToastrService, private authService: AuthorizationService) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      passwordHash: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })

  }
  password! : string;


  onSubmit() {
    // let regUser = this.registerForm.value;
    // console.log(regUser);
    this.registerForm.value.role = parseInt(this.registerForm.value.role);
    console.log(this.isPasswordMatch);
    if (this.isPasswordMatch) {
      this.authService.registerUser(this.registerForm.value).subscribe((data) => { });
      this.router.navigate([''])
    } else {
      this.toastr.info("Check your password");
    }
  }

}
