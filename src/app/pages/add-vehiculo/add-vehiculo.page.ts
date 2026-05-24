import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehiculosService } from 'src/app/vehiculos';
import { Vehículo } from 'src/app/models/data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.page.html',
  styleUrls: ['./add-vehiculo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddVehiculoPage implements OnInit {

  marca: string = '';
  modelo: string = '';
  matricula: string = '';
  fechaCar?: string = '';

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router
  ) { }

  async addVehiculo() {
    if (!this.marca.trim() || !this.modelo.trim() || !this.matricula.trim()) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

  const matriculaPattern = /^\d{4}[A-Z]{3}$/;
  const matriculaMayús = this.matricula.trim().toUpperCase();

  if (!matriculaPattern.test(matriculaMayús)) {
    alert('La matrícula debe tener el formato "1234ABC" (4 dígitos seguidos de 3 letras mayúsculas).');
    return;
  }

  const fechaPattern = /^\d{4}$/;

  if (this.fechaCar && !fechaPattern.test(this.fechaCar.trim())) {
    alert('Por favor, introduce un año de fabricación válido (4 dígitos).');
    return;
  }

  const newVehículo: Vehículo = {
    id: Date.now().toString(),
    marca: this.marca.trim(),
    modelo: this.modelo.trim(),
    matricula: matriculaMayús,
    fechaCar: this.fechaCar?.trim(),
    alertas: []
  };

  await this.vehiculosService.addVehiculo(newVehículo);

  this.marca = '';
  this.modelo = '';
  this.matricula = '';
  this.fechaCar = '';

  this.router.navigate(['/tabs/tab1']);
  }
  
  volverTab1() {
    this.router.navigate(['/tabs/tab1']);
  }

  ngOnInit() {
  }

}
