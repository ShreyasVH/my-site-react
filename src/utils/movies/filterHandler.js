import store from '../../store';
import { updateTempFilters } from '../../actions/moviesActions';
import { FILTER_TYPE } from '../../constants';
import Utils from '../../utils';

let instance = null;

class FilterHandler {
    constructor() {
        if (instance)
            return instance;

        instance = this;
    }

    disptachEvent = payload => {
        store.dispatch(updateTempFilters(payload));
    };

    handleCheckbox = (event, storeValues) => {
        let movieStore = storeValues.movies;
        let target = event.target;
        let tempFilters = movieStore.filtersTemp;

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


        this.disptachEvent(tempFilters);
    };

    handleEvent = event => {
        console.log(event);

        let storeValues = Utils.copyObject(store.getState());

        let target = event.target;
        let type = target.type;

        switch (type) {
            case FILTER_TYPE.CHECKBOX:
                this.handleCheckbox(event, storeValues);
                break;
        }
    }
}

instance = new FilterHandler();

export default instance;
