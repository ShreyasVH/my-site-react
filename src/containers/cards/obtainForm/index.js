import React, { Component } from 'react';
import { connect } from 'react-redux';

import ObtainFormCore from './core';

import Cards from '../../../utils/cards';

class ObtainForm extends Component {
    showForm = () => Cards.showObtainForm();

    hideForm = () => {
        Cards.resetObtainForm();
        Cards.hideObtainForm();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        Cards.submitObtainForm();
    };

    changeFoilType = event => {
        let target = event.target;
        let value = parseInt(target.value, 10);
        Cards.setFoilTypeForObtainForm(value);
    };

    getCurrentFoilTypeId = () => {
        let foilTypeId = '';

        if (-1 !== this.props.foilTypeId) {
            foilTypeId = this.props.foilTypeId;
        }

        return foilTypeId;
    };

    render() {
        return (
            <ObtainFormCore
                {...this.props}
                foilTypeId={this.getCurrentFoilTypeId()}
                changeFoilType={this.changeFoilType}
                showForm={this.showForm}
                hideForm={this.hideForm}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

function mapStateToProps(state) {
    return ({
        isOpen: state.cards.obtainForm.isOpen,
        foilTypeId: state.cards.obtainForm.foilTypeId,
        foilTypeOptions: state.cards.obtainForm.foilTypeOptions
    });
}

export default connect(mapStateToProps)(ObtainForm);
