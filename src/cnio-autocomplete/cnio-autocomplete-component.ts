import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ValidatorFn, Validators } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { isFunction } from "rxjs/internal-compatibility";
import { filter, map, startWith } from "rxjs/operators";

export interface Option {
  id: number;
  name: string;
}
export interface Options {
  options: Option[];
  label: string;
  filter?: ((values: Option[], filterText: string) => Option[]) | null;
}

export function filterStartWith(values: Option[], filterText: string) {
  const filterValue = filterText.toLowerCase();
  return values.filter(
    option => option.name.toLowerCase().indexOf(filterValue) === 0
  );
}
export function filterContains(values: Option[], filterText: string) {
  const filterValue = filterText.toLowerCase();
  return values.filter(
    option => option.name.toLowerCase().indexOf(filterValue) >= 0 || option.id === +filterValue
  );
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "cnio-autocomplete",
  templateUrl: "cnio-autocomplete-component.html",
  styleUrls: ["cnio-autocomplete-component.css"]
})
export class CnioAutocomplete implements OnInit, OnDestroy {

  /**
   * id of Option or whole Option
   */
  @Input() selected: Option | string = '';
  @Output() selectedChange = new EventEmitter<Option>();
  @Input() required = false;

  @Input()
  options: Options = {
    label: "Label for autocomplete",
    options: [
      { id: 1, name: "Default Opt 1" },
      { id: 2, name: "Default Opt 2" }
    ]
  };

  myControl = new FormControl(null, [
    this.requiredValidator(),
    this.forbiddenNamesValidator()
  ]);
  observable: any;

  requiredValidator(): ValidatorFn {
    if (this.required) {
      return Validators.required
    }
    return () => null;
  }

  forbiddenNamesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const index = this.options.options.findIndex(service => {
        return new RegExp("^" + service.name + "$|^" + service.id + "$").test(control.value?.name || control.value);
      });
      return index < 0 ? { forbiddenNames: { value: control.value?.name || control.value } } : null;
    };
  }

  filteredOptions: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(this.selected),
      map(value => typeof value === "string" ? value : value.name),
      map(name => (name ? this._filter(name) : this.options.options))
    );
    this.observable = this.myControl.valueChanges
      .pipe(filter(value => value === "" || typeof value === 'object'))
      .subscribe(value => this.selectedChange.emit(value));
  }
  ngOnDestroy() {
    this.observable.unsubscribe();
  }

  displayFn(opts: Option): string {
    return opts && opts.name ? opts.name : "";
  }

  private _filter(name: string): Option[] {
    if (isFunction(this.options.filter)) {
      return this.options.filter(this.options.options, name);
    }
    return filterContains(this.options.options, name);
  }

}
