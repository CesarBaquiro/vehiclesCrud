import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateVehicleComponent } from './form-create-vehicle.component';

describe('FormCreateVehicleComponent', () => {
  let component: FormCreateVehicleComponent;
  let fixture: ComponentFixture<FormCreateVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
