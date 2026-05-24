// 1. TIPOS DE ALERTAS
export type AlertType = 'Mantenimiento' | 'ITV' | 'Seguro';

// 2. DETALLES ESPECÍFICOS
export interface RevisionDetails {
    filtroAceite: boolean;
    filtroAire: boolean;
    filtroHabitáculo: boolean;
    filtroCombustible: boolean;
    tipoAceite: string;
}

// 3. ESTRUCTURA DE REVISIÓN
export interface Revision {
    id: string;
    vehiculoId: string;
    tipo: RevisionDetails;
    fechaActual: string;
    fechaProxima: string;
    kilometrajeActual: number;
    kilometrajeProximo: number;
    coste?: number; //opcional
    notas?: string; //opcional
}

// 4. ESTRUCTURA DE ALERTA
export interface Alerta {
    id: string;
    vehiculoId: string;
    tipo: AlertType;
    fechaActual: string;
    fechaProxima: string;
    kilometrajeActual: number;
    kilometrajeProximo: number;
    completado: boolean;
}

// 5. ESTRUCTURA DE VEHÍCULO
export interface Vehículo {
    id: string;
    marca: string;
    modelo: string;
    matricula: string;
    fechaCar?: string;
    revisiones?: Revision[];
    alertas?: Alerta[];
}
