import { Routes } from "@angular/router";
import { CorrelativoProfesionalComponent } from "../pages/correlativo-profesional/correlativo-profesional.component";
import { CorrelativoInternoComponent } from "../pages/correlativo-interno/correlativo-interno.component";
import { IndicacionesComponent } from "../pages/indicaciones/indicaciones.component";
import { MensajeriaComponent } from "../pages/mensajeria/mensajeria.component";
import { OficinasComponent } from "../pages/oficinas/oficinas.component";
import { PerfilComponent } from "../pages/perfil/perfil.component";

export const ADMINISTRADOR_MANTENIMIENTO_ROUTES:Routes = [
  {
    path: "",
    children: [
      {path:"cor-prof",component:CorrelativoProfesionalComponent},
      {path:"cor-int",component:CorrelativoInternoComponent},
      {path:"indicaciones",component:IndicacionesComponent},
      {path:"mensajeria",component:MensajeriaComponent},
      {path:"oficinas",component:OficinasComponent},
      {path:"perfil",component:PerfilComponent},

      {path:"", pathMatch:"full" ,redirectTo:"cor-prof"}
    ]
  },

  {
    path:"",
    pathMatch:"full",
    redirectTo:"mantenimiento"
  }
]
