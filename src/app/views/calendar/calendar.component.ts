import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
