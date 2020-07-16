import { CRIC_EVENTS } from '../../constants/events';

import CricUtils from '../../utils/cricbuzz';

const defaultState = {
    tours: [],
    year: CricUtils.getYearForBrowse(),
    offset: 0,
    hasReachedEnd: false,
    tour: {},
    series: {},
    match: {},
    seriesSuggestions: [],
    playersSuggestions: [],
    teamsSuggestions: [],
};

const cricReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CRIC_EVENTS.UPDATE_TOURS:
        case CRIC_EVENTS.UPDATE_TOUR:
        case CRIC_EVENTS.UPDATE_SERIES:
        case CRIC_EVENTS.UPDATE_MATCH:
        case CRIC_EVENTS.UPDATE_CONTEXT:
            state = Object.assign(state, action.payload);
            break;
        case CRIC_EVENTS.UPDATE_SUGGESTIONS:
            state = Object.assign({}, state, {
                [action.payload.type + 'Suggestions']: action.payload.suggestions
            });
            break;
    }
    return state;
};

export default cricReducer;