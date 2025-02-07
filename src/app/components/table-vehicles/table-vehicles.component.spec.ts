import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVehiclesComponent } from './table-vehicles.component';

describe('TableVehiclesComponent', () => {
  let component: TableVehiclesComponent;
  let fixture: ComponentFixture<TableVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
