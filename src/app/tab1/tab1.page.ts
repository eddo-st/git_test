import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton,
  IonCardSubtitle
} from '@ionic/angular/standalone';
import { VehiculosService } from '../vehiculos';
import { Vehículo } from '../models/data.model';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { add, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
    IonButton, IonIcon, IonFab, IonFabButton, CommonModule, RouterLink
  ],
})
export class Tab1Page {

  vehiculos: Vehículo[] = [];

  constructor(
    private alertController: AlertController,
    private vehiculosService: VehiculosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ addOutline, add });
  }

  ionViewWillEnter() {
    this.loadVehiculos();
  }

  loadVehiculos() {
    this.vehiculos = this.vehiculosService.listavehiculos;
  }

  async deleteVehiculo(vehiculo: Vehículo) {
    const alert = await this.alertController.create({
      header: '¿Eliminar vehículo?',
      message: '¿Seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.vehiculosService.deleteVehiculo(vehiculo.id);
            this.loadVehiculos();
          }
        }
      ]
    });
    await alert.present();
  }

  goToAddVehiculo() {
    console.log('Navegando a AddVehiculoPage');
    this.router.navigate(['/add-vehiculo']);
  }
}
