/**
 * @author shreyas.hande on 9/9/18
 *
 */

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';


const styles = theme => ({
    paper: {
        height: 240,
        width: 180,
    },
    obtain: {
        float: 'right',
        color: '#5cb85c'
    },
    cardImage: {
        height: 240,
        width: 180
    },
    link: {
        textDecoration: 'none',
        color: '#35A4F5',
        fontWeight: 'bold'
    },
    cardWrapper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '15px'
    },
    cardLink: {
        textAlign: 'center',
        width: '180px',
        marginTop: '10px'
    }
});

class CardCore extends Component {
    openObtainForm = cardId => event => this.props.openObtainForm && this.props.openObtainForm(cardId);

    renderLink = () => {
        let { card, showLink = true } = this.props;
        if (showLink) {
            return (
                <div className={this.props.classes.cardLink}>
                    <Link
                        to={'/cards/detail?id=' + card.id}
                    >
                        <span className={this.props.classes.link}>
                            {card.name}
                        </span>
                    </Link>
                </div>
            );
        }
    };

    renderObtainLink = () => {
        let { showObtainLink = true } = this.props;

        if (showObtainLink) {
            return (
                <SystemUpdateIcon
                    fontSize="large"
                    className={this.props.classes.obtain}
                    onClick={this.openObtainForm(this.props.card.id)}
                />
            );
        }
    };

    render() {
        let { card } = this.props;
        return (
            <div className={this.props.classes.cardWrapper}>
                <Grid
                    item
                    xs={6}
                    key={card.id}
                >
                    <Paper
                        className={this.props.classes.paper}
                    >
                        <img
                            className={this.props.classes.cardImage}
                            src={card.imageUrl}
                            alt={card.name}
                        />
                        {this.renderObtainLink()}
                    </Paper>
                    {this.renderLink()}
                </Grid>
            </div>
        );
    }
}

CardCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardCore);
