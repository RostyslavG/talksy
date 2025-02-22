import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent,
    RouterLink
  ],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.css'
})
export class CabinetComponent {

}
