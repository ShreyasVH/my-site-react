import store from '../../store';
import {
    updateTempFilters as updateMoviesTempFilters
} from '../../actions/moviesActions';
import {
    updateTempFilters as updateCardsTempFilters
} from '../../actions/cardsActions';
import { FILTER_TYPE } from '../../constants';
import Utils from '../../utils';

let instance = null;

class FilterHandler {
    constructor() {
        if (instance)
            return instance;

        instance = this;
    }

    dispatchEvent = (type, payload) => {
        let functions = {
            movies: updateMoviesTempFilters,
            cards: updateCardsTempFilters
        };
        store.dispatch(functions[type].call(null, payload));
    };

    handleCheckbox = (context, event, storeValues) => {
        let currentStore = storeValues[context];
        let target = event.target;
        let tempFilters = currentStore.filtersTemp;

        let key = target.dataset['key'];
        let id = target.dataset['id'];
        let checked = target.checked;

        if (checked) {
            if (tempFilters.hasOwnProperty(key)) {
                tempFilters[key].push(id);
            } else {
                tempFilters[key] = [
                    id
                ];
            }
        } else {
            let index = tempFilters[key].indexOf(id);
            tempFilters[key].splice(index, 1);
        }


        this.dispatchEvent(context, tempFilters);
    };

    handleEvent = (context, event) => {
        let storeValues = Utils.copyObject(store.getState());

        let target = event.target;
        let type = target.type;

        switch (type) {
            case FILTER_TYPE.CHECKBOX:
                this.handleCheckbox(context, event, storeValues);
                break;
        }
    }
}

instance = new FilterHandler();

export default instance;
