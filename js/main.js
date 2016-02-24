(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var helpers = require('../helpers');
var uuid = require('uuid');

/**
 * Checks if string is valid v4 id
 * @param  {string} id Id to be checked
 * @return {boolean}
 */
var isV4 = function isV4(id) {
  if (typeof id !== 'string') {
    return false;
  }

  return (/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id)
  );
};

var CREATE_LANE = 'CREATE_LANE';
var createLane = function createLane(name) {
  if (typeof name !== 'string') {
    helpers.makeError('params', name);
  }

  return {
    type: CREATE_LANE,
    payload: {
      id: uuid.v4(),
      name: name,
      notes: []
    }
  };
};

var UPDATE_LANE = 'UPDATE_LANE';
var updateLane = function updateLane(updatedLane) {
  if ((typeof updatedLane === 'undefined' ? 'undefined' : _typeof(updatedLane)) !== 'object' || !isV4(updatedLane.id)) {
    helpers.makeError('params', updatedLane);
  }

  return {
    type: UPDATE_LANE,
    payload: updatedLane
  };
};

var DELETE_LANE = 'DELETE_LANE';
var deleteLane = function deleteLane(id) {
  if (!isV4(id)) {
    helpers.makeError('params', id);
  }

  return {
    type: DELETE_LANE,
    payload: {
      id: id
    }
  };
};

var ATTACH_TO_LANE = 'ATTACH_TO_LANE';
var attachToLane = function attachToLane(laneId, noteId) {
  if (!isV4(laneId) || !isV4(noteId)) {
    helpers.makeError('params', { laneId: laneId, noteId: noteId });
  }

  return {
    type: ATTACH_TO_LANE,
    payload: {
      laneId: laneId,
      noteId: noteId
    }
  };
};

var DETACH_FROM_LANE = 'DETACH_FROM_LANE';
var detachFromLane = function detachFromLane(laneId, noteId) {
  if (!isV4(laneId) || !isV4(noteId)) {
    helpers.makeError('params', { laneId: laneId, noteId: noteId });
  }

  return {
    type: DETACH_FROM_LANE,
    payload: {
      laneId: laneId,
      noteId: noteId
    }
  };
};

module.exports = {
  types: {
    CREATE_LANE: CREATE_LANE,
    UPDATE_LANE: UPDATE_LANE,
    DELETE_LANE: DELETE_LANE,
    ATTACH_TO_LANE: ATTACH_TO_LANE,
    DETACH_FROM_LANE: DETACH_FROM_LANE
  },
  createLane: createLane,
  updateLane: updateLane,
  deleteLane: deleteLane,
  attachToLane: attachToLane,
  detachFromLane: detachFromLane
};

},{"../helpers":9,"uuid":"uuid"}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var helpers = require('../helpers');
var uuid = require('uuid');

/**
 * Actions Types
 */

var CREATE_NOTE = 'CREATE_NOTE';
var UPDATE_NOTE = 'UPDATE_NOTE';
var DELETE_NOTE = 'DELETE_NOTE';

/**
 * Checks if string is valid v4 id
 * @param  {string} id Id to be checked
 * @return {boolean}
 */
var isV4 = function isV4(id) {
  if (typeof id !== 'string') {
    return false;
  }

  return (/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id)
  );
};

/**
 * Returns the action to create a note
 * @param  {string} text Note text
 * @return {object}
 */
var createNote = function createNote(text) {
  if (typeof text !== 'string') {
    helpers.makeError('params', text);
  }

  return {
    type: CREATE_NOTE,
    payload: {
      id: uuid.v4(),
      editing: false,
      text: text
    }
  };
};

/**
 * Returns the action to update a note
 * @param  {object} updatedNote Object with note properties to update. It must
 * have a valid id.
 * @return {object}
 */
var updateNote = function updateNote(updatedNote) {
  if ((typeof updatedNote === 'undefined' ? 'undefined' : _typeof(updatedNote)) !== 'object' || !isV4(updatedNote.id)) {
    helpers.makeError('params', updatedNote);
  }

  return {
    type: UPDATE_NOTE,
    payload: updatedNote
  };
};

/**
 * Returns the action to delete a note
 * @param  {string} id Note id
 * @return {object}
 */
var deleteNote = function deleteNote(id) {
  if (!isV4(id)) {
    helpers.makeError('params', id);
  }

  return {
    type: DELETE_NOTE,
    payload: {
      id: id
    }
  };
};

module.exports = {
  types: {
    CREATE_NOTE: CREATE_NOTE,
    UPDATE_NOTE: UPDATE_NOTE,
    DELETE_NOTE: DELETE_NOTE
  },
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote
};

},{"../helpers":9,"uuid":"uuid"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var Editable = React.createClass({
  displayName: 'Editable',

  handleDelete: function handleDelete() {
    this.props.onDelete();
  },

  handleValueClick: function handleValueClick() {
    this.props.onValueClick();
  },

  handleFinishEdit: function handleFinishEdit(e) {
    if (e.type === 'keypress' && e.key !== 'Enter') {
      return;
    }

    var value = e.target.value;

    if (this.props.onEdit && value.trim().length) {
      this.props.onEdit(value);
    }
  },

  renderEdit: function renderEdit() {
    return React.createElement('input', {
      type: 'text',
      autoFocus: true,
      className: 'editing',
      ref: function (input) {
        if (input) {
          input.selectionEnd = this.props.value.length;
        }
      }.bind(this),
      defaultValue: this.props.value,
      onBlur: this.handleFinishEdit,
      onKeyPress: this.handleFinishEdit
    });
  },

  renderDelete: function renderDelete() {
    return React.createElement(
      'span',
      { className: 'delete', onClick: this.handleDelete },
      '×'
    );
  },

  renderValue: function renderValue() {
    return React.createElement(
      'span',
      null,
      React.createElement('input', {
        type: 'text',
        onClick: this.handleValueClick,
        defaultValue: this.props.value,
        readOnly: true
      }),
      this.props.onDelete ? this.renderDelete() : null
    );
  },

  render: function render() {
    if (this.props.editing) {
      return this.renderEdit();
    }

    return this.renderValue();
  }
});

module.exports = Editable;

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');
var Notes = require('./Notes.jsx'); //eslint-disable-line no-unused-vars
var Editable = require('./Editable.jsx'); //eslint-disable-line no-unused-vars
var lanesActions = require('../actions/lanes');
var notesActions = require('../actions/notes');
var connect = require('react-redux').connect;

var Lane = React.createClass({
  displayName: 'Lane',

  render: function render() {
    var lane = this.props.lane;
    var allNotes = this.props.allNotes;
    var laneNotes = lane.notes.map(function (id) {
      return allNotes.find(function (note) {
        return note.id === id;
      });
    });

    //Remove 'undefined' notes, which are included if for some reason a note is
    //not found by its id. For example when the note is deleted by not detached
    //from the lane
    laneNotes = laneNotes.filter(function (note) {
      return note;
    });

    return React.createElement(
      'div',
      { className: 'lane' },
      React.createElement(
        'h2',
        { className: 'lane__name' },
        React.createElement(Editable, {
          editing: lane.editing,
          value: lane.name,
          onEdit: this.props.onEditLane.bind(null, lane.id),
          onValueClick: this.props.onEditLane.bind(null, lane.id)
        }),
        React.createElement(
          'button',
          {
            className: 'lane__delete',
            onClick: this.props.onDeleteLane.bind(null, lane.id)
          },
          '-'
        )
      ),
      React.createElement(Notes, {
        notes: laneNotes,
        onDeleteNote: this.props.onDeleteNote.bind(null, lane.id),
        onEditNote: this.props.onEditNote,
        onValueClick: this.props.onEditNote
      }),
      React.createElement(
        'button',
        {
          className: 'add-note',
          onClick: this.props.onCreateNote.bind(null, lane.id) },
        '+ note'
      )
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    allNotes: state.notes
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCreateNote: function onCreateNote(laneId) {
      var newNote = notesActions.createNote('New note');
      dispatch(newNote);
      dispatch(lanesActions.attachToLane(laneId, newNote.payload.id));
    },

    onDeleteNote: function onDeleteNote(laneId, noteId) {
      dispatch(notesActions.deleteNote(noteId));
      dispatch(lanesActions.detachFromLane(laneId, noteId));
    },

    onEditNote: function onEditNote(noteId, value) {
      var updatedNote = {
        id: noteId
      };

      if (value) {
        updatedNote.text = value;
        updatedNote.editing = false;
      } else {
        updatedNote.editing = true;
      }

      dispatch(notesActions.updateNote(updatedNote));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Lane);

},{"../actions/lanes":1,"../actions/notes":2,"./Editable.jsx":3,"./Notes.jsx":7,"react":"react","react-redux":"react-redux"}],5:[function(require,module,exports){
'use strict';

var React = require('react');
var Lane = require('./Lane.jsx');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var lanes = this.props.lanes.map(function (lane) {
      return React.createElement(Lane, {
        key: lane.id,
        lane: lane,
        onEditLane: this.props.onEditLane,
        onDeleteLane: this.props.onDeleteLane
      });
    }.bind(this));
    return React.createElement(
      'div',
      { className: 'lanes' },
      lanes
    );
  }
});

},{"./Lane.jsx":4,"react":"react"}],6:[function(require,module,exports){
"use strict";

var React = require('react');

var Note = React.createClass({
  displayName: "Note",

  render: function render() {
    return React.createElement(
      "li",
      { className: "note" },
      " ",
      this.props.children,
      " "
    );
  }
});

module.exports = Note;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

var React = require('react');
var Note = require('./Note.jsx'); //eslint-disable-line no-unused-vars
var Editable = require('./Editable.jsx'); //eslint-disable-line no-unused-vars

var Notes = React.createClass({
  displayName: 'Notes',

  render: function render() {
    var notes = this.props.notes.map(function (note) {
      return React.createElement(
        Note,
        { key: note.id },
        React.createElement(Editable, {
          editing: note.editing,
          value: note.text,
          onDelete: this.props.onDeleteNote.bind(null, note.id),
          onEdit: this.props.onEditNote.bind(null, note.id),
          onValueClick: this.props.onValueClick.bind(null, note.id)
        })
      );
    }.bind(this));

    return React.createElement(
      'ul',
      { className: 'notes-list' },
      notes
    );
  }
});

module.exports = Notes;

},{"./Editable.jsx":3,"./Note.jsx":6,"react":"react"}],8:[function(require,module,exports){
'use strict';

var React = require('react');

var lanesActions = require('../actions/lanes');
var connect = require('react-redux').connect;
var Lanes = require('../components/Lanes.jsx');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'react-kanban' },
      React.createElement(
        'h1',
        { className: 'app-title' },
        'React.js Kanban'
      ),
      React.createElement(
        'button',
        {
          className: 'add-lane',
          onClick: this.props.onCreateLane },
        '+'
      ),
      React.createElement(Lanes, {
        lanes: this.props.lanes,
        onEditLane: this.props.onEditLane,
        onDeleteLane: this.props.onDeleteLane
      })
    );
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    lanes: state.lanes
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCreateLane: function onCreateLane() {
      dispatch(lanesActions.createLane('Active'));
    },

    onEditLane: function onEditLane(laneId, name) {
      var updatedLane = {
        id: laneId
      };

      if (name) {
        updatedLane.name = name;
        updatedLane.editing = false;
      } else {
        updatedLane.editing = true;
      }

      dispatch(lanesActions.updateLane(updatedLane));
    },

    onDeleteLane: function onDeleteLane(laneId) {
      dispatch(lanesActions.deleteLane(laneId));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);

},{"../actions/lanes":1,"../components/Lanes.jsx":5,"react":"react","react-redux":"react-redux"}],9:[function(require,module,exports){
'use strict';

var ParamsError = function ParamsError(data) {
  this.message = 'Invalid parameters: ' + JSON.stringify(data);
  this.stack = new Error().stack;
};

ParamsError.prototype = Object.create(Error.prototype);
ParamsError.prototype.name = 'ParamsError';

var makeError = function makeError(type, data) {
  switch (type) {
    case 'params':
      throw new ParamsError(data);
    default:
      throw new Error(JSON.stringify(data));
  }
};

module.exports = {
  makeError: makeError
};

},{}],10:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var App = require('./containers/App.jsx');
var localforage = require('localforage');
var configStore = require('./store');

var localStore = localforage.createInstance({
  name: 'kanban'
});

localStore.getItem('state').then(function (value) {
  return configStore(value);
}, function (err) {
  console.error(err);
  return configStore(null);
}).then(function (store) {
  ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(App, null)
  ), document.querySelector('.app'));

  store.subscribe(function () {
    localStore.setItem('state', store.getState());
  });
});

},{"./containers/App.jsx":8,"./store":14,"localforage":"localforage","react":"react","react-dom":"react-dom","react-redux":"react-redux"}],11:[function(require,module,exports){
'use strict';

var combineReducers = require('redux').combineReducers;
var lanesReducer = require('./lanes');
var notesReducer = require('./notes');

module.exports = combineReducers({
  lanes: lanesReducer,
  notes: notesReducer
});

},{"./lanes":12,"./notes":13,"redux":"redux"}],12:[function(require,module,exports){
'use strict';

var types = require('../actions/lanes').types;
var uuid = require('uuid');

var initialState = [{
  id: uuid.v4(),
  name: 'Todo',
  notes: []
}, {
  id: uuid.v4(),
  name: 'In Progress',
  notes: []
}, {
  id: uuid.v4(),
  name: 'Review',
  notes: []
}];

module.exports = function (state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.CREATE_LANE:
      return state.concat(action.payload);

    case types.UPDATE_LANE:
      return state.map(function (lane) {
        if (lane.id === action.payload.id) {
          return Object.assign({}, lane, action.payload);
        }

        return lane;
      });

    case types.DELETE_LANE:
      return state.filter(function (lane) {
        return lane.id !== action.payload.id;
      });

    case types.ATTACH_TO_LANE:
      var laneId = action.payload.laneId;
      var noteId = action.payload.noteId;

      return state.map(function (lane) {
        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.concat(noteId)
          });
        }

        return lane;
      });

    case types.DETACH_FROM_LANE:
      var laneId = action.payload.laneId; //eslint-disable-line no-redeclare
      var noteId = action.payload.noteId; //eslint-disable-line no-redeclare

      return state.map(function (lane) {
        if (lane.id === laneId) {
          return Object.assign({}, lane, {
            notes: lane.notes.filter(function (id) {
              return id !== noteId;
            })
          });
        }

        return lane;
      });

    default:
      return state;
  }
};

},{"../actions/lanes":1,"uuid":"uuid"}],13:[function(require,module,exports){
'use strict';

var types = require('../actions/notes').types;

var initialState = [];

var reducer = function reducer(state, action) {
  state = state || initialState;

  switch (action.type) {
    case types.CREATE_NOTE:
      return state.concat(action.payload);

    case types.UPDATE_NOTE:
      return state.map(function (note) {
        if (note.id === action.payload.id) {
          return Object.assign({}, note, action.payload);
        }
        return note;
      });

    case types.DELETE_NOTE:
      return state.filter(function (note) {
        return note.id !== action.payload.id;
      });

    default:
      return state;
  }
};

module.exports = reducer;

},{"../actions/notes":2}],14:[function(require,module,exports){
'use strict';

var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var rootReducer = require('./reducers');

var logger = function logger(Store) {
  return function (next) {
    return function (action) {
      var console = window.console;
      var prevState = Store.getState();
      var returnValue = next(action);
      var nextState = Store.getState();
      console.log('%c prev state', 'color: #9E9E9E', prevState);
      console.log('%c action', 'color: #03A9F4', action);
      console.log('%c next state', 'color: #4CAF50', nextState);
      return returnValue;
    };
  };
};

module.exports = function (initialState) {
  initialState = initialState || {};
  console.log('initialState %o', initialState);

  return createStore(rootReducer, initialState, applyMiddleware(logger));
};

},{"./reducers":11,"redux":"redux"}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvamF2YXNjcmlwdHMvYWN0aW9ucy9sYW5lcy5qcyIsImFwcC9qYXZhc2NyaXB0cy9hY3Rpb25zL25vdGVzLmpzIiwiYXBwL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvRWRpdGFibGUuanN4IiwiYXBwL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvTGFuZS5qc3giLCJhcHAvamF2YXNjcmlwdHMvY29tcG9uZW50cy9MYW5lcy5qc3giLCJhcHAvamF2YXNjcmlwdHMvY29tcG9uZW50cy9Ob3RlLmpzeCIsImFwcC9qYXZhc2NyaXB0cy9jb21wb25lbnRzL05vdGVzLmpzeCIsImFwcC9qYXZhc2NyaXB0cy9jb250YWluZXJzL0FwcC5qc3giLCJhcHAvamF2YXNjcmlwdHMvaGVscGVycy5qcyIsImFwcC9qYXZhc2NyaXB0cy9pbmRleC5qc3giLCJhcHAvamF2YXNjcmlwdHMvcmVkdWNlcnMvaW5kZXguanMiLCJhcHAvamF2YXNjcmlwdHMvcmVkdWNlcnMvbGFuZXMuanMiLCJhcHAvamF2YXNjcmlwdHMvcmVkdWNlcnMvbm90ZXMuanMiLCJhcHAvamF2YXNjcmlwdHMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBSSxVQUFVLFFBQVEsWUFBUixDQUFWO0FBQ0osSUFBSSxPQUFPLFFBQVEsTUFBUixDQUFQOzs7Ozs7O0FBT0osSUFBSSxPQUFPLFNBQVAsSUFBTyxDQUFTLEVBQVQsRUFBYTtBQUN0QixNQUFHLE9BQU8sRUFBUCxLQUFjLFFBQWQsRUFBd0I7QUFDekIsV0FBTyxLQUFQLENBRHlCO0dBQTNCOztBQUlBLFNBQU8sbUVBQWtFLElBQWxFLENBQXVFLEVBQXZFLENBQVA7SUFMc0I7Q0FBYjs7QUFRWCxJQUFJLGNBQWMsYUFBZDtBQUNKLElBQUksYUFBYSxTQUFiLFVBQWEsQ0FBUyxJQUFULEVBQWU7QUFDOUIsTUFBRyxPQUFPLElBQVAsS0FB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ZWIsT0FBTyxPQUFQLEdBQWlCLFVBQVMsWUFBVCxFQUF1QjtBQUN0QyxpQkFBZSxnQkFBZ0IsRUFBaEIsQ0FEdUI7QUFFdEMsVUFBUSxHQUFSLENBQVksaUJBQVosRUFBK0IsWUFBL0IsRUFGc0M7O0FBSXRDLFNBQU8sWUFDTCxXQURLLEVBRUwsWUFGSyxFQUdMLGdCQUFnQixNQUFoQixDQUhLLENBQVAsQ0FKc0M7Q0FBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzJyk7XG52YXIgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgc3RyaW5nIGlzIHZhbGlkIHY0IGlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkIElkIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBpc1Y0ID0gZnVuY3Rpb24oaWQpIHtcbiAgaWYodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAvXlthLXowLTldezh9LVthLXowLTldezR9LTRbYS16MC05XXszfS1bYS16MC05XXs0fS1bYS16MC05XXsxMn0kLy50ZXN0KGlkKTtcbn07XG5cbnZhciBDUkVBVEVfTEFORSA9ICdDUkVBVEVfTEFORSc7XG52YXIgY3JlYXRlTGFuZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgaWYodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgaGVscGVycy5tYWtlRXJyb3IoJ3BhcmFtcycsIG5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBDUkVBVEVfTEFORSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZDogdXVpZC52NCgpLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIG5vdGVzOiBbXVxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBVUERBVEVfTEFORSA9ICdVUERBVEVfTEFORSc7XG52YXIgdXBkYXRlTGFuZSA9IGZ1bmN0aW9uKHVwZGF0ZWRMYW5lKSB7XG4gIGlmKCAodHlwZW9mIHVwZGF0ZWRMYW5lICE9PSAnb2JqZWN0JykgfHwgKCFpc1Y0KHVwZGF0ZWRMYW5lLmlkKSkgKSB7XG4gICAgaGVscGVycy5tYWtlRXJyb3IoJ3BhcmFtcycsIHVwZGF0ZWRMYW5lKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogVVBEQVRFX0xBTkUsXG4gICAgcGF5bG9hZDogdXBkYXRlZExhbmVcbiAgfTtcbn07XG5cbnZhciBERUxFVEVfTEFORSA9ICdERUxFVEVfTEFORSc7XG52YXIgZGVsZXRlTGFuZSA9IGZ1bmN0aW9uKGlkKSB7XG4gIGlmKCFpc1Y0KGlkKSkge1xuICAgIGhlbHBlcnMubWFrZUVycm9yKCdwYXJhbXMnLCBpZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6IERFTEVURV9MQU5FLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGlkOiBpZFxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBBVFRBQ0hfVE9fTEFORSA9ICdBVFRBQ0hfVE9fTEFORSc7XG52YXIgYXR0YWNoVG9MYW5lID0gZnVuY3Rpb24obGFuZUlkLCBub3RlSWQpIHtcbiAgaWYoICghaXNWNChsYW5lSWQpKSB8fCAoIWlzVjQobm90ZUlkKSkgKSB7XG4gICAgaGVscGVycy5tYWtlRXJyb3IoJ3BhcmFtcycsIHtsYW5lSWQ6IGxhbmVJZCwgbm90ZUlkOiBub3RlSWR9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogQVRUQUNIX1RPX0xBTkUsXG4gICAgcGF5bG9hZDoge1xuICAgICAgbGFuZUlkOiBsYW5lSWQsXG4gICAgICBub3RlSWQ6IG5vdGVJZFxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBERVRBQ0hfRlJPTV9MQU5FID0gJ0RFVEFDSF9GUk9NX0xBTkUnO1xudmFyIGRldGFjaEZyb21MYW5lID0gZnVuY3Rpb24obGFuZUlkLCBub3RlSWQpIHtcbiAgaWYoICghaXNWNChsYW5lSWQpKSB8fCAoIWlzVjQobm90ZUlkKSkgKSB7XG4gICAgaGVscGVycy5tYWtlRXJyb3IoJ3BhcmFtcycsIHtsYW5lSWQ6IGxhbmVJZCwgbm90ZUlkOiBub3RlSWR9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogREVUQUNIX0ZST01fTEFORSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBsYW5lSWQ6IGxhbmVJZCxcbiAgICAgIG5vdGVJZDogbm90ZUlkXG4gICAgfVxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHR5cGVzOiB7XG4gICAgQ1JFQVRFX0xBTkU6IENSRUFURV9MQU5FLFxuICAgIFVQREFURV9MQU5FOiBVUERBVEVfTEFORSxcbiAgICBERUxFVEVfTEFORTogREVMRVRFX0xBTkUsXG4gICAgQVRUQUNIX1RPX0xBTkU6IEFUVEFDSF9UT19MQU5FLFxuICAgIERFVEFDSF9GUk9NX0xBTkU6IERFVEFDSF9GUk9NX0xBTkVcbiAgfSxcbiAgY3JlYXRlTGFuZTogY3JlYXRlTGFuZSxcbiAgdXBkYXRlTGFuZTogdXBkYXRlTGFuZSxcbiAgZGVsZXRlTGFuZTogZGVsZXRlTGFuZSxcbiAgYXR0YWNoVG9MYW5lOiBhdHRhY2hUb0xhbmUsXG4gIGRldGFjaEZyb21MYW5lOiBkZXRhY2hGcm9tTGFuZVxufTtcbiIsInZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xudmFyIHV1aWQgPSByZXF1aXJlKCd1dWlkJyk7XG5cbi8qKlxuICogQWN0aW9ucyBUeXBlc1xuICovXG5cbnZhciBDUkVBVEVfTk9URSA9ICdDUkVBVEVfTk9URSc7XG52YXIgVVBEQVRFX05PVEUgPSAnVVBEQVRFX05PVEUnO1xudmFyIERFTEVURV9OT1RFID0gJ0RFTEVURV9OT1RFJztcblxuLyoqXG4gKiBDaGVja3MgaWYgc3RyaW5nIGlzIHZhbGlkIHY0IGlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkIElkIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnZhciBpc1Y0ID0gZnVuY3Rpb24oaWQpIHtcbiAgaWYodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAvXlthLXowLTldezh9LVthLXowLTldezR9LTRbYS16MC05XXszfS1bYS16MC05XXs0fS1bYS16MC05XXsxMn0kLy50ZXN0KGlkKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIHRvIGNyZWF0ZSBhIG5vdGVcbiAqIEBwYXJhbSAge3N0cmluZ30gdGV4dCBOb3RlIHRleHRcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGNyZWF0ZU5vdGUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmKHR5cGVvZiB0ZXh0ICE9PSAnc3RyaW5nJykge1xuICAgIGhlbHBlcnMubWFrZUVycm9yKCdwYXJhbXMnLCB0ZXh0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogQ1JFQVRFX05PVEUsXG4gICAgcGF5bG9hZDoge1xuICAgICAgaWQ6IHV1aWQudjQoKSxcbiAgICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgICAgdGV4dDogdGV4dFxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIHRvIHVwZGF0ZSBhIG5vdGVcbiAqIEBwYXJhbSAge29iamVjdH0gdXBkYXRlZE5vdGUgT2JqZWN0IHdpdGggbm90ZSBwcm9wZXJ0aWVzIHRvIHVwZGF0ZS4gSXQgbXVzdFxuICogaGF2ZSBhIHZhbGlkIGlkLlxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIgdXBkYXRlTm90ZSA9IGZ1bmN0aW9uKHVwZGF0ZWROb3RlKSB7XG4gIGlmKCAodHlwZW9mIHVwZGF0ZWROb3RlICE9PSAnb2JqZWN0JykgfHwgKCFpc1Y0KHVwZGF0ZWROb3RlLmlkKSkgKSB7XG4gICAgaGVscGVycy5tYWtlRXJyb3IoJ3BhcmFtcycsIHVwZGF0ZWROb3RlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogVVBEQVRFX05PVEUsXG4gICAgcGF5bG9hZDogdXBkYXRlZE5vdGVcbiAgfTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aW9uIHRvIGRlbGV0ZSBhIG5vdGVcbiAqIEBwYXJhbSAge3N0cmluZ30gaWQgTm90ZSBpZFxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIgZGVsZXRlTm90ZSA9IGZ1bmN0aW9uKGlkKSB7XG4gIGlmKCFpc1Y0KGlkKSkge1xuICAgIGhlbHBlcnMubWFrZUVycm9yKCdwYXJhbXMnLCBpZCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6IERFTEVURV9OT1RFLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGlkOiBpZFxuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0eXBlczoge1xuICAgIENSRUFURV9OT1RFOiBDUkVBVEVfTk9URSxcbiAgICBVUERBVEVfTk9URTogVVBEQVRFX05PVEUsXG4gICAgREVMRVRFX05PVEU6IERFTEVURV9OT1RFXG4gIH0sXG4gIGNyZWF0ZU5vdGU6IGNyZWF0ZU5vdGUsXG4gIHVwZGF0ZU5vdGU6IHVwZGF0ZU5vdGUsXG4gIGRlbGV0ZU5vdGU6IGRlbGV0ZU5vdGVcbn07XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgRWRpdGFibGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGhhbmRsZURlbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vbkRlbGV0ZSgpO1xuICB9LFxuXG4gIGhhbmRsZVZhbHVlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMub25WYWx1ZUNsaWNrKCk7XG4gIH0sXG5cbiAgaGFuZGxlRmluaXNoRWRpdDogZnVuY3Rpb24oZSkge1xuICAgIGlmKCAoZS50eXBlID09PSAna2V5cHJlc3MnKSAmJiAoZS5rZXkgIT09ICdFbnRlcicpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgaWYodGhpcy5wcm9wcy5vbkVkaXQgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkVkaXQodmFsdWUpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXJFZGl0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZWRpdGluZ1wiXG4gICAgICAgICAgcmVmPXtmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgICAgaWYoaW5wdXQpIHtcbiAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gdGhpcy5wcm9wcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfS5iaW5kKHRoaXMpfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlRmluaXNoRWRpdH1cbiAgICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZUZpbmlzaEVkaXR9XG4gICAgICAgIC8+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXJEZWxldGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJkZWxldGVcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZURlbGV0ZX0+XG4gICAgICAgICZ0aW1lcztcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9LFxuXG4gIHJlbmRlclZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVmFsdWVDbGlja31cbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgLz5cbiAgICAgICAge3RoaXMucHJvcHMub25EZWxldGU/IHRoaXMucmVuZGVyRGVsZXRlKCkgOiBudWxsfVxuICAgICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMucHJvcHMuZWRpdGluZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWRpdCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlbmRlclZhbHVlKCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRhYmxlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBOb3RlcyA9IHJlcXVpcmUoJy4vTm90ZXMuanN4Jyk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xudmFyIEVkaXRhYmxlID0gcmVxdWlyZSgnLi9FZGl0YWJsZS5qc3gnKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG52YXIgbGFuZXNBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9sYW5lcycpO1xudmFyIG5vdGVzQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvbm90ZXMnKTtcbnZhciBjb25uZWN0ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKS5jb25uZWN0O1xuXG52YXIgTGFuZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGFuZSA9IHRoaXMucHJvcHMubGFuZTtcbiAgICB2YXIgYWxsTm90ZXMgPSB0aGlzLnByb3BzLmFsbE5vdGVzO1xuICAgIHZhciBsYW5lTm90ZXMgPSBsYW5lLm5vdGVzLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGFsbE5vdGVzLmZpbmQoZnVuY3Rpb24obm90ZSkge1xuICAgICAgICByZXR1cm4gbm90ZS5pZCA9PT0gaWQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vUmVtb3ZlICd1bmRlZmluZWQnIG5vdGVzLCB3aGljaCBhcmUgaW5jbHVkZWQgaWYgZm9yIHNvbWUgcmVhc29uIGEgbm90ZSBpc1xuICAgIC8vbm90IGZvdW5kIGJ5IGl0cyBpZC4gRm9yIGV4YW1wbGUgd2hlbiB0aGUgbm90ZSBpcyBkZWxldGVkIGJ5IG5vdCBkZXRhY2hlZFxuICAgIC8vZnJvbSB0aGUgbGFuZVxuICAgIGxhbmVOb3RlcyA9IGxhbmVOb3Rlcy5maWx0ZXIoZnVuY3Rpb24obm90ZSkge1xuICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYW5lXCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJsYW5lX19uYW1lXCI+XG4gICAgICAgICAgPEVkaXRhYmxlXG4gICAgICAgICAgICBlZGl0aW5nPXtsYW5lLmVkaXRpbmd9XG4gICAgICAgICAgICB2YWx1ZT17bGFuZS5uYW1lfVxuICAgICAgICAgICAgb25FZGl0PXt0aGlzLnByb3BzLm9uRWRpdExhbmUuYmluZChudWxsLCBsYW5lLmlkKX1cbiAgICAgICAgICAgIG9uVmFsdWVDbGljaz17dGhpcy5wcm9wcy5vbkVkaXRMYW5lLmJpbmQobnVsbCwgbGFuZS5pZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImxhbmVfX2RlbGV0ZVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkRlbGV0ZUxhbmUuYmluZChudWxsLCBsYW5lLmlkKX1cbiAgICAgICAgPi08L2J1dHRvbj5cbiAgICAgICAgPC9oMj5cbiAgICAgICAgPE5vdGVzXG4gICAgICAgICAgbm90ZXM9e2xhbmVOb3Rlc31cbiAgICAgICAgICBvbkRlbGV0ZU5vdGU9e3RoaXMucHJvcHMub25EZWxldGVOb3RlLmJpbmQobnVsbCwgbGFuZS5pZCl9XG4gICAgICAgICAgb25FZGl0Tm90ZT17dGhpcy5wcm9wcy5vbkVkaXROb3RlfVxuICAgICAgICAgIG9uVmFsdWVDbGljaz17dGhpcy5wcm9wcy5vbkVkaXROb3RlfVxuICAgICAgICAvPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9XCJhZGQtbm90ZVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DcmVhdGVOb3RlLmJpbmQobnVsbCwgbGFuZS5pZCl9ID5cbiAgICAgICAgKyBub3RlXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgbWFwU3RhdGVUb1Byb3BzID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBhbGxOb3Rlczogc3RhdGUubm90ZXNcbiAgfTtcbn07XG5cbnZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBmdW5jdGlvbihkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIG9uQ3JlYXRlTm90ZTogZnVuY3Rpb24obGFuZUlkKSB7XG4gICAgICB2YXIgbmV3Tm90ZSA9IG5vdGVzQWN0aW9ucy5jcmVhdGVOb3RlKCdOZXcgbm90ZScpO1xuICAgICAgZGlzcGF0Y2gobmV3Tm90ZSk7XG4gICAgICBkaXNwYXRjaCggbGFuZXNBY3Rpb25zLmF0dGFjaFRvTGFuZShsYW5lSWQsIG5ld05vdGUucGF5bG9hZC5pZCkgKTtcbiAgICB9LFxuXG4gICAgb25EZWxldGVOb3RlOiBmdW5jdGlvbihsYW5lSWQsIG5vdGVJZCkge1xuICAgICAgZGlzcGF0Y2goIG5vdGVzQWN0aW9ucy5kZWxldGVOb3RlKG5vdGVJZCkgKTtcbiAgICAgIGRpc3BhdGNoKCBsYW5lc0FjdGlvbnMuZGV0YWNoRnJvbUxhbmUobGFuZUlkLCBub3RlSWQpICk7XG4gICAgfSxcblxuICAgIG9uRWRpdE5vdGU6IGZ1bmN0aW9uKG5vdGVJZCwgdmFsdWUpIHtcbiAgICAgIHZhciB1cGRhdGVkTm90ZSA9IHtcbiAgICAgICAgaWQ6IG5vdGVJZFxuICAgICAgfTtcblxuICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgdXBkYXRlZE5vdGUudGV4dCA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkTm90ZS5lZGl0aW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVkTm90ZS5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZGlzcGF0Y2goIG5vdGVzQWN0aW9ucy51cGRhdGVOb3RlKHVwZGF0ZWROb3RlKSApO1xuICAgIH1cbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTGFuZSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIExhbmUgPSByZXF1aXJlKCcuL0xhbmUuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsYW5lcyA9IHRoaXMucHJvcHMubGFuZXMubWFwKGZ1bmN0aW9uKGxhbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxMYW5lXG4gICAgICAgICAga2V5PXtsYW5lLmlkfVxuICAgICAgICAgIGxhbmU9e2xhbmV9XG4gICAgICAgICAgb25FZGl0TGFuZT17dGhpcy5wcm9wcy5vbkVkaXRMYW5lfVxuICAgICAgICAgIG9uRGVsZXRlTGFuZT17dGhpcy5wcm9wcy5vbkRlbGV0ZUxhbmV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFuZXNcIj5cbiAgICAgICAge2xhbmVzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgTm90ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5vdGVcIiA+IHt0aGlzLnByb3BzLmNoaWxkcmVufSA8L2xpPlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdGU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE5vdGUgPSByZXF1aXJlKCcuL05vdGUuanN4Jyk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xudmFyIEVkaXRhYmxlID0gcmVxdWlyZSgnLi9FZGl0YWJsZS5qc3gnKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbnZhciBOb3RlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm90ZXMgPSB0aGlzLnByb3BzLm5vdGVzLm1hcChmdW5jdGlvbihub3RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Tm90ZSAga2V5PXtub3RlLmlkfT5cbiAgICAgICAgICA8RWRpdGFibGVcbiAgICAgICAgICAgIGVkaXRpbmc9e25vdGUuZWRpdGluZ31cbiAgICAgICAgICAgIHZhbHVlPXtub3RlLnRleHR9XG4gICAgICAgICAgICBvbkRlbGV0ZT17dGhpcy5wcm9wcy5vbkRlbGV0ZU5vdGUuYmluZChudWxsLCBub3RlLmlkKX1cbiAgICAgICAgICAgIG9uRWRpdD17dGhpcy5wcm9wcy5vbkVkaXROb3RlLmJpbmQobnVsbCwgbm90ZS5pZCl9XG4gICAgICAgICAgICBvblZhbHVlQ2xpY2s9e3RoaXMucHJvcHMub25WYWx1ZUNsaWNrLmJpbmQobnVsbCwgbm90ZS5pZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Ob3RlPlxuICAgICAgKTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJub3Rlcy1saXN0XCI+XG4gICAgICAgIHtub3Rlc31cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm90ZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBsYW5lc0FjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL2xhbmVzJyk7XG52YXIgY29ubmVjdCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4JykuY29ubmVjdDtcbnZhciBMYW5lcyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvTGFuZXMuanN4Jyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3Qta2FuYmFuXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJhcHAtdGl0bGVcIj5SZWFjdC5qcyBLYW5iYW48L2gxPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWRkLWxhbmVcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DcmVhdGVMYW5lfT5cbiAgICAgICAgICArXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8TGFuZXNcbiAgICAgICAgICBsYW5lcz17dGhpcy5wcm9wcy5sYW5lc31cbiAgICAgICAgICBvbkVkaXRMYW5lPXt0aGlzLnByb3BzLm9uRWRpdExhbmV9XG4gICAgICAgICAgb25EZWxldGVMYW5lPXt0aGlzLnByb3BzLm9uRGVsZXRlTGFuZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgbWFwU3RhdGVUb1Byb3BzID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBsYW5lczogc3RhdGUubGFuZXNcbiAgfTtcbn07XG5cbnZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBmdW5jdGlvbihkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIG9uQ3JlYXRlTGFuZTogZnVuY3Rpb24oKSB7XG4gICAgICBkaXNwYXRjaCggbGFuZXNBY3Rpb25zLmNyZWF0ZUxhbmUoJ0FjdGl2ZScpICk7XG4gICAgfSxcblxuICAgIG9uRWRpdExhbmU6IGZ1bmN0aW9uKGxhbmVJZCwgbmFtZSkge1xuICAgICAgdmFyIHVwZGF0ZWRMYW5lID0ge1xuICAgICAgICBpZDogbGFuZUlkXG4gICAgICB9O1xuXG4gICAgICBpZihuYW1lKSB7XG4gICAgICAgIHVwZGF0ZWRMYW5lLm5hbWUgPSBuYW1lO1xuICAgICAgICB1cGRhdGVkTGFuZS5lZGl0aW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVkTGFuZS5lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZGlzcGF0Y2goIGxhbmVzQWN0aW9ucy51cGRhdGVMYW5lKHVwZGF0ZWRMYW5lKSApO1xuICAgIH0sXG5cbiAgICBvbkRlbGV0ZUxhbmU6IGZ1bmN0aW9uKGxhbmVJZCkge1xuICAgICAgZGlzcGF0Y2goIGxhbmVzQWN0aW9ucy5kZWxldGVMYW5lKGxhbmVJZCkgKTtcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcCk7XG4iLCJ2YXIgUGFyYW1zRXJyb3IgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdJbnZhbGlkIHBhcmFtZXRlcnM6ICcgKyBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG59O1xuXG5QYXJhbXNFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5QYXJhbXNFcnJvci5wcm90b3R5cGUubmFtZSA9ICdQYXJhbXNFcnJvcic7XG5cbnZhciBtYWtlRXJyb3IgPSBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3BhcmFtcyc6XG4gICAgICB0aHJvdyBuZXcgUGFyYW1zRXJyb3IoZGF0YSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtYWtlRXJyb3I6IG1ha2VFcnJvclxufTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBQcm92aWRlciA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4JykuUHJvdmlkZXI7XG52YXIgQXBwID0gcmVxdWlyZSgnLi9jb250YWluZXJzL0FwcC5qc3gnKTtcbnZhciBsb2NhbGZvcmFnZSA9IHJlcXVpcmUoJ2xvY2FsZm9yYWdlJyk7XG52YXIgY29uZmlnU3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG5cbnZhciBsb2NhbFN0b3JlID0gbG9jYWxmb3JhZ2UuY3JlYXRlSW5zdGFuY2Uoe1xuICBuYW1lOiAna2FuYmFuJ1xufSk7XG5cbmxvY2FsU3RvcmUuZ2V0SXRlbSgnc3RhdGUnKVxuICAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBjb25maWdTdG9yZSh2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICByZXR1cm4gY29uZmlnU3RvcmUobnVsbCk7XG4gIH0pXG4gIC50aGVuKGZ1bmN0aW9uKHN0b3JlKSB7XG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgIDxBcHAgLz5cbiAgICAgIDwvUHJvdmlkZXI+LFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFwcCcpXG4gICAgKTtcblxuICAgIHN0b3JlLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgIGxvY2FsU3RvcmUuc2V0SXRlbSgnc3RhdGUnLCBzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICB9KTtcbiAgfSk7XG4iLCJ2YXIgY29tYmluZVJlZHVjZXJzID0gcmVxdWlyZSgncmVkdXgnKS5jb21iaW5lUmVkdWNlcnM7XG52YXIgbGFuZXNSZWR1Y2VyID0gcmVxdWlyZSgnLi9sYW5lcycpO1xudmFyIG5vdGVzUmVkdWNlciA9IHJlcXVpcmUoJy4vbm90ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBsYW5lczogbGFuZXNSZWR1Y2VyLFxuICBub3Rlczogbm90ZXNSZWR1Y2VyXG59KTtcbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvbGFuZXMnKS50eXBlcztcbnZhciB1dWlkID0gcmVxdWlyZSgndXVpZCcpO1xuXG52YXIgaW5pdGlhbFN0YXRlID0gW1xuICB7XG4gICAgaWQ6IHV1aWQudjQoKSxcbiAgICBuYW1lOiAnVG9kbycsXG4gICAgbm90ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBpZDogdXVpZC52NCgpLFxuICAgIG5hbWU6ICdJbiBQcm9ncmVzcycsXG4gICAgbm90ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBpZDogdXVpZC52NCgpLFxuICAgIG5hbWU6ICdSZXZpZXcnLFxuICAgIG5vdGVzOiBbXVxuICB9XG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgc3RhdGUgPSBzdGF0ZSB8fCBpbml0aWFsU3RhdGU7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgdHlwZXMuQ1JFQVRFX0xBTkU6XG4gICAgICByZXR1cm4gc3RhdGUuY29uY2F0KGFjdGlvbi5wYXlsb2FkKTtcblxuICAgIGNhc2UgdHlwZXMuVVBEQVRFX0xBTkU6XG4gICAgICByZXR1cm4gc3RhdGUubWFwKGZ1bmN0aW9uKGxhbmUpIHtcbiAgICAgICAgaWYobGFuZS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQpIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbGFuZSwgYWN0aW9uLnBheWxvYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhbmU7XG4gICAgICB9KTtcblxuICAgIGNhc2UgdHlwZXMuREVMRVRFX0xBTkU6XG4gICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKGZ1bmN0aW9uKGxhbmUpIHtcbiAgICAgICAgcmV0dXJuIGxhbmUuaWQgIT09IGFjdGlvbi5wYXlsb2FkLmlkO1xuICAgICAgfSk7XG5cbiAgICBjYXNlIHR5cGVzLkFUVEFDSF9UT19MQU5FOlxuICAgICAgdmFyIGxhbmVJZCA9IGFjdGlvbi5wYXlsb2FkLmxhbmVJZDtcbiAgICAgIHZhciBub3RlSWQgPSBhY3Rpb24ucGF5bG9hZC5ub3RlSWQ7XG5cbiAgICAgIHJldHVybiBzdGF0ZS5tYXAoZnVuY3Rpb24obGFuZSkge1xuICAgICAgICBpZihsYW5lLmlkID09PSBsYW5lSWQpIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbGFuZSwge1xuICAgICAgICAgICAgbm90ZXM6IGxhbmUubm90ZXMuY29uY2F0KG5vdGVJZClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYW5lO1xuICAgICAgfSk7XG5cbiAgICBjYXNlIHR5cGVzLkRFVEFDSF9GUk9NX0xBTkU6XG4gICAgICB2YXIgbGFuZUlkID0gYWN0aW9uLnBheWxvYWQubGFuZUlkOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVkZWNsYXJlXG4gICAgICB2YXIgbm90ZUlkID0gYWN0aW9uLnBheWxvYWQubm90ZUlkOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVkZWNsYXJlXG5cbiAgICAgIHJldHVybiBzdGF0ZS5tYXAoZnVuY3Rpb24obGFuZSkge1xuICAgICAgICBpZihsYW5lLmlkID09PSBsYW5lSWQpIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbGFuZSwge1xuICAgICAgICAgICAgbm90ZXM6IGxhbmUubm90ZXMuZmlsdGVyKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZCAhPT0gbm90ZUlkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYW5lO1xuICAgICAgfSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuIiwidmFyIHR5cGVzID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9ub3RlcycpLnR5cGVzO1xuXG52YXIgaW5pdGlhbFN0YXRlID0gW107XG5cbnZhciByZWR1Y2VyID0gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICBzdGF0ZSA9IHN0YXRlIHx8IGluaXRpYWxTdGF0ZTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5DUkVBVEVfTk9URTpcbiAgICAgIHJldHVybiBzdGF0ZS5jb25jYXQoYWN0aW9uLnBheWxvYWQpO1xuXG4gICAgY2FzZSB0eXBlcy5VUERBVEVfTk9URTpcbiAgICAgIHJldHVybiBzdGF0ZS5tYXAoZnVuY3Rpb24obm90ZSkge1xuICAgICAgICBpZihub3RlLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBub3RlLCBhY3Rpb24ucGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgICB9KTtcblxuICAgIGNhc2UgdHlwZXMuREVMRVRFX05PVEU6XG4gICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKGZ1bmN0aW9uKG5vdGUpIHtcbiAgICAgICAgcmV0dXJuIG5vdGUuaWQgIT09IGFjdGlvbi5wYXlsb2FkLmlkO1xuICAgICAgfSk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZXI7XG4iLCJ2YXIgY3JlYXRlU3RvcmUgPSByZXF1aXJlKCdyZWR1eCcpLmNyZWF0ZVN0b3JlO1xudmFyIGFwcGx5TWlkZGxld2FyZSA9IHJlcXVpcmUoJ3JlZHV4JykuYXBwbHlNaWRkbGV3YXJlO1xudmFyIHJvb3RSZWR1Y2VyID0gcmVxdWlyZSgnLi9yZWR1Y2VycycpO1xuXG52YXIgbG9nZ2VyID0gZnVuY3Rpb24oU3RvcmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5leHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgICB2YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgICAgdmFyIHByZXZTdGF0ZSA9IFN0b3JlLmdldFN0YXRlKCk7XG4gICAgICB2YXIgcmV0dXJuVmFsdWUgPSBuZXh0KGFjdGlvbik7XG4gICAgICB2YXIgbmV4dFN0YXRlID0gU3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnNvbGUubG9nKCclYyBwcmV2IHN0YXRlJywgJ2NvbG9yOiAjOUU5RTlFJywgcHJldlN0YXRlKTtcbiAgICAgIGNvbnNvbGUubG9nKCclYyBhY3Rpb24nLCAnY29sb3I6ICMwM0E5RjQnLCBhY3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coJyVjIG5leHQgc3RhdGUnLCAnY29sb3I6ICM0Q0FGNTAnLCBuZXh0U3RhdGUpO1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH07XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluaXRpYWxTdGF0ZSkge1xuICBpbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGUgfHwge307XG4gIGNvbnNvbGUubG9nKCdpbml0aWFsU3RhdGUgJW8nLCBpbml0aWFsU3RhdGUpO1xuXG4gIHJldHVybiBjcmVhdGVTdG9yZShcbiAgICByb290UmVkdWNlcixcbiAgICBpbml0aWFsU3RhdGUsXG4gICAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcbiAgKTtcbn07XG4iXX0=
