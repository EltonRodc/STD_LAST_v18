//Combo de Tipo Documento
export interface BandejaComboTipoDocumento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataBandejaComboTipoDocumento[];
  error:           string;
}

export interface DataBandejaComboTipoDocumento {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}


//Combo Oficina Destino
export interface BandejaComboOficinaDestino {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataBandejaComboOficinaDestino[];
  error:           string;
}

export interface DataBandejaComboOficinaDestino {
  iCodOficina: number;
  cNomOficina: string;
}

//Resultado = tabla
export interface BandejaTablaDerivados {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataBandejaTablaDerivados[];
  error:           string;
}

export interface DataBandejaTablaDerivados {
  iCodTramite:             number;
  cCodificacion:           string;
  cCodificacionI:          string;
  fFecDocumento:           Date | null;
  tipoDocPrincipal:        string;
  cNroDocumento:           string;
  iCodRemitente:           number;
  iCodTramiteDerivar:      number;
  cPrioridadDerivar:       string;
  nFlgTipoDoc:             string;
  tipoDocDerivado:         string;
  cCodificacionPrincipal:  string;
  cNroDocumentoPrincipal:  string;
  iCodTramiteRel:          number;
  cFlgTipoMovimiento:      number;
  oficinaDerivada:         string;
  casunto:                 string;
  casuntoDerivar:          string;
  fFecDerivar:             Date | null;
  iCodOficinaDerivar:      number;
  fFecRecepcion:           null;
  iCodMovimiento:          number;
  nFlgTipoDocMov:          string;
  fFecFinalizar:           null;
  iCodTrabajadorDerivar:   number;
  nEstadoMovimiento:       number;
  iCodTrabajadorDelegado:  number;
  iCodTrabajadorFinalizar: number;
  fFecDelegadoRecepcion:   Date | null;
  cNumDocumentoDerivar:    string;
}

//Excel
export interface BandejaExcelDerivados {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataBandejaExcelDerivados[];
  error:           string;
}

export interface DataBandejaExcelDerivados {
  cPrioridadDerivar:       string;
  documento:               string;
  cNroDocumento:           string;
  iCodRemitente:           number;
  nFlgTipoDoc:             number;
  iCodTramite:             number;
  cCodificacion:           string;
  iCodTramiteRel:          number;
  fFecRegistro:            string;
  cFlgTipoMovimiento:      number;
  cAsunto:                 string;
  cAsuntoDerivar:          string;
  fFecDerivar:             Date | null;
  iCodOficinaDerivar:      number;
  fFecRecepcion:           Date | null;
  iCodMovimiento:          number;
  fFecDocumento:           Date | null;
  fFecFinalizar:           Date | null;
  iCodTrabajadorDerivar:   number;
  iCodTrabajadorDelegado:  number;
  iCodTrabajadorFinalizar: number;
  cDescTipoDoc:            string;
  cNumDocumentoDerivar:    string;
  iCodTramiteDerivar:      number;
}

//Excel Oficina Derivada
export interface BandejaOficinaDerivado {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataBandejaOficinaDerivado[];
  error:           string;
}

export interface DataBandejaOficinaDerivado {
  cNomOficina:   string;
  cSiglaOficina: string;
}



