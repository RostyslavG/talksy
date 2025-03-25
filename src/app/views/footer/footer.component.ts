import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  hideFooter: boolean = false;

  constructor(private layoutService: LayoutService) {
    this.layoutService.hideFooter$.subscribe(hide => {
      this.hideFooter = hide;
    });
  }
}
