import React, { Component } from 'react';
// import { connect } from 'react-redux';

import CreateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seriesSuggestions: [
                {
                    id: 1,
                    name: 'India Tour of New Zealand 2020 - ODI'
                },
                {
                    id: 2,
                    name: 'Australia Tour of South Africa 2020 - ODI'
                }
            ],
            stadiumsSuggestions: [
                {
                    id: 1,
                    name: 'Bay Oval, New Zealand'
                },
                {
                    id: 2,
                    name: 'Eden Park, New Zealand'
                }
            ],
            teamsSuggestions: [
                {
                    id: 1,
                    name: 'India'
                },
                {
                    id: 2,
                    name: 'New Zealand'
                }
            ],
            teams: [],
            playersSuggestions: [
                // {
                //     id: 5,
                //     name: 'Virat Kohli'
                // },
                // {
                //     id: 2,
                //     name: 'Tim Southee'
                // }
            ],
            seriesId: '',
            seriesName: '',
            stadiumId: '',
            stadiumName: '',
            team1Id: '',
            team1Name: '',
            team2Id: '',
            team2Name: '',
            tossWinnerId: '',
            tossWinnerName: '',
            players: {},
            scoreCards: [],
            dismissalModes: [
                {
                    id: 0,
                    name: 'Bowled'
                },
                {
                    id: 1,
                    name: 'Caught'
                }
            ],
            resultSuggestions: [
                {
                    id: 0,
                    name: 'NORMAL'
                },
                {
                    id: 1,
                    name: 'TIE'
                },
                {
                    id: 2,
                    name: 'DRAW'
                },
                {
                    id: 0,
                    name: 'SUPER_OVER'
                },
                {
                    id: 0,
                    name: 'WASHED_OUT'
                }
            ],
            winnerId: '',
            winnerName: '',
            winMargin: '',
            winMarginTypeId: '',
            winMarginName: '',
            winMarginTypes: [
                {
                    id: 0,
                    name: 'RUN'
                },
                {
                    id: 1,
                    name: 'WICKET'
                }
            ]
        }
    }

    handleSearch = (type, event) => {
        let keyword = event.target.value;
        let promise = CricBuzzUtils.search(type, keyword);
        promise.then(apiResponse => {
            let response = apiResponse.data;

            this.setState({
                [type + 'Suggestions']: response
            });
        });
    };

    handlePlayerSearch = event => {
        let keyword = event.target.value;

        let updatedState = Utils.copyObject(this.state);

        let filteredPlayers = [];

        for (let teamNumber in updatedState.players) {
            let playerObjects = updatedState.players[teamNumber];

            for (let playerId in playerObjects) {
                let playerObject = playerObjects[playerId];
                if (playerObject.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                    filteredPlayers.push(playerObject);
                }
            }
        }

        updatedState.playersSuggestions = filteredPlayers;

        this.setState(updatedState);
    };

    handleSeriesSelect = (id, name) => {
        this.setState({
            seriesId: id,
            seriesName: name
        })
    };

    handleStadiumSelect = (id, name) => {
        this.setState({
            stadiumId: id,
            stadiumName: name
        })
    };

    handleTeamSelect = (id, name, number) => {
        let newState = {
            ['team' + number + 'Id']: id,
            ['team' + number + 'Name']: name
        };

        let updatedState = Utils.copyObject(this.state);
        updatedState = Object.assign(updatedState, newState);

        updatedState.players[number] = {};

        if (updatedState.team1Id !== updatedState.team2Id) {
            let teams = [];
            if(updatedState.team1Id) {
                teams.push({
                    id: updatedState.team1Id,
                    name: updatedState.team1Name
                });
            }

            if(updatedState.team2Id) {
                teams.push({
                    id: updatedState.team2Id,
                    name: updatedState.team2Name
                });
            }
            updatedState.teams = teams;

            this.setState(updatedState);
        }
    };

    handleTossWinnerSelect = (id, name) => {
        this.setState({
            tossWinnerId: id,
            tossWinnerName: name
        })
    };

    handlePlayerSelect = (id, name, number) => {
        if (!this.state.players[number].hasOwnProperty(id)) {
            let updatedState = Utils.copyObject(this.state);

            updatedState.players[number][id] = {
                id,
                name
            };
            updatedState.playersSuggestions = [];

            this.setState(updatedState);
        }
    };

    handleInningAdd = () => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.scoreCards.push({
            battingTeamId: '',
            battingTeamName: '',
            battingScores: [
                {
                    batsmanId: '',
                    batsmanName: '',
                    runs: '',
                    balls: '',
                    fours: '',
                    sixes: '',
                    dismissalModeId: '',
                    dismissalModeName: '',
                    bowlerId: '',
                    bowlerName: '',
                    fielderIds: '',
                    fielderNames: ''
                }
            ],
            extras: [
                {
                    type: 'BYE',
                    runs: 0
                },
                {
                    type: 'LEG_BYE',
                    runs: 0
                },
                {
                    type: 'WIDE',
                    runs: 0
                },
                {
                    type: 'NO_BALL',
                    runs: 0
                },
                {
                    type: 'PENALTY',
                    runs: 0
                }
            ],
            bowlingFigures: [
                {
                    bowlerId: '',
                    bowlerName: '',
                    balls: '',
                    maidens: '',
                    runs: '',
                    wickets: ''
                }
            ]
        });

        this.setState(updatedState);
    };

    handlePlayerSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning - 1];
        let scoreObject;
        if (inningObject.hasOwnProperty(scoreNum)) {
            scoreObject = inningObject.battingScores[scoreNum];
        }
        scoreObject.id = id;
        scoreObject.name = name;
        // inningObject

    };

    render () {
        return (
            <CreateCore
                {...this.state}
                onSearch={this.handleSearch}
                onSeriesSelect={this.handleSeriesSelect}
                onStadiumSelect={this.handleStadiumSelect}
                onTeamSelect={this.handleTeamSelect}
                onTossWinnerSelect={this.handleTossWinnerSelect}
                onPlayerSelect={this.handlePlayerSelect}
                onPlayerSelectForBattingScore={this.handlePlayerSelectForBattingScore}
                onPlayerSearch={this.handlePlayerSearch}
                onInningsAdd={this.handleInningAdd}
            />
        );
    }
}

// function mapStateToProps(store) {
//     return ({
//         cric: store.cric
//     });
// }
//
// export default connect(mapStateToProps)(Create);

export default Create;