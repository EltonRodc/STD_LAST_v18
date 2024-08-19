
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

//Consulta Doc. Salida Oficina

export interface ListadoDocSalida {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoDocSalida[];
  error:           string;
}

export interface DataListadoDocSalida {
  nFlgEnvio:             number;
  iCodTramite:           number;
  cDescTipoDoc:          string;
  cCodificacion:         string;
  fFecRegistro:          string;
  cApellidosTrabajador:  string;
  cNombresTrabajador:    string;
  cReferencia:           string;
  casunto:               string;
  cObservaciones:        string;
  nFlgRpta:              number;
  cRptaOK:               number;
  nFlgClaseDoc:          number;
  iCodOficinasolicitado: number;
  iCodRemitente:         number;
  cNombre:               string;
  cCodTipoDoc:           number;
  iCodOficinaRegistro:   number;
  cNomRemite:            string;
  cCodificacionI:        string;
  nFlgAnulado:           number;
  nFlgEstado:            number;
}

export interface FormularioDocumentoSalida {
  fDesde:string,
  fHasta:string,
  RespuestasI: number,
  RespuestaNO: number,
  Codificacion: string,
  Asunto : string,
  Observaciones : string,
  CodTipoDoc : number,
  cNombre : string,
  Respuesta : number,
  RegistroPersonal : number,
  RegistroSolicitado : number,
  CodOficinaLogin : number,
  Columna   : string,
  Idir   : string,
  NTramite   : string,
  Referencia   : string,
}

export interface CmbSalDireccion {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataCmbSalDireccion[];
  error:           string;
}

export interface DataCmbSalDireccion {
  cDireccion:    string;
  cDepartamento: string;
  cProvincia:    string;
  cDistrito:     string;
}

//Consulta Control Cargos

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

//Consulta Doc. Interno General
export interface ListadoDocInternoGeneral {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoDocInternoGeneral[];
  error:           string;
}

export interface DataListadoDocInternoGeneral {
  iCodTramite:            number;
  nFlgTipoDoc:            number;
  nFlgTipoDerivo:         number;
  cDescTipoDoc:           string;
  cCodificacion:          string;
  cNomOficina:            string;
  fFecDocumento:          string;
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
  fechA_DOCUMENTO:        string;
  nFlgPersonal:           number;
  nFlgClaseDoc:           number;
  cCodificacionI:         string;
  cParteDiario:           string;
  cDesTema:               string;
  iCodTema:               number;
  iCodTramitePrincipal:   number;
  cPeriodoregistro:       number;
  codCUI:                 string;
  cCodificacionPrincipal: string;
  iCodMovimiento:         number;
}

export interface FormularioDocInternoGeneral {
  fDesde:string,
  fHasta:string,
  SI: string,
  NO: string,
  Codificacion: string,
  NroDocumento : string,
  Asunto : string,
  Observaciones : string,
  CodTipoDoc : number,
  CodOficinaori : number,
  CodOficinaDes : number,
  CodTema : number,
  Gerencia : number,
  ParteDiario : string,
  CUI  : string,
  Regini  : number,
  Size  : number,
}

//Consulta Control Cargos Oficina
export interface ListadoControlCargosOfi {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoControlCargosOfi[];
  error:           string;
}

export interface DataListadoControlCargosOfi {
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

export interface FormularioControlCargosOfi {
  fDesde:string,
  fHasta:string,
  ChxfRespuesta: number,
  fEntrega: number,
  Codificacion: string,
  Nombre : string,
  Direccion : string,
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
  CodOficinaLogin  : number,
}

//Consulta Plazo Vencidos
export interface ListadoPlazoVencidos {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoPlazoVencidos[];
  error:           string;
}

export interface DataListadoPlazoVencidos {
  iCodTramite:        number;
  cCodificacion:      string;
  cCodTipoDoc:        number;
  cNroDocumento:      string;
  casunto:            string;
  nFlgEstado:         number;
  iCodTupa:           number;
  cDesTema:           string;
  fFecRegistro:       string;
  fFecFinalizar:      string;
  cDescTipoDoc:       string;
  cNomOFicina:        string;
  nTiemporespuesta:   number;
  fechaPlazoFinal:    string;
  proceso:            number;
  iCodTramiteRel:     number;
  iCodOficinaDerivar: number;
  proceso2:           number;
}

export interface FormularioPlazoVencidos {
  fDesde:string,
  fHasta:string,
  Codificacion: string,
  NroDocumento : string,
  Asunto : string,
  CodTupa : number,
  CodTipoDoc : number,
  CodOficinario : number,
  CodOficinaDes : number,
  CodTrabajadoresponsable : number,
  CodTema : number,
  InicioPagina : number,
  SizePagina  : number,
}

export interface CmbTpoDcmto {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataCmbTpoDcmto[];
  error:           string;
}

export interface DataCmbTpoDcmto {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}

//Consulta Alertas
export interface ListadoAlertas {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListadoAlertas[];
  error:           string;
}

export interface DataListadoAlertas {
  iCodTramite:        number;
  cCodificacion:      string;
  cCodTipoDoc:        number;
  cNroDocumento:      string;
  cAsunto:            string;
  nFlgEstado:         number;
  iCodTupa:           number;
  fFecRegistro:       string;
  fFecFinalizar:      string;
  cDescTipoDoc:       string;
  cNomOFicina:        string;
  nTiempoRespuesta:   number;
  proceso:            number;
  iCodTramiteRel:     number;
  iCodOficinaDerivar: number;
  proceso2:           number;
}

export interface FormularioAlertas {
  fDesde:string,
  fHasta:string,
  Codificacion: string,
  NroDocumento : string,
  Asunto : string,
  CodTupa : number,
  CodTipoDoc : number,
  CodOficinaOri : number,
  CodOficinaDes : number,
  CodTrabajadoresponsable : number,
  Columna : string,
  Idir  : string,
}

export interface CmbTupa {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataCmbTupa[];
  error:           string;
}

export interface DataCmbTupa {
  iCodTupa:      number;
  iCodTupaClase: number;
  iCodOficina:   number;
  cNomTupa:      string;
}

export interface CmbResponsable {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataCmbResponsable[];
  error:           string;
}

export interface DataCmbResponsable {
  iCodTrabajador:       number;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
}
