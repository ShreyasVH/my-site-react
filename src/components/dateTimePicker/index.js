import React, {h, Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Utils from "../../utils";

export default class DateTimePicker extends Component {
    formatInput = () => {
        let displayValue = '';
        if (this.props.value) {
            displayValue = Utils.formatDateToString(this.props.value) + "T" + Utils.formatTimeToString(this.props.value);
        }
        return displayValue;
    }

    handleChange = (event) => this.props.onChange && this.props.onChange(event);

    render () {
        return (
            <TextField
                label={this.props.label}
                variant="outlined"
                placeholder={this.props.placeHolder}
                fullWidth
                value={this.formatInput()}
                onChange={this.handleChange}
                type="datetime-local"
                error={this.props.error}
                helperText={this.props.helperText}
                InputLabelProps={{ shrink: true }}
            />
        );
    }
}


