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

export const setFoilTypeForObtainForm = foilTypeId => ({
    type: CARD_EVENTS.SET_FOIL_TYPE_IN_OBTAIN_FORM,
    payload: {
        foilTypeId
    }
});

export const setCardIdForObtainForm = cardId => ({
    type: CARD_EVENTS.SET_CARD_FOR_OBTAIN_FORM,
    payload: {
        cardId
    }
});

export const toggleObtainForm = value => ({
    type: CARD_EVENTS.TOGGLE_OBTAIN_FORM,
    payload: {
        isOpen: value
    }
});

export const resetObtainForm = () => ({
    type: CARD_EVENTS.RESET_OBTAIN_FORM,
    payload: {}
});


