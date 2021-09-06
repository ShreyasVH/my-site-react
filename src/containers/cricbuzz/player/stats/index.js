import React, { Component } from 'react';
import StatsCore from './core';
import { Helmet } from 'react-helmet';
import CricBuzzUtils from "../../../../utils/cricbuzz";
import Context from "../../../../utils/context";
import Utils from "../../../../utils";
import {FILTER_TYPE} from "../../../../constants";

export default class Stats extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    async componentDidMount() {
        try {
            Context.showLoader();
            // const countryResponse = await CricBuzzUtils.getAllCountries();
            // let countries = countryResponse.data;

            const teamResponse = await CricBuzzUtils.getAllTeams();
            let teams = teamResponse.data;

            const stadiumResponse = await CricBuzzUtils.getAllStadiums();
            let stadiums = stadiumResponse.data;

            let filterOptions = {
                type: {
                    displayName: 'Type',
                    type: FILTER_TYPE.RADIO,
                    values: [
                        {
                            id: 'batting',
                            name: 'Batting'
                        },
                        {
                            id: 'bowling',
                            name: 'Bowling'
                        }
                    ]
                },
                gameType: {
                    displayName: 'Game Type',
                    type: FILTER_TYPE.CHECKBOX,
                    values: [
                        {
                            id: '0',
                            name: 'ODI'
                        },
                        {
                            id: '1',
                            name: 'TEST'
                        },
                        {
                            id: '2',
                            name: 'T20'
                        }
                    ]
                },
                teamType: {
                    displayName: 'Team Type',
                    type: FILTER_TYPE.CHECKBOX,
                    values: [
                        {
                            id: '0',
                            name: 'INTERNATIONAL'
                        },
                        {
                            id: '1',
                            name: 'DOMESTIC'
                        },
                        {
                            id: '2',
                            name: 'FRANCHISE'
                        }
                    ]
                }
            };

            // filterOptions.country = {
            //     displayName: 'Country',
            //     type: FILTER_TYPE.CHECKBOX,
            //     values: countries.map(country => ({
            //         id: JSON.stringify(country.id),
            //         name: country.name
            //     }))
            // };

            filterOptions.team = {
                displayName: 'Team',
                type: FILTER_TYPE.CHECKBOX,
                values: teams.map(team => ({
                    id: JSON.stringify(team.id),
                    name: team.name
                }))
            };

            filterOptions.opposingTeam = {
                displayName: 'Opposing Team',
                type: FILTER_TYPE.CHECKBOX,
                values: teams.map(team => ({
                    id: JSON.stringify(team.id),
                    name: team.name
                }))
            };

            filterOptions.stadium = {
                displayName: 'Stadium',
                type: FILTER_TYPE.CHECKBOX,
                values: stadiums.map(stadium => ({
                    id: JSON.stringify(stadium.id),
                    name: stadium.name
                }))
            };

            filterOptions.year = {
                displayName: 'Year',
                type: FILTER_TYPE.RANGE
            };

            this.setState({
                isLoaded: true,
                stats: [],
                totalCount: 0,
                page: 1,
                limit: 10,
                filterOptions,
                isFilterOpen: false,
                selectedFilters: {
                    type: 'batting',
                },
                selectedFiltersTemp: {
                    type: 'batting'
                },
                sortMap: {
                    runs: 'desc'
                }
            });
            await this.applyFilters();
            Context.hideLoader();
        } catch (e) {
            Context.showNotify('Failed to get player details', 'error');
            console.log(e);
        }
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
        await this.updateData(this.state.page, this.state.sortMap);
    };

    handleSort = async (event, key) => {
        event.preventDefault();

        const sortMap = Utils.copyObject(this.state.sortMap);
        const order = ((sortMap.hasOwnProperty(key) && sortMap[key] === 'desc') ? 'asc' : 'desc');
        await this.updateData(1, {
            [key]: order
        });
    };

    goToPage = async page => {
        await this.updateData(page, this.state.sortMap);
    };

    updateData = async (page, sortMap) => {
        let payload = {
            filters: {},
            rangeFilters: {},
            count: this.state.limit,
            sortMap: sortMap,
            offset: ((page - 1) * this.state.limit)
        };

        const rangeFilterKeys = [
            'year'
        ];

        for (const [key, values] of Object.entries(this.state.selectedFiltersTemp)) {
            if (key === 'type') {
                payload.type = values;
            } else if (rangeFilterKeys.indexOf(key) !== -1) {
                payload.rangeFilters[key] = values;
            } else {
                payload.filters[key] = values;
            }
        }

        Context.showLoader();
        const statsResponse = await CricBuzzUtils.getStats(payload);
        const stats = statsResponse.data.stats;
        const totalCount = statsResponse.data.count;

        this.setState({
            selectedFilters: this.state.selectedFiltersTemp,
            stats,
            totalCount,
            page: page,
            isFilterOpen: false,
            sortMap
        });

        Context.hideLoader();
    };

    render () {
        return (
            <div>
                <Helmet
                    title={'Stats - Howzzat'}
                />

                <StatsCore
                    {...this.state}
                    onFilterOpen={this.openFilter}
                    onFilterClose={this.closeFilter}
                    onEvent={this.handleEvent}
                    onFilterApply={this.applyFilters}
                    onSort={this.handleSort}
                    onPageClick={this.goToPage}
                />
            </div>
        );
    }
}