import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon} 
  from '@ionic/angular/standalone';

import { Revision, Vehículo, RevisionDetails, Alerta, AlertType } from 'src/app/models/data.model';

import { Router } from '@angular/router';
import { VehiculosService } from 'src/app/vehiculos';
import { LocalNotifications } from '@capacitor/local-notifications';

import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-alert',
  templateUrl: './add-alert.page.html',
  styleUrls: ['./add-alert.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
            IonList, IonItem, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon
  ]
})
export class AddAlertPage implements OnInit {

  listaVehiculos: Vehículo[] = [];

  nuevaAlerta = {
    vehiculoId: '',
    tipo: '',
    fechaActual: '',
    fechaProxima: '',
    notas: null as string | null
  };

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listaVehiculos = this.vehiculosService.listavehiculos;
  }

  async addAlerta() {
    if (!this.nuevaAlerta.vehiculoId || !this.nuevaAlerta.tipo ||
        !this.nuevaAlerta.fechaActual || !this.nuevaAlerta.fechaProxima) {
          alert('Por favor, rellena todos los campos.');
          return;
        }

    const vehiculo = this.listaVehiculos.find(v => v.id === this.nuevaAlerta.vehiculoId);
    const alertaId = Date.now().toString();

    const nuevaAlerta: Alerta = {
      id: alertaId,
      vehiculoId: this.nuevaAlerta.vehiculoId,
      tipo: this.nuevaAlerta.tipo as AlertType,
      fechaActual: this.nuevaAlerta.fechaActual,
      fechaProxima: this.nuevaAlerta.fechaProxima,
      kilometrajeActual: 0,
      kilometrajeProximo:0,
      completado: false
    };

    if (vehiculo) {
      if (!vehiculo.alertas) vehiculo.alertas = [];
      vehiculo.alertas.push(nuevaAlerta);
    }

    const fechaNotificacion = new Date(this.nuevaAlerta.fechaProxima);
    fechaNotificacion.setMonth(fechaNotificacion.getMonth() - 1);
    fechaNotificacion.setHours(9, 0, 0, 0);

    const permisos = await LocalNotifications.requestPermissions();

    if (permisos.display === 'granted' && fechaNotificacion > new Date()) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title: `Próximo vencimiento: ${this.nuevaAlerta.tipo}`,
            body: `${vehiculo?.marca} ${vehiculo?.modelo} - ${vehiculo?.matricula}`,
            schedule: { at: fechaNotificacion },
            sound: 'default',
            actionTypeId: '',
            extra: { alertaId: alertaId }
          }
        ]
      });
    }

    this.volverTab3();
  }

  volverTab3() {
    this.router.navigate(['/tabs/tab3']);
  }
}