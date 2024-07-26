import { Routes } from "@angular/router";

export const JEFE_ROUTES:Routes = [
  {
    path: "registro",
    loadChildren: ()=> import('../registro/routes/jefe-registro.routes').then(r => r.JEFE_REGISTRO_ROUTES)
  },
  {
    path: "consulta",
    loadChildren: ()=> import('../consulta/routes/jefe-consulta.routes').then(r => r.JEFE_CONNSULTA_ROUTES)
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"registro"
  }
]
