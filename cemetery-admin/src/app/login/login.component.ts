import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  protected title = "Cmentarz w Podrzeczu";
  protected subTitle = "Panel administratora";
  protected loginFormFields: FormGroup = new FormGroup({});

  protected username = '';
  protected password = '';

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  public ngOnInit(): void {
    this.loginFormFields = this.createLoginFormField();
  }

  private createLoginFormField(): FormGroup {
    return this.formBuilder.group({
      username: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}]
    });
  }

  protected logIn(): void {
    console.log('login clicked with data: ', this.loginFormFields.value);
    if (this.loginFormFields.get('username')?.value === 'kamil' 
      && this.loginFormFields.get('password')?.value === 'admin' 
    ) {
      console.log('username passed');
    } else {
      console.log('wrong username or password')
    }
  }

}
