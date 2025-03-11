import { Component } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

}
