import { Component } from '@angular/core';
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { HeaderLogComponent } from "../components/header-log/header-log.component";

@Component({
  selector: 'app-dz',
  standalone: true,
  imports: [LabelLogComponent, HeaderLogComponent],
  templateUrl: './dz.component.html',
  styleUrl: './dz.component.css'
})
export class DzComponent {

}
