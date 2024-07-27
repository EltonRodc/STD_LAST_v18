//Mantenimiento Mensajeria
export interface ListMensajeria {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListMensajeria[];
  error:           string;
}

export interface DataListMensajeria {
  iCodMensajeria: number;
  cContenido:   string;
  iCodTrabajadorDestino:  number;
  iCodOficinaDestino:  number;
  fFechaRegistro:  Date;
  nEstadoMensaje:   string;
  iCodTrabajadorRegistro:  number;
  nNivel:   string;
  nPrioridad:   string;
  cNombresTrabajador:   string;
  cApellidosTrabajador:   string;
}

export interface PostAddMensajeria {
  contenido:      string;
  codTrabajadorDestino:   number;
  codOficinaDestino: number;
  estadoMensaje:      number;
  codTrabajadorRegistro: number;
  nivel:      number;
  prioridad: number;
}

export interface DetalleMensajeria {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleMensajeria[];
  error:           string;
}

export interface DataDetalleMensajeria {
  iCodMensajeria: number;
  cContenido:   string;
  iCodTrabajadorDestino:  number;
  iCodOficinaDestino:  number;
  fFechaRegistro:  Date;
  nEstadoMensaje:   string;
  iCodTrabajadorRegistro:  number;
  nNivel:   string;
  nPrioridad:   string;
}

export interface UpdateMensajeria {
  codMensajeria:      number;
  contenido:      string;
  codTrabajadorDestino:      number;
  codOficinaDestino:      number;
  estadoMensaje:      number;
  codTrabajadorRegistro:      number;
  nivel:      number;
  prioridad:      number;
}

export interface ListOfcnaDestino {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListOfcnaDestino[];
  error:           string;
}

export interface DataListOfcnaDestino {
  iCodOficina: number;
  cNomOficina: string;
}
