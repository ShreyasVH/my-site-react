import React, { Component } from 'react';

import FiltersCore from './core';

export default class Filters extends Component {
    render () {
        return (
            <FiltersCore
                {...this.props}
            />
        );
    }
}