import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailCore from './core';
import Context from "../../../utils/context";
import Cards from "../../../utils/cards";
import Utils from "../../../utils";
import Helmet from "react-helmet";

class Detail extends Component {
    componentDidMount() {
        Context.showLoader();
        Cards.getDetail(Utils.getUrlParam('id'));
    }

    componentWillUnmount() {
        Cards.clearDetails();
    }

    isEmpty = () => (0 === Object.keys(this.props.card).length);

    getPageTitle = () => ((this.isEmpty()) ? 'Let\'s Duel' : (this.props.card.name + ' - Let\'s Duel'));

    render() {
        return (
            <div>
                <Helmet
                    title={this.getPageTitle()}
                />
                <DetailCore
                    {...this.props}
                    isEmpty={this.isEmpty}
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return ({
        card: state.cards.individual
    });
}

export default connect(mapStateToProps)(Detail);
