import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { group } from 'console';

@Component({
  selector: 'app-calendar-admin',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent, CommonModule],
  templateUrl: './calendar-admin.component.html',
  styleUrl: './calendar-admin.component.css'
})
export class CalendarAdminComponent implements AfterViewInit {
  @ViewChild('radioGroup') radioGroupRef!: ElementRef;
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

  ngAfterViewInit(): void {
    const radioGroup = this.radioGroupRef.nativeElement as HTMLElement;
  
    radioGroup.querySelectorAll('input[type="radio"][name="level"]').forEach(input => {
        input.addEventListener('change', (event: Event) => {
            const value = (event.target as HTMLInputElement).value;
            this.sendLevel(value);
        });
    });

    const defaultRadio = radioGroup.querySelector('input[type="radio"][name="level"]:checked') as HTMLInputElement;
    if (defaultRadio) {
        this.sendLevel(defaultRadio.value);
    }
  }

  async sendLevel(level: string): Promise<void> {
    try {

      const data = await this.apiService.getCalendarForAdmin(level);
      this.user = data.user;
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
