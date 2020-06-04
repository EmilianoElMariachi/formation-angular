import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Appreciation } from '../models/Appreciation';

@Pipe({
  name: 'appreciationToColor'
})
export class AppreciationToColorPipe implements PipeTransform {

  transform(value: Appreciation): string {
    switch (value) {
      case Appreciation.SUCCESS : 
        return "success"
      case Appreciation.WARNING : 
        return "warning";
      case Appreciation.ERROR : 
        return "danger";
    }
  }

}
