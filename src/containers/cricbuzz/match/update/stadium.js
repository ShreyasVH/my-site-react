import React, { Component } from 'react';
import SearchDropDown from "../../../../components/searchDropdown";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    halfWidth: {
        width: '50%',
    },
    formFieldInput: {
        width: '99%',
        marginLeft: '0.5%',
        marginRight: '0.5%'
    },
    formField: {
        display: 'inline-block'
    }
});

class Stadium extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let shouldUpdate = false;

        shouldUpdate = (this.props.stadiumName !== nextProps.stadiumName);
        const currentStadiumIds = this.props.stadiumSuggestions.map(stadium => stadium.id);
        const newStadiumIds = nextProps.stadiumSuggestions.map(stadium => stadium.id);
        shouldUpdate = shou(newStadiumIds != currentStadiumIds);

        return shouldUpdate;
    }

    render() {
        return (
            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                <div className={this.props.classes.formFieldInput}>
                    <SearchDropDown
                        onKeyUp={this.props.onStadiumSearch}
                        items={this.props.stadiumSuggestions}
                        label="Stadium"
                        placeHolder="Stadium"
                        onSelect={this.props.onStadiumSelect}
                        displayValue={this.props.stadiumName}
                    />
                </div>
            </div>
        );
    }
}

Stadium.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stadium);