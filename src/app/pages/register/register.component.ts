import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/models/userInfertace';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public playRoles = this.getRoles();
  public searchRoles = this.getRoles();
  public loading: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    email: [
      null,
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
    nickname: [null, Validators.required],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(8)
      ]],
    playRole: [[], Validators.required],
    searchRole: [{value: [], disabled: true}, Validators.required,],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.userService.verifyUser()
  }

  setSearchRole() {
    if (this.form.controls['playRole'].value.length == 0)
      this.form.controls['searchRole'].disable()
    else
      this.form.controls['searchRole'].enable()

    if (this.form.controls['playRole'].value.length == 1)
      this.searchRoles = this.searchRoles.filter(element => element.value != this.form.controls['playRole'].value[0])
    else
      this.searchRoles = this.getRoles();
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value;

      this.loading = true;
      this.userService.createUser(user).subscribe(
        (res: { user: userInterface }) => {
          this.userService.setLocalStorage(res.user);
          this.router.navigateByUrl('');
          this.setLoadingFalse();
        }, 
        err => {
          console.error(err);

          if (err.message)
            this.alert.error(err.message)

          this.setLoadingFalse();
        })
    }
  }

  setLoadingFalse() {
    this.loading = false
  }

  getRoles() {
    return [
      {
        value: 'Top'
      },
      {
        value: 'Jungle'
      },
      {
        value: 'Mid'
      },
      {
        value: 'ADC'
      },
      {
        value: 'Sup'
      }
    ];
  }
}
