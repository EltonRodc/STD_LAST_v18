import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const LAYOUT_ROUTES:Routes = [
  {
    path: "",
    component:LayoutComponent,
    children: [
      {
        path:"operador",
        loadChildren: () => import('../modules/operador/routes/operador.routes').then(r=>r.OPERADOR_ROUTES)
      },
      {
        path:"jefe",
        loadChildren: () => import('../modules/jefe/routes/jefe.routes').then(r=>r.JEFE_ROUTES)
      },
      {
        path:"administrador",
        loadChildren: () => import('../modules/administrador/routes/administrador.routes').then(r=>r.ADMINISTRADOR_ROUTES)
      },
      {
        path:"",
        pathMatch:"full",
        redirectTo:"jefe"
      }
    ]
  }
]
