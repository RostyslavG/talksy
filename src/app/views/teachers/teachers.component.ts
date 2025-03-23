import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {

  constructor(private router:Router,
    private userAuthService:UserAuthService) {}
  
  ngOnInit(): void {
    if(this.userAuthService.roleValue != "Teacher"){
      switch(this.userAuthService.roleValue){
        case 'User':
            this.router.navigate(['/cabinet']);
          break;
          case 'Admin':
            this.router.navigate(['/admin']);
          break;
          default :
            this.router.navigate(['/main']);
          break;
      }
    }
  }
}
