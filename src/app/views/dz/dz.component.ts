import { Component, OnInit } from '@angular/core';
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { User } from '../../model/user.model';
import { Lesson } from '../../model/lesson.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dz',
  standalone: true,
  imports: [LabelLogComponent, HeaderLogComponent, CommonModule],
  templateUrl: './dz.component.html',
  styleUrl: './dz.component.css'
})
export class DzComponent implements OnInit {
  user:User | undefined;
  notSubmittedLessons: Array<Lesson> | undefined;
  submittedLessons: Array<Lesson> | undefined;
  isActive:boolean = true;
  constructor(private apiService:ApiService){}

  async ngOnInit() {
    try{
      const data = await this.apiService.getLessonsForStudent()
      this.user = data.user;
      this.sort(data.lessons);
     
    }catch(error){

    }
  }

  change(){
    this.isActive = !this.isActive; 
  }

  openFileDialog(id: number) {
    const fileInput = document.querySelector<HTMLInputElement>(`#fileInput-${id}`);
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event, id:number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file,id);
    }
  }

  async uploadFile(file: File, id:number) {
    const formData = new FormData();
    formData.append('homework', file);

    try{
      const data = await this.apiService.uploadHomework(id,formData);
      this.user = data.user;
      this.sort(data.lessons);
    }catch(error){

    }
  
  }

  sort(lessons:Lesson[]){
    this.submittedLessons = lessons.filter(lesson =>
      lesson.userLessons.some(ul => ul.homework && ul.homework.trim() !== "")
    );
    
    this.notSubmittedLessons = lessons.filter(lesson =>
      lesson.userLessons.every(ul => !ul.homework || ul.homework.trim() === "")
    );

  }

}
