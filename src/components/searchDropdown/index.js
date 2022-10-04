import React, { Component } from 'react';

import SearchDropdownCore from './core';

export default class SearchDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocussed: false,
            inputValue: '',
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
        // setTimeout(() => {
        //     this.setState(({
        //         isFocussed: false
        //     }));
        // }, 200);
    };

    handleTextFieldFocus = () => {
        this.setState(({
            isFocussed: true
        }));
    };

    handleKeyUp = event => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
        this.setState({
            inputValue: event.target.value
        });
    };

    handleSelect = (selectedId, selectedName)  => {
        this.props.onSelect && this.props.onSelect(selectedId, selectedName);
        this.setState({
            isFocussed: false,
            inputValue: ''
        });

        if (this.props.clearOnSelect) {
            this.setState({
                displayValue: ''
            })
        }
    };

    handleNewAddition = (value) => {
        this.setState({
            isFocussed: false,
            inputValue: ''
        });
        this.props.onNewAdd && this.props.onNewAdd(value);
    }

    render = () => {
        return (
            <SearchDropdownCore
                {...this.props}
                {...this.state}
                onDisplayFieldClick={this.handleDisplayFieldClick}
                onTextFieldBlur={this.handleTextFieldBlur}
                onTextFieldFocus={this.handleTextFieldFocus}
                onSelect={this.handleSelect}
                onKeyUp={this.handleKeyUp}
                onNewAdd={this.handleNewAddition}
            />
        );
    }
}

