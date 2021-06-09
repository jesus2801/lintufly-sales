import { Action } from 'redux';

//tipados de ayuda para las acciones
export interface AppActions extends Action {
  type: string;
  payload: any;
}
