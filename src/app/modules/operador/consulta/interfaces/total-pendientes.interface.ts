export interface OficinasCoIntenos {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinasCoIntenos[];
  error:           string;
}

export interface DataOficinasCoIntenos {
  iCodOficina:   number;
  cNomOficina:   string;
  cSiglaOficina: string;
}


export interface Pendientes {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPendientes[];
  error:           string;
}

export interface DataPendientes {
  fechaPlazoFinal:        null;
  nTiempoRespuesta:       number;
  origenTipoDoc:          number;
  cPrioridadDerivar:      string;
  flg_libreblanco:        string;
  fFecRecepcion:          Date | null;
  iCodMovimiento:         number;
  iCodTramite:            number;
  nFlgTipoDoc:            number;
  cCodificacion:          string;
  iCodTramiteRel:         number;
  fFecRegistro:           Date;
  cFlgTipoMovimiento:     number;
  iCodTrabajadorRegistro: number;
  cDescTipoDoc:           string;
  cNroDocumento:          string;
  iCodRemitente:          number;
  cAsunto:                string;
  iCodTupa:               number;
  iCodOficinaOrigen:      number;
  iCodTramiteDerivar:     number;
  iCodIndicacionDerivar:  number;
  fFecDerivar:            Date;
  iCodTrabajadorDerivar:  number;
  iCodTrabajadorDelegado: number;
  fFecDelegadoRecepcion:  Date | null;
  nEstadoMovimiento:      number;
  fFecDocumento:          Date;
  cCodificacionI:         string;
  nFlgEstado:             number;
  nFlgTipoDerivo:         number;
  tipoPlazoFinal:         number;
  fFecDelegado:           Date | null;
  iCodTramiteRespuesta:   number;
  fFecResponder:          null;
  cParteDiario:           string;
  nombre_remitente:       string;
}
