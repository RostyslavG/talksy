import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
    private hideHeader = new BehaviorSubject<boolean>(false);
    private hideFooter = new BehaviorSubject<boolean>(false);
    hideHeader$ = this.hideHeader.asObservable();
    hideFooter$ = this.hideFooter.asObservable();

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects.split('#')[0];
                if (url === '/') {
                    this.hideHeader.next(false);
                    this.hideFooter.next(false);
                } else if (url.startsWith('/login-registration')) {
                    this.hideHeader.next(false);
                    this.hideFooter.next(true);
                } else {
                    this.hideHeader.next(true);
                    this.hideFooter.next(true);
                }
            }
        });
    }
}
