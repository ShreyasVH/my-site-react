import React, { Component } from 'react';

import BrowseCore from "./core";

import PogoUtils from '../../../../utils/pogo';
import Utils from '../../../../utils';
import Context from "../../../../utils/context";
import { FILTER_TYPE, BASE_FILTER_TYPE } from "../../../../constants";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            forms: [],
            totalCount: 0,
            offset: 0,
            count: 24,
            isFilterOpen: false,
            selectedFilters: {
            },
            selectedFiltersTemp: {
                filters: {}
            }
        };
        this.id = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let allPokemonsResponse = await PogoUtils.getAllPokemons();
        const allPokemons = allPokemonsResponse.data;

        let filterOptions = {
            number: {
                displayName: 'Pokemon',
                type: FILTER_TYPE.CHECKBOX,
                baseType: BASE_FILTER_TYPE.AND,
                values: allPokemons.map(pokemon => ({
                    id: JSON.stringify(pokemon.number),
                    name: pokemon.name
                }))
            }
        };


        await this.loadForms(0, true);

        this.setState({
            isLoaded: true,
            filterOptions
        });
    }

    loadForms = async (offset, replaceData) => {
        Context.showLoader();

        if (offset === 0 || offset < this.state.totalCount) {
            let payload = Utils.copyObject(this.state.selectedFiltersTemp);
            payload.offset = offset;

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
        }

        Context.hideLoader();
    }

    handleScroll = async () => {
        await this.loadForms(this.state.offset + (this.state.count), false);
    }

    handleEditClick = (id) => {
        this.props.history.push('/pogo/forms/update?id=' + id);
    }

    openFilter = (event) => {
        event.preventDefault();
        console.log(this.state.selectedFilters);
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
                    if (!tempFilters.filters.hasOwnProperty(key)) {
                        tempFilters.filters[key] = [];
                    }
                    tempFilters.filters[key].push(id);
                } else {
                    let index = tempFilters.filters[key].indexOf(id);
                    tempFilters.filters[key].splice(index, 1);
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
                console.log(target.dataset);
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
        await this.loadForms(this.state.offset, true);
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
