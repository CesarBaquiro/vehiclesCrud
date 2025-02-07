import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../core/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-create-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-vehicle.component.html',
  styleUrl: './form-create-vehicle.component.css'
})
export class FormCreateVehicleComponent implements OnInit {
  formCreateVehicle!: FormGroup;
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Orange', 'Purple', 'Brown'];
  plateExists = false;


  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {
    this.formCreateVehicle = this.fb.group({
      plate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      series: [''],
      model_year: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Escuchar cambios en el campo "plate"
    this.formCreateVehicle.get('plate')?.valueChanges.subscribe(value => {
      this.vehicleService.verifyPlateExists(value).subscribe((data) => {
        this.plateExists = data.exists;
      });
    });
  }

  createNewVehicle(): void {
    if (this.formCreateVehicle.valid && !this.plateExists) {
      this.vehicleService.createNewVehicle(this.formCreateVehicle.value).subscribe(
        data => {
          Swal.fire({
            title: "Vehicle created!",
            icon: "success",
            draggable: true
          });
          this.formCreateVehicle.reset();
        },
        error => {
          console.error('There was an error creating the vehicle!', error);
        }
      );

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Fill in the required fields'
      });
    }

  }

}
