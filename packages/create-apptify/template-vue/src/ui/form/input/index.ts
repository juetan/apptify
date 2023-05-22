import cascader from "./cascader";
import datePicker from "./date-picker";
import input from "./input";
import inputNumber from "./input-number";
import inputPassword from "./input-password";
import rangePicker from "./range-picker";
import select from "./select";
import textarea from "./textarea";
import treeSelect from "./tree-select";
import { Inputer } from "./type";

export const inputer = new Inputer({
  datePicker,
  inputNumber,
  input,
  rangePicker,
  select,
  textarea,
  treeSelect,
  cascader,
  inputPassword,
});

export type InputType = keyof typeof inputer.map;
