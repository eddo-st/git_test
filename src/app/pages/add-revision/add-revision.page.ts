import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehiculosService } from 'src/app/vehiculos';
import { Revision, Vehículo, RevisionDetails, Alerta } from 'src/app/models/data.model';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-revision',
  templateUrl: './add-revision.page.html',
  styleUrls: ['./add-revision.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddRevisionPage implements OnInit {

  listaVehiculos: Vehículo[] = [];

  nuevaRevision = {
    vehiculoId: '',
    tipo: '' as RevisionDetails | '',
    fechaActual: '',
    fechaProxima: '',
    kilometrajeActual: null as number | null,
    kilometrajeProximo: null as number | null,
    coste: null as number | null,
    notas: null as string | null
  };

  constructor(
    private vehiculosService: VehiculosService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.listaVehiculos = this.vehiculosService.listavehiculos;
  }

  async addRevision() {
    if (!this.nuevaRevision.vehiculoId ||
        !this.nuevaRevision.tipo ||
        !this.nuevaRevision.fechaActual ||
        !this.nuevaRevision.fechaProxima ||
        !this.nuevaRevision.kilometrajeActual ||
        !this.nuevaRevision.kilometrajeProximo) {
          alert('Por favor, rellena todos los campos obligatorios.');
          return;
        }
  

  await this.vehiculosService.addRevision({
    id: Date.now().toString(),
    vehiculoId: this.nuevaRevision.vehiculoId,
    tipo: this.nuevaRevision.tipo as unknown as RevisionDetails,
    fechaActual: this.nuevaRevision.fechaActual,
    fechaProxima: this.nuevaRevision.fechaProxima,
    kilometrajeActual: this.nuevaRevision.kilometrajeActual,
    kilometrajeProximo: this.nuevaRevision.kilometrajeProximo,
    coste: this.nuevaRevision.coste || undefined,
    notas: this.nuevaRevision.notas || undefined
    });

    this.router.navigate(['/tabs/tab2']);
  }

  volverTab2() {
    this.router.navigate(['/tabs/tab2']);
  }

}
