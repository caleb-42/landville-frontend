import { Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/pages/company/company.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RegistersuccessComponent } from '../../pages/registration/registersuccess/registersuccess.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PropertiesComponent } from '../../pages/properties/properties.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NoPropertiesComponent } from 'src/app/pages/properties/no-properties/no-properties.component';
<<<<<<< HEAD
import { TermsPageComponent } from 'src/app/pages/terms/terms.component';
=======
import { TermsComponent } from 'src/app/components/terms/terms.component';
>>>>>>> ft(terms): Enable users to activate terms of use on registration


export const CommonLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'registersuccess', component: RegistersuccessComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'no-properties', component: NoPropertiesComponent },
  { path: 'create-company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
  { path: 'terms-and-conditions', component: TermsPageComponent }
=======
  { path: 'terms-and-conditions', component: TermsComponent }
>>>>>>> ft(terms): Enable users to activate terms of use on registration
];
