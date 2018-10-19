import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '@angular/http'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string;
  private user: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  public login(user, callback) {
    this.http.post('http://localhost:3000/user/authenticate', user)
      .subscribe(res => {
          if (res['success']) {
            this.user = res['user'];
            this.authToken = res['token'];
            this.saveToken();
          }
          callback(res);
        }
      );
  }

  public register(user) {
    this.http.post('http://localhost:3000/user/register', user)
      .subscribe(resp => {
          if (resp['success']) {
            console.log(resp);
          } else {
            console.log(resp['msg']);
          }
        }
      );
  }

  public profile(user){
    this.http.get('http://localhost:3000/user/profile', user)
      .subscribe(resp => {
          if (resp['success']) {
            console.log(resp);
          } else {
            console.log(resp['msg']);
          }
        }
      );
  }

  private saveToken() {
    localStorage.setItem('id_token', this.authToken);
    localStorage.setItem('user', this.user);
  }

  private getToken(): string {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('id_token');
    }
    return this.authToken;
  }

  public logout(): void {
    this.authToken = '';
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  public getUser(): {} {
    const user = this.user;
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
}