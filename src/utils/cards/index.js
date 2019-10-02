import store from '../../store';
import ApiHelper from '../apiHelper';
import {
    BASE_URL_DUEL_LINKS,
    GET_CARDS_WITH_FILTERS_URL,
    OBTAIN_CARDS_URL,
    GET_CARD_BY_NAME
} from '../../constants';
import {
    updateCardList,
    updateFilters,
    clearCardList,
    setFoilTypeForObtainForm,
    toggleObtainForm,
    setCardIdForObtainForm,
    resetObtainForm,
    setSuggestions
} from '../../actions/cardsActions';

import Context from '../context';
import Utils from '../index';
import Filters from "../filters";

export default class Cards {
    static getCardsWithFilters = (shouldReplace = true) => {
        let cardStore = store.getState().cards;
        let { filters, totalCount, sortMap } = cardStore;
        let offset;

        if (shouldReplace) {
            offset = 0;
        } else {
            offset = cardStore.offset;
        }

        if ((-1 === totalCount) || (offset < totalCount) || shouldReplace) {
            let payload = {
                filters,
                sortMap,
                offset,
                count: 24
            };
            let promise = ApiHelper.post(BASE_URL_DUEL_LINKS + GET_CARDS_WITH_FILTERS_URL, payload);
            promise.then(apiResponse => {
                let response = apiResponse.data;
                if (0 !== Object.keys(response).length) {
                    Cards.updateUrl();
                    store.dispatch(updateCardList(response.cards, response.offset, response.totalCount, shouldReplace));
                    Filters.closeFilters('cards');
                    Context.hideLoader();
                }
            });
        } else {
            Filters.closeFilters('cards');
            Context.hideLoader();
        }
    };

    static updateFilters = () => {
        let urlParams = Utils.getUrlParams();
        delete urlParams.order;
        store.dispatch(updateFilters(urlParams));
    };

    static updateUrl = () => {
        let url = Cards.getUrlFromFilters();
        history.pushState(null, "Browse with filters", url);
    };

    static getUrlFromFilters = () => {
        let storeValues = store.getState();
        let movieStore = storeValues.movies;
        let filters = movieStore.filters;
        let sortMap = movieStore.sortMap;

        let urlParams = [];

        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                let values = filters[key];
                for (const index in values) {
                    if (values.hasOwnProperty(index)) {
                        let value = values[index];
                        urlParams.push(key + "[]=" + value);
                    }
                }
            }
        }

        let queryString = urlParams.join("&");

        let sortParams = [];
        for (const key in sortMap) {
            if (sortMap.hasOwnProperty(key)) {
                let value = sortMap[key];
                sortParams.push(key + " " + value);
            }
        }
        let sortString = "order=" + sortParams.join("&");

        queryString = (('' !== queryString) ? (queryString + "&" + sortString) : (sortString));
        return location.pathname + "?" + queryString;
    };

    static clearList = () => {
        store.dispatch(clearCardList());
    };

    static setFoilTypeForObtainForm = foilTypeId => {
        store.dispatch(setFoilTypeForObtainForm(foilTypeId));
    };

    static showObtainForm = () => {
        Cards.toggleObtainForm(true);
    };

    static hideObtainForm = () => {
        Cards.toggleObtainForm(false);
    };

    static toggleObtainForm = (value) => {
        store.dispatch(toggleObtainForm(value));
    };

    static setCardForObtainForm = cardId => {
        store.dispatch(setCardIdForObtainForm(cardId));
    };

    static resetObtainForm = () => {
        store.dispatch(resetObtainForm());
    };

    static submitObtainForm = () => {
        let storeValues = store.getState();
        let cardStore = storeValues.cards;
        let obtainForm = cardStore.obtainForm;

        let payload = {
            cardId: obtainForm.cardId,
            glossType: obtainForm.foilTypeId
        };

        let promise = ApiHelper.post(BASE_URL_DUEL_LINKS + OBTAIN_CARDS_URL, payload);
        promise.then(apiResponse => {
            let status = apiResponse.status;
            if (200 === status) {
                Cards.resetObtainForm();
                Context.showNotify('Card obtained successfully', 'success');
                Cards.hideObtainForm();
            } else {
                Context.showNotify('Error obtaining card. Description: ' + apiResponse.data, 'error');
            }
        }).catch(apiResponse => {
            let message = 'Error';
            if (apiResponse.hasOwnProperty('response') && apiResponse.response.hasOwnProperty('data') && apiResponse.response.data.hasOwnProperty('description')) {
                let description = apiResponse.response.data.description;
                message = 'Error obtaining card. Description: ' + description;
            }
            Context.showNotify(message, 'error');
        });
    };

    static getSuggestions = event => {
        let keyword = event.target.value;

        if (keyword.length >= 3) {
            let promise = ApiHelper.get(BASE_URL_DUEL_LINKS + GET_CARD_BY_NAME.replace('{keyword}', keyword));
            promise.then(apiResponse => {
                if (apiResponse.hasOwnProperty('data')) {
                    let suggestions = apiResponse.data;
                    store.dispatch(setSuggestions(suggestions));
                }
            });
        } else {
            let currentSuggestions = store.getState().cards.suggestions;
            if (currentSuggestions.length > 0) {
                store.dispatch(setSuggestions([]));
            }
        }
    }
}
