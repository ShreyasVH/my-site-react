import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    }
});

class ObtainFormCore extends Component {
    handleClose = () => this.props.hideForm && this.props.hideForm();

    handleChange = event => this.props.changeFoilType && this.props.changeFoilType(event);

    handleSubmit = event => this.props.onSubmit && this.props.onSubmit(event);

    renderFoilTypeOptions = () => {
        let markup = [
            <option value="" />
        ];

        for (const index in this.props.foilTypeOptions) {
            if (this.props.foilTypeOptions.hasOwnProperty(index)) {
                let valueObject = this.props.foilTypeOptions[index];
                markup.push(
                    <option
                        value={valueObject.id}
                        key={valueObject.id}
                    >
                        {valueObject.name}
                    </option>
                );
            }
        }

        return markup;
    };

    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form
                    onSubmit={this.handleSubmit}
                >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Foil Type</InputLabel>
                        <Select
                            native
                            value={this.props.foilTypeId}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            {this.renderFoilTypeOptions()}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary">
                        Obtain
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        );
    }
}

ObtainFormCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ObtainFormCore);
