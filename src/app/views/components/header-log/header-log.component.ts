import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-log',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header-log.component.html',
  styleUrl: './header-log.component.css'
})
export class HeaderLogComponent {
  role:string | null;

  constructor(userAuth:UserAuthService){
    this.role = userAuth.roleValue
    console.log(this.role)
  }
}
