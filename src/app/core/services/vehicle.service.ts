import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  readonly API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los vehículos
  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/get-all-vehicles`);
  }

  updateVehicle(vehicle: any): Observable<any> {
    return this.http.put(`${this.API_URL}/update-vehicle/${vehicle.plate}`, vehicle);
  }

  deleteVehicle(plate: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete-vehicle/${plate}`);
  }


}
