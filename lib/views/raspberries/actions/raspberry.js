'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ACTION_SENT_RASPBERRY = exports.SENDING_ACTION_RASPBERRY = exports.SAVED_RASPBERRY = exports.SAVING_RASPBERRY = exports.SCREENSHOT_UPDATED = exports.REMOVE_RASPBERRY = exports.UPDATE_RASPBERRY = exports.ADD_RASPBERRY = exports.UPDATE_ALL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.updateAll = updateAll;
exports.add = add;
exports.update = update;
exports.remove = remove;
exports.screenshotUpdated = screenshotUpdated;
exports.changeConfig = changeConfig;
exports.sendAction = sendAction;
exports.saveUnknown = saveUnknown;

var _websocket = require('../../../websocket');

var websocket = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const UPDATE_ALL = exports.UPDATE_ALL = 'UPDATE_ALL_RASPBERRY';
const ADD_RASPBERRY = exports.ADD_RASPBERRY = 'ADD_RASPBERRY';
const UPDATE_RASPBERRY = exports.UPDATE_RASPBERRY = 'UPDATE_RASPBERRY';
const REMOVE_RASPBERRY = exports.REMOVE_RASPBERRY = 'REMOVE_RASPBERRY';
const SCREENSHOT_UPDATED = exports.SCREENSHOT_UPDATED = 'SCREENSHOT_UPDATED';
const SAVING_RASPBERRY = exports.SAVING_RASPBERRY = 'SAVING_RASPBERRY';
const SAVED_RASPBERRY = exports.SAVED_RASPBERRY = 'SAVED_RASPBERRY';
const SENDING_ACTION_RASPBERRY = exports.SENDING_ACTION_RASPBERRY = 'SENDING_ACTION_RASPBERRY';
const ACTION_SENT_RASPBERRY = exports.ACTION_SENT_RASPBERRY = 'ACTION_SENT_RASPBERRY';

function updateAll(raspberries) {
    return {
        type: UPDATE_ALL,
        raspberries: raspberries
    };
}

function add(raspberry) {
    return {
        type: ADD_RASPBERRY,
        raspberry: raspberry
    };
}

function update(raspberry) {
    return {
        type: UPDATE_RASPBERRY,
        id: raspberry.id,
        raspberry: raspberry
    };
}

function remove(id) {
    return {
        type: REMOVE_RASPBERRY,
        id: id
    };
}

function screenshotUpdated(id, screenshotDate) {
    return {
        type: SCREENSHOT_UPDATED,
        id: id,
        screenshotDate: screenshotDate
    };
}

function saving(raspberry) {
    return {
        type: SAVING_RASPBERRY,
        id: raspberry.id
    };
}

function saved(raspberry, changes) {
    return {
        type: SAVED_RASPBERRY,
        id: raspberry.id,
        changes: changes
    };
}

function sendingAction(raspberry, action) {
    return {
        type: SENDING_ACTION_RASPBERRY,
        id: raspberry.id,
        action: action
    };
}

function actionSent(raspberry, action, result) {
    return {
        type: ACTION_SENT_RASPBERRY,
        id: raspberry.id,
        action: action,
        result: result
    };
}

function changeConfig(dispatch, raspberry, newConfig) {
    dispatch(saving(raspberry));
    websocket.changeConfig(raspberry, newConfig, () => {
        dispatch(saved(raspberry, { data: _extends({}, raspberry.data, { config: newConfig }) }));
    });
}

function sendAction(dispatch, raspberries, action) {
    raspberries.forEach(raspberry => {
        return dispatch(sendingAction(raspberry, action));
    });
    websocket.sendAction(raspberries, action, result => {
        raspberries.forEach(raspberry => {
            return dispatch(actionSent(raspberry, action, result));
        });
    });
}

function saveUnknown(dispatch, raspberry, _ref) {
    let name = _ref.name;
    let addOrReplace = _ref.addOrReplace;
    let id = _ref.id;

    dispatch(saving(raspberry));
    console.log('registerUnknown', raspberry);
    websocket.registerUnknown(raspberry, { name: name, addOrReplace: addOrReplace, id: id }, newRaspberry => {
        console.log('registerUnknown :)', newRaspberry);
        if (newRaspberry) {
            if (newRaspberry.id !== raspberry.id) {
                dispatch(remove(raspberry.id));
                dispatch(update(newRaspberry));
            } else {
                dispatch(saved(newRaspberry, newRaspberry));
            }
        }
    });
}
//# sourceMappingURL=raspberry.js.map