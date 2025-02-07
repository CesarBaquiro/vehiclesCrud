import { Component } from '@angular/core';
import { TableVehiclesComponent } from "../../components/table-vehicles/table-vehicles.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableVehiclesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
