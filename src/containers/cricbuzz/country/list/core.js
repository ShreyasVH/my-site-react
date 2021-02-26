import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Grid, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    title: {
        marginBottom: '2%',
        [theme.breakpoints.down('md')]: {
            marginBottom: '10%'
        }
    },
    edit: {
        float: 'right',
        cursor: 'pointer'
    }
});

class ListCore extends Component {
    handleEditClick = id => event => this.props.onEditClick && this.props.onEditClick(id);

    renderCountries = () => {
        return this.props.countries.map(country => (
            <Grid key={country.id} item xs={6} sm={4} md={3} lg={2}>
                <Card>
                    <CardContent>
                        <Typography component={"span"} color="textSecondary">
                            {country.name}
                            &nbsp;
                            <EditIcon
                                className={this.props.classes.edit}
                                color='primary'
                                onClick={this.handleEditClick(country.id)}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    };

    renderMarkup = () => {
        if (this.props.isLoaded) {
            return (
                <div className={this.props.classes.container}>
                    <div className={this.props.classes.title}>
                        <strong>
                            Countries ({this.props.countries.length})
                        </strong>
                    </div>
                    <Grid container spacing={16} alignItems="center">
                        {this.renderCountries()}
                    </Grid>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderMarkup()}
            </div>
        );
    }
}

ListCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListCore);