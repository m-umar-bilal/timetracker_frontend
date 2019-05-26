import { Component } from '@angular/core';

import {MENU_ITEMS_ADMIN, MENU_ITEMS_scientist} from './pages-menu';
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS_scientist;
  private user: any;
  constructor(private authService: NbAuthService){
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
          if(this.user.type==='admin') {
            this.menu = MENU_ITEMS_ADMIN
          }
        }

      });

  }
}
