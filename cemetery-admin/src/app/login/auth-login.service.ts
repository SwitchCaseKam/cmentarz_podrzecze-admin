import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private isLogged: boolean = false;
  private isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogged);

  constructor() { }

  public setLoggedInFlag(): void {
    this.isLogged = true;
    this.isLogged$.next(this.isLogged);
  }

  public resetLoggedInFlag(): void {
    this.isLogged = false;
    this.isLogged$.next(this.isLogged);
  }

  public getLoggedInFlag(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
}
