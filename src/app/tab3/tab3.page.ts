import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehiculosService } from 'src/app/vehiculos';
import { Vehículo, Alerta } from 'src/app/models/data.model';

import {IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton,
  IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} 
  from '@ionic/angular/standalone';
import { Router } from '@angular/router'

import { addIcons } from 'ionicons';
import { addOutline, notificationsOffOutline } from 'ionicons/icons';

import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
            IonFab, IonFabButton, IonIcon, IonCard, IonCardTitle, IonCardSubtitle,
            IonCardContent, IonCardHeader],
})

export class Tab3Page implements OnInit {

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router
  ) {
    addIcons({ addOutline });
  }

  ngOnInit () {};

  get alertas(): Alerta[] {
    const todasLasAlertas: Alerta[] = [];
    const lista = this.vehiculosService.listavehiculos;

    if (lista && lista.length > 0) {
      lista.forEach(vehiculo => {
        if (vehiculo.alertas && vehiculo.alertas.length > 0) {
          todasLasAlertas.push(...vehiculo.alertas);
        }
      });
    }

    return todasLasAlertas.sort((a, b) => {
      return new Date(a.fechaProxima).getTime() - new Date(b.fechaProxima).getTime();
    });
  }

  getVehiculoInfo(vehiculoId: string): Vehículo | undefined {
    return this.vehiculosService.listavehiculos.find(v => v.id === vehiculoId);
  }

  goToAddAlerta() {
    this.router.navigate(['/add-alert']); 
  }
}
