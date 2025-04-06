import { Component } from '@angular/core';
import {HeaderLogComponent} from "../components/header-log/header-log.component";
import {LabelLogComponent} from "../components/label-log/label-log.component";

@Component({
  selector: 'app-teachers-main',
  standalone: true,
  imports: [
            HeaderLogComponent,
            LabelLogComponent
          ],
  templateUrl: './teachers-main.component.html',
  styleUrl: './teachers-main.component.css'
})
export class TeachersMainComponent {

}
