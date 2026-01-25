import React, {h, Component} from 'react';
import { Button } from '@mui/material';
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core";
import {styled} from "@mui/system";

const styles = theme => ({
    fileName: {
        marginLeft: '2%'
    }
});

const Container = styled("div")(({ theme }) => ({
    '.fileName': {
        marginLeft: '2%'
    }
}));

class FileUpload extends Component {
    handleFileUpload = event => this.props.onFileUpload && this.props.onFileUpload(event.target.files);

    render () {
        return (
            <Container>
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
                    className="fileName"
                >
                    {this.props.fileName}
                </span>
            </Container>
        );
    }
}

FileUpload.propTypes = {
    classes: PropTypes.object.isRequired
};

export default FileUpload;