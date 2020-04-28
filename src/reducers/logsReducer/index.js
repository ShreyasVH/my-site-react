import { LOGS_EVENTS } from '../../constants/events';

const defaultState = {
    logs: [],
    offset: 0,
    hasReachedEnd: false
};

const logsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGS_EVENTS.UPDATE_LOGS:
            state = Object.assign(state, action.payload);
            break;
    }
    return state;
};

export default logsReducer;