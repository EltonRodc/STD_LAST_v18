import { Provider } from "@angular/core";
import { MatDateFormats } from "@angular/material/core";
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';


export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export function provideDateAdapter(): Provider[] {
  return provideMomentDateAdapter(MY_DATE_FORMATS, { useUtc: true })
}
