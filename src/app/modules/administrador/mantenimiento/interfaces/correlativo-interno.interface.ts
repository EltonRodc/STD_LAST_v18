//Mantenimiento Correlativo Interno
export interface ListaCoInterno {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListCoInterno[];
  error:           string;
}

export interface DataListCoInterno {
  cSiglaOficina: string;
  cCodTipoDoc:   number;
  iCodOficina:   number;
  nCorrelativo:  number;
  cNomOficina:   string;
  cDescTipoDoc:  string;
  cSiglaDoc:     string;
}

export interface OficinaCoInterno {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinaCoInterno[];
  error:           string;
}

export interface DataOficinaCoInterno {
  iCodOficina:   number;
  cNomOficina:   string;
  cSiglaOficina: string;
}

export interface TipoDocCoInterno {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataTipoDocCoInterno[];
  error:           string;
}

export interface DataTipoDocCoInterno {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
}

export interface DataDocInterno {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            SelDataDocInterno[];
  error:           string;
}

export interface SelDataDocInterno {
  iCodOficina:   number;
  cNomOficina:   string;
  cSiglaOficina: string;
}

export interface PostCoInterno {
  codTipoDoc: number;
  codOficina: number;
  numAño:     number;
}

export interface UpdateCoInterno {
  correlativo:   number;
  codTipoDoc:    number;
  codOficina: number;
  numAño:       number;
}

export interface DeleteCoInterno{
  codTipoDoc: number;
  codOficina: number;
}

export interface PostAddTrabajador {
  codTipoDoc:    number;
  codOficina:    number;
  codTrabajador: number;
  numAnio:       number;
}
