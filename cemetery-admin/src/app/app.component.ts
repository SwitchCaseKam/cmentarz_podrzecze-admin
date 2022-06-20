import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthLoginService } from './login/auth-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  protected title = 'cemetery-admin';
  protected loggedInFlag: boolean = false;
  private authSubscription = new Subscription();

  constructor(private authLoginService: AuthLoginService) {}

  public ngOnInit(): void {
    this.authSubscription = this.authLoginService.getLoggedInFlag().subscribe(
      (loggedInFlag: boolean) => this.loggedInFlag = loggedInFlag
    );
  }

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
