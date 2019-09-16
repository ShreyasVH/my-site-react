/**
 * @author shreyas.hande on 9/3/18
 *
 */

import { MOVIE_EVENTS } from '../../constants/events';
import Utils from '../../utils';
import {FILTER_TYPE} from "../../constants";

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
	filterOptions: {
		language: {
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
		format: {
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
					id: '1',
					name: 'Yes'
				},
				{
					id: '0',
					name: 'No'
				}
			]
		},
		seen_in_theatre: {
			displayName: 'Seen',
			type: FILTER_TYPE.CHECKBOX,
			values: [
				{
					id: '1',
					name: 'Yes'
				},
				{
					id: '0',
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
					id: 'bad',
					name: 'Bad'
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
			state = Object.assign({}, state, action.payload);
			break;
		case MOVIE_EVENTS.RESET_TEMP_FILTERS:
			state = Object.assign({}, state, {filtersTemp: state.filters});
			break;
	}

	return state;
};

export default moviesReducer;