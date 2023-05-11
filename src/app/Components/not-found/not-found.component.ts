import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
constructor(private _Router:Router) {
  localStorage.setItem('not-found','Error 404')
}


goHome() {
  localStorage.removeItem('not-found')
  this._Router.navigate(['/home'])
}

}