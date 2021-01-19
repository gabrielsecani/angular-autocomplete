import { Component, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { isFunction } from "rxjs/internal-compatibility";
import { map, startWith } from "rxjs/operators";

export interface Option {
  id: number;
  name: string;
}
export interface Options {
  options: Option[];
  displayFn?: ((value: any) => string) | null;
  filter?: ((value: Option[], filterText: string) => Option[]) | null;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "cnio-autocomplete",
  templateUrl: "cnio-autocomplete-component.html",
  styleUrls: ["cnio-autocomplete-component.css"]
})
export class CnioAutocomplete implements OnInit {
  myControl = new FormControl();
  @Input()
  options: Options = {
    options: [
      { id: 1, name: "Mary" },
      { id: 2, name: "Shelley" },
      { id: 3, name: "Igor" }
    ]
  };

  /**
   * id of Option or whole Option
   */
  @Input()
  value: Option;
  @Output()
  valueChanged: Option;

  filteredOptions: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        typeof value === "string" ? this.value || value : value.name
      ),
      map(name => (name ? this._filter(name) : this.options.options))
    );
  }

  displayFn(opts: Option): string {
    if (isFunction(this.options.displayFn)) {
      return this.options.displayFn(opts);
    }
    return opts && opts.name ? opts.name : "";
  }

  private _filter(name: string): Option[] {
    if (isFunction(this.options.filter)) {
      return this.options.filter(this.options.options.slice(0), name);
    }
    const filterValue = name.toLowerCase();
    return this.options.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
