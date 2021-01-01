import {
    BASE_URL_CRICBUZZ,
    GET_TOURS,
    GET_TOUR_BY_ID,
    GET_SERIES_BY_ID,
    GET_MATCH_BY_ID,
    UPDATE_TOUR,
    GET_STADIUM_BY_ID,
    GET_ALL_COUNTRIES,
    UPDATE_STADIUM,
    GET_COUNTRY_BY_ID,
    UPDATE_COUNTRY,
    GET_TEAM_BY_ID,
    UPDATE_TEAM,
    GET_PLAYER_BY_ID,
    UPDATE_PLAYER,
    GET_ALL_TEAMS,
    GET_ALL_PLAYERS,
    UPDATE_SERIES
} from "../../constants";
import ApiHelper from "../apiHelper";
import store from "../../store";
import {
    updateTours,
    updateTour,
    updateSeries,
    updateMatch,
    updateSuggestions,
    updateContext,
    updateStadium,
    updateCountry,
    updateTeam,
    updatePlayer
} from "../../actions/cricActions";
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
            let promise = CricBuzzUtils.getSeriesByApi(id);

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

    static getSeriesByApi = id => {
        let url = BASE_URL_CRICBUZZ + GET_SERIES_BY_ID.replace('{id}', id);
        return ApiHelper.get(url);
    }

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

        let cricStore = Utils.copyObject(store.getState().cric);
        for (let index in cricStore.series.matches) {
            let currentMatch = cricStore.series.matches[index];
            if (id === currentMatch.id) {
                match = currentMatch;
                match.series = {
                    name: cricStore.series.name,
                    id: cricStore.series.id,
                    gameType: cricStore.series.gameType
                };
                break;
            }
        }

        return match;
    };

    static search = (type, keyword) => {
        let cricStore = Utils.copyObject(store.getState().cric);
        let url = BASE_URL_CRICBUZZ + 'cricbuzz/' + type + '/keyword/' + keyword;
        let promise = ApiHelper.get(url);
        // promise.then(apiResponse => {
        //     let response = apiResponse.data;
        //     console.log(response);
        //     cricStore[type + 'Suggestions'] = response;
        //     // store.dispatch(updateContext(cricStore));
        //     store.dispatch(updateSuggestions(type, response));
        // });

        return promise;
    }

    static getYearForBrowse = () => {
        let year = (new Date()).getFullYear();

        let yearFromURL = Utils.getUrlParam('year');
        if (yearFromURL) {
            year = yearFromURL;
        }

        return year;
    };

    static updateTour = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_TOUR.replace('{id}', id);
        return ApiHelper.put(url, payload);
    }

    static loadStadium = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.stadium).length === 0) || (id !== cricStore.stadium.id)) {
            let url = BASE_URL_CRICBUZZ + GET_STADIUM_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setStadium(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setStadium = stadium => {
        store.dispatch(updateStadium(stadium));
    };

    static getAllCountries = () => {
        let url = BASE_URL_CRICBUZZ + GET_ALL_COUNTRIES;
        return ApiHelper.get(url);
    };

    static updateStadium = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_STADIUM.replace('{id}', id);
        return ApiHelper.put(url, payload);
    };

    static loadCountry = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.country).length === 0) || (id !== cricStore.country.id)) {
            let url = BASE_URL_CRICBUZZ + GET_COUNTRY_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setCountry(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setCountry = country => {
        store.dispatch(updateCountry(country));
    };

    static updateCountry = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_COUNTRY.replace('{id}', id);
        return ApiHelper.put(url, payload);
    };

    static loadTeam = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.team).length === 0) || (id !== cricStore.team.id)) {
            let url = BASE_URL_CRICBUZZ + GET_TEAM_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setTeam(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setTeam = team => {
        store.dispatch(updateTeam(team));
    };

    static updateTeam = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_TEAM.replace('{id}', id);
        return ApiHelper.put(url, payload);
    };

    static loadPlayer = (id) => {
        id = parseInt(id, 10);
        let cricStore = Utils.copyObject(store.getState().cric);

        if((Object.keys(cricStore.player).length === 0) || (id !== cricStore.player.id)) {
            let url = BASE_URL_CRICBUZZ + GET_PLAYER_BY_ID.replace('{id}', id);
            let promise = ApiHelper.get(url);

            promise.then(apiResponse => {
                let response = apiResponse.data;
                CricBuzzUtils.setPlayer(response);
                Context.hideLoader();
            }).catch(apiResponse => {
                Context.hideLoader();
            });
        } else {
            Context.hideLoader();
        }
    };

    static setPlayer = team => {
        store.dispatch(updatePlayer(team));
    };

    static updatePlayer = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_PLAYER.replace('{id}', id);
        return ApiHelper.put(url, payload);
    };

    static updateSeries = (id, payload) => {
        let url = BASE_URL_CRICBUZZ + UPDATE_SERIES.replace('{id}', id);
        return ApiHelper.put(url, payload);
    };

    static getAllTeams = () => {
        let url = BASE_URL_CRICBUZZ + GET_ALL_TEAMS;
        return ApiHelper.get(url);
    };

    static getAllPlayers = async () => {
        let players = [];
        let offset = 0;
        const count = 1000;
        let isFetchRequired = true;
        while (isFetchRequired) {
            let url = BASE_URL_CRICBUZZ + GET_ALL_PLAYERS.replace('{offset}', offset).replace('{count}', count);
            let apiResponse = await ApiHelper.get(url);
            let batchPlayers = apiResponse.data;
            players = players.concat(batchPlayers);

            if (batchPlayers.length < count) {
                isFetchRequired = false;
            }
            offset += count;
        }

        return players;
    }
}