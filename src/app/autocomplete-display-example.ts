import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

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
    console.log(user.name);
    return user && user.name ? user.id + user.name : "";
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
