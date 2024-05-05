import { FormControl, FormArray, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static passwordMatchValidator(fieldToCompare: string) {
    const validator = (formControl: AbstractControl) => {
      
      if(!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      if(fieldToCompare == null) {
        throw new Error('é necessário informar um campo');
      }
      
      const field = (<FormGroup>formControl.root).get(fieldToCompare);
      if(!field) {
        throw new Error('É necessário informar um campo válido');
      }

      if(field.value !== formControl.value) {
        return { passwordMatchValidator: true }
      }

      return null;
    };
    return validator;
  }
}

// export function passwordMatchValidator(): ValidatorFn { 
//     return (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');

//     console.log(control);

//     console.log(`Password: ${password}\nConfirm Password: ${confirmPassword}`)

//     return password && confirmPassword && password.value === confirmPassword.value ? null : {'passwordMatchValidator': true};
//   }
// };