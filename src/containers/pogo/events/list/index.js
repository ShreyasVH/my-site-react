import React, { Component } from 'react';

import ListCore from "./core";

import PogoUtils from '../../../../utils/pogo';
import Context from "../../../../utils/context";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            offset: 0,
            count: 48,
            totalCount: 0,
            events: []
        };
    }

    async componentDidMount() {
        let state = {};
        try {
            await this.loadEvents(0);

        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;

        this.setState(state);
    };

    loadEvents = async (offset) => {
        Context.showLoader();

        if (this.state.offset === 0 || this.state.offset < this.state.totalCount) {
            const filterResponse = await PogoUtils.getEventsWithFilter({
                offset,
                count: this.state.count
            });

            let events = filterResponse.data.list;

            // events = events.concat(events);
            // events = events.concat(events);
            // events = events.concat(events);
            // events = events.concat(events);
            // events = events.concat(events);

            this.setState({
                events: this.state.events.concat(events),
                offset: this.state.offset + (this.state.count),
                totalCount: filterResponse.data.totalCount
            });
        }

        Context.hideLoader();
    };

    handleDetailClick = (id) => {
        this.props.history.push('/pogo/events/detail?id=' + id);
    }

    handleEditClick = (id, event) => {
        event.stopPropagation();
        this.props.history.push('/pogo/events/update?id=' + id);
    };

    handleNewClick = () => {
        this.props.history.push('/pogo/events/add');
    }

    handleScroll = async () => {
        await this.loadEvents(this.state.offset + this.state.count);
    }

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <ListCore
                    {...this.state}
                    onEditClick={this.handleEditClick}
                    onNewClick={this.handleNewClick}
                    onDetailClick={this.handleDetailClick}
                    onScroll={this.handleScroll}
                />
            );
        }
    }

    render () {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}
