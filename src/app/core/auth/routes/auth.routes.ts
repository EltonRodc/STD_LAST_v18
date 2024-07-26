import { Routes } from "@angular/router";
import { AuthComponent } from "../auth.component";
import { SignInComponent } from "../../components/sign-in/sign-in.component";


export const AUTH_ROUTES:Routes = [
  {
    path: "",
    component:SignInComponent
  },
]
