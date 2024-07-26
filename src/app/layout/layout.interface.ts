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
