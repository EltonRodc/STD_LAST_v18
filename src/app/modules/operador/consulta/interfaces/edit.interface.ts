export interface EditRegistro {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataEditRegistro[];
  error:           string;
}

export interface DataEditRegistro {
  iCodTramite:         number;
  cCodificacion:       string;
  nFlgEnvio:           number;
  iCodRemitente:       number;
  nFlgClaseDoc:        number;
  fFecRegistro:        Date;
  fFecActualizacion:   Date | null;
  cNroDocumento:       string;
  fFecDocumento:       Date;
  cNomRemite:          string;
  cAsunto:             string;
  cObservaciones:      string;
  cParteDiario:        string;
  fechaPlazoFinal:     Date;
  archivO_FISICO:      string;
  codCUI:              string;
  cReferencia:         string;
  nNumDocumento:       string;
  cNombre:             string;
  iCodIndicacion:      number;
  iCodOficinaRegistro: number;
  cCodTipoDoc:         number;
  iCodTema:            number;
  nTipoPresentacion:   number;
  iCodOficinaDerivar:  number;
  cIndicacion:         string;
}

// Post
export interface PostDatosRegistro {
  codUsuario:           number;
  opcion:               number;
  codTramite:           number;
  codTipoDocumental:    number;
  numDocumento:         string;
  fechaDocumento:       Date | string;
  asunto:               string;
  observaciones:        string;
  codRemitente:         number;
  nomRemite:            string;
  parteDiario:          string;
  presentacion:         number;
  archivoFisico:        string;
  flgRequiereRespuesta: number;
  fechaPlazo:           Date | string;
}

export interface PostEnviaDoc {
  codTramite: number;
  flgEnvio:   number;
}

