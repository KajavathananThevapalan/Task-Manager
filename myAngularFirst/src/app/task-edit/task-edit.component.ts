import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { User, UserServiceService } from '../services/user-service.service';
import { CheckList, TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit{
  taskForm :FormGroup;

  taskId:number;
  users : User[] = [];
  checkList?: CheckList[];
   currentTask:undefined;

   currentTaskId:any;

  constructor(private fb : FormBuilder,private taskService : TaskServiceService, private toastr : ToastrService,private userService : UserServiceService,private route : ActivatedRoute, private router: Router){
    const editId = Number(this.route.snapshot.paramMap.get("id"));
    this.taskId = editId;
    this.taskForm =this.fb.group({
      id:[''],
      title:['',[Validators.required]],
      description:[''],
      dueDate:[''],
      priority:['',[Validators.required]],
      assigneeId: [''],
      checkLists:this.fb.array([])
    })
  }

  get myCheckLists(): FormArray{
    return this.taskForm.get('checkLists') as FormArray
  }

  addmyCheckLists(){
    this.myCheckLists.push(
      this.fb.group({
        name: [''],
        isDone: [false]
      })
    )};

  removemyCheckLists(index : number){
    this.myCheckLists.removeAt(index);
  }

  ngOnInit():void{
    console.log(this.myCheckLists);
    
    this.userService.getUsers().subscribe(data =>
      {
        this.users = data;
      }
    )
    this.taskService.getTask(this.taskId).subscribe(data => {
      console.log(data);
      data.dueDate = new Date(data.dueDate).toISOString().slice(0,10);
      this.taskForm.patchValue({
        id :data.id,
        title :data.title,
        description: data.description,
        dueDate:data.dueDate,
        priority:data.priority,
        assigneeId: data.assignee?.name,
        checkLists:data.assignee?.tasks

      });
    },error => {
      this.toastr.error("Task is not found");
    });
    }
    

    onSubmit(){
      let task = this.taskForm.value;
      this.taskService.updateTask(task).subscribe(data => {
          this.toastr.success("Task is updated Successfully...")
          this.router.navigate(['/tasks']);
        }
      )
    }

}
