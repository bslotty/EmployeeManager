import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { DisplaySelectPipe } from './components/form-field/display-select.pipe';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { IconComponent } from './components/icon/icon.component';
import { DisplayRelatedPipe } from './components/list/display-related.pipe';
import { ListComponent } from './components/list/list.component';
import { TitleCaseAllPipe } from './components/list/title-case-all.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { FormComponent } from './dialogs/form/form.component';
import { ProgressComponent } from './dialogs/progress/progress.component';
import { SelectComponent } from './dialogs/select/select.component';
import { MaterialModule } from './material.module';
import { DotNavigatorComponent } from '../UI/components/dot-navigator/dot-navigator.component';


@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        //  Dialogs
        ConfirmComponent,
        FormComponent,
        ProgressComponent,
        SelectComponent,
        FormFieldComponent,
        IconComponent,
        ListComponent,
        LoaderComponent,
        SectionHeaderComponent,
        SiteHeaderComponent,
        TitleCaseAllPipe,
        DisplaySelectPipe,
        DisplayRelatedPipe,
        ButtonBarComponent,
        DotNavigatorComponent,
    ],
    exports: [
        MaterialModule,
        //  Dialogs
        ConfirmComponent,
        FormComponent,
        ProgressComponent,
        SelectComponent,
        FormFieldComponent,
        IconComponent,
        ListComponent,
        LoaderComponent,
        SectionHeaderComponent,
        SiteHeaderComponent,
        ButtonBarComponent,
        DotNavigatorComponent,
    ],
    providers: []
})

export class UIModule {
  static forRoot(): ModuleWithProviders<UIModule> {
    return {
      ngModule: UIModule,
      providers: []
    };
  }

}
