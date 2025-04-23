import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HeaderComponent, 
    HeaderLogComponent, 
    LabelLogComponent, 
    CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  id!: string;


  constructor(private route: ActivatedRoute,
    private apiService:ApiService,

  ) {
  
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    try{
      
    }
    catch(error){
      console.log(error);
    }
  }

}
