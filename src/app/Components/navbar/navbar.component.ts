import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuName: string = 'Login';
  isLogin: boolean = false;
  notFound: boolean = false;
  userData: any;
  userName: string = '';

  constructor(private _Router: Router, private _AuthService: AuthService) {
    if (localStorage.getItem('userToken') === null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.userData = JSON.parse(localStorage.getItem('userData')!)
      this.userName = this.userData.first_name
    }
    this._Router.events.subscribe({
      next: (response) => {
        if (response instanceof NavigationEnd && localStorage.getItem('not-found') === null){
          this.menuName = response.url.replace('/', ' ').toUpperCase();
        } else if (localStorage.getItem('not-found') != null) {
          this.menuName = '';
          this.notFound = true;
        }
      } 
    });
  }

  logout(): void {
    const model = {
      token: localStorage.getItem('userToken')
    }

    this._AuthService.logout(model).subscribe({
      next: () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        this._Router.navigate(['/login']);
      }
    })
  }

}
