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
    stadium: {},
    country: {},
    team: {},
    player: {}
};

const cricReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CRIC_EVENTS.UPDATE_SUGGESTIONS:
            state = Object.assign({}, state, {
                [action.payload.type + 'Suggestions']: action.payload.suggestions
            });
            break;
        default:
            state = Object.assign(state, action.payload);
            break;
    }
    return state;
};

export default cricReducer;