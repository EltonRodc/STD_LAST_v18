import { Routes } from "@angular/router";

export const ADMINISTRADOR_ROUTES:Routes = [
  {
    path: "mantenimiento",
    loadChildren: ()=> import('../mantenimiento/routes/administrador-mantenimiento.routes').then(r => r.ADMINISTRADOR_MANTENIMIENTO_ROUTES)
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"mantenimiento"
  }
]
