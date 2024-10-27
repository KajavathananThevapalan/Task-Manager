import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get<User[]>('http://localhost:5212/api/Users');
  }
  
  createUser(user:any){
    return this.http.post('http://localhost:5212/api/Users',user);
  }
  
  deleteUser(userId:number){
    return this.http.delete('http://localhost:5212/api/Users/'+userId);
  }
  
  getUser(userId:number){
    return this.http.get<User>('http://localhost:5212/api/Users/'+userId);
  }
  
  updateUser(user:any){
    return this.http.put('http://localhost:5212/api/Users/'+user.id,user);
  }
  
  
  
  }
  
  export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    phone:string;
    address?:Address;
    tasks:Task[];
  }

  export interface Address{
    id:number;
    addressLine1:string;
    addressLine2:string;
    city:string;
  }



  

