import { Routes } from "@angular/router";
import { EntradaPvdPageComponent } from "../registro/pages/entrada-pvd-page/entrada-pvd-page.component";
import { EntradaRccPageComponent } from "../registro/pages/entrada-rcc-page/entrada-rcc-page.component";

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
    path:"",
    pathMatch:"full",
    redirectTo:"registro"
  }
]
