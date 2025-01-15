import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
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
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.apiService.getData().subscribe({
    //   next: (response) => {
    //     console.log('API Response:', response);
    //     this.data = response;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // });
  }
}
