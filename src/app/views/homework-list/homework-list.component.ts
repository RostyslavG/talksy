import { Component } from '@angular/core';
import {HeaderLogComponent} from "../components/header-log/header-log.component";
import {LabelLogComponent} from "../components/label-log/label-log.component";

@Component({
  selector: 'app-homework-list',
  standalone: true,
  imports: [
          HeaderLogComponent,
          LabelLogComponent
        ],
  templateUrl: './homework-list.component.html',
  styleUrl: './homework-list.component.css'
})
export class HomeworkListComponent {

}
