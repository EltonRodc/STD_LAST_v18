import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "sign-in",
    loadChildren: ()=> import('./core/auth/routes/auth.routes').then(r=>r.AUTH_ROUTES)
  },
  {
    path: "std",
    loadChildren: ()=> import('./layout/layout.routes').then(r=>r.LAYOUT_ROUTES)
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"sign-in"
  }
];
