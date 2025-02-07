import { Component } from '@angular/core';
import { FormCreateVehicleComponent } from "../../components/form-create-vehicle/form-create-vehicle.component";

@Component({
  selector: 'app-create-vehicle',
  standalone: true,
  imports: [FormCreateVehicleComponent],
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.css'
})
export class CreateVehicleComponent {

}
