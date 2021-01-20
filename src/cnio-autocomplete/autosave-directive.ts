
import { AfterViewInit, Directive, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Directive({ selector: '[autosave-directive]' })
export class AutosaveDirective implements AfterViewInit, OnDestroy {
    observable: any;
    constructor(@Optional() private autoTrigger: MatAutocompleteTrigger,
        @Optional() private control: NgControl) { }
    ngAfterViewInit() {
        this.observable = this.autoTrigger.panelClosingActions.subscribe(x => {
            if (this.autoTrigger.activeOption) {
                const value = this.autoTrigger.activeOption.value;
                if (this.control && this.control.control && this.control.control.value) {
                    this.control.control.setValue(value, { emit: false });
                    this.autoTrigger.writeValue(this.autoTrigger.activeOption.value);
                }
            }
        })
    }
    ngOnDestroy() {
        this.observable.unsubscribe();
    }
}