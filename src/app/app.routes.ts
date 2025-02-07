import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
    },
    {
        path: 'create-vehicle',
        loadComponent: () =>
            import('./pages/create-vehicle/create-vehicle.component').then(
                (m) => m.CreateVehicleComponent
            ),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirección por defecto
];
