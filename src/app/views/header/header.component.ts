import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideHeader: boolean = false;

  constructor(private layoutService: LayoutService) {
    this.layoutService.hideHeader$.subscribe(hide => {
      this.hideHeader = hide;
    });
  }
}
