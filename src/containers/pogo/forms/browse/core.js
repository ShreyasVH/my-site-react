import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";
import DatePicker from "../../../../components/datePicker";
import FileUpload from "../../../../components/fileUpload";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Waypoint from "react-waypoint";
import EditIcon from "@material-ui/icons/Edit";
import Filters from "../../../filters";

const styles = theme => ({
    form: {
        margin: '2.5%',
        border: '1px solid black',
        borderRadius: '5px',
        minHeight: '200px'
    },
    formTitle: {
        textAlign: 'center',
        padding: '2%',
        fontSize: '25px',
        color: 'white',
        backgroundColor: 'black',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    },
    quarterWidth: {
        width: '25%',
    },
    fullWidth: {
        width: '100%',
    },
    formFieldInput: {
        width: '99%',
        marginLeft: '0.5%',
        marginRight: '0.5%'
    },
    formField: {
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    container: {
        padding: '1%',
        [theme.breakpoints.down('xs')]: {
            padding: '4%',
        }
    },
    submit: {
        backgroundColor: '#428bca',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        display: 'block'
    },
    oneThirdWidth: {
        width: '33.33%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    halfWidth: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    details: {
        textAlign: 'center',
        '& p': {
            marginTop: 0,
            marginBottom: 0
        }
    },
    edit: {
        float: 'right',
        cursor: 'pointer'
    }
});

class BrowseCore extends Component {
    handleScroll = event => this.props.onScroll && this.props.onScroll();
    handleEditClick = id => event => this.props.onEditClick && this.props.onEditClick(id);

    renderCount = () => {
        return (
            <h3
                className="item-count"
            >
                {this.props.totalCount + ' forms'}
            </h3>
        );
    };

    renderFilter = () => {
        return (
            <Filters
                isOpen={this.props.isFilterOpen}
                selected={this.props.selectedFiltersTemp}
                options={this.props.filterOptions}
                sortOptions={this.props.sortOptions}
                sortMap={this.props.sortMap}
                handleSort={this.props.onSort}
                onFilterOpen={this.props.onFilterOpen}
                onFilterClose={this.props.onFilterClose}
                handleEvent={this.props.onEvent}
                applyFilters={this.props.onFilterApply}
                clearFilters={this.props.FilterClearAll}
                clearFilter={this.props.onFilterClear}
            />
        );
    };

    renderListMarkup = () => {
        return this.props.forms.map(form => (
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                xl={1}
                key={form.id}
            >
                <Paper
                    className={this.props.classes.paper}
                >
                    <img
                        className={this.props.classes.cardImage}
                        src={form.imageUrl}
                        alt={form.pokemonName + '_' + form.name}
                        height={200}
                        width={200}
                    />
                </Paper>
                <div className={this.props.classes.details}>
                    <p>
                        {'#' + form.pokemonNumber + ' ' + form.pokemonName}
                    </p>
                    <p>
                        {form.name}
                    </p>
                    <EditIcon
                        className={this.props.classes.edit}
                        color='primary'
                        onClick={this.handleEditClick(form.id)}
                    />
                </div>
            </Grid>
        ));
    }

    renderList = () => {
        return <div>
            <Grid container className={this.props.classes.demo} justify="center" spacing={16} key={"container"}>
                {this.renderListMarkup()}
            </Grid>
        </div>
    }

    renderWaypoint = () => {
        if (this.props.totalCount > 0) {
            return (
                <Waypoint
                    onEnter={this.handleScroll}
                />
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderFilter()}
                {this.renderCount()}
                {this.renderList()}
                {this.renderWaypoint()}
            </div>
        );
    }
}

BrowseCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrowseCore);