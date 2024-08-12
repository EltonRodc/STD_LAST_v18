export interface DetalleGeneral {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleGeneral[];
  error:           string;
}

export interface DataDetalleGeneral {
  iCodTramite:           number;
  cCodificacionI:        string;
  cCodificacion:         string;
  cParteDiario:          string;
  cNumContrato:          string;
  cTramo:                string;
  nFlgAnulado:           number;
  fFecActualizacion:     Date | null;
  nFlgEstado:            number;
  fechaPlazoFinal:       Date | null | string;
  nFlgTipoDoc:           number;
  nFlgClaseDoc:          number;
  nFlgTipoDerivo:        number;
  fFecRegistro:          Date | null;
  fechA_DOCUMENTO:       null;
  nNumFolio:             string;
  nTipoPresentacion:     number;
  nConfidencialidad:     number;
  nDistribucion:         number;
  archivO_FISICO:        string;
  fFecEntregaFisico:     null;
  cApellidosTrabajador:  string;
  cNombresTrabajador:    string;
  cDescTipoDoc:          string;
  cDesTema:              string;
  cAsunto:               string;
  cObservaciones:        string;
  codCUI:                string;
  cNroDocumento:         string;
  iCodRemitente:         number;
  cNomRemite:            string;
  iCodOficinaRegistro:   number;
  iCodIndicacion:        number;
  iCodOficinaSolicitado: number;
  nFlgEnvio:             number;
}


//Remitente

export interface Remitente {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataRemitente[];
  error:           string;
}

export interface DataRemitente {
  nNumDocumento:  string;
  cNombre:        string;
  cRepresentante: string;
  cDireccion:     string;
  cEmail:         string;
  cDepartamento:  string;
  cProvincia:     string;
  cDistrito:      string;
  nTelefono:      string;
  nFax:           string;
}


// Seguimiento

export interface DetalleSeguimiento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleSeguimiento[];
  error:           string;
}

export interface DataDetalleSeguimiento {
  archivo_fisico:            string;
  bFlgMovAnulado:            string;
  cCodificacion:             string;
  cCodificacionI:            string;
  cDescTipoDoc:              string;
  cFlgEstadoMen:             string;
  cFlgTipoMovimiento:        string;
  cNombre:                   string;
  cNomOficinaDerivar:        string;
  cNumDocumentoDerivar:      string;
  cObservacionesDelegado:    string;
  cObservacionesDerivar:     string;
  cObservacionesFinalizar:   string;
  cObservacionesMen:         string;
  cParteDiario:              string;
  cRecibidoMen:              string;
  cReferenciaDerivar:        string;
  cSiglaOficinaDerivar:      string;
  cSiglaRemitente:           string;
  fFecDelegado:              null;
  fFecDelegadoRecepcion:     null;
  fFecDerivar:               Date | null;
  fFecFinalizar:             null;
  fFecRecepcion:             Date | null;
  iCodAsignadoPor:           number;
  iCodAuto:                  number;
  iCodIndicacionDelegado:    number;
  iCodIndicacionDerivar:     number;
  iCodMovimiento:            number;
  iCodMovimientoAntecesor:   number;
  iCodMovimientoRel:         number;
  iCodOficinaDerivar:        number;
  iCodOficinaOrigen:         number;
  iCodTrabajadorDelegado:    number;
  iCodTrabajadorEnviar:      number;
  iCodTrabajadorEnvioMen:    number;
  iCodTrabajadorFinalizar:   number;
  iCodTrabajadorProfesional: number;
  iCodTramite:               number;
  iCodTramiteDerivar:        number;
  iCodTramiteRespuesta:      number;
  nEstadoMovimiento:         number;
  nEstadoPago:               number;
  nFlgTipoDoc:               number;
  nFlgTipoDocPrin:           number;
  nNumFolio:                 number;
  nRequiereRpta:             number;
}
