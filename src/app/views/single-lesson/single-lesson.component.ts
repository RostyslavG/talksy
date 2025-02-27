import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-lesson.component.html',
  styleUrl: './single-lesson.component.css'
})
export class SingleLessonComponent {
    lessonId: string | null = null;

    constructor(private route: ActivatedRoute) {
        this.lessonId = this.route.snapshot.paramMap.get('id');
    }
}
