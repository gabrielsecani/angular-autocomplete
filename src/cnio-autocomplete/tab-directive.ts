
import { AfterViewInit, Directive, HostListener, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';


@Directive({ selector: '[tab-directive]' })
export class TabDirective implements AfterViewInit, OnDestroy {
    observable: Subscription;
    preview: any;
    constructor(@Optional() private autoTrigger: MatAutocompleteTrigger,
        @Optional() private control: NgControl) { }
    ngAfterViewInit() {
        this.observable = this.autoTrigger.panelClosingActions.subscribe(x => {
            if (this.autoTrigger.activeOption) {
                const activeOptionValue = this.autoTrigger.activeOption.value;
                console.log("panelClosingActions activeOption", activeOptionValue, 'control.value', this.control.control?.value, typeof this.control.control?.value);
                if (this.control && this.control.control && this.control.control?.value && typeof this.control.control?.value === 'string') {
                    console.log("panelClosingActions set", typeof activeOptionValue);
                    this.preview = null;
                    this.control.control.setValue(activeOptionValue, { emit: false });
                    this.autoTrigger.writeValue(activeOptionValue);
                }
            }
        })
        this.observable.add(this.autoTrigger.optionSelections.subscribe(select => {
            console.log('#optionSelections', select, 'isUser', select.isUserInput, 'value', select.source?.value);
        }))

        if (this.control && this.control.valueChanges) {
            this.observable.add(this.control.valueChanges.subscribe(
                changes => {
                    console.log("changes", changes, 'typeof', typeof changes);
                    if (typeof changes === 'object') {
                        this.preview = changes;
                    }
                }
            ))
        }
    }
    ngOnDestroy() {
        this.observable.unsubscribe();
    }

    @HostListener('blur')
    handleBlur() {
        console.log('blur preview', this.preview, 'value', this.control.control?.value);
        if (this.preview && typeof this.preview === 'object' && typeof this.control.control?.value !== 'object') {
        //     console.log('blur voltando valor', this.preview)
            const value = this.preview;
            this.preview=null;
            this.control.control?.setValue(value, { emit: true });
            this.autoTrigger.writeValue(value);
        }
    }

    @HostListener('click')
    handleClick() {
        console.log('click control.value', this.control.control?.value, 'preview', this.preview, 'typeof', typeof this.preview);
        if (this.preview && typeof this.preview === 'object' && typeof this.control.control?.value == 'object') {
            // console.log('focus limpando filtro, valor anterior', this.preview)
            this.control.control?.setValue('', { emit: true });
        }
    }

}