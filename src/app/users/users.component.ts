import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: [];

  constructor(private usersService: UsersService,
    private router:Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers = () => {
    this.usersService.getUserList().subscribe((user) => {
      if (user && user !== null) {
        this.users = user.result;
      }
    });
  }

  logout = () => {
    localStorage.clear();
    localStorage.removeItem('user')
    this.router.navigate(['/login']) 
  }

}
