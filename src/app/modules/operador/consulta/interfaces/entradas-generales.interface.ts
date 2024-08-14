export interface ConsultaBandejaEnlace {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataConsultaBandejaEnlace[];
  error:           string;
}

export interface DataConsultaBandejaEnlace {
  cDescTipoDoc:           string;
  relacionado:            number;
  cDesTema:               string;
  iCodTramite:            number;
  nFlgTipoDoc:            number;
  cCodificacion:          string;
  iCodTrabajadorRegistro: number;
  cNroDocumento:          string;
  cReferencia:            string;
  nFlgEnvio:              number;
  iCodTupa:               number;
  fFecRegistro:           Date;
  nFlgAnulado:            number;
  cNomRemite:             string;
  cParteDiario:           string;
  nTipoPresentacion:      number;
  nDistribucion:          number;
  nConfidencialidad:      number;
  cAsunto:                string;
  codCUI:                 string;
  remitente:              string;
  tipoRemitente:          number;
  registradorNombres:     string;
  registradorApellidos:   string;
  oficDerivo:             string;
  cod_tpo_rgtro_dcmto:    number;
  archivo_Fisico:         string;
}


// Combo Registrador
export interface Registrador {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataRegistrador[];
  error:           string;
}

export interface DataRegistrador {
  iCodTrabajador:       number;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
}

//Oficinas RCC
export interface OficinasRcc {
  recordsTotal:    number;
  recordsFiltered: number;
  data:            DataOficinasRcc[];
  error:           string;
}

export interface DataOficinasRcc {
  iCodOficina:          number;
  cNomOficina:          string;
  cSiglaOficina:        string;
  iCodTrabajador:       number;
  cNombresTrabajador:   string;
  cApellidosTrabajador: string;
}

