import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Vehículo, Revision, Alerta } from './models/data.model';

@Injectable({
  providedIn: 'root',
})

export class VehiculosService {
  private _storage: Storage | null = null;
  private _vehiculos: Vehículo[] = [];
  private _revisiones: Revision[] = [];
  private _alertas: Alerta [] = [];

  private dbReady: Promise<void>;

  constructor(private storage: Storage) {
    this.dbReady = this.initDB();
  }

// INICIALIZACIÓN DE LA BASE DE DATOS
  async initDB() {
    const storage = await this.storage.create();
    this._storage = storage;
    this._vehiculos = (await this._storage.get('vehiculos')) || [];
    this._revisiones = (await this._storage.get('revisiones')) || [];
    this._alertas = (await this._storage.get('alertas')) || [];
  }

// LISTA DE VEHÍCULOS, REVISIONES Y ALERTAS PARA CUALQUIER MÉTODO QUE LO NECESITE
  get listavehiculos(): Vehículo[] {
    return this._vehiculos;
  }

  get revisiones(): Revision[] {
    return this._revisiones;
  }

  get alertas(): Alerta[] {
    return this._alertas;
  }

// MÉTODO PARA AÑADIR UN VEHÍCULO
  async addVehiculo(vehiculo: Vehículo) {
    await this.dbReady;
    this._vehiculos.push(vehiculo);
    if (this._storage) {
      await this._storage.set('vehiculos', this._vehiculos);
    }
  }

// MÉTODO PARA ELIMINAR UN VEHÍCULO
  async deleteVehiculo(id: string) {
    await this.dbReady;
    this._vehiculos = this._vehiculos.filter(v => v.id !== id);
    if (this._storage) {
      await this._storage.set('vehiculos', this._vehiculos);
    }
  }

// MÉTODO PARA AÑADIR UNA REVISIÓN
  async addRevision(revision: Revision) {
    await this.dbReady;
    this._revisiones.push(revision);
    if (this._storage) {
      await this._storage.set('revisiones', this._revisiones);
    }
  }

//MÉTODO PARA AÑADIR UNA ALERTA
  async addAlert(alerta: Alerta) {
    await this.dbReady;
    this._alertas.push(alerta);
    if (this._storage) {
      await this._storage.set('alertas', this._alertas);
    }
  }  

}