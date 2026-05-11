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
    { nombre: 'Minecraft Educativo', descripcion: 'Taller de lógica y creatividad usando Minecraft como herramienta de aprendizaje', img: 'imagenes/minecraft.png' },
    { nombre: 'Videojuegos Competitivos', descripcion: 'Torneo de esports universitario con equipos y premios especiales', img: 'imagenes/gaming.png' },
    { nombre: 'Música para Estudiar', descripcion: 'Sesión grupal con playlists curadas para mayor concentración al estudiar', img: 'imagenes/musica.png' },
    { nombre: 'Curso de Oratoria', descripcion: 'Técnicas de comunicación para hablar en público con claridad y confianza', img: 'imagenes/oratoria.png' },
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
