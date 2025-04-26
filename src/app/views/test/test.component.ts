import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HeaderComponent, 
    HeaderLogComponent, 
    LabelLogComponent, 
    CommonModule,
    RouterLink
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  user:User | undefined;
  count:number;
  maxCount:number | undefined;
  tests: { 
    question: string;
    variable1: string;  
    variable2: string;  
    variable3: string; 
    variable4: string;  
    answer: string;
  }[] =[];

  btns: string[] = [
    '../../../assets/images/test/input_disabled_cat.svg',
    '../../../assets/images/test/input_disabled_cat.svg',
    '../../../assets/images/test/input_disabled_cat.svg',
    '../../../assets/images/test/input_disabled_cat.svg'
  ];

  cat = '../../../assets/images/test/cat-question.png';

  thatsAll:boolean = false;

  selectedV:string;
  result:number;

  constructor(private route: ActivatedRoute,
    private apiService:ApiService,
  ) { 
    this.count = 0;
    this.result = 0;
    this.selectedV='';
  }

  async ngOnInit() {
    try{
      const data = await this.apiService.getTestForStudent();
      this.user = data;
      this.tests =data.group.testBody ? JSON.parse(data.group.testBody) as { 
        question: string;
        variable1: string;  
        variable2: string;  
        variable3: string; 
        variable4: string;  
        answer: string;
      }[] : [];
      this.maxCount = this.tests.length;
      this.count = 0;
    }
    catch(error){
      console.log(error);
    }
  }

  nextStep(){
    if(this.count == this.maxCount){
      this.thatsAll = true;

      if(this.result > this.count -3){
        this.cat = '../../../assets/images/good.png'
      }else if(this.result > this.count -8){
         this.cat = '../../../assets/images/norm.png'
      } else{
        this.cat = '../../../assets/images/hyi.png'
      }
    }


    if(this.selectedV === this.tests[this.count!].answer){
      this.result++;
    }

    this.count++;
    this.clearPole();

  }

  selectInput(variant:string,pos:number){
    this.selectedV=variant;
    this.clearPole();

    this.btns[pos] = '../../../assets/images/svg/lucide_cat.svg';
  }

  clearPole(){

    this.btns[0] = '../../../assets/images/test/input_disabled_cat.svg';
    this.btns[1] = '../../../assets/images/test/input_disabled_cat.svg';
    this.btns[2] = '../../../assets/images/test/input_disabled_cat.svg';
    this.btns[3] = '../../../assets/images/test/input_disabled_cat.svg';

   
  }
}
