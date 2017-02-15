import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'objectToArray'
})
export class ObjectToArray {
  transform(value) {
    const newArray = Object.keys(value).map(key => value[key]);
    return newArray;
  }
}