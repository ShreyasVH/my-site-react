import { CARDS_EVENTS } from '../../constants/events';

export const updateCardList = (list, offset, count, shouldReplace = true) => ({
    type: CARDS_EVENTS.UPDATE_CARD_LIST,
    payload: {
        list,
        offset,
        totalCount: count,
        shouldReplace
    }
});

export const clearCardList = () => ({
    type: CARDS_EVENTS.CLEAR_CARD_LIST,
    payload: {
        list: [],
        offset: 0,
        totalCount: -1
    }
});

export const updateFilters = (filters = []) => ({
    type: CARDS_EVENTS.UPDATE_FILTERS,
    payload: filters
});