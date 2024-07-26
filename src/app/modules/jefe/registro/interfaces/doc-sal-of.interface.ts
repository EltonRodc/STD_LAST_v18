export interface RegistroSalidaProfesional {
  numAnio:                  string;
  codUsuario:               number;
  codOficinaOrigen:         number;
  codTipoDoc:               number;
  asunto:                   string;
  observaciones:            string;
  flgRpta:                  number;
  codRemitente:             number;
  nomRemite:                string;
  archivoFisico:            string;
  remitenteDireccion:       string;
  remitenteDepartamento:    string;
  remitenteProvincia:       string;
  remitenteDistrito:        string;
}

// Tipo doc
export interface TipoDocumento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataTipoDocumento[];
  error:           string;
}

export interface DataTipoDocumento {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}

//Paises
export interface Paises {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPaises[];
  error:           string;
}

export interface DataPaises {
  id_Pais:      string;
  cDescripcion: string;
}

// DEpartamento
export interface Departamento {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDepartamento[];
  error:           string;
}

export interface DataDepartamento {
  cCodDepartamento: string;
  cNomDepartamento: string;
}

//Provincia
export interface Provincia {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataProvincia[];
  error:           string;
}

export interface DataProvincia {
  cCodDepartamento: string;
  cCodProvincia:    string;
  cNomProvincia:    string;
  idProvincia:      string;
}

//Distrito
export interface Distrito {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDistrito[];
  error:           string;
}

export interface DataDistrito {
  ubigeo:       string;
  cNomDistrito: string;
}

//Institucion
export interface Institucion {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataInstitucion[];
  error:           string;
}

export interface DataInstitucion {
  iCodRemitente:    number;
  cNombre:          string;
  nNumDocumento:    string;
  cNomDepartamento: string;
  cNomProvincia:    string;
  cNomDistrito:     string;
  cSiglaRemitente:  string;
  cTipoPersona:     number;
}

// Sel Institucion
export interface SelInstitucion {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataSelIntitucion[];
  error:           string;
}

export interface DataSelIntitucion {
  iCodRemitente:    number;
  cNombre:          string;
  cRutaMesaVirtual: string;
  nNumDocumento:    string;
  cDireccion:       string;
  cNomDepartamento: string;
  cNomProvincia:    string;
  cNomDistrito:     string;
  cDepartamento:    string;
  cProvincia:       string;
  cDistrito:        string;
  ctipopersona:     number;
}

//Detall del paso 2
export interface DetallePaso2RegistroSalida {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataDetallePaso2RegistroSalida[];
  error:           string;
}

export interface DataDetallePaso2RegistroSalida {
  iCodTramite:           number;
  cCodificacion:         string;
  cDescTipoDoc:          string;
  fFecDocumento:         Date;
  cAsunto:               string;
  cObservaciones:        string;
  fFecRegistro:          Date;
  nFlgRpta:              number;
  nFlgEnvioPIDE:         number;
  cRUCDestinoPIDE:       string;
  cNombreDestinoPIDE:    string;
  cUnidadOrgDestinoPIDE: string;
  cCargoDestinoPIDE:     string;
  cNombre:               string;
}
