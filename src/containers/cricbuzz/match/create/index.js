import React, { Component } from 'react';
// import { connect } from 'react-redux';

import CreateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            stadiumSuggestions: [],
            teamSuggestions: [],
            playerSuggestions: [],
            teams: [],
            stadiumId: '',
            stadiumName: '',
            team1Id: '',
            team1Name: '',
            team2Id: '',
            team2Name: '',
            tossWinnerId: '',
            tossWinnerName: '',
            battingFirstId: '',
            battingFirstName: '',
            players: {
                1: [],
                2: []
            },
            scoreCards: [],
            dismissalModes: [
                {
                    id: 1,
                    name: 'Bowled'
                },
                {
                    id: 2,
                    name: 'Caught'
                },
                {
                    id: 3,
                    name: 'LBW'
                },
                {
                    id: 4,
                    name: 'Run Out'
                },
                {
                    id: 5,
                    name: 'Stumped'
                },
                {
                    id: 6,
                    name: 'Hit Twice'
                },
                {
                    id: 7,
                    name: 'Hit Wicket'
                },
                {
                    id: 8,
                    name: 'Obstructing the Field'
                },
                {
                    id: 9,
                    name: 'Timed Out'
                },
                {
                    id: 10,
                    name: 'Retired Hurt'
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
                    id: 3,
                    name: 'SUPER_OVER'
                },
                {
                    id: 4,
                    name: 'WASHED_OUT'
                },
                {
                    id: 5,
                    name: 'BOWL_OUT'
                },
                {
                    id: 6,
                    name: 'FORFEIT'
                }
            ],
            winnerId: '',
            winnerName: '',
            winMargin: '',
            winMarginTypeId: '',
            winMarginTypeName: '',
            startTime: '',
            winMarginTypes: [
                {
                    id: 0,
                    name: 'RUN'
                },
                {
                    id: 1,
                    name: 'WICKET'
                }
            ],
            manOfTheMatchIds: [],
            manOfTheMatchNames: [],
            bench: {}
        }
    }

    async componentDidMount() {
        Context.showLoader();

        const state = {};
        const stadiumsResponse = await CricBuzzUtils.getAllStadiums();
        state.stadiums = stadiumsResponse.data.map(stadium => ({
            id: stadium.id,
            name: stadium.name
        }));

        const teamsResponse = await CricBuzzUtils.getAllTeams();
        state.allTeams = teamsResponse.data.map(team => ({
            id: team.id,
            name: team.name
        }));

        state.allPlayers = (await CricBuzzUtils.getAllPlayers()).map(player => {
            if (player.name === 'sub') {
                state.bench = {
                    id: player.id,
                    name: player.name
                }
            }

            return {
                id: player.id,
                name: player.name
            }
        });

        state.isLoaded = true;
        this.setState(state);

        Context.hideLoader();
    }

    handlePlayerSearchAll = event => {
        let keyword = event.target.value;
        let playerSuggestions = [];
        if (keyword.length > 2) {
            playerSuggestions = this.state.allPlayers.filter(player => (player.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            playerSuggestions
        });
    };

    handleStadiumSearch = event => {
        let keyword = event.target.value;
        let stadiumSuggestions = [];
        if (keyword.length > 2) {
            stadiumSuggestions = this.state.stadiums.filter(stadium => (stadium.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            stadiumSuggestions
        })
    };

    handleTeamSearch = event => {
        let keyword = event.target.value;
        let teamSuggestions = [];
        if (keyword.length > 2) {
            teamSuggestions = this.state.allTeams.filter(team => (team.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));
        }

        this.setState({
            teamSuggestions
        })
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
        if (updatedState.bench.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            filteredPlayers.push(updatedState.bench);
        }

        updatedState.playerSuggestions = filteredPlayers;

        this.setState(updatedState);
    };

    handleStadiumSelect = (id, name) => {
        this.setState({
            stadiumId: id,
            stadiumName: name,
            stadiumSuggestions: []
        })
    };

    handleTeamSelect = (id, name, number) => {
        let newState = {
            ['team' + number + 'Id']: id,
            ['team' + number + 'Name']: name
        };

        let updatedState = Utils.copyObject(this.state);
        updatedState = Object.assign(updatedState, newState);

        updatedState.players[number] = [];

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
            updatedState.teamSuggestions = [];

            this.setState(updatedState);
        }
    };

    handleTeamSelectForInnings = (id, name, number) => {
        let updatedState = Utils.copyObject(this.state);

        if (number < this.state.scoreCards.length) {
            let inning = this.state.scoreCards[number];
            inning.battingTeamId = id;
            inning.battingTeamName = name;
            updatedState.scoreCards[number] = inning;
        }


        this.setState(updatedState);
    };

    handleTossWinnerSelect = (id, name) => {
        this.setState({
            tossWinnerId: id,
            tossWinnerName: name
        })
    };

    handleBattingFirstSelect = (id, name) => {
        this.setState({
            battingFirstId: id,
            battingFirstName: name
        })
    };

    handleWinnerSelect = (id, name) => {
        this.setState({
            winnerId: id,
            winnerName: name
        });
    };

    handleResultSelect = (id, name) => {
        this.setState({
            resultId: id,
            resultName: name
        })
    };

    handleWinMarginChange = event => {
        this.setState({
            winMargin: parseInt(event.target.value, 10)
        });
    };

    handleWinMarginTypeSelect = (id, name) => {
        this.setState({
            winMarginTypeId: id,
            winMarginTypeName: name
        })
    };

    handlePlayerSelect = (id, name, number) => {
        let playerPresent = false;

        for (let index in this.state.players[number]) {
            let player = this.state.players[number][index];

            if (id === player.id) {
                playerPresent = true;
                break;
            }
        }

        if (!playerPresent) {
            let updatedState = Utils.copyObject(this.state);

            updatedState.players[number].push ({
                id,
                name
            });
            updatedState.playerSuggestions = [];

            this.setState(updatedState);
        }
    };

    handlePlayerRemove = (teamNumber, playerId) => {
        let updatedState = Utils.copyObject(this.state);
        let index = -1;

        for (let i in updatedState.players[teamNumber]) {
            let player = updatedState.players[teamNumber][i];
            if (playerId === player.id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            updatedState.players[teamNumber].splice(index, 1);
        }

        this.setState(updatedState);
    };

    handleManOfTheMatchRemove = (playerId) => {
        let updatedState = Utils.copyObject(this.state);

        let index = this.state.manOfTheMatchIds.indexOf(playerId);
        if (-1 !== index) {
            updatedState.manOfTheMatchIds.splice(index, 1);
            updatedState.manOfTheMatchNames.splice(index, 1);

            this.setState(updatedState);
        }
    };

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    };

    getDefaultBattingScoreRow = () => ({
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
    });

    getDefaultBowlingFigureRow = () => ({
        bowlerId: '',
        bowlerName: '',
        balls: '',
        maidens: '',
        runs: '',
        wickets: ''
    });

    handleInningAdd = () => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.scoreCards.push({
            battingTeamId: '',
            battingTeamName: '',
            battingScores: [
                this.getDefaultBattingScoreRow()
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
                this.getDefaultBowlingFigureRow()
            ]
        });

        this.setState(updatedState);
    };

    handlePlayerSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];
        scoreObject.batsmanId = id;
        scoreObject.batsmanName = name;
        // inningObject[scoreNum] = scoreObject;
        this.setState(updatedState);
    };

    handleBowlerSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];
        scoreObject.bowlerId = id;
        scoreObject.bowlerName = name;
        // inningObject[scoreNum] = scoreObject;
        this.setState(updatedState);
    };

    handleFielderSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];

        let fielderIds = [];
        let fielderNames = [];
        if (scoreObject.fielderIds) {
            fielderIds = scoreObject.fielderIds.split(', ');
            fielderNames = scoreObject.fielderNames.split(', ');
        }

        if (-1 === fielderIds.indexOf(JSON.stringify(id))) {
            fielderIds.push(id);
            fielderNames.push(name);

            scoreObject.fielderIds = fielderIds.join(', ');
            scoreObject.fielderNames = fielderNames.join(', ');
            updatedState.playerSuggestions = [];
            this.setState(updatedState);
        }
    };

    handleDismissalSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];
        scoreObject.dismissalModeId = id;
        scoreObject.dismissalModeName = name;
        this.setState(updatedState);
    };

    handleBattingScoreFieldKeyUp = (scoreNum, inning, fieldName, event) => {
        let value = parseInt(event.target.value, 10);
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];
        scoreObject[fieldName] = value;

        if (scoreNum === (inningObject.battingScores.length - 1)) {
            inningObject.battingScores.push(this.getDefaultBattingScoreRow());
        }

        this.setState(updatedState);
    };

    handleBowlingFigureFieldKeyUp = (index, inning, fieldName, event) => {
        let value = parseInt(event.target.value, 10);
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let bowlingFigure = inningObject.bowlingFigures[index];
        bowlingFigure[fieldName] = value;

        if (index === (inningObject.bowlingFigures.length - 1)) {
            inningObject.bowlingFigures.push(this.getDefaultBowlingFigureRow());
        }

        this.setState(updatedState);
    };

    handleExtrasKeyUp = (index, inning, type, event) => {
        let value = parseInt(event.target.value, 10);
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let extrasObject = inningObject.extras[index];
        extrasObject.runs = value;
        extrasObject.type = type;
        this.setState(updatedState);
    };

    handleBowlerSelectForBowlingFigure = (index, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let bowlingFigure = inningObject.bowlingFigures[index];
        bowlingFigure.bowlerId = id;
        bowlingFigure.bowlerName = name;
        this.setState(updatedState);
    };

    handleSelectManOfTheMatch = (id, name) => {
        let updatedState = Utils.copyObject(this.state);

        if (-1 === updatedState.manOfTheMatchIds.indexOf(id)) {
            updatedState.manOfTheMatchIds.push(id);
            updatedState.manOfTheMatchNames.push(name);
        }

        this.setState(updatedState);
    };

    handleSelectManOfTheSeries = (id, name) => {

    };

    handleFielderRemove = (scoreNum, inning, playerId) => {
        let updatedState = Utils.copyObject(this.state);

        let scoresForInning = updatedState.scoreCards[inning].battingScores;

        for (let i in scoresForInning) {
            let index = parseInt(i, 10);
            let score = scoresForInning[index];
            if (scoreNum === index) {
                let fielderIds = score.fielderIds.split(', ');
                let fielderNames = score.fielderNames.split(', ');
                let pos = fielderIds.indexOf(playerId);
                if (pos !== -1) {
                    fielderIds.splice(pos, 1);
                    fielderNames.splice(pos, 1);
                    updatedState.scoreCards[inning].battingScores[scoreNum].fielderIds = fielderIds.join(', ');
                    updatedState.scoreCards[inning].battingScores[scoreNum].fielderNames = fielderNames.join(', ');
                    break;
                }
            }
        }
        this.setState(updatedState);
    };

    handleSubmit = event => {
        event.preventDefault();
        let players = [];

        for (let teamNumber in this.state.players) {
            let teamId = this.state['team' + teamNumber + 'Id'];
            let teamPlayers = this.state.players[teamNumber];
            for (let index in teamPlayers) {
                let player = teamPlayers[index];
                players.push({
                    playerId: player.id,
                    teamId
                });
            }
        }

        let battingScores = [];
        let team1InningsCount = 1;
        let team2InningsCount = 1;
        let extras = [];
        let bowlingFigures = [];

        for (let index in this.state.scoreCards) {
            index = parseInt(index, 10);
            let inning = this.state.scoreCards[index];
            let inningsNum = (index + 1);

            let team1Id = this.state.team1Id;
            let team2Id = this.state.team2Id;
            let battingTeam = inning.battingTeamId;
            let bowlingTeam = ((team1Id === inning.battingTeamId) ? team2Id : team1Id);

            let teamInnings = ((team1Id === inning.battingTeamId) ? team1InningsCount : team2InningsCount);

            let scoreObjects = inning.battingScores;
            for (let scoreIndex in scoreObjects) {
                let scoreObject = scoreObjects[scoreIndex];

                let runs = parseInt(scoreObject.runs, 10);

                if (!isNaN(runs)) {
                    let score = {
                        playerId: scoreObject.batsmanId,
                        runs: scoreObject.runs,
                        balls: scoreObject.balls,
                        fours: scoreObject.fours,
                        sixes: scoreObject.sixes,
                        dismissalMode: scoreObject.dismissalModeId,
                        innings: inningsNum,
                        teamInnings
                    };
                    if (scoreObject.bowlerId) {
                        score.bowler = scoreObject.bowlerId;
                    }

                    if (scoreObject.fielderIds) {
                        score.fielders = scoreObject.fielderIds;
                    }
                    battingScores.push(score);
                }
            }

            let extrasObjects = inning.extras;
            for (let extrasIndex in extrasObjects) {
                let extrasObject = extrasObjects[extrasIndex];
                let runs = parseInt(extrasObject.runs, 10);
                if (!isNaN(runs) && (runs > 0)) {
                    extras.push({
                        runs,
                        type: extrasObject.type,
                        innings: inningsNum,
                        teamInnings,
                        battingTeam,
                        bowlingTeam
                    });
                }
            }

            let bowlingFigureObjects = inning.bowlingFigures;
            for (let figureIndex in bowlingFigureObjects) {
                let bowlingFigure = bowlingFigureObjects[figureIndex];

                let runs = parseInt(bowlingFigure.runs, 10);

                if (!isNaN(runs)) {
                    bowlingFigures.push({
                        playerId: bowlingFigure.bowlerId,
                        balls: bowlingFigure.balls,
                        maidens: bowlingFigure.maidens,
                        runs: bowlingFigure.runs,
                        wickets: bowlingFigure.wickets,
                        innings: inningsNum,
                        teamInnings
                    });
                }
            }

            if (team1Id === inning.battingTeamId) {
                team1InningsCount++;
            } else {
                team2InningsCount++;
            }
        }

        let payload = {
            seriesId: Utils.getUrlParam('seriesId'),
            team1: this.state.team1Id,
            team2: this.state.team2Id,
            tossWinner: this.state.tossWinnerId,
            batFirst: this.state.battingFirstId,
            result: this.state.resultName,
            winner: this.state.winnerId,
            winMargin: this.state.winMargin,
            stadium: this.state.stadiumId,
            startTime: this.state.startTime,
            endTime: this.state.startTime,
            players
        };

        if (this.state.winMarginType) {
            payload.winMarginType = this.state.winMarginTypeName;
        }

        if (battingScores.length > 0) {
            payload.battingScores = battingScores;
        }

        if (extras.length > 0) {
            payload.extras = extras;
        }

        if (bowlingFigures.length > 0) {
            payload.bowlingFigures = bowlingFigures;
        }

        if (this.state.manOfTheMatchIds.length > 0) {
            payload.manOfTheMatchList = this.state.manOfTheMatchIds;
        }

        Context.showLoader();
        const createMatchPromise = CricBuzzUtils.createMatch(payload);
        createMatchPromise.then(apiResponse => {
            Context.showNotify('Created successfully', 'success');
            Context.hideLoader();
        }).catch(apiResponse => {
            console.log(apiResponse.data);
            Context.showNotify('Failed to create match', 'error');
            Context.hideLoader();
        });
    };

    render () {
        return (
            <CreateCore
                {...this.state}
                onStadiumSearch={this.handleStadiumSearch}
                onStadiumSelect={this.handleStadiumSelect}
                onTeamSearch={this.handleTeamSearch}
                onTeamSelect={this.handleTeamSelect}
                onTossWinnerSelect={this.handleTossWinnerSelect}
                onBattingFirstSelect={this.handleBattingFirstSelect}
                onWinnerSelect={this.handleWinnerSelect}
                onPlayerSelect={this.handlePlayerSelect}
                onPlayerSelectForBattingScore={this.handlePlayerSelectForBattingScore}
                onBowlerSelectForBattingScore={this.handleBowlerSelectForBattingScore}
                onFielderSelectForBattingScore={this.handleFielderSelectForBattingScore}
                onFilderRemoveForBattingScore={this.handleFielderRemove}
                onDismissalModeSelect={this.handleDismissalSelectForBattingScore}
                onBattingScoreFieldKeyUp={this.handleBattingScoreFieldKeyUp}
                onBowlerSelectForBowlingFigure={this.handleBowlerSelectForBowlingFigure}
                onBowlingFigureFieldKeyUp={this.handleBowlingFigureFieldKeyUp}
                onExtrasKeyUp={this.handleExtrasKeyUp}
                onPlayerSearch={this.handlePlayerSearch}
                onInningsAdd={this.handleInningAdd}
                onResultSelect={this.handleResultSelect}
                onWinMarginChange={this.handleWinMarginChange}
                onWinMarginTypeSelect={this.handleWinMarginTypeSelect}
                onPlayerSearchAll={this.handlePlayerSearchAll}
                onPlayerRemove={this.handlePlayerRemove}
                onManOfTheMatchRemove={this.handleManOfTheMatchRemove}
                onSubmit={this.handleSubmit}
                onTeamSelectForInnings={this.handleTeamSelectForInnings}
                onSelectManOfTheMatch={this.handleSelectManOfTheMatch}
                onSelectManOfTheSeries={this.handleSelectManOfTheSeries}
                onStartTimeChange={this.handleStartTimeChange}
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