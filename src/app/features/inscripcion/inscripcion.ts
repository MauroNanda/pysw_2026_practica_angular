import { Component, inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionService, InscripcionData } from '../../core/services/inscripcion';
import DataTable from 'datatables.net-bs5';

@Component({
  selector: 'app-inscripcion',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripcion.html',
  styleUrl: './inscripcion.css',
})
export class Inscripcion implements AfterViewInit {
  private service = inject(InscripcionService);
  private cdr = inject(ChangeDetectorRef);
  private dt: any = null;

  dni = '';
  curso = '';
  email = '';
  precio: number | null = null;
  categoriaAlumno: number | null = null;
  enviado = false;

  readonly categorias = [
    { valor: 1, label: 'Estudiante',  descuento: 0.35 },
    { valor: 2, label: 'Egresado',    descuento: 0.50 },
    { valor: 3, label: 'Particular',  descuento: 0    },
  ];

  get dniValido(): boolean    { return /^\d{7,8}$/.test(this.dni); }
  get emailValido(): boolean  { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email); }
  get cursoValido(): boolean  { return this.curso.trim().length >= 3; }
  get precioValido(): boolean { return !!this.precio && this.precio > 0; }
  get categoriaValida(): boolean { return !!this.categoriaAlumno; }

  get formularioValido(): boolean {
    return this.dniValido && this.emailValido && this.cursoValido &&
           this.precioValido && this.categoriaValida;
  }

  get descuento(): number {
    return this.categorias.find(c => c.valor === Number(this.categoriaAlumno))?.descuento ?? 0;
  }

  get precioFinal(): number {
    return this.precio ? this.precio * (1 - this.descuento) : 0;
  }

  get mostrarPrecioFinal(): boolean {
    return this.precioValido && this.categoriaValida;
  }

  get inscripciones(): InscripcionData[] {
    return this.service.obtenerTodas();
  }

  get resumenPorCategoria() {
    return this.categorias.map(cat => ({
      label: cat.label,
      cantidad: this.inscripciones.filter(i => i.categoriaAlumno === cat.valor).length,
      total: this.inscripciones
        .filter(i => i.categoriaAlumno === cat.valor)
        .reduce((acc, i) => acc + i.precioFinal, 0),
    }));
  }

  get totalGeneral(): number {
    return this.inscripciones.reduce((acc, i) => acc + i.precioFinal, 0);
  }

  nombreCategoria(valor: number): string {
    return this.categorias.find(c => c.valor === valor)?.label ?? '';
  }

  ngAfterViewInit(): void {
    this.initDT();
  }

  private initDT(): void {
    // @ts-ignore
    this.dt = new DataTable('#tablaInscripciones', {
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      language: {
        search:       'Buscar:',
        lengthMenu:   'Mostrar _MENU_ registros',
        info:         'Mostrando _START_ a _END_ de _TOTAL_ inscripciones',
        infoEmpty:    'Sin inscripciones registradas',
        emptyTable:   'No hay inscripciones aún',
        paginate: {
          first:    'Primero',
          last:     'Último',
          next:     'Siguiente',
          previous: 'Anterior',
        },
      },
    });
  }

  private refreshDT(): void {
    if (this.dt) { this.dt.destroy(); this.dt = null; }
    this.cdr.detectChanges();
    setTimeout(() => this.initDT(), 0);
  }

  registrar(): void {
    this.enviado = true;
    if (!this.formularioValido) return;
    this.service.agregar({
      dni: this.dni,
      curso: this.curso,
      email: this.email,
      precio: this.precio!,
      categoriaAlumno: Number(this.categoriaAlumno),
      fechaInscripcion: new Date(),
      precioFinal: this.precioFinal,
    });
    this.resetForm();
    this.refreshDT();
  }

  eliminar(index: number): void {
    this.service.eliminar(index);
    this.refreshDT();
  }

  private resetForm(): void {
    this.dni = '';
    this.curso = '';
    this.email = '';
    this.precio = null;
    this.categoriaAlumno = null;
    this.enviado = false;
  }
}
