import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

import Filters from "../../../filters";

const styles = theme => ({
    table: {
        overflow: 'scroll'
    },
    cell: {
        width: 'auto',
        maxWidth: '10px'
    },
    headCell: {
        color: 'black',
        fontWeight: 'bold'
    },
    sortable: {
        cursor: 'pointer'
    },
    details: {
        textAlign: 'center'
    },
    row: {
        width: '100%'
    },
    halfWidth: {
        width: '50%',
        display: 'inline-block'
    },
    dismissalStats: {
        marginBottom: '5%',
        textAlign: 'center'
    },
    paginationBox: {
        textAlign: 'center',
        marginTop: '2%',
        '&.active': {
            backgroundColor: 'blue'
        }
    },
    paginationButton: {
        display: 'inline-block',
        padding: '1% 1.5%',
        cursor: 'pointer',
        fontWeight: 'large',
        marginLeft: '0.25%',
        marginRight: '0.25%',
        borderRadius: 0,
        '&:hover': {
            [theme.breakpoints.up('lg')]: {
                backgroundColor: '#303F9F',
                color: '#FFFFFF',
                border: '1px solid #303F9F',
                borderRadius: '10%'
            }
        }
    },
    'active': {
        backgroundColor: '#303F9F',
        color: '#FFFFFF',
        border: '1px solid #303F9F',
        borderRadius: '10%'
    }
});

class StatsCore extends Component {
    handleSort = key => event => this.props.onSort && this.props.onSort(event, key);

    handlePageClick = page => event => this.props.onPageClick && this.props.onPageClick(page);

    renderSortSymbol = key => ((this.props.sortMap.hasOwnProperty(key)) ? ((this.props.sortMap[key] === 'asc') ? '\u0020\u2191' : '\u0020\u2193') : '');

    renderBattingStats = () => {
        if ((this.props.selectedFilters.type === 'batting') && this.props.stats && this.props.stats.length > 0) {
            return (
                <div>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Player ID
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Name
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('innings')}>
                                    Innings
                                    {this.renderSortSymbol('innings')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('runs')}>
                                    Runs
                                    {this.renderSortSymbol('runs')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('balls')}>
                                    Balls
                                    {this.renderSortSymbol('balls')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('notOuts')}>
                                    Notouts
                                    {this.renderSortSymbol('notOuts')}
                                </TableCell>
                                {/*<TableCell align="center" padding="none" className={this.props.classes.headCell}>*/}
                                {/*    Average*/}
                                {/*</TableCell>*/}
                                {/*<TableCell align="center" padding="none" className={this.props.classes.headCell}>*/}
                                {/*    Strike Rate*/}
                                {/*</TableCell>*/}
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('highest')}>
                                    Highest
                                    {this.renderSortSymbol('highest')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('fours')}>
                                    4s
                                    {this.renderSortSymbol('fours')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('sixes')}>
                                    6s
                                    {this.renderSortSymbol('sixes')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('fifties')}>
                                    50s
                                    {this.renderSortSymbol('fifties')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('hundreds')}>
                                    100s
                                    {this.renderSortSymbol('hundreds')}
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.stats.map(stat => (
                                <TableRow key={'battingStat' + stat.id}>
                                    <TableCell align="center" padding="none">
                                        {stat.id}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.name}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.innings}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.runs}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.balls}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.notOuts}
                                    </TableCell>
                                    {/*<TableCell align="center" padding="none">*/}
                                    {/*    {parseFloat(this.props.player.battingStats[gameType].average).toFixed(2)}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center" padding="none">*/}
                                    {/*    {parseFloat(this.props.player.battingStats[gameType].strikeRate).toFixed(2)}*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="center" padding="none">
                                        {stat.highest}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.fours}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.sixes}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.fifties}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.hundreds}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderBowlingStats = () => {
        if ((this.props.selectedFilters.type === 'bowling') && this.props.stats && (Object.keys(this.props.stats).length > 0)) {
            return (
                <div>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Player ID
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Name
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('innings')}>
                                    Innings
                                    {this.renderSortSymbol('innings')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('wickets')}>
                                    Wickets
                                    {this.renderSortSymbol('wickets')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('runs')}>
                                    Runs
                                    {this.renderSortSymbol('runs')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('balls')}>
                                    Balls
                                    {this.renderSortSymbol('balls')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('maidens')}>
                                    Maidens
                                    {this.renderSortSymbol('maidens')}
                                </TableCell>
                                {/*<TableCell align="center" padding="none" className={this.props.classes.headCell}>*/}
                                {/*    Economy*/}
                                {/*</TableCell>*/}
                                {/*<TableCell align="center" padding="none" className={this.props.classes.headCell}>*/}
                                {/*    Average*/}
                                {/*</TableCell>*/}
                                {/*<TableCell align="center" padding="none" className={this.props.classes.headCell}>*/}
                                {/*    Strike Rate*/}
                                {/*</TableCell>*/}
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('fifers')}>
                                    Fifers
                                    {this.renderSortSymbol('fifers')}
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell + ' ' + this.props.classes.sortable} onClick={this.handleSort('tenWickets')}>
                                    Ten Wickets
                                    {this.renderSortSymbol('tenWickets')}
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.stats.map(stat => (
                                <TableRow key={'bowlingStat' + stat.id}>
                                    <TableCell align="center" padding="none">
                                        {stat.id}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.name}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.innings}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.wickets}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.runs}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.balls}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.maidens}
                                    </TableCell>
                                    {/*<TableCell align="center" padding="none">*/}
                                    {/*    {parseFloat(this.props.player.bowlingStats[gameType].economy).toFixed(2)}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center" padding="none">*/}
                                    {/*    {((this.props.player.bowlingStats[gameType].wickets > 0) ? parseFloat(this.props.player.bowlingStats[gameType].average).toFixed(2) : 0.0)}*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell align="center" padding="none">*/}
                                    {/*    {((this.props.player.bowlingStats[gameType].wickets > 0) ? parseFloat(this.props.player.bowlingStats[gameType].strikeRate).toFixed(2) : 0.0)}*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="center" padding="none">
                                        {stat.fifers}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {stat.tenWickets}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderFieldingStats = () => {
        if (this.props.player.fieldingStats && (Object.keys(this.props.player.fieldingStats).length > 0)) {
            return (
                <div>
                    <strong>
                        Fielding Stats:
                    </strong>
                    <Table className={this.props.classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    GameType
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Catches
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Runouts
                                </TableCell>
                                <TableCell align="center" padding="none" className={this.props.classes.headCell}>
                                    Stumpings
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Object.keys(this.props.player.fieldingStats).map(gameType => (
                                <TableRow key={'battingStat' + gameType}>
                                    <TableCell align="center" padding="none">
                                        {gameType}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].catches}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].runOuts}
                                    </TableCell>
                                    <TableCell align="center" padding="none">
                                        {this.props.player.fieldingStats[gameType].stumpings}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            );
        }
    }

    renderFilter = () => {
        return (
            <Filters
                isOpen={this.props.isFilterOpen}
                selected={this.props.selectedFiltersTemp}
                options={this.props.filterOptions}
                onFilterOpen={this.props.onFilterOpen}
                onFilterClose={this.props.onFilterClose}
                handleEvent={this.props.onEvent}
                applyFilters={this.props.onFilterApply}
                clearFilters={this.props.FilterClearAll}
                clearFilter={this.props.onFilterClear}
            />
        );
    };

    renderPagination = () => {
        const currentPage = this.props.page;
        const totalPages = (((this.props.totalCount - (this.props.totalCount % this.props.limit)) / this.props.limit) + (((this.props.totalCount % this.props.limit) === 0) ? 0 : 1));
        console.log('total pages', totalPages);
        const markup = [];

        if (currentPage > 2) {
            markup.push(
                <div className={this.props.classes.paginationButton} onClick={this.handlePageClick(1)} key={'pageFirst'}>
                    {'<<'}
                </div>
            );
        }

        if (currentPage > 1) {
            markup.push(
                <div className={this.props.classes.paginationButton} onClick={this.handlePageClick(currentPage - 1)} key={'pagePrevious'}>
                    {'<'}
                </div>
            );
        }

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            let className = this.props.classes.paginationButton + ((i === currentPage) ? ' ' + this.props.classes.active : '');

            markup.push(
                <div className={className} onClick={this.handlePageClick(i)} key={'page' + i}>
                    {i}
                </div>
            );
        }

        if (currentPage < (totalPages - 1)) {
            markup.push(
                <div className={this.props.classes.paginationButton} onClick={this.handlePageClick(currentPage + 1)} key={'pageNext'}>
                    {'>'}
                </div>
            );
        }

        if (currentPage < (totalPages - 2)) {
            markup.push(
                <div className={this.props.classes.paginationButton} onClick={this.handlePageClick(totalPages)} key={'pageLast'}>
                    {'>>'}
                </div>
            );
        }

        return (
            <div className={this.props.classes.paginationBox}>
                {markup}
            </div>
        );
    }

    renderMarkup = () => {
        if (this.props.isLoaded) {
            return (
                <div className={this.props.classes.root}>
                    {this.renderFilter()}
                    {this.renderBattingStats()}
                    {this.renderBowlingStats()}
                    {this.renderPagination()}
                </div>
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderMarkup()}
            </div>
        );
    }
}

StatsCore.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StatsCore);