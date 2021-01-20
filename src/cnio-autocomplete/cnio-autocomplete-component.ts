import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatOption } from "@angular/material/core";
import { Observable } from "rxjs";
import { isFunction } from "rxjs/internal-compatibility";
import { map, startWith } from "rxjs/operators";

export interface Option {
  id: number;
  name: string;
}
export interface Options {
  options: Option[];
  label: string;
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
    label: "Label for autocomplete",
    options: [
      { id: 1, name: "Default Opt 1" },
      { id: 2, name: "Default Opt 2" }
    ]
  };

  /**
   * id of Option or whole Option
   */
  @Input() selected: Option | string;
  @Output() selectedChange = new EventEmitter<Option>();

  filteredOptions: Observable<Option[]>;
  prevFilter = "§";

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => typeof value === "string" ? value : value.name),
      map(name => (name ? this._filter(name) : this.options.options))
    );
  }

  resetFiltered(origem: string) {
    console.log('reset antes', origem, this.myControl.value, this.prevFilter);
    if (this.myControl.value && this.prevFilter === "§") {
      console.log('reset guardando valor');
      this.prevFilter = this.myControl.value;
      this.myControl.setValue("");
    }
    console.log('reset depois', origem, this.myControl.value, this.prevFilter);
  }
  backFiltered() {
    console.log('back antes', this.myControl.value, this.prevFilter);
    if (this.myControl.value === "" && this.prevFilter !== "§") {
      console.log('voltando guardando valor');
      this.myControl.setValue(this.prevFilter);
      this.prevFilter = "§";
    }
    console.log('back depois', this.myControl.value, this.prevFilter);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event);
    this.prevFilter = "§";
    this.selectedChange.emit(event.option.value);
  }

  displayFn(opts: Option): string {
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
