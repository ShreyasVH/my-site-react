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
        textAlign: 'center'
    },
    details: {
        textAlign: 'center'
    }
});

class DetailCore extends Component {
    renderListMarkup = () => {
        return this.props.forms.map(form => (
            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                xl={1}
                key={form.id}
            >
                <Paper
                    className={this.props.classes.paper}
                >
                    <img
                        className={this.props.classes.cardImage}
                        src={form.imageUrl}
                        alt={this.props.pokemonMap[form.number].name + '_' + form.name}
                        height={200}
                        width={200}
                    />
                </Paper>
                <div className={this.props.classes.details}>
                    <p>
                        {'#' + form.number + ' ' + this.props.pokemonMap[form.number].name}
                    </p>
                    <p>
                        {form.name}
                    </p>
                </div>
            </Grid>
        ));
    }

    renderList = () => {
        return <div>
            <Grid container className={this.props.classes.demo} justify="center" spacing={16} key={"container"}>
                {this.renderListMarkup()}
            </Grid>
        </div>
    }

    render() {
        return (
            <div>
                <Grid container justify="center" spacing={16} key={"container"}>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={"name"}
                    >
                        <Typography component={'span'} color="textSecondary" className={this.props.classes.tourName}>
                            {this.props.name}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={"startTime"}
                    >
                        <Typography component={'span'} color="textSecondary" className={this.props.classes.tourName}>
                            {Utils.formatDateToString(this.props.startTime) + ' ' + Utils.formatTimeToString(this.props.startTime)}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={"startTime"}
                    >
                        <Typography component={'span'} color="textSecondary" className={this.props.classes.tourName}>
                            {Utils.formatDateToString(this.props.endTime) + ' ' + Utils.formatTimeToString(this.props.endTime)}
                        </Typography>
                    </Grid>
                </Grid>
                <div>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

DetailCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailCore);