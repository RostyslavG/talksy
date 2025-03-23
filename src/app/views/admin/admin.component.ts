import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit {
  
  constructor(private router:Router,
    private userAuthService:UserAuthService) {}
  
  ngOnInit(): void {
    if(this.userAuthService.roleValue != "Admin"){
      switch(this.userAuthService.roleValue){
        case 'User':
            this.router.navigate(['/cabinet']);
          break;
          case 'Teacher':
            this.router.navigate(['/teachers']);
          break;
          default :
            this.router.navigate(['/main']);
          break;
      }
    }
  }

}
