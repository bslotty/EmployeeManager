import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewComponent } from './pages/account-overview/account-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RewardLogComponent } from './pages/reward-log/reward-log.component';
import { TimeClockEntryComponent } from './pages/time-clock-entry/time-clock-entry.component';
import { TimeSheetComponent } from './pages/time-sheet/time-sheet.component';

const routes: Routes = [

  {
    path: "time-sheet",
    component: TimeSheetComponent
  },
  {
    path: "time-sheet/:id",
    component: TimeSheetComponent
  },


  {
    path: "time-clock-entry",
    component: TimeClockEntryComponent
  },
  {
    path: "rewards",
    component: RewardLogComponent
  },
  {
    path: "rewards/:id",
    component: RewardLogComponent
  },


  {
    path: "account-overview",
    component: AccountOverviewComponent
  },

  {
    path: "account-overview/:id",
    component: AccountOverviewComponent
  },


  {
    path: "em",
    redirectTo: "time-sheet",
    pathMatch: "full"
  },

  {
    path: "",
    redirectTo: "time-sheet",
    pathMatch: "full"
  },

  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
