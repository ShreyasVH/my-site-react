import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    dropdown: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        display: 'inline-block'
    },
    inline: {
        display: 'inline',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        marginBottom: 0,
        marginTop: 0
    },
    dropdownList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1000,
        display: 'block',
        float: 'left',
        padding: '0 0',
        fontSize: theme.typography.pxToRem(14),
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: '#fff',
        webkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box',
        border: '1px solid rgba(0,0,0,.15)',
        webkitBoxShadow: '0 6px 12px rgba(0,0,0,.175)',
        boxShadow: '0 6px 12px rgba(0,0,0,.175)',
        width: '100%',
        minWidth: 'initial',
        maxHeight: theme.typography.pxToRem(245),
        overflowY: 'auto',
        marginTop: '0',
        borderRadius: '0 0 5px 5px'
    },
    image: {
        width: 50,
        height: 75,
        borderRadius: 'initial !important'
    }
});

class SearchDropdownCore extends Component {
    handleKeyUp = event => this.props.onKeyUp && this.props.onKeyUp(event);

    handleDisplayFieldClick = event => this.props.onDisplayFieldClick && this.props.onDisplayFieldClick();

    handleTextFieldBlur = event => this.props.onTextFieldBlur && this.props.onTextFieldBlur();

    handleSelect = (selectedId, selectedName) => event => this.props.onSelect && this.props.onSelect(selectedId, selectedName);

    renderInput = () => {
        if (this.props.isFocussed) {
            return (
                <TextField
                    label={this.props.label}
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    onKeyUp={this.handleKeyUp}
                    autoComplete="off"
                    placeholder={this.props.placeHolder}
                    onBlur={this.handleTextFieldBlur}
                    inputRef={inputField => this.inputField = inputField}
                />
            );
        } else {
            return (
                <TextField
                    label={this.props.label}
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    placeholder={this.props.placeHolder}
                    onClick={this.handleDisplayFieldClick}
                    value={this.props.displayValue}
                    inputRef={displayField => this.displayField = displayField}
                />
            );
        }

    };

    renderAvatar = entity => {
        if (entity.imageUrl) {
            return (
                <ListItemAvatar>
                    <Avatar
                        className={this.props.classes.image}
                        alt={entity.name}
                        src={entity.imageUrl}
                    />
                </ListItemAvatar>
            );
        }
    };

    renderDropdown = () => {
        if ((this.props.isFocussed) && this.props.items && (this.props.items.length > 0)) {
            let listMarkup = [];

            for (let index in this.props.items) {
                if (this.props.items.hasOwnProperty(index)) {
                    let entity = this.props.items[index];
                    listMarkup.push(
                        <ListItem
                            alignItems="center"
                            onClick={this.handleSelect(entity.id, entity.name)}
                        >
                            {this.renderAvatar(entity)}
                            <ListItemText
                                primary={entity.name}
                            />
                        </ListItem>
                    );
                }
            }

            return (
                <List className={this.props.classes.dropdownList}>
                    {listMarkup}
                </List>
            );
        }
    };

    render() {
        return (
            <div className={this.props.classes.dropdown}>
                {this.renderInput()}
                {this.renderDropdown()}
            </div>
        );
    }
}

SearchDropdownCore.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchDropdownCore);
