import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http : HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem("token")){
      const token = localStorage.getItem("token");
      // if(token){
      //   const decoded = jwtDecode(token);
      // }
      return true;
    }else{
      return false;
    }
  }

  registerUser(user: any) {
    return this.http.post('http://localhost:5212/api/UserRegister', user);
  }

  logInUser(user: any){
    return this.http.post("http://localhost:5212/api/UserRegister/Log-In" , user,{responseType: "text"})
  }
}




