import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit{
  mode: string | null = null;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  key:string ='';
  
  constructor(
    private route:ActivatedRoute,
    private apiService:ApiService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode');
    });
  }

  async login(){
    try{
      console.log(await this.apiService.login(this.email,this.password))
    }catch(error){
      console.log(error)
    }
  }

  async registration(){

    if(this.password != this.confirmPassword){
      alert("Паролі не збігаються ");
      return;
    }

    try{
      console.log(await this.apiService.registration(this.email,this.password));
      this.mode="accept";
    }catch(error){
      console.log(error)
    }
  }

  async registrationAccept(){

    try{
      console.log(await this.apiService.registrationAccept(this.email,this.password,this.key))
    }catch(error){
      console.log(error)
    }
  }
}
