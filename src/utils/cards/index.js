import store from '../../store';
import ApiHelper from '../apiHelper';
import {
    BASE_URL_DUEL_LINKS,
    GET_CARDS_WITH_FILTERS_URL,
    OBTAIN_CARDS_URL
} from '../../constants';
import {
    updateCardList,
    updateFilters,
    clearCardList,
    setFoilTypeForObtainForm,
    toggleObtainForm,
    setCardIdForObtainForm,
    resetObtainForm
} from '../../actions/cardsActions';

import Context from '../context';
import Utils from '../index';

export default class Cards {
    static getCardsWithFilters = (shouldReplace = true) => {
        let cardStore = store.getState().cards;
        let { filters, offset, totalCount, list, sortMap } = cardStore;
        if ((-1 === totalCount) || (list.length < totalCount)) {
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
                    store.dispatch(updateCardList(response.cards, response.offset, response.totalCount, shouldReplace));
                    Context.hideLoader();
                }
            });
        } else {
            Context.hideLoader();
        }
    };

    static updateFilters = () => {
        let filters = Utils.getUrlParams();
        store.dispatch(updateFilters(filters));
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
                Cards.hideObtainForm();
            }
        });
    };
}
