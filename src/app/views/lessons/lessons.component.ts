import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user.model';
import { Lesson } from '../../model/lesson.model';


@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent, CommonModule, RouterModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  user:User | undefined;
  lessons: Array<Lesson> | undefined;

  constructor(private apiService:ApiService){}

  async ngOnInit() {
    try{
      const data = await this.apiService.getLessonsForStudent()
      this.user = data.user;
      this.lessons = data.lessons;

    }catch(error){

    }
  }
}
