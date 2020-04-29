import { CRIC_EVENTS } from '../../constants/events';

const defaultState = {
    tours: [],
    year: (new Date()).getFullYear(),
    offset: 0,
    hasReachedEnd: false,
    tour: {},
    series: {},
    match: {}
};

const cricReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CRIC_EVENTS.UPDATE_TOURS:
        case CRIC_EVENTS.UPDATE_TOUR:
        case CRIC_EVENTS.UPDATE_SERIES:
        case CRIC_EVENTS.UPDATE_MATCH:
            state = Object.assign(state, action.payload);
            break;
    }
    return state;
};

export default cricReducer;