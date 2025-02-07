import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../core/services/vehicle.service';

@Component({
  selector: 'app-form-create-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-vehicle.component.html',
  styleUrl: './form-create-vehicle.component.css'
})
export class FormCreateVehicleComponent {
  formCreateVehicle!: FormGroup;
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Orange', 'Purple', 'Brown'];

  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {
    this.formCreateVehicle = this.fb.group({
      plate: [''],
      brand: [''],
      model: [''],
      series: [''],
      model_year: [''],
      color: ['']
    });
  }


  createNewVehicle(): void {

    console.log('Form values:', this.formCreateVehicle.value);

    this.vehicleService.createNewVehicle(this.formCreateVehicle.value).subscribe(
      data => {
        console.log('Vehicle created!', data);
        this.formCreateVehicle.reset();
      },
      error => {
        console.error('There was an error creating the vehicle!', error);
      }
    );

  }


}
