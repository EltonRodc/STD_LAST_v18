//Correlativo Profesional
//Lista de Oficinas de Correlativo Profesional
export interface OficinasCoProfesional {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinasCoProfesional[];
  error:           string;
}

export interface DataOficinasCoProfesional {
  iCodOficina: number;
  cNomOficina: string;
}
//Lista de Tipo de Documento de Correlativo Profesional
export interface ListTipoDocumentalCoProfes {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListTipoDocumentalCoProfes[];
  error:           string;
}

export interface DataListTipoDocumentalCoProfes {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}
//Lista de la Tabla Correlativo Profesional
export interface CoProfesional {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataCoProfesional[];
  error:           string;
}

export interface DataCoProfesional {
  cCodTipoDoc:          number;
  iCodOficina:          number;
  cNomOficina:          string;
  iCodTrabajador:       number;
  nNumAno:              number;
  nCorrelativo:         number;
  cSiglaDoc:            string;
  cApellidosTrabajador: string;
  cNombresTrabajador:   string;
  cDescTipoDoc:         string;
  iCodCorrelTrabajador: number;
}
//Lista de Trabajadores CoProfesional
export interface ListTrabajadoresCoProfes {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListTrabajadoresCoProfes[];
  error:           string;
}

export interface DataListTrabajadoresCoProfes {
  iCodTrabajador:        number;
  cNombresTrabajador:    string;
  cApellidosTrabajador:  string;
  iCodModalidadContrato: number;
}
//Edit Trabajador
export interface EditTrabajador {
  correlativo:   number;
  codTipoDoc:    number;
  codTrabajador: number;
  numAnio:       number;
}
// Post para agregar Trabajador
export interface PostAddTrabajador {
  codTipoDoc:    number;
  codOficina:    number;
  codTrabajador: number;
  numAnio:       number;
}
// Delete Trabajador
//Delete Trabajador
export interface DeleteTrabajador {
  codTrabajador: number;
}
