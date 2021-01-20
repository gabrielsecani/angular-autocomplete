
import { AfterViewInit, Directive, HostListener, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { Option } from './cnio-autocomplete-component';

@Directive({ selector: '[tab-directive]' })
export class TabDirective implements AfterViewInit, OnDestroy {
    observable: Subscription;
    preview: any;
    constructor(@Optional() private autoTrigger: MatAutocompleteTrigger,
        @Optional() private control: NgControl) { }
    ngAfterViewInit() {
        this.observable = this.autoTrigger.panelClosingActions
            .subscribe(x => {
                if (this.autoTrigger.activeOption) {
                    // this.debug('panelClosingActions');
                    const activeOptionValue = this.autoTrigger.activeOption.value;
                    if (this.control && this.control.control && this.control.control?.value
                        && (typeof this.control.control?.value === 'string' || this.control.control?.value == '')
                    ) {
                        // this.debug("panelClosingActions set preview to ", activeOptionValue);
                        this.control.control.setValue(activeOptionValue, { emit: false });
                        this.autoTrigger.writeValue(activeOptionValue);
                    }
                }
            })
    }
    ngOnDestroy() {
        this.observable.unsubscribe();
    }
    debug(...src: any[]) {
        console.log(...src, {
            'control': this.control.control?.value?.name,
            'activeOption': this.autoTrigger.activeOption?.value?.name
        });
    }

}