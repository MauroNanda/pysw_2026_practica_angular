import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carta {
  id: number;
  valor: string;
  img: string;
  estaVolteada: boolean;
  estaDescubierta: boolean;
}

@Component({
  selector: 'app-punto3',
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css'
})
export class Punto3 {

  private pares = [
    { valor: 'gato',     img: '🐱' },
    { valor: 'perro',    img: '🐶' },
    { valor: 'sol',      img: '☀️' },
    { valor: 'luna',     img: '🌙' },
    { valor: 'estrella', img: '⭐' },
    { valor: 'corazon',  img: '❤️' },
  ];

  tablero: Carta[] = [];
  intentosRestantes: number = 10;
  juegoIniciado: boolean = false;
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';

  cartasVolteadasAhora: Carta[] = [];
  puedeVoltear: boolean = false;
  esperandoComparacion: boolean = false;

  constructor() {
    this.inicializarTablero();
  }

  inicializarTablero(): void {
    const cartas: Carta[] = [];
    this.pares.forEach((par, index) => {
      cartas.push({ id: index * 2,     valor: par.valor, img: par.img, estaVolteada: false, estaDescubierta: false });
      cartas.push({ id: index * 2 + 1, valor: par.valor, img: par.img, estaVolteada: false, estaDescubierta: false });
    });

    // Mezcla aleatoria Fisher-Yates
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }

    this.tablero = cartas;
  }

  iniciar(): void {
    this.juegoIniciado = true;
    this.juegoTerminado = false;
    this.puedeVoltear = false;
    this.cartasVolteadasAhora = [];
    this.mensajeFinal = '';
  }

  reiniciar(): void {
    this.intentosRestantes = 10;
    this.juegoIniciado = false;
    this.juegoTerminado = false;
    this.puedeVoltear = false;
    this.cartasVolteadasAhora = [];
    this.esperandoComparacion = false;
    this.mensajeFinal = '';
    this.inicializarTablero();
  }

  intentar(): void {
    if (!this.juegoIniciado || this.juegoTerminado) return;
    if (this.intentosRestantes <= 0) return;
    if (this.cartasVolteadasAhora.length > 0) return;
    this.puedeVoltear = true;
  }

  voltearCarta(carta: Carta): void {
    if (!this.puedeVoltear) return;
    if (carta.estaDescubierta || carta.estaVolteada) return;
    if (this.cartasVolteadasAhora.length >= 2) return;
    if (this.esperandoComparacion) return;

    carta.estaVolteada = true;
    this.cartasVolteadasAhora.push(carta);

    if (this.cartasVolteadasAhora.length === 2) {
      this.puedeVoltear = false;
      this.esperandoComparacion = true;
      setTimeout(() => this.compararCartas(), 1000);
    }
  }

  private compararCartas(): void {
    if (this.cartasVolteadasAhora.length < 2) return;
    const [carta1, carta2] = this.cartasVolteadasAhora;

    if (carta1.valor === carta2.valor) {
      carta1.estaDescubierta = true;
      carta2.estaDescubierta = true;
      this.verificarVictoria();
    } else {
      carta1.estaVolteada = false;
      carta2.estaVolteada = false;
      this.intentosRestantes--;
      if (this.intentosRestantes <= 0) {
        this.juegoTerminado = true;
        this.mensajeFinal = '😞 ¡Sin más intentos! Perdiste.';
      }
    }

    this.cartasVolteadasAhora = [];
    this.esperandoComparacion = false;
  }

  private verificarVictoria(): void {
    if (this.tablero.every(c => c.estaDescubierta)) {
      this.juegoTerminado = true;
      this.mensajeFinal = '🎉 ¡Ganaste! Encontraste todos los pares.';
    }
  }

  get puedeIntentar(): boolean {
    return this.juegoIniciado &&
           !this.juegoTerminado &&
           this.intentosRestantes > 0 &&
           this.cartasVolteadasAhora.length === 0 &&
           !this.esperandoComparacion;
  }
}
