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
    { id: 1, nombre: 'Notebook Asus 13L', descripcion: 'Disco 40GB, 15 pulgadas', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop', precio: 450.50 },
    { id: 2, nombre: 'Monitor LG 14"', descripcion: 'Full HD, 24 pulgadas', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop', precio: 299.99 },
    { id: 3, nombre: 'Teclado Mecánico', descripcion: 'RGB, switches blue', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop', precio: 89.00 },
    { id: 4, nombre: 'Mouse Logitech', descripcion: 'Inalámbrico, 1600 DPI', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop', precio: 45.00 },
    { id: 5, nombre: 'Auriculares Sony', descripcion: 'Noise cancelling', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', precio: 199.99 },
    { id: 6, nombre: 'Webcam HD', descripcion: '1080p, micrófono integrado', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop', precio: 75.00 },
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
