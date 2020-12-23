import React, {h, Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Utils from "../../utils";

export default class DateTimePicker extends Component {
    formatInput = () => Utils.formatDateToString(this.props.value) + "T" + Utils.formatTimeToString(this.props.value)

    handleChange = (event) => this.props.onChange && this.props.onChange(event);

    render () {
        return (
            <TextField
                label="Start Time"
                variant="outlined"
                fullWidth
                value={this.formatInput()}
                onChange={this.handleChange}
                type="datetime-local"
            />
        );
    }
}


