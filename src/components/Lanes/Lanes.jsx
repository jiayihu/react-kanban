// @flow

import './_lanes.scss';

import React, { PropTypes } from 'react';
import Lane from '../../containers/Lane.jsx';

import type { ILane } from '../../types';

type Props = {
  lanes: ILane[],
  onEditLane: Function,
  onDeleteLane: Function,
  onMoveLane: Function,
};

export default class Lanes extends React.Component<*, Props, *> {
  render() {
    const lanes = this.props.lanes.map(lane =>
      <Lane
        key={lane.id}
        lane={lane}
        onEditLane={this.props.onEditLane}
        onDeleteLane={this.props.onDeleteLane}
        onMoveLane={this.props.onMoveLane}
      />
    );

    return (
      <div className="lanes">
        {lanes}
      </div>
    );
  }
}

Lanes.propTypes = {
  lanes: PropTypes.array.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
};
