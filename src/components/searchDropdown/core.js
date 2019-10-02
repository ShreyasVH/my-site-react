import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    dropdown: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative'
    },
    inline: {
        display: 'inline',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 0
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
        width: '99%',
        minWidth: 'initial',
        maxHeight: theme.typography.pxToRem(245),
        overflowY: 'auto',
        margin: '0 9px',
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

    renderInput = () => {
        return (
            <TextField
                id="outlined-name"
                label="Card"
                className={this.props.classes.textField}
                value={this.props.value}
                margin="normal"
                variant="outlined"
                fullWidth
                onKeyUp={this.handleKeyUp}
                autoComplete={false}
            />
        );
    };

    renderDropdown = () => {
        if (this.props.items.length > 0) {
            let listMarkup = [];

            for (let index in this.props.items) {
                if (this.props.items.hasOwnProperty(index)) {
                    let card = this.props.items[index];
                    listMarkup.push(
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar
                                    className={this.props.classes.image}
                                    alt={card.name}
                                    src={card.imageUrl}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={card.name}
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
