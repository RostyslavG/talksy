import { Component, OnInit } from '@angular/core';
import {HeaderLogComponent} from "../components/header-log/header-log.component";
import {LabelLogComponent} from "../components/label-log/label-log.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Lesson } from '../../model/lesson.model';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-admin-main',
  standalone: true,
    imports: [
        HeaderLogComponent,
        LabelLogComponent,
        CommonModule,
        RouterLink
    ],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent implements OnInit {
  id!: string;
  lesson: Lesson | undefined;
  user: User | undefined;
  test: string | undefined;
  groupId!:string;

  constructor(private route: ActivatedRoute,
    private apiService:ApiService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.groupId = params.get('group')!;
    });

    try{
      const data = await this.apiService.getLesson(this.id);
      console.log(data);
      this.user = data.user
      this.lesson = data.lesson;
      this.test = data.test
    }
    catch(error){
      console.log(error);
    }
  }


}
