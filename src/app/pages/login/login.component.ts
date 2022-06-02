import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/models/userInfertace';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public form: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(8)
      ]],
  });
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.userService.verifyUser()
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value;

      this.loading = true;
      this.userService.login(user).subscribe((res: { user: userInterface }) => {
        this.userService.setLocalStorage(res.user);
        this.router.navigateByUrl('');
        this.setLoadingFalse();
      },
        err => {
          console.error(err.error.message);

          if (err.error.message)
            this.alert.error(err.error.message)

          this.setLoadingFalse();
        })
    }
  }

  setLoadingFalse() {
    this.loading = false
  }

}
