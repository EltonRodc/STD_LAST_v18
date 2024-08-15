export interface Perfiles {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataPerfiles[];
  error:           string;
}

export interface DataPerfiles {
  iCodPerfilUsuario:            number;
  cDescPerfil:                  string;
  cSiglaOficina:                string;
  bEstado:                      number;
  codOficina:                   number;
  nomOficina:                   string;
  numeroDocumentoRepresentante: number;
}


export interface Oficina {
  isSuccess: boolean;
  message:   null;
  data:      DataOficina[];
  errors:    null;
}

export interface DataOficina {
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


// Representante
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


export interface DatosPrincipales {
  user:           string;
  id_oficina:     number;
  oficina:        string;
  jefe:           string;
}
