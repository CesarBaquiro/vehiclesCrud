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
  availableColors: string[] = ['All colors', 'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Orange', 'Purple', 'Brown'];
  paginatedVehicles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of vehicles per page
  totalPages: number = 0;

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
        this.totalPages = Math.ceil(this.vehicles.length / this.itemsPerPage);
        this.paginateVehicles();
        console.log('Vehicles:', this.vehicles);
      },
      error => {
        console.error('There was an error fetching the vehicles!', error);
      }
    );
  }

  filterPlate(): void { }

  filterBrand(): void { }

  orderByModelYear(event: any): void {
    const orderSelected = event.target.value; // Selected value
    console.log('Order by year', orderSelected);
  }

  orderByColor(event: any): void {
    const selectedColor = event.target.value; // Selected value
    console.log('Show with color:', selectedColor);
  }

  // Vehicle paging function
  paginateVehicles(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedVehicles = this.vehicles.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateVehicles();
  }

  // Get the list of all pages
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);

  }

}
