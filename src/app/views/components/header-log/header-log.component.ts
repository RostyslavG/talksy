import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
