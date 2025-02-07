import { Component } from '@angular/core';
import { FormCreateVehicleComponent } from "../../components/form-create-vehicle/form-create-vehicle.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  standalone: true,
  imports: [FormCreateVehicleComponent, RouterLink],
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.css'
})
export class CreateVehicleComponent {

}
