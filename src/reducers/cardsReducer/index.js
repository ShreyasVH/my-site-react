import { CARDS_EVENTS } from "../../constants/events";
import Utils from "../../utils";

let defaultState = {
    individual: {},
    list: [],
    filters: {},
    offset: 0,
    totalCount: -1,
    sortMap: {
        name: "ASC"
    }
};


const cardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CARDS_EVENTS.UPDATE_CARD_LIST:
            let { list, shouldReplace } = action.payload;
            let newList;
            if (shouldReplace) {
                newList = list;
            } else {
                newList = Utils.copyObject(state.list).concat(list);
            }
            state = Object.assign({}, state, {
                list: newList,
                offset: action.payload.offset,
                totalCount: action.payload.totalCount
            });
            break;
        case CARDS_EVENTS.CLEAR_CARD_LIST:
            state = Object.assign({}, state, action.payload);
            break;
        case CARDS_EVENTS.UPDATE_FILTERS:
            state = Object.assign({}, state, {
                filters: action.payload
            });
            break;
    }
    return state;
};

export default cardsReducer;