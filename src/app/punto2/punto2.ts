import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
}

@Component({
  selector: 'app-punto2',
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css'
})
export class Punto2 {

  productos: Producto[] = [
    { id: 1, nombre: 'Notebook Asus 13L', descripcion: 'Disco 40GB, 15 pulgadas', img: 'https://via.placeholder.com/300x200?text=Notebook', precio: 450.50 },
    { id: 2, nombre: 'Monitor LG 14"', descripcion: 'Full HD, 24 pulgadas', img: 'https://via.placeholder.com/300x200?text=Monitor', precio: 299.99 },
    { id: 3, nombre: 'Teclado Mecánico', descripcion: 'RGB, switches blue', img: 'https://via.placeholder.com/300x200?text=Teclado', precio: 89.00 },
    { id: 4, nombre: 'Mouse Logitech', descripcion: 'Inalámbrico, 1600 DPI', img: 'https://via.placeholder.com/300x200?text=Mouse', precio: 45.00 },
    { id: 5, nombre: 'Auriculares Sony', descripcion: 'Noise cancelling', img: 'https://via.placeholder.com/300x200?text=Auriculares', precio: 199.99 },
    { id: 6, nombre: 'Webcam HD', descripcion: '1080p, micrófono integrado', img: 'https://via.placeholder.com/300x200?text=Webcam', precio: 75.00 },
  ];

  carrito: Producto[] = [];

  agregarAlCarrito(producto: Producto): void {
    const yaExiste = this.carrito.find(p => p.id === producto.id);
    if (!yaExiste) {
      this.carrito.push(producto);
    }
  }

  estaEnCarrito(producto: Producto): boolean {
    return !!this.carrito.find(p => p.id === producto.id);
  }

  get total(): number {
    return this.carrito.reduce((suma, p) => suma + p.precio, 0);
  }

  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
  }

  abrirCarrito(): void {
    const modalEl = document.getElementById('modalCarrito');
    if (modalEl) {
      // @ts-ignore
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
