import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {Error404PageComponent} from "./shared/pages/error404-page/error404-page.component";

const routes: Routes = [
  {
    path: 'EY',
    loadChildren: () => import('./ey/ey.module').then( m => m.EyModule),
  },
  {
    path: 'error-404',
    component: Error404PageComponent,
  },
  {
    path: '**',
    redirectTo: 'error-404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
