import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService, Address } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit{
  userForm: FormGroup;
  userId:number;
  isEditMode = false;

  constructor(private fb: FormBuilder,private userService: UserServiceService,private route : ActivatedRoute, private router: Router , private toastr : ToastrService) {
    const editId = Number(this.route.snapshot.paramMap.get("id"));
    
    if(editId){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }

    this.userId = editId;

    this.userForm = this.fb.group({
      name: ['',[Validators.required]],
      email: [''],
      password: ['',[Validators.required]],
      phone: [''],
      address: this.fb.group({
        addressLine1:['',[Validators.required]],
        addressLine2:[''],
        city: ['']
      })
    })

  }

  ngOnInit():void{
    if(this.isEditMode == true){
      this.userService.getUser(this.userId).subscribe(data => {
        console.log(data);
        this.userForm.patchValue({
          id :data.id,
          name :data.name,
          email: data.email,
          password:data.password,
          phone:data.phone,
          address:({

            addressLine1: data.address?.addressLine1,
            addressLine2: data.address?.addressLine2,
            city: data.address?.city
          })

        });
      },error => {
        this.toastr.error("User is not found");
      });
    }  
  }

  onSubmit() {
    let user = this.userForm.value;
    console.log(user);
    
    if(this.isEditMode == true){
      user.id =  this.userId;
      user.address.id = this.userId;
      console.log(user.id);
      this.userService.updateUser(user).subscribe(data => {
          this.toastr.success("User is updated Successfully...")
          this.router.navigate(['/users']);
        }
      )
    }else{
    this.userService.createUser(user).subscribe(data => {
      this.router.navigate(['/users']);
    }
    )
    }

    
  }

}
