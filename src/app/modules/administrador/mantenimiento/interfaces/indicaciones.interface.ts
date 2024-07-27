
//Mantenimiento Indicacion
export interface ListIndicaciones {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListIndicaciones[];
  error:           string;
}

export interface DataListIndicaciones {
  iCodIndicacion: number;
  cIndicacion:    string;
  nFlgOrden:    number;
}

export interface EditIndicacion {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataEditIndicacion[];
  error:           string;
}

export interface DataEditIndicacion {
  iCodIndicacion:   number;
  cIndicacion:   string;
  nFlgOrden:   number;
}

export interface PostAddIndicaciones {
  indicacion:   string;
}

export interface PostEditIndicaciones {
  codigo: number;
  indicacion:   string;
}

export interface DeleteIndicacion {
  codIndicacion: number;
}
