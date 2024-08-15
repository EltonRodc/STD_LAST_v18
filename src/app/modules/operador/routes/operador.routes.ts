import { EditComponent } from './../registro/components/edit/edit.component';
import { Routes } from "@angular/router";
import { EntradaPvdPageComponent } from "../registro/pages/entrada-pvd-page/entrada-pvd-page.component";
import { EntradaRccPageComponent } from "../registro/pages/entrada-rcc-page/entrada-rcc-page.component";
import { EntradasGeneralesComponent } from "../consulta/pages/entradas-generales/entradas-generales.component";
import { TotalPendientesComponent } from "../consulta/pages/total-pendientes/total-pendientes.component";

export const OPERADOR_ROUTES:Routes = [
  {
    path: "registro",
    children: [
      {path:"entrada-pvd",component:EntradaPvdPageComponent},
      {path:"entrada-rcc",component:EntradaRccPageComponent},
      {path:"", pathMatch:"full" ,redirectTo:"entrada-pvd"}
    ]
  },
  {
    path: "consulta",
    children:[
      {path:"entradas-generales",component:EntradasGeneralesComponent},
      {path:"entradas-generales/edit/:cod_tramite",component:EditComponent},
      {path:"total-pendientes",component:TotalPendientesComponent},
      {path:"", pathMatch:"full" ,redirectTo:"entradas-generales"}
    ]
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"registro"
  }
]
