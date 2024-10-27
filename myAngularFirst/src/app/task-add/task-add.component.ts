import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { Router } from '@angular/router';
import { User, UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{

  taskForm :FormGroup;
  users : User[] = [];

  constructor(private fb : FormBuilder,private taskService : TaskServiceService, private router: Router,private userService : UserServiceService){
    
    this.taskForm =this.fb.group({
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

  ngOnInit(): void {
       this.userService.getUsers().subscribe(data =>
        {
          this.users = data;
        }
      )}

  onSubmit(){
    let task = this.taskForm.value;
    this.taskService.createTask(task).subscribe(data => {
        this.router.navigate(['/tasks']);
      }
    )
  }

  
}

 

