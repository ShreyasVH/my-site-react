import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import '../../movies/movieList/styles.css';
import BrowseCore from './core';

import Context from '../../../utils/context';
import Cards from '../../../utils/cards';
import Filters from "../../../utils/filters";
import Movies from "../../../utils/movies";
import MovieFilterHandler from "../../../utils/movies/filterHandler";
import BrowseMoviesCore from "../../movies/browseMovies/core";


class Browse extends Component {
    componentDidMount () {
        Context.showLoader();
        Cards.updateFilters();
        Filters.resetTempFilters('cards');
        Cards.getCardsWithFilters();
    }

    componentWillUnmount () {
        Cards.clearList();
    }

    handleScroll = () => {
        Context.showLoader();
        Cards.getCardsWithFilters(false);
    };

    isLoadComplete = () => (this.props.totalCount === this.props.cardList.length);

    isEmpty = () => (-1 === this.props.totalCount);

    openFilters = (event) => {
        event.preventDefault();
        Filters.openFilters('cards');
    };

    closeFilters = (event) => {
        event.preventDefault();
        Filters.closeFilters('cards');
        Filters.resetTempFilters('cards');
    };

    applyFilters = () => {
        Context.showLoader();
        Filters.applyFilters('cards');
        Cards.getCardsWithFilters();
    };

    clearFilters = event => {
        Filters.clearFilters('cards');
    };

    clearFilter = key => {
        Filters.clearFilter('cards', key);
    };

    handleEvent = event => MovieFilterHandler.handleEvent('cards', event);

    handleSearch = event => {
        Cards.getSuggestions(event);
    };

    handleSearchClick = selectedId => {
        location.href = ('/cards/detail?id=' + selectedId);
    };

    render() {
        return (
            <div>
                <Helmet
                    title="Browse Cards - Let's Duel"
                />
                <BrowseCore
                    {...this.props}
                    onScroll={this.handleScroll}
                    isLoadComplete={this.isLoadComplete}
                    isEmpty={this.isEmpty}
                    onFilterOpen={this.openFilters}
                    onFilterClose={this.closeFilters}
                    handleEvent={this.handleEvent}
                    applyFilters={this.applyFilters}
                    clearFilters={this.clearFilters}
                    clearFilter={this.clearFilter}
                    onSearch={this.handleSearch}
                    onSearchClick={this.handleSearchClick}
                />
            </div>
        );
    }
}

function mapStateToProps (store) {
    return {
        cardList: store.cards.list,
        totalCount: store.cards.totalCount,
        selectedFilters: store.cards.filtersTemp,
        isFilterOpen: store.cards.isFilterOpen,
        filterOptions: store.cards.filterOptions,
        suggestions: store.cards.suggestions
    };
}

export default connect(mapStateToProps)(Browse);
