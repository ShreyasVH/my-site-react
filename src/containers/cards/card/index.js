import React, { Component } from 'react';

import CardCore from './core';

export default class Card extends Component {
    render () {
        return (
            <CardCore
                {...this.props}
            />
        );
    }
}