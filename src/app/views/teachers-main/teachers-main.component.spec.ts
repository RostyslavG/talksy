import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersMainComponent } from './teachers-main.component';

describe('TeachersMainComponent', () => {
  let component: TeachersMainComponent;
  let fixture: ComponentFixture<TeachersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
