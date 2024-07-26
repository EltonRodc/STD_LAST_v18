import { Routes } from "@angular/router";
import { InternoOficinaComponent } from "../pages/interno-oficina/interno-oficina.component";
import { SalidaOficinaComponent } from "../pages/salida-oficina/salida-oficina.component";
import { InternoGeneralesComponent } from "../pages/interno-generales/interno-generales.component";
import { PlazosVencidosComponent } from "../pages/plazos-vencidos/plazos-vencidos.component";
import { EntradasGeneralesComponent } from "../pages/entradas-generales/entradas-generales.component";
import { ControlCargosComponent } from "../pages/control-cargos/control-cargos.component";
import { ControlCargosOficinaComponent } from "../pages/control-cargos-oficina/control-cargos-oficina.component";
import { RemitenteNaturalComponent } from "../pages/remitente-natural/remitente-natural.component";
import { ConsultaAlertasComponent } from "../pages/consulta-alertas/consulta-alertas.component";


export const JEFE_CONNSULTA_ROUTES:Routes = [
  {
    path: "",
    children: [
      {path:"plazos-venc",component:PlazosVencidosComponent},
      {path:"doc-int-of",component:InternoOficinaComponent},
      {path:"doc-sal-of",component:SalidaOficinaComponent},
      {path:"ent-gen",component:EntradasGeneralesComponent},
      {path:"doc-int-gen",component:InternoGeneralesComponent},
      {path:"ctrl-carg",component:ControlCargosComponent},
      {path:"ctrl-carg-ofi",component:ControlCargosOficinaComponent},
      {path:"rem-nat",component:RemitenteNaturalComponent},
      {path:"cons-alert",component:ConsultaAlertasComponent},

      {path:"", pathMatch:"full" ,redirectTo:"doc-int-of"}
    ]
  },

  {
    path:"",
    pathMatch:"full",
    redirectTo:"consulta"
  }
]
