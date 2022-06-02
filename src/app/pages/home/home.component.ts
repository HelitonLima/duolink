import { Component, OnInit } from '@angular/core';
import { userInterface } from 'src/app/models/userInfertace';
import { UserService } from 'src/app/services/user.service';
import { io } from "socket.io-client";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loggedUser: userInterface = this.getUser();
  socket = io("http://localhost:3000");
  public users: userInterface[] = [{
    email: '',
    name: '',
    nickname: '',
    playRole: [],
    searchRole: [],
  }]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
     this.socket.on('new user', () => this.getUsers())
  }

  getUsers() {
    this.userService.getUsers(this.loggedUser).subscribe(res => {
      this.users = res
    })
  }

  removeUser(user: userInterface) {
    this.users = this.users.filter(userFilter => userFilter.nickname != user.nickname)
  }

  getUser(): userInterface {
    const user = this.userService.getLocalStorage();

    if (user)
      return user;
    else
      return {
        email: '',
        name: '',
        nickname: '',
        playRole: [{icon: '', name: ''}],
        searchRole: [{icon: '', name: ''}],
      }
  }
}
