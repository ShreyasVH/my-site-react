import React, { Component } from 'react';

import SearchDropdownCore from './core';

export default class SearchDropDown extends Component {
    render() {
        return (
            <SearchDropdownCore
                {...this.props}
            />
        );
    }
}

