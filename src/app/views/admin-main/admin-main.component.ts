import { Component } from '@angular/core';
import {HeaderLogComponent} from "../components/header-log/header-log.component";
import {LabelLogComponent} from "../components/label-log/label-log.component";

@Component({
  selector: 'app-admin-main',
  standalone: true,
    imports: [
        HeaderLogComponent,
        LabelLogComponent
    ],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {

}
