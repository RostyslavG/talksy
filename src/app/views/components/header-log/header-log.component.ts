import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-header-log',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-log.component.html',
  styleUrl: './header-log.component.css'
})
export class HeaderLogComponent {

}
