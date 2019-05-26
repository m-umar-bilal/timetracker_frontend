/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {NbMenuService} from "@nebular/theme";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {Router} from "@angular/router"

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private menuService: NbMenuService,
              private authService: NbAuthService,private router: Router) {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
  onContecxtItemSelection(title) {
    if(title==='Log out') {
      this.authService.logout("email").subscribe(() => {
        this.router.navigate(['/auth/login'])
      });
    }
    console.log('click', title);
  }
}
