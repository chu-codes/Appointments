import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[confirmValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmValidator,
      multi: true,
    },
  ],
})
export class ConfirmValidator implements Validators {
  @Input() confirmValidator: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.confirmValidator);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { notEqual: true };
    }
    return null;
  }
}
