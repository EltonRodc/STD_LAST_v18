//Mantenimiento Perfil
export interface ListPerfil {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListPerfil[];
  error:           string;
}

export interface DataListPerfil {
  iCodPerfil: number;
  cDescPerfil:   string;
  cDescripcionPerfil:  string;
}

export interface PostAddPerfil {
  perfil:   string;
}

export interface EditPerfil {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataEditPerfil[];
  error:           string;
}

export interface DataEditPerfil {
  cDescPerfil:   string;
  cDescripcionPerfil:  string;
}

export interface PostEditPerfil {
  Mensaje:   string;
}

export interface DeletePerfil {
  codPerfil: number;
}
