import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-log.component.html',
  styleUrl: './label-log.component.css'
})
export class LabelLogComponent implements OnInit, OnChanges {
  @Input() user:User | undefined; 
  firstLetter: string | undefined;
  isPrice: boolean = false;

  constructor(private userAuthService: UserAuthService ) {
    this.isPrice = this.userAuthService.roleValue == "User"
  }

  ngOnInit(): void {
    this.updateFirstLetter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.updateFirstLetter();
    }
  }

  private updateFirstLetter(): void {
    const name = this.user?.name || "";
    this.firstLetter = name.charAt(0).toUpperCase();
  }
}
