import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent,
    RouterLink
  ],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.css'
})
export class CabinetComponent implements OnInit {
 
  user: User| undefined;

  constructor(private router:Router,
    private userAuthService:UserAuthService,
    private apiService:ApiService) {}
   
  async ngOnInit() {
    if(this.userAuthService.roleValue != "User"){
      switch(this.userAuthService.roleValue){
        case 'Teacher':
            this.router.navigate(['/teachers']);
          break;
          case 'Admin':
            this.router.navigate(['/admin']);
          break;
          default :
            this.router.navigate(['/main']);
          break;
      }
    }
    
    try{
      this.user = await this.apiService.studentCabinet();
    }
    catch(error){
      console.log(error);
    }
    
  }  

}
