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
import EditIcon from '@material-ui/icons/Edit';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';


const styles = theme => ({
    paper: {
        height: 240,
        width: 180,
    },
    obtain: {
        float: 'right',
        color: '#5cb85c'
    }
});

class CardCore extends Component {
    openObtainForm = cardId => event => this.props.openObtainForm && this.props.openObtainForm(cardId);

    renderLink = () => {
        let { card, showLink = true } = this.props;
        if (showLink) {
            return (
                <div className="movie-link">
                    <Link
                        to={'#'}
                    >
                        {card.name}
                    </Link>
                </div>
            );
        }
    };

    render() {
        let { card } = this.props;
        return (
            <div className="cardWrapper">
                <Grid
                    item
                    xs={6}
                    key={card.id}
                >
                    <Paper
                        className={this.props.classes.paper}
                    >
                        <img
                            src={card.imageUrl}
                            alt={card.name}
                        />
                        {/*<a>*/}
                        {/*    <EditIcon*/}
                        {/*        className={}*/}
                        {/*        fontSize="large"*/}
                        {/*    />*/}
                        {/*</a>*/}
                        {/*<IconButton*/}
                        {/*    */}
                        {/*>*/}
                            <SystemUpdateIcon
                                fontSize="large"
                                className={this.props.classes.obtain}
                                onClick={this.openObtainForm(card.id)}
                            />
                        {/*</IconButton>*/}
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
