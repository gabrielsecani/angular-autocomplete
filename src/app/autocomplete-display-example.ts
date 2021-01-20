import { Component, OnInit } from "@angular/core";
import {
  Option,
  Options
} from "src/cnio-autocomplete/cnio-autocomplete-component";

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "autocomplete-display-example",
  templateUrl: "autocomplete-display-example.html",
  styleUrls: ["autocomplete-display-example.css"]
})
export class AutocompleteDisplayExample implements OnInit {
  cnioValue: Option = { id: 0, name: "" };
  cnioValue2: Option = { id: 0, name: "" };
  cniooptions: Options = {
    label: "meu auto complete",
    options: [
      { id: 1, name: "Mary" },
      { id: 2, name: "Shelley" },
      { id: 3, name: "Igor" },
      { id: 4, name: "Ana" },
      { id: 5, name: "Carol" }
    ]
  };

  ngOnInit() {}
}
