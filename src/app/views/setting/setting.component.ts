import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [HeaderLogComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

}
