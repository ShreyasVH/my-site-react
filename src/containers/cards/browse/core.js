/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import Card from '../card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ObtainForm from "../obtainForm";
import Filters from "../../filters";
import SearchDropDown from '../../../components/searchDropdown';


const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class BrowseCore extends Component {
    openFilters = (event) => this.props.onFilterOpen && this.props.onFilterOpen(event);

    closeFilters = (event) => this.props.onFilterClose && this.props.onFilterClose(event);

    applyFilters = () => this.props.applyFilters && this.props.applyFilters();

    clearFilters = (event) => this.props.clearFilters && this.props.clearFilters(event);

    clearFilter = (key) => this.props.clearFilter && this.props.clearFilter(key);

    renderFilter = () => {
        return (
            <Filters
                isOpen={this.props.isFilterOpen}
                selected={this.props.selectedFilters}
                options={this.props.filterOptions}
                onFilterOpen={this.openFilters}
                onFilterClose={this.closeFilters}
                handleEvent={this.props.handleEvent}
                applyFilters={this.applyFilters}
                clearFilters={this.clearFilters}
                clearFilter={this.clearFilter}
            />
        );
    };

    renderTitle = () => {
        if (!this.props.isEmpty()) {
            return (
                <h1
                    className="title"
                >
                    Browse Cards
                </h1>
            );
        }
    };

    renderCount = () => {
        if (!this.props.isEmpty()) {
            return (
                <h3>
                    {this.props.totalCount + ' cards'}
                </h3>
            );
        }
    };

    handleCardSearch = event => this.props.onCardSearch && this.props.onCardSearch(event);

    renderSearchDropdown = () => {
        return (
            <SearchDropDown
                onKeyUp={this.handleCardSearch}
                items={this.props.suggestions}
            />
        );
    };

    renderWaypoint = () => {
        if (!this.props.isEmpty()) {
            return (
                <Waypoint
                    onEnter={this.props.onScroll}
                />
            );
        }
    };

    renderListMarkup = () => (
        this.props.cardList.map((card) => (
            <Card
                key={'card-' + card.id}
                card={card}
            />
        ))
    );

    renderCardList = () => {
        return (
            <div>
                <Grid container className={this.props.classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={this.props.classes.demo} justify="center" spacing={16}>
                            {this.renderListMarkup()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    renderObtainForm = () => {
        return (
            <ObtainForm />
        );
    };

    renderMarkup = () => {
        let markup = [];
        if (!this.props.isEmpty()) {
            markup = (
                <div>
                    {this.renderFilter()}
                    {this.renderObtainForm()}
                    {this.renderTitle()}
                    {this.renderCount()}
                    {this.renderSearchDropdown()}
                    {this.renderCardList()}
                    {this.renderWaypoint()}
                </div>
            );
        }
        return markup;
    };

    render() {
        return (
            <div>
                {this.renderMarkup()}
            </div>
        );
    }
}

BrowseCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrowseCore);
