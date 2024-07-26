// Tema
export interface TemasJefe {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataTemasJefe[];
  error:           string;
}

export interface DataTemasJefe {
  icodtema: number;
  cdestema: string;
}

//Tipo Documental
export interface TipoDocumentalJefe {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataTipoDocumentalJefe[];
  error:           string;
}

export interface DataTipoDocumentalJefe {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
  cSiglaDoc:    string;
  cAnexo:       string;
  iCodPIDE:     string;
}

//Lista de Oficinas Paso 1 Registro Interno
export interface ListaOficinasPaso1 {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaOficinasPaso1[];
  error:           string;
}

export interface DataListaOficinasPaso1 {
  iCodOficina:   number;
  cNomOficina:   string;
  cSiglaOficina: string;
  iCodUbicacion: number;
}

//Responsable de Oficina
export interface ResponsableOficina {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataResponsableOficina[];
  error:           string;
}

export interface DataResponsableOficina {
  iCodTrabajador:        number;
  cNombresTrabajador:    string;
  cApellidosTrabajador:  string;
  cargo:                 string;
  iCodModalidadContrato: number;
}


//Lista de Indicaciones
export interface ListaIndicaciones {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaIndicaciones[];
  error:           string;
}

export interface DataListaIndicaciones {
  iCodIndicacion: number;
  cIndicacion:    string;
}


// Metodo post para agregar registro
export interface RegistroDocIntOficina {
  numAnio:               string;
  codTrabajadorRegistro: number;
  codOficinaRegistro:    number;
  codTipoDoc:            number;
  asunto:                string;
  observaciones:         string;
  archivoFisico:         string;
  tipoDerivacion:        number;
  codOficinaDeriv:       number;
  codTrabajadorDerivar:  number;
  codIndicacionDeriv:    number;
  prioridad:             string;
  confidencialidad:      number;
  parteDiario:           string;
  codTema:               number;
  fechaPlazoMaximo:      string;
  cui:                   string;
}

// Numero Correlativo
export interface NumeroCorrelativo {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataNumeroCorrelativo[];
  error:           string;
}

export interface DataNumeroCorrelativo {
  codificacion: string;
  correlativo:  number;
  sigla:        string;
  periodo:      string;
  encontrado:   number;
}

export interface DataParametrosCorrelativo {
  CodTipoDoc: number;
  CodOficina: number;
  NumAnio:    string;
  Idusuario:  number;
  Tipo:       number;
}

// Paso 2
export interface DetalleRegistroJefe {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetalleRegistroJefe[];
  error:           string;
}

export interface DataDetalleRegistroJefe {
  iCodTramite:          number;
  cCodificacionI:       string;
  cCodificacion:        string;
  cNroDocumento:        string;
  cParteDiario:         string;
  fFecDocumento:        Date;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
  cAsunto:              string;
  cObservaciones:       string;
  archivO_FISICO:       string;
  cDescTipoDoc:         string;
  nFlgTipoDoc:          number;
  cCodTipoDoc:          number;
  nFlgEnvio:            number;
}

//Listado de Popup Referencia
export interface ListPopupReferencia {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListPopupReferencia[];
  error:           string;
}

export interface DataListPopupReferencia {
  tramiteOriginal:      number;
  iCodTramiteDerivar:   number;
  tramiteoficinaorigen: number;
  tramite:              string;
  fFecDerivar:          Date;
  tramiteCOD:           number;
  iCodTramite:          number;
  nFlgTipoDerivo:       number;
  nFlgTipoDoc:          number;
  cNroDocumento:        string;
  cCodificacion:        string;
  cAsunto:              string;
  cObservaciones:       string;
  iCodRemitente:        number;
  cParteDiario:         string;
  cDescTipoDoc:         string;
  cNombre:              string;
  nNumDocumento:        string;
  cDescDocIdentidad:    string;
  cNomOficina:          string;
  cSiglaOficina:        string;
}


//Listado de Referencia
export interface ListReferencia {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListReferencia[];
  error:           string;
}

export interface DataListReferencia {
  iCodReferencia:    number;
  iCodTramite:       number;
  iCodTramiteRef:    number;
  cReferencia:       string;
  cCodSession:       string;
  cDesEstado:        string;
  iCodTipo:          number;
  identificador:     string;
  cAsuntoReferencia: string;
  bArchivar:         boolean;
  iCodMovimientoRef: number;
}

//Doc Adjuntos

//OrdenarArchivos Complementarios
export interface OrdenarArchivos {
  iCodTramite:    number;
  iCodDigital:    number;
  nEstadoDigital: number;
  norden:         number;
}

//Oficinas
//Oficinas Derivadas
export interface ListaOficinasDerivadas {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaOficinasDerivadas[];
  error:           string;
}

export interface DataListaOficinasDerivadas {
  iCodMovimiento:       number;
  cNomOficina:          string;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
  cIndicacion:          string;
  cPrioridadDerivar:    string;
  cFlgTipoMovimiento:   number;
  fFecDerivar:          Date;
  fFecRecepcion:        null;
}


//Agregar Oficina
export interface AddOficina {
  codTramite:        number;
  codTrabajador:     number;
  codOficinaOrigen:  number;
  codOficinaDestino: number;
  codIndicacionMov:  number;
  prioridad:         string;
  codPerfil:         number;
  codTipoMovimiento: number;
  verificaDuplicado: number;
  verificaEnviado:   number;
  editar:            number;
}
