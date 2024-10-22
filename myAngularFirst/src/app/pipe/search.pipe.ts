import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task-service.service';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Task[], ...args: string[]): Task[] {
    const searchInput =args[0];

    return value.filter(a => a.title.toLowerCase().includes(searchInput.toLowerCase()) || 
    a.description.toLowerCase().includes(searchInput.toLowerCase()))
  }

}

