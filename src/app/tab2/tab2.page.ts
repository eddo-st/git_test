import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton,
  IonModal, IonButtons
} from '@ionic/angular/standalone';
import { VehiculosService } from '../vehiculos';
import { Vehículo, Revision } from '../models/data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { 
  add, addOutline, calendarOutline, speedometerOutline,
  cashOutline, documentTextOutline, closeOutline, constructOutline
 } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
      IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
      IonButton, IonIcon, IonFab, IonFabButton, CommonModule, IonModal, IonButtons
  ],
})
export class Tab2Page {

  revisiones: Revision[] = [];

  isModalOpen = false;
  vehiculoSeleccionado: Vehículo | null = null;
  historialRevisiones: Revision[] = [];

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router,
    private route: ActivatedRoute) {
    addIcons({ addOutline, add, calendarOutline, speedometerOutline,
      cashOutline, documentTextOutline, closeOutline, constructOutline });
  }

  ionViewWillEnter() {
    this.revisiones = [...this.vehiculosService.revisiones].sort(
      (a, b) => new Date(b.fechaActual).getTime() - new Date(a.fechaActual).getTime()
    );

    this.route.queryParams.subscribe(params => {
      const idVehiculo = params['vehiculoId'];

      if (idVehiculo) {
        this.verHistorial(idVehiculo);

        this.router.navigate([], {
          queryParams: { vehiculoId: null },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
  }

  getVehiculoInfo(vehiculoId: string): Vehículo | undefined {
    return this.vehiculosService.listavehiculos.find(v => v.id === vehiculoId);
  }

  verHistorial(vehiculoId: string) {
    const vehiculo = this.getVehiculoInfo(vehiculoId);
    if (!vehiculo) return;
    this.vehiculoSeleccionado = vehiculo;
    this.historialRevisiones = this.revisiones.filter(r => r.vehiculoId === vehiculoId);
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.vehiculoSeleccionado = null;
    this.historialRevisiones = [];
  }

  goToAddRevision() {
    console.log('Navegando a AddRevisionPage');
    this.router.navigate(['/add-revision']);
  }

}
