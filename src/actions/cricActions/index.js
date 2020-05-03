import { CRIC_EVENTS } from '../../constants/events';

export const updateTours = payload => ({
    type: CRIC_EVENTS.UPDATE_TOURS,
    payload
});

export const updateTour = tour => ({
    type: CRIC_EVENTS.UPDATE_TOUR,
    payload: {
        tour
    }
});

export const updateSeries = series => ({
    type: CRIC_EVENTS.UPDATE_SERIES,
    payload: {
        series
    }
});

export const updateMatch = match => ({
    type: CRIC_EVENTS.UPDATE_MATCH,
    payload: {
        match
    }
});

export const updateSuggestions = (type, suggestions) => ({
    type: CRIC_EVENTS.UPDATE_SUGGESTIONS,
    payload: {
        type,
        suggestions
    }
});

export const updateContext = payload => ({
    type: CRIC_EVENTS.UPDATE_CONTEXT,
    payload
});