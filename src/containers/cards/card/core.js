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

const styles = theme => ({
    paper: {
        height: 240,
        width: 180,
    }
});

class CardCore extends Component {
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