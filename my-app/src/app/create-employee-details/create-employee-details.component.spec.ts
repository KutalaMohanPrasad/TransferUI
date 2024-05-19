import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeDetailsComponent } from './create-employee-details.component';

describe('CreateEmployeeDetailsComponent', () => {
  let component: CreateEmployeeDetailsComponent;
  let fixture: ComponentFixture<CreateEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
