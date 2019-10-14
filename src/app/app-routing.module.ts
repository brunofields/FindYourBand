import { AnnounceBandComponent } from './announce-band/announce-band.component';
import { AnnouncePlayerComponent } from './announce-player/announce-player.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnounceComponent } from './announce/announce.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'announce', component: AnnounceComponent },
  { path: 'announce-player', component: AnnouncePlayerComponent },
  { path: 'announce-band', component: AnnounceBandComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
