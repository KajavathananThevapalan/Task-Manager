import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { BlankComponentComponent } from './layouts/blank-component/blank-component.component';
import { AdminComponentComponent } from './layouts/admin-component/admin-component.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponentComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path :'tasks',
        component:TaskListComponent
      },
      {
        path :'users',
        component:UserListComponent
      },
      {
        path :'task-add',
        component:TaskAddComponent
      },
      {
        path :'task-edit/:id',
        component:TaskEditComponent
      },
      {
        path :'user-add',
        component:UserAddComponent
      },
      {
        path :'user-edit/:id',
        component:UserAddComponent
      }
    ]
  }
  ,{
    path:'',
    component:BlankComponentComponent,
    children:[
      {
        path:'register',
        component:RegisterComponentComponent
      },
      {
        path:'',
        component:LoginComponentComponent
      },
      {
        path:'**',
        redirectTo: "login",
        pathMatch:"full"
      }
    ]
  },
  
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
