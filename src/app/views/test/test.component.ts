import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HeaderComponent, HeaderLogComponent, LabelLogComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
