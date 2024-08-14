export interface RegistroPVD {
  idUsuario:            number;
  idOficinaUsuario:     number;
  fechaDocumento:       string;
  parteDiario:          string;
  codigoRemitente:      number;
  remite:               string;
  codigoTipoDocumento:  number;
  numeroDocumento:      string;
  asunto:               string;
  observaciones:        string;
  archivoFisico:        string;
  codigoOficinaDerivar: number;
  codigoIndicacion:     number;
  prioridadDerivar:     string;
  numeroContrato:       string;
  codigoBarra:          string;
  password:             string;
  clave:                string;
  periodo:              string;
  flagEnvio:            number;
  presentacion:         number;
  distribucion:         number;
  confidencialidad:     number;
  codigoTema:           number;
  fechaPlazo:           string;
  tramo:                string;
  cui:                  string;
  cod_tpo_rgtro_dcmto:  number;
  numOrdenServicio:     string;
}


export interface RegistroPVD_Id_Tramite {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataRegistroPVD_Id_Tramite[];
  error:           string;
}

export interface DataRegistroPVD_Id_Tramite {
  id_Tramite: number;
  expediente: string;
}


//Combo Temas
export interface ComboTemas {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboTemas[];
  error:           string;
}
export interface DataComboTemas {
  iCodTema: number;
  cDesTema: string;
}


//Combo Tipo Documental
export interface ComboTipoDocumental {
  isSuccess: boolean;
  message:   null;
  data:      DataComboTipoDocumental[];
  errors:    null;
}
export interface DataComboTipoDocumental {
  idTipoDocumental:     number;
  descripcion:          string;
  sigla:                string;
  flagEntrada:          number;
  flagInterno:          number;
  flagSalida:           number;
  docEsp:               number;
  flagWeb:              number;
  anexo:                string;
  codigoPide:           string;
  flagSalidaGeneral:    boolean;
  flagInternoAPersonal: boolean;
  flagPersonalGeneral:  boolean;
  flagPersonal:         boolean;
  estado:               string;
}

//Combo Indicaciones
export interface ComboIndicaciones {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboIndicaciones[];
  error:           string;
}
export interface DataComboIndicaciones {
  iCodIndicacion: number;
  cIndicacion:    string;
}

// Oficina Derivada
export interface OficinasDerivadas {
  isSuccess: boolean;
  message:   null;
  data:      DataOficinasDerivadas[];
  errors:    null;
}

export interface DataOficinasDerivadas {
  idOficina:                    number;
  nombreOficina:                string;
  siglasOficina:                string;
  codigoUbicacion:              number;
  estado:                       string;
  flagVisible:                  boolean;
  flagEnvioColaborador:         boolean;
  flagMPOpeCal:                 boolean;
  flagImprCol:                  boolean;
  flagEnvioInterPerfil:         boolean;
  flagAsignaCorrelativo:        boolean;
  flagVirtual:                  boolean;
  flagVisibleExterno:           boolean;
  flagAprobacionAsistente:      boolean;
  nivel:                        number;
  idOficinaPadre:               number;
  numeroDocumentoRepresentante: string;
}

// Detalle del Documento registrado
export interface DocumentoRegistrado {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDocumentoRegistrado[];
  error:           string;
}

export interface DataDocumentoRegistrado {
  iCodTramite:                 number;
  cNroDocumento:               string;
  cCodificacion:               string;
  cParteDiario:                string;
  fFecDocumento:               Date | string;
  fechaPlazoFinal:             Date | string;
  cAsunto:                     string;
  cObservaciones:              string;
  archivo_fisico:              string;
  cSiglaAutor:                 string;
  fFecRegistro:                Date | string;
  nFlgEnvio:                   number;
  cDescTipoDoc:                string;
  remitente:                   string;
  iCodTrabajador:              number;
  cNombresTrabajador:          string;
  cApellidosTrabajador:        string;
  iCodOficinaDerivar:          number;
  cIndicacion:                 string;
  cPrioridadDerivar:           string;
  fFecDerivar:                 Date | string;
  cNomOficina:                 string;
  cNombresTrabajadorDerivar:   string;
  cApellidosTrabajadorDerivar: string;
  cNomRemite:                  string;
}

// Lista de Oficinas con copia
export interface OficinasCopias {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinasCopias[];
  error:           string;
}

export interface DataOficinasCopias {
  codTramite:            number;
  codTrabajadorRegistro: number;
  nFlgTipoDoc:           number;
  codOficinaOrigen:      number;
  codOficinaDerivar:     number;
  codTrabajadorDerivar:  number;
  asuntoDerivar:         string;
  observacionesDerivar:  string;
  codTipoDocDerivar:     number;
  cIndicacion:           string;
  fecDerivar:            Date;
  estadoMovimiento:      number;
  fecMovimiento:         Date;
  nFlgEnvio:             number;
  flgTipoMovimiento:     number;
}

// Oficina Detalle
export interface OficinaDetalle {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinaDetalle[];
  error:           string;
}

export interface DataOficinaDetalle {
  cNomOficina:   string;
  cSiglaOficina: string;
}

//Obtener un representante
export interface Representante {
  isSuccess:      boolean;
  message:        null;
  data:           DataRepresentante[];
  errors:         null;
  totalPaginas:   number;
  totalRegistros: number;
}

export interface DataRepresentante {
  idPersona:           number;
  codigoTipoIdentidad: string;
  numeroDocumento:     string;
  apellidoPaterno:     string;
  apellidoMaterno:     string;
  nombres:             string;
  sexo:                string;
  telefono:            string;
  codigoTipoPersona:   string;
  nombreCompleto:      string;
  estado:              string;
  codigoAfp:           string;
  fechaCreacion:       null;
}


//Post Oficina Derivada

export interface PostOficinaCopia {
  codTramite:            number;
  codTrabajadorRegistro: number;
  nFlgTipoDoc:           number;
  codOficinaOrigen:      number;
  codOficinaDerivar:     number;
  codTrabajadorDerivar:  number;
  asuntoDerivar:         string;
  observacionesDerivar:  string;
  codTipoDocDerivar:     number;
  codIndicacionDerivar:  number;
  fecDerivar:            Date;
  estadoMovimiento:      number;
  fecMovimiento:         Date;
  nFlgEnvio:             number;
  flgTipoMovimiento:     number;
}


// Lista Contratos RCC
export interface ListaContratos {
  idContrato:                  number;
  idProyecto:                  number;
  estadoSituacionalN:          string;
  grupoPaquete:                string;
  region:                      string;
  nombreCorto:                 string;
  paquete:                     string;
  tipoInfraestructuraN:        string;
  contratacionVigente:         string;
  ayudaMemoria:                null | string;
  piA2024:                     number;
  codigoARCC:                  null | string;
  cui:                         string;
  idTipoInfraestructura:       number;
  idGrupoPaquete:              number;
  idEstadoSituacional:         number;
  numeroContrato:              string;
  idTipoContrato:              number;
  tipoContratoN:               string;
  idTipoEstadoContractual:     number;
  estadoContractualN:          string;
  conActaCesionPosContractual: boolean;
}
