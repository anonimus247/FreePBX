import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltroComponent } from './filtro/filtro.component';

const routes: Routes = [
  { path: '', redirectTo: '/filtro', pathMatch: 'full' },
  { path: 'filtro', component: FiltroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
