import {BASE_URL_CRICBUZZ, GET_TOURS, GET_TOUR_BY_ID, GET_SERIES_BY_ID, GET_MATCH_BY_ID} from "../../constants";
import ApiHelper from "../apiHelper";
import store from "../../store";
import {updateTours, updateTour, updateSeries, updateMatch} from "../../actions/cricActions";
import Context from "../context";
import Utils from '../';

export default class CricBuzzUtils {
    static loadTours = () => {
        let cricStore = Utils.copyObject(store.getState().cric);

        let url = BASE_URL_CRICBUZZ + GET_TOURS;
        const count = 20;

        let offset = cricStore.offset;
        let year = cricStore.year;

        let promise = ApiHelper.post(url, {
            offset,
            count,
            year
        });
        promise.then(apiResponse => {
            let response = apiResponse.data;

            cricStore.offset = (cricStore.offset + count);
            cricStore.hasReachedEnd = (response.length < count);
            cricStore.tours = cricStore.tours.concat(response);

            store.dispatch(updateTours(cricStore));
            Context.hideLoader();

        }).catch(apiResponse => {
            Context.hideLoader();
        });
    };

    static loadTour = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.tour).length === 0) || (id !== cricStore.tour.id)) {
            let url = BASE_URL_CRICBUZZ + GET_TOUR_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setTour(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setTour = tour => {
        store.dispatch(updateTour(tour));
    };

    static getTour = (id) => {
        id = parseInt(id, 10);
        let tour = {};

        let cricStore = store.getState().cric;
        for (let index in cricStore.tours) {
            let currentTour = cricStore.tours[index];
            if (id === currentTour.id) {
                tour = currentTour;
                break;
            }
        }

        return tour;
    };

    static loadSeries = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.series).length === 0) || (id !== cricStore.series.id)) {
            let url = BASE_URL_CRICBUZZ + GET_SERIES_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setSeries(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setSeries = series => {
        store.dispatch(updateSeries(series));
    };

    static getSeries = (id) => {
        id = parseInt(id, 10);
        let series = {};

        let cricStore = store.getState().cric;
        for (let index in cricStore.tour.seriesList) {
            let currentSeries = cricStore.tour.seriesList[index];
            if (id === currentSeries.id) {
                series = currentSeries;
                break;
            }
        }

        return series;
    };

    static loadMatch = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.match).length === 0) || (id !== cricStore.match.id)) {
            let url = BASE_URL_CRICBUZZ + GET_MATCH_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setMatch(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setMatch = match => {
        store.dispatch(updateMatch(match));
    };

    static getMatch = (id) => {
        id = parseInt(id, 10);
        let match = {};

        let cricStore = store.getState().cric;
        for (let index in cricStore.series.matches) {
            let currentMatch = cricStore.series.matches[index];
            if (id === currentMatch.id) {
                match = currentMatch;
                break;
            }
        }

        return match;
    };
}