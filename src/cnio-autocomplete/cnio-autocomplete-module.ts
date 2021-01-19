import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from "@angular/material/form-field";
import { CnioAutocomplete } from "./cnio-autocomplete-component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  exports: [
    CnioAutocomplete,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  declarations: [CnioAutocomplete],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" }
    }
  ]
})
export class CnioAutocompleteModule {}
