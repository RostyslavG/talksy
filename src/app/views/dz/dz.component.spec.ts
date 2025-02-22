import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DzComponent } from './dz.component';

describe('DzComponent', () => {
  let component: DzComponent;
  let fixture: ComponentFixture<DzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
