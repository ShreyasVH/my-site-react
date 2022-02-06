import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchDropDown from "../../../../components/searchDropdown";
import DateTimePicker from "../../../../components/dateTimePicker";
import FileUpload from "../../../../components/fileUpload";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Utils from '../../../../utils';
import Waypoint from "react-waypoint";

const styles = theme => ({
    form: {
        margin: '2.5%',
        border: '1px solid black',
        borderRadius: '5px',
        minHeight: '200px'
    },
    formTitle: {
        textAlign: 'center',
        padding: '2%',
        fontSize: '25px',
        color: 'white',
        backgroundColor: 'black',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    row: {
        width: '100%',
        marginTop: '0.5%',
        marginBottom: '0.5%'
    },
    quarterWidth: {
        width: '25%',
    },
    fullWidth: {
        width: '100%',
    },
    formFieldInput: {
        width: '99%',
        marginLeft: '0.5%',
        marginRight: '0.5%'
    },
    formField: {
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%',
        }
    },
    container: {
        padding: '1%',
        [theme.breakpoints.down('xs')]: {
            padding: '4%',
        }
    },
    submit: {
        backgroundColor: '#428bca',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        display: 'block'
    },
    oneThirdWidth: {
        width: '33.33%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    halfWidth: {
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    chip: {
        margin: '0.25%'
    },
    formsContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        borderRadius: '5px'
    },
    removeRow: {
        verticalAlign: 'middle',
        display: 'inline-block',
        marginTop: '2%',
        marginLeft: '0.5%',
        '& button': {
            padding: 'initial'
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
            textAlign: 'center'
        }
    },
    paper: {
        textAlign: 'center',
        cursor: 'pointer'
    },
    details: {
        textAlign: 'center'
    },
    edit: {
        cursor: 'pointer'
    },
    new: {
        marginBottom: '2%',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5%'
        }
    }
});

class DetailCore extends Component {
    handleEditClick = id => event => this.props.onEditClick && this.props.onEditClick(id, event);
    handleNewClick = event => this.props.onNewClick && this.props.onNewClick();
    handleDetailClick = id => event => this.props.onDetailClick && this.props.onDetailClick(id);
    handleScroll = event => this.props.onScroll && this.props.onScroll();

    renderListMarkup = () => {
        return this.props.events.map(event => (
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                xl={1}
                key={event.id}
            >
                <Paper
                    className={this.props.classes.paper}
                    onClick={this.handleDetailClick(event.id)}
                >
                    <Typography component={'span'} color="textSecondary" className={this.props.classes.tourName}>
                        {event.name}
                    </Typography>

                    <EditIcon
                        className={this.props.classes.edit}
                        color='primary'
                        onClick={this.handleEditClick(event.id)}
                    />
                </Paper>
            </Grid>
        ));
    }

    renderList = () => {
        return (
            <div>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    component={"span"}
                    className={this.props.classes.new}
                    onClick={this.handleNewClick}
                >
                    Add New
                </Button>
                <Grid container className={this.props.classes.demo} justify="center" spacing={16} key={"container"}>
                    {this.renderListMarkup()}
                </Grid>
            </div>
        );
    };

    renderWaypoint = () => {
        if (this.props.totalCount > 0) {
            return (
                <Waypoint
                    onEnter={this.handleScroll}
                />
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderList()}
                {this.renderWaypoint()}
            </div>
        );
    }
}

DetailCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailCore);