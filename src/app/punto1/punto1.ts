import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Evento {
  nombre: string;
  descripcion: string;
  img: string;
}
@Component({
  selector: 'app-punto1',
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrl: './punto1.css',
})
export class Punto1 {
  eventos: Evento[] = [
    { nombre: 'Taller de Yoga', descripcion: 'Clase para principiantes todos los martes', img: 'https://via.placeholder.com/600x300?text=Yoga' },
    { nombre: 'Feria de Libros', descripcion: 'Exposición de libros usados y nuevos', img: 'https://via.placeholder.com/600x300?text=Libros' },
    { nombre: 'Concierto de Jazz', descripcion: 'Banda local en vivo en el auditorio', img: 'https://via.placeholder.com/600x300?text=Jazz' },
    { nombre: 'Curso de Fotografía', descripcion: 'Taller práctico con cámara réflex', img: 'https://via.placeholder.com/600x300?text=Fotografia' },
  ];

  indiceActual: number = 0;

  get eventoActual(): Evento {
    return this.eventos[this.indiceActual];
  }

  siguiente() {
    this.indiceActual++;
    if (this.indiceActual >= this.eventos.length) {
      this.indiceActual = 0;
    }
  }

  anterior() {
    this.indiceActual--;
    if (this.indiceActual < 0) {
      this.indiceActual = this.eventos.length - 1;
    }
  }
}
