import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelLogComponent } from './label-log.component';

describe('LabelLogComponent', () => {
  let component: LabelLogComponent;
  let fixture: ComponentFixture<LabelLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
