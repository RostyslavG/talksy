import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginRegisterComponent } from './views/login-register/login-register.component';

export const routes: Routes = [
    { path: '' , component:MainComponent },
    { path:'login-registration/:mode', component:LoginRegisterComponent}
];
