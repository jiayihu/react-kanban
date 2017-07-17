// @flow

import React from 'react';

import lanesActions from '../redux/actions/lanes';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes/Lanes.jsx';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import type { ILane } from '../types';

type Props = {
  lanes: ILane[],
  onCreateLane: Function,
  onDeleteLane: Function,
  onEditLane: Function,
  onMoveLane: Function,
  onReset: Function,
};

class App extends React.Component<*, Props, *> {
  render() {
    return (
      <div className="react-kanban">
        <h1 className="app-title">React.js Kanban</h1>
        <button className="add-lane" onClick={this.props.onCreateLane}>
          + Lane
        </button>
        <button className="reset-store" onClick={this.props.onReset}>
          Reset persisted store
        </button>
        <Lanes
          lanes={this.props.lanes}
          onEditLane={this.props.onEditLane}
          onDeleteLane={this.props.onDeleteLane}
          onMoveLane={this.props.onMoveLane}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lanes: state.lanes,
});

const mapDispatchToProps = dispatch => ({
  onCreateLane() {
    dispatch(lanesActions.createLane('Active'));
  },

  onEditLane(laneId, name) {
    const updatedLane: any = {
      id: laneId,
    };

    if (name) {
      (updatedLane: any).name = name;
      (updatedLane: any).editing = false;
    } else {
      (updatedLane: any).editing = true;
    }

    dispatch(lanesActions.updateLane(updatedLane));
  },

  onDeleteLane(laneId) {
    dispatch(lanesActions.deleteLane(laneId));
  },

  onMoveLane(sourceId, targetId) {
    dispatch(lanesActions.move('lane', sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App));
