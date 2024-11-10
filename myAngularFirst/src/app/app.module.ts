import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from './task-add/task-add.component';

import { TaskEditComponent } from './task-edit/task-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SearchUserPipe } from './pipe/search-user.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BlankComponentComponent } from './layouts/blank-component/blank-component.component';
import { AdminComponentComponent } from './layouts/admin-component/admin-component.component';
import { MyInterceptorService } from './interceptors/my-interceptor.service';
import { HasRoleDirective } from './has-role.directive';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskAddComponent,
    SearchPipe,
    TaskEditComponent,
    UserListComponent,
    UserAddComponent,
    RegisterComponentComponent,
    LoginComponentComponent,
    SearchUserPipe,
    RegisterComponentComponent,
    LoginComponentComponent,
    BlankComponentComponent,
    AdminComponentComponent,
    HasRoleDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule,
    CommonModule
    
  ],
  providers: [
    BsModalService,
    {provide:HTTP_INTERCEPTORS,useClass:MyInterceptorService,multi:true}
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
