// @flow

export interface IBaseAction {
  type: string,
}

export interface IAction extends IBaseAction {
  type: string,
  payload: any,
}

export interface INote {
  id: string,
  text?: string,
  editing?: boolean,
}

export interface ILane {
  id: string,
  name: string,
  editing: boolean,
  notes: INote[],
}
