import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../../cards/card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ObtainForm from '../obtainForm';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    cardList: {
        marginTop: theme.typography.pxToRem(5)
    },
    sectionTitle: {
        marginBottom: 0
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Sources</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderSourcesListMarkup()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
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
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>My Cards</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={this.props.classes.cardList}>
                            <Grid container className={this.props.classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <Grid container className={this.props.classes.demo} justify="center" spacing={16}>
                                        {this.renderMyCardListMarkup()}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
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
