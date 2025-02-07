import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';

@Component({
  selector: 'app-table-vehicles',
  standalone: true,
  imports: [],
  templateUrl: './table-vehicles.component.html',
  styleUrl: './table-vehicles.component.css'
})
export class TableVehiclesComponent implements OnInit {
  vehicles: any[];

  constructor(private vehicleService: VehicleService) {
    this.vehicles = [];
  }

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.vehicles = data;
        console.log('Vehicles:', this.vehicles);
      },
      error => {
        console.error('There was an error fetching the vehicles!', error);
      }
    );
  }

}
