import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from './task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myAngularFirst';


constructor(private taskService : TaskServiceService){
  
 }

}
