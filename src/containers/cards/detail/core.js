import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../../cards/card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ObtainForm from '../obtainForm';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    cardList: {
        marginTop: theme.typography.pxToRem(5)
    },
    sectionTitle: {
        marginBottom: 0
    }
});

class DetailCore extends Component {
    renderTitle = () => {
        if (!this.props.isEmpty()) {
            return (
                <h1
                    className="title"
                >
                    {this.props.card.name}
                </h1>
            );
        }
    };

    renderImage = () => {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Card
                            card={this.props.card}
                            showLink={false}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    renderDetails = () => {

    };

    renderSourcesListMarkup = () => {
        let markup = [];

        for (let index in this.props.card.sources) {
            if (this.props.card.sources.hasOwnProperty(index)) {
                let source = this.props.card.sources[index];
                markup.push(
                    <ListItem
                        button
                        alignItems="center"
                    >
                        <Link
                            to={'/cards/browse?sources[]=' + source.id + '&order=name ASC'}
                        >
                            {source.name}
                        </Link>
                    </ListItem>
                );
            }
        }

        return markup;
    };

    renderSources = () => {
        if ((Object.keys(this.props.card).length > 0) && (this.props.card.sources.length > 0)) {
            return (
                <div>
                    <h4
                        className={this.props.classes.sectionTitle}
                    >
                        Sources
                    </h4>
                    <List component="nav">
                        {this.renderSourcesListMarkup()}
                    </List>
                </div>
            );

        }
    };

    renderMyCardListMarkup = () => (
        this.props.card.individualCards.map((myCard) => (
            <Card
                key={'card-' + this.props.card.id}
                card={this.props.card}
                showLink={false}
                showObtainLink={false}
            />
        ))
    );

    renderMyCards = () => {
        if ((Object.keys(this.props.card).length > 0) && (this.props.card.individualCards.length > 0)) {
            return (
                <div>
                    <h4>
                        My Cards
                    </h4>

                    <div className={this.props.classes.cardList}>
                        <Grid container className={this.props.classes.root} spacing={16}>
                            <Grid item xs={12}>
                                <Grid container className={this.props.classes.demo} justify="center" spacing={16}>
                                    {this.renderMyCardListMarkup()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            );
        }
    };

    renderObtainForm = () => {
        return (
            <ObtainForm />
        );
    };

    render () {
        return (
            <div className="movieDetailsContainer">
                {this.renderObtainForm()}
                {this.renderTitle()}
                {this.renderImage()}
                {this.renderDetails()}
                {this.renderSources()}
                {this.renderMyCards()}
            </div>
        );
    }
}

DetailCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailCore);
