import { AppreciationToColorPipe } from './appreciation-to-color.pipe';
import { Appreciation } from '../models/Appreciation';

describe('AppreciationToColorPipe', () => {

  let pipe : AppreciationToColorPipe;

  it('create an instance', () => {
    pipe = new AppreciationToColorPipe()
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    expect(pipe.transform(Appreciation.ERROR)).toEqual('danger');
    expect(pipe).toBeTruthy();
  });
  
});
