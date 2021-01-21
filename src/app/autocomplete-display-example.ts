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
  cniooptions: Options = {
    label: "My autocomplete field",
    options: [
      { id: 1, name: "Mary" },
      { id: 2, name: "Shelley" },
      { id: 3, name: "Igor" },
      { id: 4, name: "Ana" },
      { id: 5, name: "Carol" },
      { id: 6, name: "Alex" },
    ]
  };
/*You can set cnioValue with Option object or "string" Type*/ 
  cnioValue: Option = this.cniooptions.options[0] ;
  // cnioValue= "igor"; 

  ngOnInit() {}
}
