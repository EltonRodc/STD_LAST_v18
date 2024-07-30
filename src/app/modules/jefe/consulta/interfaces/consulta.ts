
// Doc.Interno Oficina
export interface ListadoComboOficina {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoComboOficina[];
  error:           string;
}

export interface DataListadoComboOficina {
  iCodOficina: number;
  cNomOficina: string;
}

export interface ListadoComboTipoDocumento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoComboTipoDocumento[];
  error:           string;
}

export interface DataListadoComboTipoDocumento {
  codTipoDoc:  number;
  descTipoDoc: string;
}

export interface ListadoComboTemas {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoComboTemas[];
  error:           string;
}

export interface DataListadoComboTemas {
  iCodTema: number;
  cDesTema: string;
}

export interface FormularioInternoOficina {
  fDesde:string,
  fHasta:string,
  SI: number,
  NO: number,
  nTramite: string,
  cCodificacion: string,
  Asunto: string,
  Observaciones: string,
  CodTipoDoc: number,
  CodOficina: number,
  CodOficinaLogin: number,
  CodTema: number,
  Regini: number,
  Size: number,
}

export interface ResultadoOficinaInterno {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataResultadoOficinaInterno[];
  error:           string;
}

export interface DataResultadoOficinaInterno {
  iCodTramite:            number;
  nFlgTipoDoc:            number;
  nFlgTipoDerivo:         number;
  cDescTipoDoc:           string;
  cCodificacion:          string;
  cNomOficina:            string;
  fFecDocumento:          Date;
  casunto:                string;
  cObservaciones:         string;
  cReferencia:            string;
  cApellidosTrabajador:   string;
  cNombresTrabajador:     string;
  nFlgEnvio:              number;
  iCodTrabajadorRegistro: number;
  cCodTipoDoc:            number;
  iCodOficinaRegistro:    number;
  cNroDocumento:          string;
  nFlgAnulado:            number;
  trabApellidosCrea:      string;
  trabNombreCrea:         string;
  destino:                string;
  fechA_DOCUMENTO:        Date;
  nFlgPersonal:           number;
  nFlgClaseDoc:           number;
  cCodificacionI:         string;
  cParteDiario:           string;
  cDesTema:               string;
  iCodTema:               number;
  iCodTramitePrincipal:   number;
  cPeriodoregistro:       number;
  cCodificacionPrincipal: string;
  iCodMovimiento:         number;
}

export interface DocumentosAdjuntos {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDocumentosAdjuntos[];
  error:           string;
}

export interface DataDocumentosAdjuntos {
  iCodDigital:         number;
  cRuta:               string;
  nTipo:               number;
  cDescripcionDigital: string;
  cNombreOriginal:     string;
  cRutaExterna:        string;
}

// Doc.Salida Oficina
export interface ListadoComboTpoDcmto {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoComboTpoDcmto[];
  error:           string;
}

export interface DataListadoComboTpoDcmto {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}

export interface FormularioSalidaOficina {
  fDesde:string,
  fHasta:string,
  respuestasI: number,
  respuestaNO: number,
  codificacion: string,
  asunto: string,
  observaciones: string,
  codTipoDoc: number,
  cNombre: string,
  respuesta: number,
  registroPersonal: number,
  registroSolicitado: number,
  codOficinaLogin: number,
  columna: string,
  idir: string,
  nTramite: string,
  referencia: string,
}

// export interface ResultadoOficinaSalida {
//     recordsTotal:    number;
//     recordsFiltered: number;
//     data:            DataResultadoOficinaSalida[];
//     error:           string;
// }

// export interface DataResultadoOficinaSalida {
//     iCodTramite:            number;
//     nFlgTipoDoc:            number;
//     nFlgTipoDerivo:         number;
//     cDescTipoDoc:           string;
//     cCodificacion:          string;
//     cNomOficina:            string;
//     fFecDocumento:          Date;
//     casunto:                string;
//     cObservaciones:         string;
//     cReferencia:            string;
//     cApellidosTrabajador:   string;
//     cNombresTrabajador:     string;
//     nFlgEnvio:              number;
//     iCodTrabajadorRegistro: number;
//     cCodTipoDoc:            number;
//     iCodOficinaRegistro:    number;
//     cNroDocumento:          string;
//     nFlgAnulado:            number;
//     trabApellidosCrea:      string;
//     trabNombreCrea:         string;
//     destino:                string;
//     fechA_DOCUMENTO:        Date;
//     nFlgPersonal:           number;
//     nFlgClaseDoc:           number;
//     cCodificacionI:         string;
//     cParteDiario:           string;
//     cDesTema:               string;
//     iCodTema:               number;
//     iCodTramitePrincipal:   number;
//     cPeriodoregistro:       number;
//     cCodificacionPrincipal: string;
//     iCodMovimiento:         number;
// }



export interface ListadoControlCargos {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoControlCargos[];
  error:           string;
}

export interface DataListadoControlCargos {
  iCodAuto:                 number;
  cOrdenServicio:           string;
  cSiglaOficina:            string;
  cDescTipoDoc:             string;
  iCodTrabajadorEnvio:      number;
  cNombresTrabajador:       string;
  cApellidosTrabajador:     string;
  fRespuesta:               string;
  fEntrega:                 string;
  cFlgEnvio:                string;
  cFlgEstado:               number;
  cRecibido:                string;
  cNomOficina:              string;
  cNombre:                  string;
  cDireccion:               string;
  cNomDepartamento:         string;
  cNomProvincia:            string;
  cNomDistrito:             string;
  cFlgEnvio_copy:           string;
  cNumGuia:                 string;
  cNumGuiaservicio:         string;
  fFecRegistro:             string;
  cDepartamento:            string;
  cProvincia:               string;
  cDistrito:                string;
  cObservaciones:           string;
  iCodTramite:              number;
  cCodTipoDoc:              number;
  iCodRemitente:            number;
  cCodificacion:            string;
  casunto:                  string;
  tRemitente:               string;
  cNomRemite:               string;
  iCodTrabajadorRegistro:   number;
  iCodTrabajadorSolicitado: number;
  codigO_PAIS:              string;
  fechA_DOCUMENTO:          string;
  fecha_Acepta_Mensajeria:  string;
  cFlgUrgente:              string;
  cCodificacionI:           string;
  nFlgAnulado:              number;
}

export interface FormularioControlCargos {
  fDesde:string,
  fHasta:string,
  ChxfRespuesta: number,
  fEntrega: number,
  Codificacion: string,
  Nombre : string,
  Idireccion : string,
  CodTipoDoc : number,
  NumGuiaservicio : string,
  FlgUrgente : number,
  CodTrabajadorEnvio : number,
  FlgLocal : number,
  FlgNacional : number,
  FlgInternacional : number,
  CodOficina  : number,
  FlgEstado  : number,
  CodDepartamento  : string,
  CodProvincia  : string,
  CodDistrito  : string,
  Columna   : string,
  Idir   : string,
}

export interface ComboTpoDcmto {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboTpoDcmto[];
  error:           string;
}

export interface DataComboTpoDcmto {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}

export interface ComboOfcnOrigen {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboOfcnOrigen[];
  error:           string;
}

export interface DataComboOfcnOrigen {
  iCodOficina: number;
  cNomOficina: string;
}

export interface ComboDepartamento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboDepartamento[];
  error:           string;
}

export interface DataComboDepartamento {
  cCodDepartamento: string;
  cNomDepartamento: string;
}

export interface ComboProvincias {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboProvincias[];
  error:           string;
}

export interface DataComboProvincias {
  cCodDepartamento: string;
  cCodProvincia:    string;
  cNomProvincia:    string;
  idProvincia:      string;
}

export interface ComboDistritos {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboDistritos[];
  error:           string;
}

export interface DataComboDistritos {
  cCodDepartamento: number;
  cCodProvincia:    number;
  cCodDistrito:     number;
  cNomDistrito:     string;
}
