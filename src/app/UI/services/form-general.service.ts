import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGeneralService {

  filter_form: UntypedFormGroup;

  constructor(
    public builder: UntypedFormBuilder
  ) {
    //  Filter Form Setup
    this.filter_form = this.builder.group({
      term: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
    });

  }


  //  Is Valid
  isValid(form: UntypedFormGroup):boolean {
    return form.valid && form.dirty && form.enabled;
  }
  

}
