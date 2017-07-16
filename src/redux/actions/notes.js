// @flow

import uuid from 'uuid';
import { isV4 } from '../../helpers';
import * as actionTypes from '../../constants/actionTypes';

import type { IAction, INote } from '../../types';

/**
 * Returns the action to create a note
 */
function createNote(text: string): IAction {
  return {
    type: actionTypes.CREATE_NOTE,
    payload: {
      id: uuid.v4(),
      editing: false,
      text,
    },
  };
}

/**
 * Returns the action to update a note
 */
function updateNote(updatedNote: INote): IAction {
  if (!isV4(updatedNote.id)) {
    throw new Error(`params have not valid uuids ${JSON.stringify(updatedNote)}`);
  }

  return {
    type: actionTypes.UPDATE_NOTE,
    payload: updatedNote,
  };
}

/**
 * Returns the action to delete a note
 */
function deleteNote(id: string): IAction {
  if (!isV4(id)) {
    throw new Error(`params have not valid uuids ${id}`);
  }

  return {
    type: actionTypes.DELETE_NOTE,
    payload: {
      id,
    },
  };
}

export default {
  createNote,
  updateNote,
  deleteNote,
};
