import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {

}
