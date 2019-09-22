import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { FILTER_TYPE } from '../../constants';

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing * 2,
        flex: 1,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        margin: theme.spacing.unit
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    appliedFilter: {
        display: 'inline-block',
        borderRadius: '50%',
        minWidth: theme.typography.pxToRem(10),
        minHeight: theme.typography.pxToRem(10),
        backgroundColor: '#27AE60',
        marginLeft: theme.typography.pxToRem(10)
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FiltersCore extends Component {
    openFilters = (event) => this.props.onFilterOpen && this.props.onFilterOpen(event);

    closeFilters = (event) => this.props.onFilterClose && this.props.onFilterClose(event);

    applyFilters = (event) => this.props.applyFilters && this.props.applyFilters();

    handleEvent = event => this.props.handleEvent && this.props.handleEvent(event);

    renderButton = () => {
        return (
            <Button
                variant="fab"
                color="primary"
                className={this.props.classes.fab}
                size="small"
                onClick={this.openFilters}
            >
                <FilterListIcon />
            </Button>
        );
    };

    renderFilterContent = (key, filter) => {
        switch (filter.type) {
            case FILTER_TYPE.CHECKBOX:
                return this.renderCheckboxFilter(key, filter);
        }
    };

    renderFilterSelecedIndicator = (key) => {
        let isFilterSelected = (this.props.filters.hasOwnProperty(key) && (0 !== this.props.filters[key].length));
        if (isFilterSelected) {
            return <div className={this.props.classes.appliedFilter} />
        }
    };

    renderFilter = (key, filter) => {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={this.props.classes.heading}>
                        {filter.displayName}
                        {this.renderFilterSelecedIndicator(key)}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {this.renderFilterContent(key, filter)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    isCheckboxChecked = (key, id) => {
        let selectedFilters = this.props.selected;
        return selectedFilters.hasOwnProperty(key) && (selectedFilters[key].indexOf(id) != -1);
    };

    renderCheckboxOptions = (key, options) => {
        let markup = [];

        for (let index in options) {
            if (options.hasOwnProperty(index)) {
                let option = options[index];
                markup.push(
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.isCheckboxChecked(key, option.id)}
                                    name={key + '[]'}
                                    data-filter={key}
                                    onChange={this.handleEvent}
                                    inputProps={{
                                        'data-key': key,
                                        'data-type': FILTER_TYPE.CHECKBOX,
                                        'data-id': option.id
                                    }}
                                />
                            }
                            label={option.name}
                        />
                    </div>
                );
            }
        }

        return markup;
    };

    renderCheckboxFilter = (key, filter) => {
        return (
            <div>
                {this.renderCheckboxOptions(key, filter.values)}
            </div>
        );
    };

    renderFilters = () => {
        let markup = [];

        for (const key in this.props.options) {
            if (this.props.options.hasOwnProperty(key)) {
                let filterObject = this.props.options[key];
                markup.push(this.renderFilter(key, filterObject));
            }
        }

        return markup;
    };

    renderFiltersPopup = () => {
        const { classes } = this.props;
        if (this.props.isOpen) {
            return (
                <div>
                    <Dialog
                        fullScreen
                        open={true}
                        TransitionComponent={Transition}
                    >
                        <form name="filters" onSubmit={this.handleSubmit}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton color="inherit" onClick={this.closeFilters} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" className={classes.flex}>
                                        Filters
                                    </Typography>
                                    <Button color="inherit" name="submit" onClick={this.applyFilters}>
                                        Apply
                                    </Button>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.root}>
                                {this.renderFilters()}
                            </div>
                        </form>
                    </Dialog>
                </div>
            );
        }
    };

    render () {
        return (
            <div>
                {this.renderButton()}
                {this.renderFiltersPopup()}
            </div>
        );
    }
}

FiltersCore.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FiltersCore);
