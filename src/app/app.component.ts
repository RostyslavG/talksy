import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './views/header/header.component';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { MainComponent } from './views/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginRegisterComponent,
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit() {
  }
}
