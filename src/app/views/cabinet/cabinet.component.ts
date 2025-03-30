import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { ApiService } from '../../services/api.service';

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
      console.log("cabinet")
      const responce = await this.apiService.studentCabinet();
      console.log(responce);
    }
    catch(error){
      console.log(error);
    }
    
  }  

}
