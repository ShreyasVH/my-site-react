import {
    BASE_URL_POGO,
    GEM_MON_BY_NUMBER,
    GET_ALL_REGIONS,
    GET_ALL_POKEMONS,
    UPDATE_POKEMON,
    GET_FORM_BY_ID,
    UPDATE_FORM,
    GET_FORMS_WITH_FILTER
} from '../../constants';
import ApiHelper from '../apiHelper';

export default class PogoUtils {
    static getMonByNumber = number => {
        let url = BASE_URL_POGO + GEM_MON_BY_NUMBER.replace('{number}', number);
        return ApiHelper.get(url);
    };

    static getAllRegions = () => {
        let url = BASE_URL_POGO + GET_ALL_REGIONS;
        return ApiHelper.get(url);
    };

    static getAllPokemons = () => {
        let url = BASE_URL_POGO + GET_ALL_POKEMONS;
        return ApiHelper.get(url);
    };

    static update = (payload, number) => {
        let url = BASE_URL_POGO + UPDATE_POKEMON.replace('{number}', number);
        return ApiHelper.put(url, payload);
    }

    static getFormById = id => {
        let url = BASE_URL_POGO + GET_FORM_BY_ID.replace('{id}', id);
        return ApiHelper.get(url);
    }

    static updateForm = (payload, id) => {
        let url = BASE_URL_POGO + UPDATE_FORM.replace('{id}', id);
        return ApiHelper.put(url, payload);
    }

    static getFormsWithFilter = (payload) => {
        let url = BASE_URL_POGO + GET_FORMS_WITH_FILTER;
        return ApiHelper.post(url, payload);
    }
}