import { Component } from '@angular/core';
import { User, UserServiceService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  constructor(private userService : UserServiceService,private toastr : ToastrService,private router : Router){

  }
  searchUserInput='';
  NumberofTask=0;
  
  users: User[]=[];
  


  ngOnInit(): void {
    this.loadUsers();
    }

  onDelete(userId:number){
    if(confirm("Do you want to delete this user?")){
      this.userService.deleteUser(userId).subscribe((data: any) =>{
      this.toastr.success("success");
        this.loadUsers();
    })
    }
  }

  onEdit(userId:number){
    this.router.navigate(['admin/user-edit/',userId])
  }

  loadUsers(){
    this.userService.getUsers().subscribe((data: any) =>{
      this.users=data;
  })
  }

}
