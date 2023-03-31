import { Inputer } from './type';
import datePicker from './date-picker';
import inputNumber from './input-number';
import input from './input';
import rangePicker from './range-picker';
import select from './select';
import textarea from './textarea';
import treeSelect from './tree-select';

export const inputer = new Inputer({
  datePicker,
  inputNumber,
  input,
  rangePicker,
  select,
  textarea,
  treeSelect,
});

export type InputType = keyof typeof inputer.map;
