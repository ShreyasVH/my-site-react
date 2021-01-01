import React, {h, Component} from 'react';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    fileName: {
        marginLeft: '2%'
    }
});

class FileUpload extends Component {
    handleFileUpload = event => this.props.onFileUpload && this.props.onFileUpload(event.target.files);

    render () {
        return (
            <div>
                <input
                    id={"contained-button-file" + this.props.name}
                    multiple
                    type="file"
                    hidden
                    onChange={this.handleFileUpload}
                />
                <label htmlFor={"contained-button-file" + this.props.name}>
                    <Button variant="contained" color="primary" component="span">
                        {this.props.label}
                    </Button>
                </label>
                <span
                    className={this.props.classes.fileName}
                >
                    {this.props.fileName}
                </span>
            </div>
        );
    }
}

FileUpload.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileUpload);