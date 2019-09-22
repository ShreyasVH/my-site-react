/**
 * @author shreyas.hande on 9/8/18
 *
 */

import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import Card from '../card';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ObtainForm from "../obtainForm";


const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class BrowseCore extends Component {
    renderTitle = () => {
        if (!this.props.isEmpty()) {
            return (
                <h1
                    className="title"
                >
                    Browse Cards
                </h1>
            );
        }
    };

    renderCount = () => {
        if (!this.props.isEmpty()) {
            return (
                <h3>
                    {this.props.totalCount + ' cards'}
                </h3>
            );
        }
    };

    renderWaypoint = () => {
        if (!this.props.isEmpty()) {
            return (
                <Waypoint
                    onEnter={this.props.onScroll}
                />
            );
        }
    };

    renderListMarkup = () => (
        this.props.cardList.map((card) => (
            <Card
                key={'card-' + card.id}
                card={card}
            />
        ))
    );

    renderCardList = () => {
        return (
            <div>
                <Grid container className={this.props.classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={this.props.classes.demo} justify="center" spacing={16}>
                            {this.renderListMarkup()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    renderObtainForm = () => {
        return (
            <ObtainForm />
        );
    };

    renderMarkup = () => {
        let markup = [];
        if (!this.props.isEmpty()) {
            markup = (
                <div>
                    {this.renderObtainForm()}
                    {this.renderTitle()}
                    {this.renderCount()}
                    {this.renderCardList()}
                    {this.renderWaypoint()}
                </div>
            );
        }
        return markup;
    };

    render() {
        return (
            <div>
                {this.renderMarkup()}
            </div>
        );
    }
}

BrowseCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BrowseCore);
