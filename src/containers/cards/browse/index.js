import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import '../../movies/movieList/styles.css';
import BrowseCore from './core';

import Context from '../../../utils/context';
import Cards from '../../../utils/cards';


class Browse extends Component {
    componentDidMount () {
        Context.showLoader();
        Cards.updateFilters();
        Cards.getCardsWithFilters();
    }

    componentWillUnmount () {
        Cards.clearList();
    }

    handleScroll = () => {
        Context.showLoader();
        Cards.getCardsWithFilters(false);
    };

    isLoadComplete = () => (this.props.totalCount === this.props.cardList.length);

    isEmpty = () => (-1 === this.props.totalCount);

    render() {
        return (
            <div>
                <Helmet
                    title="Browse Cards - Let's Duel"
                />
                <BrowseCore
                    {...this.props}
                    onScroll={this.handleScroll}
                    isLoadComplete={this.isLoadComplete}
                    isEmpty={this.isEmpty}
                />
            </div>
        );
    }
}

function mapStateToProps (store) {
    return {
        cardList: store.cards.list,
        totalCount: store.cards.totalCount
    };
}

export default connect(mapStateToProps)(Browse);
