import { Routes } from "@angular/router";
import { DocIntOfComponent } from "../pages/doc-int-of/doc-int-of.component";
import { DocSalOfComponent } from "../pages/doc-sal-of/doc-sal-of.component";
import { DocIntProfComponent } from "../pages/doc-int-prof/doc-int-prof.component";

export const JEFE_REGISTRO_ROUTES:Routes = [
  {
    path: "",
    children: [
      {path:"doc-int-of",component:DocIntOfComponent},
      {path:"doc-sal-of",component:DocSalOfComponent},
      {path:"doc-int-prof",component:DocIntProfComponent},
      {path:"", pathMatch:"full" ,redirectTo:"doc-int-of"}
    ]
  },

  {
    path:"",
    pathMatch:"full",
    redirectTo:"registro"
  }
]
