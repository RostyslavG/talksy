import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [HeaderLogComponent],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.css'
})
export class CabinetComponent {

}
