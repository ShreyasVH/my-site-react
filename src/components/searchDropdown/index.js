import React, { Component } from 'react';

import SearchDropdownCore from './core';

export default class SearchDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocussed: false,
            displayValue: (props.displayValue ? props.displayValue : '')
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.displayValue !== prevState.displayValue) {
            this.setState({
                displayValue: this.props.displayValue
            })
        }
    }

    handleDisplayFieldClick = () => {
        this.setState(({
            isFocussed: true,
            displayValue: ''
        }));
    };

    handleTextFieldBlur = () => {
        setTimeout(() => {
            this.setState(({
                isFocussed: false
            }));
        }, 100);
    };

    handleKeyUp = event => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    handleSelect = (selectedId, selectedName)  => {
        this.props.onSelect && this.props.onSelect(selectedId, selectedName);
        if (this.props.clearOnSelect) {
            this.setState({
                displayValue: ''
            })
        }
    };

    render = () => {
        return (
            <SearchDropdownCore
                {...this.props}
                {...this.state}
                onDisplayFieldClick={this.handleDisplayFieldClick}
                onTextFieldBlur={this.handleTextFieldBlur}
                onSelect={this.handleSelect}
                onKeyUp={this.handleKeyUp}
            />
        );
    }
}

