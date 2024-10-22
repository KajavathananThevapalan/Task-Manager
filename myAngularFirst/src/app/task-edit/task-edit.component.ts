import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit{
  taskForm :FormGroup;

  taskId:number;


  constructor(private fb : FormBuilder,private taskService : TaskServiceService, private toastr : ToastrService,private route : ActivatedRoute, private router: Router){
    const editId = Number(this.route.snapshot.paramMap.get("id"));
    this.taskId = editId;


    this.taskForm =this.fb.group({
      id:[''],
      title:['',[Validators.required]],
      description:[''],
      dueDate:[''],
      priority:['',[Validators.required]]
    })
  }

  ngOnInit():void{
    this.taskService.getTask(this.taskId).subscribe(data => {
      console.log(data);
      data.dueDate = new Date(data.dueDate).toISOString().slice(0,10);
      this.taskForm.patchValue({
        id :data.id,
        title :data.title,
        description: data.description,
        dueDate:data.dueDate,
        priority:data.priority
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
