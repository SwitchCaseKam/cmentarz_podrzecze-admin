import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthLoginService } from './auth-login.service';

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

  protected errorMessage = '';

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authLoginService: AuthLoginService
  ) { }

  public ngOnInit(): void {
    this.loginFormFields = this.createLoginFormField();
  }

  private createLoginFormField(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]
      ],
      password: ['', [Validators.required]
      ]
    });
  }

  protected logIn(): void {
    if (this.loginFormFields.get('username')?.value === 'admin' 
      && this.loginFormFields.get('password')?.value === 'admin' 
    ) {
      this.errorMessage = '';
      this.authLoginService.setLoggedInFlag();
      this.router.navigate(['edit-db']);
    } else {
      this.errorMessage = "Nieprawidłowy login lub hasło";
      this.authLoginService.resetLoggedInFlag();
    }
  }

}
