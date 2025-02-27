import { Component } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
