import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http:HttpClient) { }

getTasks(){
  return this.http.get<Task[]>('http://localhost:5212/api/TaskItems');
}

createTask(task:any){
  return this.http.post('http://localhost:5212/api/TaskItems',task);
}

deleteTask(taskId:number){
  return this.http.delete('http://localhost:5212/api/TaskItems/'+taskId);
}

getTask(taskId:number){
  return this.http.get<Task>('http://localhost:5212/api/TaskItems/'+taskId);
}

updateTask(task:any){
  return this.http.put('http://localhost:5212/api/TaskItems/'+task.id,task);
}



}

export interface Task{
  id:number;
  title:string;
  description:string;
  dueDate:string;
  priority:string;
}
