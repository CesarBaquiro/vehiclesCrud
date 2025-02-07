import { Component, HostListener, inject, OnInit } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-vehicles',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './table-vehicles.component.html',
  styleUrl: './table-vehicles.component.css'
})
export class TableVehiclesComponent implements OnInit {
  formUpdateVehicle!: FormGroup;
  screenWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
  vehicles: any[];
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Orange', 'Purple', 'Brown'];
  paginatedVehicles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of vehicles per page
  totalPages: number = 0;
  isModalOpen: boolean = false;
  selectedVehicle: any = {

  };

  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {
    this.vehicles = [];
    this.formUpdateVehicle = this.fb.group({
      plate: [{ value: this.selectedVehicle.plate, disabled: true }],
      brand: [this.selectedVehicle.brand],
      model: [this.selectedVehicle.model],
      series: [this.selectedVehicle.series],
      model_year: [this.selectedVehicle.model_year],
      color: [this.selectedVehicle.color]
    });
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

  openModal(vehicle: any): void {
    console.log('Open modal', vehicle);
    this.selectedVehicle = { ...vehicle }; // Copiar datos para edición
    this.formUpdateVehicle = this.fb.group({
      plate: [this.selectedVehicle.plate],
      brand: [this.selectedVehicle.brand],
      model: [this.selectedVehicle.model],
      series: [this.selectedVehicle.series],
      model_year: [this.selectedVehicle.model_year],
      color: [this.selectedVehicle.color]
    });
    this.isModalOpen = true;

  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveChanges(): void {
    console.log('Datos actualizados:', this.formUpdateVehicle.value)
    this.vehicleService.updateVehicle(this.formUpdateVehicle.value).subscribe(data => {
      const index = this.vehicles.findIndex(v => v.plate === this.selectedVehicle.plate);
      this.vehicles[index] = this.formUpdateVehicle.value;
      this.paginateVehicles();
    });
    this.isModalOpen = false;
    Swal.fire({

      icon: "success",
      title: "Vehicle information updated",
      showConfirmButton: false,
      timer: 1500
    });
  }

  deleteVehicle(plate: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteVehicle(plate).subscribe(data => {
          this.vehicles = this.vehicles.filter(v => v.plate !== plate);
          this.totalPages = Math.ceil(this.vehicles.length / this.itemsPerPage);
          this.paginateVehicles();
        })
        Swal.fire({
          title: "Deleted!",
          text: `Vehicle with plate ${plate} removed`,
          icon: "success"
        });

      }
    });

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
