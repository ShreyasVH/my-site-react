import React, { Component } from 'react';

import BrowseCore from "./core";

import PogoUtils from '../../../../utils/pogo';
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import { FILTER_TYPE, BASE_FILTER_TYPE } from "../../../../constants";

export default class Update extends Component {
    constructor(props) {
        super(props);

        let urlParams = Utils.getUrlParams();
        let sortMap = {};

        if (urlParams.hasOwnProperty('order')) {
            const sortString = urlParams['order'];
            delete urlParams['order'];
            const sortParams = sortString.split(',');
            sortMap = sortParams.reduce((object, value) => {
                const parts = value.split(' ');
                if (parts.length === 2) {
                    object[parts[0]] = parts[1];
                }
                return object;
            }, {});
        }

        this.state = {
            isLoaded: false,
            forms: [],
            totalCount: 0,
            offset: 0,
            count: 24,
            isFilterOpen: false,
            selectedFilters: {
            },
            selectedFiltersTemp: urlParams,
            sortMap
        };
    }

    async componentDidMount() {
        Context.showLoader();
        let allPokemonsResponse = await PogoUtils.getAllPokemons();
        const allPokemons = allPokemonsResponse.data;

        let allTypesResponse = await PogoUtils.getAllTypes();
        const types = allTypesResponse.data;

        let filterOptions = {
            number: {
                displayName: 'Pokemon',
                type: FILTER_TYPE.CHECKBOX,
                baseType: BASE_FILTER_TYPE.AND,
                values: allPokemons.map(pokemon => ({
                    id: JSON.stringify(pokemon.number),
                    name: pokemon.name
                }))
            },
            alolan: {
                displayName: 'Alolan',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            galarian: {
                displayName: 'Galarian',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            hisuian: {
                displayName: 'Hisuian',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            shiny: {
                displayName: 'Shiny',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            female: {
                displayName: 'Female',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            costumed: {
                displayName: 'Costumed',
                type: FILTER_TYPE.RADIO,
                baseType: BASE_FILTER_TYPE.BOOLEAN,
                values: [{
                    id: 'true',
                    name: 'Yes'
                },{
                    id: 'false',
                    name: 'No'
                }]
            },
            typeIds: {
                displayName: 'Type',
                type: FILTER_TYPE.CHECKBOX,
                baseType: BASE_FILTER_TYPE.AND,
                values: types.map(type => ({
                    id: JSON.stringify(type.id),
                    name: type.name
                }))
            }
        };

        const sortOptions = [
            {
                id: 1,
                name: 'pokemonNumber'
            }, {
                id: 2,
                name: 'releaseDate'
            }
        ];


        await this.loadForms(0, true, this.state.sortMap);

        this.setState({
            isLoaded: true,
            filterOptions,
            sortOptions
        });
    }

    loadForms = async (offset, replaceData, sortMap) => {
        Context.showLoader();

        if (offset === 0 || offset < this.state.totalCount) {

            let payload = {
                offset,
                filters: {},
                booleanFilters: {},
                andFilters: {},
                sortMap
            };

            const booleanFilterKeys = [
                'alolan',
                'galarian',
                'hisuian',
                'shiny',
                'female',
                'costumed'
            ];

            const andFilterKeys = [
                'typeIds'
            ];

            for (const [key, data] of Object.entries(this.state.selectedFiltersTemp)) {
                if (booleanFilterKeys.includes(key)) {
                    payload.booleanFilters[key] = data;
                } else if (andFilterKeys.includes(key)) {
                    payload.andFilters[key] = data;
                } else {
                    payload.filters[key] = data;
                }
            }

            const filterResponse = await PogoUtils.getFormsWithFilter(payload);
            let updatedState = Utils.copyObject(this.state);

            const forms = filterResponse.data.list;

            if (replaceData) {
                updatedState.forms = forms;
            } else {
                updatedState.forms = updatedState.forms.concat(forms);
            }
            updatedState.offset = offset;
            updatedState.totalCount = filterResponse.data.totalCount;
            updatedState.selectedFilters = this.state.selectedFiltersTemp;
            updatedState.isFilterOpen = false;

            this.setState(updatedState);

            this.updateUrl();
        }

        Context.hideLoader();
    }

    handleScroll = async () => {
        await this.loadForms(this.state.offset + (this.state.count), false, this.state.sortMap);
    }

    handleEditClick = (id) => {
        this.props.history.push('/pogo/forms/update?id=' + id);
    }

    openFilter = (event) => {
        event.preventDefault();
        this.setState({
            isFilterOpen: true,
            selectedFiltersTemp: this.state.selectedFilters
        })
    };

    closeFilter = (event) => {
        event.preventDefault();
        this.setState({
            isFilterOpen: false
        })
    };

    handleEvent = event => {
        const target = event.target;
        let tempFilters = Utils.copyObject(this.state.selectedFiltersTemp);

        switch (event.target.dataset.type) {
            case FILTER_TYPE.CHECKBOX: {
                let key = target.dataset['key'];
                let id = target.dataset['id'];
                let checked = target.checked;

                if (checked) {
                    if (!tempFilters.hasOwnProperty(key)) {
                        tempFilters[key] = [];
                    }
                    tempFilters[key].push(id);
                } else {
                    let index = tempFilters[key].indexOf(id);
                    tempFilters[key].splice(index, 1);
                }
                this.setState({
                    selectedFiltersTemp: tempFilters
                });
            }
                break;
            case FILTER_TYPE.RADIO: {
                let key = target.dataset['key'];
                let id = target.dataset['id'];

                tempFilters[key] = id;
                this.setState({
                    selectedFiltersTemp: tempFilters
                });
            }
                break;
            case FILTER_TYPE.RANGE: {
                let key = target.dataset['key'];
                let type = target.dataset['rangetype'];
                if (!tempFilters.hasOwnProperty(key)) {
                    tempFilters[key] = {};
                }
                tempFilters[key][type] = target.value;
                this.setState({
                    selectedFiltersTemp: tempFilters
                });
            }
                break;
        }
    };

    applyFilters = async () => {
        await this.loadForms(0, true, this.state.sortMap);
    };

    updateUrl = () => {
        let url = Utils.paramsToUrl(this.state.selectedFiltersTemp, this.state.sortMap);
        if (url !== decodeURI(window.location.pathname + window.location.search)) {
            window.history.pushState(null, "Browse with filters", url);
        }
    };

    clearFilter = key => {
        let tempFilters = Utils.copyObject(this.state.selectedFiltersTemp);

        if (tempFilters.hasOwnProperty(key)) {
            delete tempFilters[key];
            this.setState({
                selectedFiltersTemp: tempFilters
            })
        }
    }

    handleSort = async (id, name) => {
        let sortMap = Utils.copyObject(this.state.sortMap);

        let order = 'ASC';
        if (sortMap.hasOwnProperty(name)) {
            if (sortMap[name] === 'ASC') {
                order = 'DESC';
            }
        } else {
            sortMap = {};
        }
        sortMap[name] = order;

        this.setState({
            sortMap
        });
        await this.loadForms(0, true, sortMap);
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <BrowseCore
                    {...this.state}
                    onScroll={this.handleScroll}
                    onEditClick={this.handleEditClick}
                    onFilterOpen={this.openFilter}
                    onFilterClose={this.closeFilter}
                    onEvent={this.handleEvent}
                    onFilterApply={this.applyFilters}
                    onFilterClear={this.clearFilter}
                    onSort={this.handleSort}
                />
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}
