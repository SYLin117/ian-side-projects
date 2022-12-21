import { Component, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";

const routes: Route[] = [
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register-user', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

