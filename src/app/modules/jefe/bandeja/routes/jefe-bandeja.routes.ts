import { Routes } from "@angular/router";
import { PendientesComponent } from "../pages/pendientes/pendientes.component";
import { DerivadosComponent } from "../pages/derivados/derivados.component";
import { ArchivadosComponent } from "../pages/archivados/archivados.component";
import { DocAprobarComponent } from "../pages/doc-aprobar/doc-aprobar.component";
import { DocObservadosComponent } from "../pages/doc-observados/doc-observados.component";

export const JEFE_BANDEJA_ROUTES:Routes = [
  {
    path: "",
    children: [
      {path:"pendientes",component:PendientesComponent},
      {path:"derivados",component:DerivadosComponent},
      {path:"archivados",component:ArchivadosComponent},
      {path:"doc-por-apr",component:DocAprobarComponent},
      {path:"doc-obs",component:DocObservadosComponent},
      {path:"", pathMatch:"full" ,redirectTo:"pendientes"}
    ]
  },

  {
    path:"",
    pathMatch:"full",
    redirectTo:"bandeja"
  }
]
