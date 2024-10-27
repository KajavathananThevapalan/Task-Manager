import { Component } from '@angular/core';
import { Task, TaskServiceService } from '../task-service.service';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskService : TaskServiceService,private toastr : ToastrService,private router : Router){

  }
  searchInput='';

  tasks: Task[]=[];
  
  ngOnInit(): void {
    this.loadTasks();
    }

  onDelete(taskId:number){
    if(confirm("Do you want to delete this task?")){
      this.taskService.deleteTask(taskId).subscribe((data: any) =>{
      this.toastr.success("success");
        this.loadTasks();
    })
    }
  }

  onEdit(taskId:number){
    this.router.navigate(['task-edit/',taskId])
  }

  loadTasks(){
    this.taskService.getTasks().subscribe((data: any) =>{
      this.tasks=data;
      console.log(data);
  })
  }
}
