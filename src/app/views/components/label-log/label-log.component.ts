import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-label-log',
  standalone: true,
  imports: [],
  templateUrl: './label-log.component.html',
  styleUrl: './label-log.component.css'
})
export class LabelLogComponent implements OnInit {
  @Input() user:User | undefined; 
  firstLetter: string | undefined;

  ngOnInit(): void {
    const name = this.user?.name || ""; 
    const firstLetter = name.charAt(0).toUpperCase(); 
  }
 
}
