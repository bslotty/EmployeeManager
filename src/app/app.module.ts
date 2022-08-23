import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeSheetComponent } from './pages/time-sheet/time-sheet.component';
import { RewardLogComponent } from './pages/reward-log/reward-log.component';
import { TimeClockEntryComponent } from './pages/time-clock-entry/time-clock-entry.component';
import { VacationEntryComponent } from './dialogs/vacation-entry/vacation-entry.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UIModule } from './UI/ui.module';
import { AccountOverviewComponent } from './pages/account-overview/account-overview.component';
import { RewardTransactionDetailsComponent } from './dialogs/reward-transaction-details/reward-transaction-details.component';
import { SelectAccountComponent } from './dialogs/select-account/select-account.component';
import { TimeSheetDayComponent } from './components/time-sheet-day/time-sheet-day.component';
import { SelectTimeSheetRangeComponent } from './dialogs/select-time-sheet-range/select-time-sheet-range.component';
import { VacationOverviewComponent } from './dialogs/vacation-overview/vacation-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeSheetComponent,
    RewardLogComponent,
    TimeClockEntryComponent,
    VacationEntryComponent,
    VacationOverviewComponent,
    NavBarComponent,
    NotFoundComponent,
    AccountOverviewComponent,
    RewardTransactionDetailsComponent,
    SelectAccountComponent,
    TimeSheetDayComponent,
    SelectTimeSheetRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    UIModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
