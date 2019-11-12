import { CARD_EVENTS } from "../../constants/events";
import Utils from "../../utils";
import {FILTER_TYPE} from "../../constants";

let defaultState = {
    individual: {},
    list: [],
    filters: {},
    filtersTemp: {},
    offset: 0,
    totalCount: -1,
    sortMap: {
        name: "ASC"
    },
    suggestions: [],
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
    },
    filterOptions: {
        attribute: {
            displayName: 'Attribute',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'Light'
                },
                {
                    id: '1',
                    name: 'Dark'
                },
                {
                    id: '2',
                    name: 'Water'
                },
                {
                    id: '3',
                    name: 'Fire'
                },
                {
                    id: '4',
                    name: 'Earth'
                },
                {
                    id: '5',
                    name: 'Wind'
                },
                {
                    id: '6',
                    name: 'Divine'
                }
            ]
        },
        type: {
            displayName: 'Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'Dragon'
                },
                {
                    id: '1',
                    name: 'Zombie'
                },
                {
                    id: '2',
                    name: 'Fiend'
                },
                {
                    id: '3',
                    name: 'Pyro'
                },
                {
                    id: '4',
                    name: 'Sea Serpent'
                },
                {
                    id: '5',
                    name: 'Rock'
                },
                {
                    id: '6',
                    name: 'Machine'
                },
                {
                    id: '7',
                    name: 'Fish'
                },
                {
                    id: '8',
                    name: 'Dinosaur'
                },
                {
                    id: '9',
                    name: 'Insect'
                },
                {
                    id: '10',
                    name: 'Beast'
                },
                {
                    id: '11',
                    name: 'Beast Warrior'
                },
                {
                    id: '12',
                    name: 'Plant'
                },
                {
                    id: '13',
                    name: 'Aqua'
                },
                {
                    id: '14',
                    name: 'Warrior'
                },
                {
                    id: '15',
                    name: 'Winged Beast'
                },
                {
                    id: '16',
                    name: 'Fairy'
                },
                {
                    id: '17',
                    name: 'Spellcaster'
                },
                {
                    id: '18',
                    name: 'Thunder'
                },
                {
                    id: '19',
                    name: 'Reptile'
                },
                {
                    id: '20',
                    name: 'Psychic'
                },
                {
                    id: '21',
                    name: 'Wyrm'
                },
                {
                    id: '22',
                    name: 'Divine Beast'
                }
            ]
        },
        cardType: {
            displayName: 'Card Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'Monster'
                },
                {
                    id: '1',
                    name: 'Spell'
                },
                {
                    id: '2',
                    name: 'Trap'
                }
            ]
        },
        cardSubType: {
            displayName: 'Card Sub Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'NORMAL'
                },
                {
                    id: '1',
                    name: 'EFFECT'
                },
                {
                    id: '2',
                    name: 'RITUAL'
                },
                {
                    id: '3',
                    name: 'FUSION'
                },
                {
                    id: '4',
                    name: 'SYNCHRO'
                },
                {
                    id: '5',
                    name: 'TOON'
                },
                {
                    id: '6',
                    name: 'GEMINI'
                },
                {
                    id: '7',
                    name: 'UNION'
                },
                {
                    id: '8',
                    name: 'SPIRIT'
                },
                {
                    id: '9',
                    name: 'TUNER'
                },
                {
                    id: '10',
                    name: 'FLIP'
                },
                {
                    id: '11',
                    name: 'FIELD'
                },
                {
                    id: '12',
                    name: 'EQUIP'
                },
                {
                    id: '13',
                    name: 'CONTINUOUS'
                },
                {
                    id: '14',
                    name: 'QUICK_PLAY'
                },
                {
                    id: '15',
                    name: 'COUNTER'
                }
            ]
        },
        rarity: {
            displayName: 'Rarity',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'NORMAL'
                },
                {
                    id: '1',
                    name: 'RARE'
                },
                {
                    id: '2',
                    name: 'SUPER RARE'
                },
                {
                    id: '3',
                    name: 'ULTRA RARE'
                }
            ]
        },
        limitType: {
            displayName: 'Limit Type',
            type: FILTER_TYPE.CHECKBOX,
            values: [
                {
                    id: '0',
                    name: 'UNLIMITED'
                },
                {
                    id: '1',
                    name: 'LIMITED 1'
                },
                {
                    id: '2',
                    name: 'LIMITED 2'
                },
                {
                    id: '3',
                    name: 'LIMITED 3'
                }
            ]
        }
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
        case CARD_EVENTS.UPDATE_TEMP_FILTERS:
            state = Object.assign({}, state, {
                filtersTemp: action.payload
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
            break;
        }
        case CARD_EVENTS.SET_CARD:
        case CARD_EVENTS.TOGGLE_FILTER:
            state = Object.assign({}, state, action.payload);
            break;
        case CARD_EVENTS.RESET_TEMP_FILTERS:
            state = Object.assign({}, state, {filtersTemp: state.filters});
            break;
        case CARD_EVENTS.CLEAR_FILTERS:
            state = Object.assign({}, state, {filtersTemp: {}});
            break;
        case CARD_EVENTS.CLEAR_FILTER:
            let newFiltersTemp = Utils.copyObject(state.filtersTemp);
            delete newFiltersTemp[action.payload.key];
            state = Object.assign({}, state, {filtersTemp: newFiltersTemp});
            break;
        case CARD_EVENTS.SET_SUGGESTIONS: {
            state = Object.assign({}, state, {suggestions: action.payload.suggestions});
            break;
        }
        case CARD_EVENTS.SET_MY_CARDS: {
            let individual = Utils.copyObject(state.individual);
            individual.myCards = action.payload.myCards;
            state = Object.assign({}, state, { individual });
            break;
        }
    }
    return state;
};

export default cardsReducer;
