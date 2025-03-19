import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet, RouterEvent} from '@angular/router';
import {HeaderComponent} from './views/header/header.component';
import {FooterComponent} from './views/footer/footer.component';
import {LoginRegisterComponent} from './views/login-register/login-register.component';
import {MainComponent} from './views/main/main.component';
import { filter } from 'rxjs/operators';
import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    hideHeaderFooter: boolean = false;

    constructor(private layoutService: LayoutService) {
      // this.layoutService.hideHeaderFooter$.subscribe(hide => {
      //   this.hideHeaderFooter = hide;
      // });
    }

    ngOnInit() {
    }
}
