
//Mantenimiento Oficina
export interface ListaOficina {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaOficina[];
  error:           string;
}

export interface DataListaOficina {
  iCodOficina:   number;
  cNomOficina: string;
  cSiglaOficina:   number;
  iCodUbicacion:  number;
  iFlgEstado:   number;
  iFlgVisible:     number;
  envioDirectoColaborador:  number;
  iCodResponsable:  number;
  jefe_nombres:   number;
  jefe_apellidos: string;
  cDesTipoOficina: string;
  asignaCorrelativo:  number;
  iFlgVisibleExterno:   number;
  cNomUbicacion: string;
  iCodTipo:   number;
  casEST:   number;
  fFechaActualizacionOficina: string;
  origen:   number;
  destino:   number;
}

export interface ComboUbicacion {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboUbicacion[];
  error:           string;
}

export interface DataComboUbicacion {
  iCodUbicacion:   number;
  cNomUbicacion: string;
  nFlagEstado:   number;
  cCodDepartamento:  number;
  nColumasImpresion:   number;
}

export interface ComboTipo {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboTipo[];
  error:           string;
}

export interface DataComboTipo {
  cCodTipoOficina:   number;
  cDesTipoOficina: string;
}
