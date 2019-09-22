import { CARD_EVENTS } from "../../constants/events";
import Utils from "../../utils";

let defaultState = {
    individual: {},
    list: [],
    filters: {},
    offset: 0,
    totalCount: -1,
    sortMap: {
        name: "ASC"
    },
    obtainForm: {
        isOpen: false,
        foilTypeOptions: [
            {
                id: 0,
                name: 'NORMAL'
            },
            {
                id: 1,
                name: 'GLOSSY'
            },
            {
                id: 2,
                name: 'PRISMATIC'
            }
        ],
        cardId: -1,
        foilTypeId: -1
    }
};


const cardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CARD_EVENTS.UPDATE_CARD_LIST:
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
        case CARD_EVENTS.CLEAR_CARD_LIST:
            state = Object.assign({}, state, action.payload);
            break;
        case CARD_EVENTS.UPDATE_FILTERS:
            state = Object.assign({}, state, {
                filters: action.payload
            });
            break;
        case CARD_EVENTS.SET_FOIL_TYPE_IN_OBTAIN_FORM: {
            let newState = Utils.copyObject(state);
            newState.obtainForm.foilTypeId = action.payload.foilTypeId;
            state = newState;
            break;
        }
        case CARD_EVENTS.TOGGLE_OBTAIN_FORM: {
            let newState = Utils.copyObject(state);
            newState.obtainForm.isOpen = action.payload.isOpen;
            state = newState;
            break;
        }
        case CARD_EVENTS.SET_CARD_FOR_OBTAIN_FORM: {
            let newState = Utils.copyObject(state);
            newState.obtainForm.cardId = action.payload.cardId;
            state = newState;
            break;
        }
        case CARD_EVENTS.RESET_OBTAIN_FORM: {
            let newState = Utils.copyObject(state);
            newState.obtainForm.cardId = -1;
            newState.obtainForm.foilTypeId = -1;
            state = newState;
        }
    }
    return state;
};

export default cardsReducer;
