export interface Auth {
  value:        Value;
  formatters:   any[];
  contentTypes: any[];
  declaredType: null;
  statusCode:   number;
}

export interface Value {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataAuth[];
  error:           string;
}

export interface DataAuth {
  idUsuario:                  number;
  idPAU:                      number;
  usuToken:                   string;
  nomUsuario:                 string;
  siglaUsuario:               string;
  fecUltAcceso:               string;
  fecCambioPw:                string;
  idSedeUsuario:              number;
  correoUsuario:              string;
  idModalidadContratoUsuario: number;
  fecFinacceso:               string;
  idOficina:                  number;
  siglaOficina:               null;
  nomOficina:                 string;
  idPerfil:                   number;
  nomPerfil:                  string;
  idJefe:                     number;
  nomJefe:                    string;
  correoJefe:                 string;
  nomSedeUsuario:             string;
  mensaje:                    string;
}
