// @flow

export interface BaseAction {
  type: string,
}

export interface Action extends BaseAction {
  type: string,
  payload: any,
}

export interface Note {
  id: string,
  name?: string,
  editing?: boolean,
}

export interface Lane {
  id: string,
  name: string,
  editing: boolean,
  notes: Note[],
}
