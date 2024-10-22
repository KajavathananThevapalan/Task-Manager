import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  taskForm :FormGroup;
  constructor(private fb : FormBuilder,private taskService : TaskServiceService, private router: Router){
    this.taskForm =this.fb.group({
      title:['',[Validators.required]],
      description:[''],
      dueDate:[''],
      priority:['',[Validators.required]]
    })

  }

  onSubmit(){
    let task = this.taskForm.value;
    this.taskService.createTask(task).subscribe(data => {
        this.router.navigate(['/tasks']);
      }
    )
  }

  
}

 

