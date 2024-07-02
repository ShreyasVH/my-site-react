import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import SearchDropDown from "../../../../components/searchDropdown";
import FileUpload from "../../../components/fileUpload";
import SearchDropDown from "../../../components/searchDropdown";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import AddArtist from "../artists/add";
import DatePicker from "../../../components/datePicker";

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
        marginTop: '1%',
        marginBottom: '1%'
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
    quarterWidth: {
        width: '25%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    playerChip: {
        margin: '0.25%',
        [theme.breakpoints.down('md')]: {
            width: '99%',
            marginLeft: '0.5%',
            marginRight: '0.5%'
        }
    },
    playersContainer: {
        margin: '0.25%',
        width: '99.5%',
        border: '1px solid gray',
        // minHeight: '100px',
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
            marginTop: '3%'
        }
    },
});

class UpdateCore extends Component {
    handleNameChange = event => (this.props.onNameChange && this.props.onNameChange(event));
    handleSizeChange = event => (this.props.onSizeChange && this.props.onSizeChange(event));

    handleLanguageSelect = (id, name) => (this.props.onLanguageSelect && this.props.onLanguageSelect(id, name));

    handleFormatSelect = (id, name) => (this.props.onFormatSelect && this.props.onFormatSelect(id, name));

    handleReleaseDateChange = event => (this.props.onReleaseDateChange && this.props.onReleaseDateChange(event));

    handleSubtitleChange = (event, checked) => (this.props.onSubtitleChange && this.props.onSubtitleChange(event, checked));

    handleViewedChange = (event, checked) => (this.props.onViewedChange && this.props.onViewedChange(event, checked));

    handleObtainedChange = (event, checked) => (this.props.onObtainedChange && this.props.onObtainedChange(event, checked));

    handleQualitySelect = (id, name) => (this.props.onQualitySelect && this.props.onQualitySelect(id, name));

    handleBaseNameChange = event => (this.props.onBaseNameChange && this.props.onBaseNameChange(event));

    handleFileUpload = files => (this.props.onImageSelect && this.props.onImageSelect(files[0]));

    handleDirectorRemove = (id) => event => (this.props.onDirectorRemove && this.props.onDirectorRemove(id));
    handleDirectorSearch = event => (this.props.onDirectorSearch && this.props.onDirectorSearch(event));
    handleDirectorSelect = (id, name) => (this.props.onDirectorSelect && this.props.onDirectorSelect(id, name));
    handleDirectorAddInitiate = value => this.props.onInitiateAddDirector && this.props.onInitiateAddDirector(value);

    handleActorRemove = (id) => event => (this.props.onActorRemove && this.props.onActorRemove(id));
    handleActorSearch = event => (this.props.onActorSearch && this.props.onActorSearch(event));
    handleActorSelect = (id, name) => (this.props.onActorSelect && this.props.onActorSelect(id, name));
    handleActorAddInitiate = value => this.props.onInitiateAddActor && this.props.onInitiateAddActor(value);

    handleArtistDialogClose = event => this.props.onArtistDialogClose && this.props.onArtistDialogClose();
    handleArtistAdd = (id, name) => this.props.onArtistAdded && this.props.onArtistAdded(id, name);

    renderDirectorsMarkup = () => {
        let markup = [];

        let color = 'primary';

        for (let director of this.props.directors) {
            markup.push(
                <Chip
                    className={this.props.classes.playerChip}
                    label={director.name}
                    onDelete={this.handleDirectorRemove(director.id)}
                    color={color}
                    key={'player-' + director.id}
                />
            );
        }

        return markup;
    };

    renderActorsMarkup = () => {
        let markup = [];

        let color = 'secondary';

        for (let actor of this.props.actors) {
            markup.push(
                <Chip
                    className={this.props.classes.playerChip}
                    label={actor.name}
                    onDelete={this.handleActorRemove(actor.id)}
                    color={color}
                    key={'player-' + actor.id}
                />
            );
        }

        return markup;
    };

    renderArtistDialog = () => {
        if (this.props.artistDialogOpen) {
            return (
                <Dialog
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        {'Add Artist'}
                        <IconButton
                            aria-label="close"
                            onClick={this.handleArtistDialogClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <AddArtist
                            name={this.props.newArtistText}
                            embedded={true}
                            onArtistAdded={this.handleArtistAdd}
                        />
                    </DialogContent>
                </Dialog>
            );
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit} className={this.props.classes.form} >
                    <div className={this.props.classes.formTitle}>
                        Update Movie
                    </div>
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <TextField
                                        label="Name"
                                        placeholder="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.props.name}
                                        onChange={this.handleNameChange}
                                        error={!this.props.validateName.isValid}
                                        helperText={this.props.validateName.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.languages}
                                        label="Language"
                                        placeholder="Language"
                                        onSelect={this.handleLanguageSelect}
                                        displayValue={this.props.languageName}
                                        error={!this.props.validateLanguage.isValid}
                                        helperText={this.props.validateLanguage.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <DatePicker
                                        label={'Release Date'}
                                        placeholder={'Release Date'}
                                        value={this.props.releaseDate}
                                        variant="outlined"
                                        fullWidth
                                        onChange={this.handleReleaseDateChange}
                                        error={!this.props.validateReleaseDate.isValid}
                                        helperText={this.props.validateReleaseDate.message}
                                    />
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Viewed:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.seenInTheatre}
                                            onChange={this.handleViewedChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <div>
                                        <label>
                                            Obtained:
                                        </label>

                                        <Checkbox
                                            variant="outlined"
                                            fullWidth
                                            checked={this.props.obtained}
                                            onChange={this.handleObtainedChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.directorSuggestions}
                                        onKeyUp={this.handleDirectorSearch}
                                        label="Directors"
                                        placeholder="Directors"
                                        onSelect={this.handleDirectorSelect}
                                        error={!this.props.validateDirectors.isValid}
                                        helperText={this.props.validateDirectors.message}
                                        newAdditionEnabled={true}
                                        onNewAdd={this.handleDirectorAddInitiate}
                                    />
                                </div>
                            </div>

                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        <div className={this.props.classes.row}>
                                            <strong>Directors:</strong>
                                        </div>
                                        <div className={this.props.classes.row}>
                                            {this.renderDirectorsMarkup()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.oneThirdWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <SearchDropDown
                                        items={this.props.actorSuggestions}
                                        onKeyUp={this.handleActorSearch}
                                        label="Actors"
                                        placeholder="Actors"
                                        onSelect={this.handleActorSelect}
                                        error={!this.props.validateActors.isValid}
                                        helperText={this.props.validateActors.message}
                                        newAdditionEnabled={true}
                                        onNewAdd={this.handleActorAddInitiate}
                                    />
                                </div>
                            </div>

                            <div className={this.props.classes.row}>
                                <div className={this.props.classes.playersContainer}>
                                    <div className={this.props.classes.container}>
                                        <div className={this.props.classes.row}>
                                            <strong>Actors:</strong>
                                        </div>
                                        <div className={this.props.classes.row}>
                                            {this.renderActorsMarkup()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={this.props.classes.row}>
                            <div className={` ${this.props.classes.formField} ${this.props.classes.fullWidth}`}>
                                <div className={this.props.classes.formFieldInput}>
                                    <FileUpload
                                        name={'image'}
                                        label={'Upload Image'}
                                        onFileUpload={this.handleFileUpload}
                                        fileName={this.props.imageName}
                                    />
                                </div>
                            </div>
                        </div>

                        {this.props.obtained && <div>
                                <div className={this.props.classes.row}>
                                    <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                        <div className={this.props.classes.formFieldInput}>
                                            <TextField
                                                label="Size"
                                                placeholder="Size"
                                                variant="outlined"
                                                fullWidth
                                                value={this.props.size}
                                                onChange={this.handleSizeChange}
                                                error={!this.props.validateSize.isValid}
                                                helperText={this.props.validateSize.message}
                                            />
                                        </div>
                                    </div>

                                    <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                        <div className={this.props.classes.formFieldInput}>
                                            <SearchDropDown
                                                items={this.props.formats}
                                                label="Format"
                                                placeholder="Format"
                                                onSelect={this.handleFormatSelect}
                                                displayValue={this.props.formatName}
                                                error={!this.props.validateFormat.isValid}
                                                helperText={this.props.validateFormat.message}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={this.props.classes.row}>
                                    <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                        <div className={this.props.classes.formFieldInput}>
                                            <SearchDropDown
                                                items={this.props.qualities}
                                                label="Quality"
                                                placeholder="Quality"
                                                onSelect={this.handleQualitySelect}
                                                displayValue={this.props.qualityName}
                                            />
                                        </div>
                                    </div>

                                    <div className={` ${this.props.classes.formField} ${this.props.classes.halfWidth}`}>
                                        <div className={this.props.classes.formFieldInput}>
                                            <TextField
                                                label="Basename"
                                                placeholder="Basename"
                                                variant="outlined"
                                                fullWidth
                                                value={this.props.basename}
                                                onChange={this.handleBaseNameChange}
                                            />
                                        </div>
                                    </div>

                                    <div className={` ${this.props.classes.formField} ${this.props.classes.quarterWidth}`}>
                                        <div className={this.props.classes.formFieldInput}>
                                            <div>
                                                <label>
                                                    Subtitles:
                                                </label>

                                                <Checkbox
                                                    variant="outlined"
                                                    fullWidth
                                                    checked={this.props.subtitles}
                                                    onChange={this.handleSubtitleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className={`${this.props.classes.row}`}>
                            <Button
                                color="secondary"
                                variant="contained"
                                className={this.props.classes.submit}
                                type="submit"
                                disabled={!this.props.isFormValid}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
                {this.renderArtistDialog()}
            </div>
        );
    }
}

UpdateCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateCore);