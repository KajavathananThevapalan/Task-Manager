import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {path :'tasks',component:TaskListComponent},
  {path :'users',component:UserListComponent},

  {path :'task-add',component:TaskAddComponent},
  {path :'task-edit/:id',component:TaskEditComponent},

  {path :'user-add',component:UserAddComponent},
  {path :'user-edit/:id',component:UserAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
