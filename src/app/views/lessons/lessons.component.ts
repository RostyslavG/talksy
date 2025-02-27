import { Component } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent, CommonModule, RouterModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
    lessons = [
        { id: 1, title: 'Lesson 1: Greetings and Introductions', date: '12.01.2025' },
        { id: 2, title: 'Lesson 2: Basic Grammar', date: '13.01.2025' },
        { id: 3, title: 'Lesson 3: Conversation Skills', date: '14.01.2025' }
    ];
}
