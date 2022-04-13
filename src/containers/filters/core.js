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
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import { FILTER_TYPE } from '../../constants';
import SearchDropDown from "../../components/searchDropdown";

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
    },
    clearFilter: {
        right: 0,
        position: 'absolute',
        fontWeight: 'bold'
    },
    rangeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    rangeInput: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '48%',
        [theme.breakpoints.down('xs')]: {
            width: '44%',
        }
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FiltersCore extends Component {
    openFilters = (event) => this.props.onFilterOpen && this.props.onFilterOpen(event);

    closeFilters = (event) => this.props.onFilterClose && this.props.onFilterClose(event);

    applyFilters = (event) => this.props.applyFilters && this.props.applyFilters();

    clearFilters = (event) => this.props.clearFilters && this.props.clearFilters(event);

    handleEvent = event => this.props.handleEvent && this.props.handleEvent(event);

    clearFilter = (key) => (event) => this.props.clearFilter && this.props.clearFilter(key);

    handleSort = (id, name) => {
        (this.props.handleSort && this.props.handleSort(id, name))
    };

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
            case FILTER_TYPE.RADIO:
                return this.renderRadioFilter(key, filter);
            case FILTER_TYPE.RANGE:
                return this.renderRangeFilter(key, filter);

        }
    };

    renderClearAllButton = () => {
      let isAnyFilterSelected = false;

      for (const key in this.props.selected) {
          if (this.props.selected.hasOwnProperty(key)) {
              let values = this.props.selected[key];
              if (values.length !== 0)
              {
                  isAnyFilterSelected = true;
                  break;
              }
          }
      }

      if (isAnyFilterSelected) {
          return (
              <Button color="inherit" name="submit" onClick={this.clearFilters}>
                  Clear All
              </Button>
          );
      }
    };

    isFilterSelected = key => (this.props.selected.hasOwnProperty(key) && (0 !== this.props.selected[key].length));

    renderFilterSelectedIndicator = (key) => {
        if (this.isFilterSelected(key)) {
            return <span className={this.props.classes.appliedFilter} />
        }
    };

    renderFilter = (key, filter) => {
        return (
            <ExpansionPanel
                key={key}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={this.props.classes.heading}>
                        {filter.displayName}
                        {this.renderFilterSelectedIndicator(key)}
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
        return selectedFilters.hasOwnProperty(key) && (selectedFilters[key].indexOf(id) !== -1);
    };

    isRadioChecked = (key, id) => {
        let selectedFilters = this.props.selected;
        return selectedFilters.hasOwnProperty(key) && (selectedFilters[key] === id);
    };

    renderCheckboxOptions = (key, options) => {
        let markup = [];

        for (let index in options) {
            if (options.hasOwnProperty(index)) {
                let option = options[index];
                markup.push(
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
                        key={key + '_' + option.id}
                    />
                );
            }
        }

        return markup;
    };

    renderClearFilterButton = (key) => {
        if (this.isFilterSelected(key)) {
            return (
                <Button
                    onClick={this.clearFilter(key)}
                    color="primary"
                    TouchRippleProps={{
                        'data-key': key
                    }}
                    className={this.props.classes.clearFilter}
                >
                    <span>
                        Clear
                    </span>
                </Button>
            );
        }
    };

    renderCheckboxFilter = (key, filter) => {
        return (
            <div>
                {this.renderClearFilterButton(key)}
                {this.renderCheckboxOptions(key, filter.values)}
            </div>
        );
    };

    renderRadioOptions = (key, options) => {
        let markup = [];

        for (let index in options) {
            if (options.hasOwnProperty(index)) {
                let option = options[index];
                markup.push(
                    <FormControlLabel
                        control={
                            <Radio
                                checked={this.isRadioChecked(key, option.id)}
                                name={key + '[]'}
                                data-filter={key}
                                onChange={this.handleEvent}
                                inputProps={{
                                    'data-key': key,
                                    'data-type': FILTER_TYPE.RADIO,
                                    'data-id': option.id
                                }}
                            />
                        }
                        label={option.name}
                        key={key + '_' + option.id}
                    />
                );
            }
        }

        return markup;
    };

    renderRadioFilter = (key, filter) => {
        return (
            <div>
                {this.renderClearFilterButton(key)}
                {this.renderRadioOptions(key, filter.values)}
            </div>
        );
    };

    renderRangeFilter = (key, filter) => {
        return (
            <div className={this.props.classes.rangeContainer}>
                <TextField
                    name={key + '[]'}
                    data-filter={key}
                    data-type={FILTER_TYPE.RANGE}
                    onChange={this.handleEvent}
                    inputProps={{
                        'data-key': key,
                        'data-type': FILTER_TYPE.RANGE,
                        'data-rangetype': 'from'
                    }}
                    value={((this.props.selected.hasOwnProperty(key) && this.props.selected[key].hasOwnProperty('from')) ? this.props.selected[key].from : '')}
                    variant="outlined"
                    className={this.props.classes.rangeInput}
                    label="From"
                    margin="normal"
                />
                <TextField
                    name={key + '[]'}
                    data-filter={key}
                    data-type={FILTER_TYPE.RANGE}
                    onChange={this.handleEvent}
                    inputProps={{
                        'data-key': key,
                        'data-type': FILTER_TYPE.RANGE,
                        'data-rangetype': 'to'
                    }}
                    value={((this.props.selected.hasOwnProperty(key) && this.props.selected[key].hasOwnProperty('to')) ? this.props.selected[key].to : '')}
                    variant="outlined"
                    className={this.props.classes.rangeInput}
                    label="To"
                    margin="normal"
                />
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

    getSortDisplayValue = () => {
        let value = '';

        if (this.props.sortMap && Object.keys(this.props.sortMap).length > 0) {
            value = Object.keys(this.props.sortMap)[0] + ' ' + Object.values(this.props.sortMap)[0]
        }

        return value;
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
                            <AppBar className={this.props.classes.appBar}>
                                <Toolbar>
                                    <IconButton color="inherit" onClick={this.closeFilters} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" className={this.props.classes.flex}>
                                        Filters
                                    </Typography>
                                    <Button color="inherit" name="submit" onClick={this.applyFilters}>
                                        Apply
                                    </Button>

                                    {this.renderClearAllButton()}

                                    <div>
                                        <SearchDropDown
                                            items={this.props.sortOptions}
                                            label="Sort"
                                            placeholder="Sort field"
                                            displayValue={this.getSortDisplayValue()}
                                            onSelect={this.handleSort}
                                        />
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <div className={this.props.classes.root}>
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
