import React, { Component } from 'react';

import CardCore from './core';

import Cards from '../../../utils/cards';

export default class Card extends Component {
    openObtainForm = cardId => {
        Cards.setCardForObtainForm(cardId);
        Cards.showObtainForm();
    };

    render () {
        return (
            <CardCore
                {...this.props}
                openObtainForm={this.openObtainForm}
            />
        );
    }
}
