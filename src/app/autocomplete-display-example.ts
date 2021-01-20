import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Option, Options } from "src/cnio-autocomplete/cnio-autocomplete-component";

export interface User {
  id: number;
  name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "autocomplete-display-example",
  templateUrl: "autocomplete-display-example.html",
  styleUrls: ["autocomplete-display-example.css"]
})
export class AutocompleteDisplayExample implements OnInit {

  cnioValue: Option = { id: 0, name: '' };
  cnioValue2: Option = { id: 0, name: '' };
  cniooptions: Options = {
    label: "meu auto complete",
    options: [
      { id: 1, name: "Mary" },
      { id: 2, name: "Shelley" },
      { id: 3, name: "Igor" }
    ],
  };

  myControl = new FormControl();
  options: User[] = [
    { id: 1, name: "Mary" },
    { id: 2, name: "Shelley" },
    { id: 3, name: "Igor" }
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user: User): string {
    console.log(user);
    return user && user.name ? user.id + user.name : "";
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
