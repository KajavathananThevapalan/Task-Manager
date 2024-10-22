import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user-service.service';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(value: User[], ...args: string[]): User[] {
    const searchUser =args[0];

    return value.filter(a => a.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    a.email.toLowerCase().includes(searchUser.toLowerCase()))
  }

}