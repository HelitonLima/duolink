import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public playRoles = this.getRoles();
  public searchRoles = this.getRoles();

  public form: FormGroup = this.formBuilder.group({
    name:  [null, Validators.required],
    email:  [
      null, 
      [
        Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
    nickname:  [null, Validators.required],
    password:  [
      null, 
      [
        Validators.required,
        Validators.minLength(8)
      ]],
    playRole:  [[], Validators.required],
    roleSearch:  [{value: [], disabled: true}, Validators.required,],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.watchFormChanges();
  }

  watchFormChanges() {
    this.form.valueChanges.subscribe(res => {
      this.searchRoles = res.playRole.length == 1 ?
        this.searchRoles.filter(element => element.value != res.playRole[0]) :
        this.getRoles();
    })
  }

  submit() {
    if (this.form.valid)
      console.log(this.form.value)
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
