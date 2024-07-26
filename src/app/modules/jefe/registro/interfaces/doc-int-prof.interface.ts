// Tipo Documento
export interface TipoDocumentoProfesional {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataTipoDocumentoProfesional[];
  error:           string;
}

export interface DataTipoDocumentoProfesional {
  cCodTipoDoc:  number;
  cDescTipoDoc: string;
  cSiglaDoc:    string;
  cAnexo:       string;
  iCodPIDE:     string;
}

export interface ListaTrabajadoresOficina {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaTrabajadoresOficina[];
  error:           string;
}

export interface DataListaTrabajadoresOficina {
  iCodTrabajador:       number;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
}


export interface RegistroInternoProfesional {
  usuarioCrea:           number;
  oficinaOrigen:         number;
  codTipoDoc:            number;
  asunto:                string;
  observaciones:         string;
  requieRerespuesta:     number;
  fecplazo:              string;
  archivoFisico:         string;
  numAnio:               string;
  destinos:              string;
  codIndicacionDelegado: number;
}



// Lista de Colaboradores Paso 2
export interface ListaColaboradoresInternoProfesional {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataListaColaboradoresInternoProfesional[];
  error:           string;
}

export interface DataListaColaboradoresInternoProfesional {
  cNombresTrabajador:     string;
  cApellidosTrabajador:   string;
  iCodTrabajador:         number;
  fFecProfesional:        Date;
  iCodIndicacionDelegado: number;
  cPrioridadDerivar:      string;
  iCodMovimiento:         number;
  cIndicacion:            string;
  fFecDelegadoRecepcion:  null;
  cFlgTipoMovimiento:     number;
}

//Registro Colaborador
export interface RegistroColaborador {
  codTramite:           number;
  codTrabajador:        number;
  codTrabajadorDestino: number;
  codIndicacionMov:     number;
  prioridad:            string;
  codPerfil:            number;
  codTipoMovimiento:    number;
  verificaDuplicado:    number;
  verificaEnviado:      number;
  editar:               number;
}


//Listar Combo Colaborador
export interface ComboColaborador {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataComboColaborador[];
  error:           string;
}

export interface DataComboColaborador {
  iCodTrabajador:       number;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
}
