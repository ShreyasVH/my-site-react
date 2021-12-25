import React, { Component } from 'react';

import DetailCore from "./core";

import PogoUtils from '../../../../utils/pogo';
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        this.id = Utils.getUrlParam('id');
    }

    async componentDidMount() {
        Context.showLoader();
        let state = {};
        try {

            const eventResponse = await PogoUtils.getEventId(this.id);

            let event = eventResponse.data;
            let forms = event.forms.map(form => ({
                id: form.id,
                name: form.name,
                number: form.pokemonNumber,
                imageUrl: form.imageUrl
            }));

            forms.sort((a, b) => (a.number - b.number));

            state = {
                name: event.name,
                startTime: event.startTime,
                endTime: event.endTime,
                forms
            };

            const allPokemonsResponse = await PogoUtils.getAllPokemons();
            state.allPokemons = allPokemonsResponse.data.map(mon => ({
                id: mon.number,
                name: mon.name
            }));

            state.pokemonMap = allPokemonsResponse.data.reduce((object, value) => {
                object[value.number] = value;
                return object;
            }, {});

        } catch (error) {
            console.log(error);
            Context.showNotify('Error while loading data.', 'error');
        }

        state.isLoaded = true;

        this.setState(state);

        Context.hideLoader();
    }

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <DetailCore
                    {...this.state}
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
