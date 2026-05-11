import { Injectable } from '@angular/core';

export interface InscripcionData {
  dni: string;
  curso: string;
  email: string;
  precio: number;
  categoriaAlumno: number;
  fechaInscripcion: Date;
  precioFinal: number;
}

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private lista: InscripcionData[] = [];

  agregar(inscripcion: InscripcionData): void {
    this.lista.push({ ...inscripcion });
  }

  obtenerTodas(): InscripcionData[] {
    return this.lista;
  }

  eliminar(index: number): void {
    this.lista.splice(index, 1);
  }
}
