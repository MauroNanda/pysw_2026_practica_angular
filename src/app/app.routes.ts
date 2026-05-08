import { Routes } from '@angular/router';
import { Punto1 } from './punto1/punto1';
import { Punto2 } from './punto2/punto2';
import { Punto3 } from './punto3/punto3';
import { Inscripcion } from './inscripcion/inscripcion';

export const routes: Routes = [
    { path: 'punto1', component: Punto1 },
    { path: 'punto2', component: Punto2 },
    { path: 'punto3', component: Punto3 },
    { path: 'inscripcion', component: Inscripcion }
];
