import { CARD_EVENTS } from '../../constants/events';

export const updateCardList = (list, offset, count, shouldReplace = true) => ({
    type: CARD_EVENTS.UPDATE_CARD_LIST,
    payload: {
        list,
        offset,
        totalCount: count,
        shouldReplace
    }
});

export const clearCardList = () => ({
    type: CARD_EVENTS.CLEAR_CARD_LIST,
    payload: {
        list: [],
        offset: 0,
        totalCount: -1
    }
});

export const updateFilters = (filters = []) => ({
    type: CARD_EVENTS.UPDATE_FILTERS,
    payload: filters
});
