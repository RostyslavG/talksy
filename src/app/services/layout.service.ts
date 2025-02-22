import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
    private hideHeaderFooter = new BehaviorSubject<boolean>(false);
    hideHeaderFooter$ = this.hideHeaderFooter.asObservable();
  
    constructor(private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            if (event.urlAfterRedirects === '/' || event.urlAfterRedirects.startsWith('/login-registration')) {
            this.hideHeaderFooter.next(false);
          } else {
            this.hideHeaderFooter.next(true);
          }
        }
      });
    }
}
