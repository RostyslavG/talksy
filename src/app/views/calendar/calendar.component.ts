import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  user:User | undefined;
  shedule: { day: string; time: string }[] = [];

  dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];
  
  now : Date;
  dateTest: Date | undefined;
  currentMonth!: string;
  daysInMonth!: number;
  calendarMatrix: number[][] = []; 

  constructor(private apiService:ApiService) {
    this.now = new Date();
    this.generateCalendar();
  }
  
  async ngOnInit() {
    try {

      const data = await this.apiService.getCalendarForStudent();
      this.user = data;
      this.shedule = data.group.shedule ? JSON.parse(data.group.shedule) as { day: string; time: string }[] : [];
      this.dateTest =data.group.testDate;
        
    } catch (err) {
        console.error('Помилка при запиті:', err);
    }
  }



  generateCalendar(): void {
    this.now = new Date();
    const year = this.now.getFullYear();
    const month = this.now.getMonth();
    
    this.currentMonth = this.monthNames[month];
    this.daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  
    const startIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    let days: number[] = Array(startIndex).fill(0); 
    for (let i = 1; i <= this.daysInMonth; i++) {
      days.push(i);
    }

    this.calendarMatrix = [];
      while (days.length) {
          const week = days.splice(0, 7);
          while (week.length < 7) {
              week.push(0);
          }
          
          this.calendarMatrix.push(week);
      }
  }

  getScheduleForDay(dayIndex: number): string | null {
    const dayName = this.dayNames[dayIndex]; 
    const foundSchedule = this.shedule.find(schedule => schedule.day === dayName);
    return foundSchedule ? foundSchedule.time : null;
  }

  isMatchingDate(day: number): boolean {
    if (!this.dateTest) return false;

    const received = new Date(this.dateTest); 
    return received.getDate() === day &&
           received.getMonth() === this.now.getMonth() &&
           received.getFullYear() === this.now.getFullYear();
  }
}
