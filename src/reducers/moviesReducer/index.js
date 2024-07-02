/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { MOVIE_EVENTS } from '../../constants/events';
import Utils from '../../utils';
import { FILTER_TYPE } from '../../constants';

const defaultState = {
	dashboard: [],
	individual: {},
	list: [],
	filters: {},
	filtersTemp: {},
	isFilterOpen: false,
	offset: 0,
	totalCount: -1,
	sortMap: {
		name: "ASC"
	},
	suggestions: [],
	filterOptions: {
		languageId: {
			displayName: 'Language',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: '1',
					name: 'Kannada'
				},
				{
					id: '2',
					name: 'Hindi'
				},
				{
					id: '3',
					name: 'Telugu'
				},
				{
					id: '4',
					name: 'Tamil'
				},
				{
					id: '5',
					name: 'Malayalam'
				},
				{
					id: '6',
					name: 'English'
				}
			]
		},
		formatId: {
			displayName: 'Format',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: '1',
					name: 'mkv'
				},
				{
					id: '2',
					name: 'mp4'
				},
				{
					id: '3',
					name: 'avi'
				},
				{
					id: '4',
					name: 'flv'
				},
				{
					id: '5',
					name: 'ts'
				},
				{
					id: '6',
					name: 'divx'
				},
				{
					id: '7',
					name: 'dat'
				},
				{
					id: '8',
					name: 'm4v'
				},
				{
					id: '9',
					name: 'vob'
				}
			]
		},
		subtitles: {
			displayName: 'Subtitles',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: 'true',
					name: 'Yes'
				},
				{
					id: 'false',
					name: 'No'
				}
			]
		},
		seenInTheatre: {
			displayName: 'Seen',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: 'true',
					name: 'Yes'
				},
				{
					id: 'false',
					name: 'No'
				}
			]
		},
		quality: {
			displayName: 'Quality',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: 'good',
					name: 'Good'
				},
				{
					id: 'normal',
					name: 'Normal'
				}
			]
		},
		obtained: {
			displayName: 'Obtained',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: 'true',
					name: 'Yes'
				},
				{
					id: 'false',
					name: 'No'
				}
			]
		},
	}
};

const moviesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case MOVIE_EVENTS.UPDATE_DASHBOARD:
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.UPDATE_MOVIE_LIST:
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
		case MOVIE_EVENTS.CLEAR_MOVIE_LIST:
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.UPDATE_FILTERS:
			state = Object.assign({}, state, {
				filters: action.payload
			});
			break;
		case MOVIE_EVENTS.UPDATE_TEMP_FILTERS:
			state = Object.assign({}, state, {
				filtersTemp: action.payload
			});
			break;
		case MOVIE_EVENTS.SET_MOVIE:
		case MOVIE_EVENTS.TOGGLE_FILTER:
		case MOVIE_EVENTS.SET_SORT_MAP:
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.RESET_TEMP_FILTERS:
			state = Object.assign({}, state, {filtersTemp: state.filters});
			break;
        case MOVIE_EVENTS.CLEAR_FILTERS:
            state = Object.assign({}, state, {filtersTemp: {}});
            break;
        case MOVIE_EVENTS.CLEAR_FILTER:
            let newFiltersTemp = Utils.copyObject(state.filtersTemp);
            delete newFiltersTemp[action.payload.key];
            state = Object.assign({}, state, {filtersTemp: newFiltersTemp});
            break;
		case MOVIE_EVENTS.SET_SUGGESTIONS: {
			state = Object.assign({}, state, {suggestions: action.payload.suggestions});
			break;
		}
	}

	return state;
};

export default moviesReducer;
