import React, {Component} from 'react';
import {connect} from 'react-redux';

import UpdateCore from "./core";

import CricBuzzUtils from "../../../../utils/cricbuzz";
import Utils from '../../../../utils';
import Context from "../../../../utils/context";

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    async componentDidMount() {
        Context.showLoader();

        const id = Utils.getUrlParam('id');
        const matchDetailsResponse = await CricBuzzUtils.getMatchDetails(id);
        const match = matchDetailsResponse.data;

        let state = {
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
            manOfTheMatchNames: []
        };

        let dismissalModeMap = {};
        state.dismissalModes.forEach(dismissalMode => {
            dismissalModeMap[dismissalMode.id] = dismissalMode.name;
        });

        const stadiumsResponse = await CricBuzzUtils.getAllStadiums();
        state.stadiums = stadiumsResponse.data.map(stadium => ({
            id: stadium.id,
            name: stadium.name
        }));
        let stadiumMap = {};
        state.stadiums.forEach(stadium => {
            stadiumMap[stadium.id] = stadium.name;
        });
        state.stadiumMap = stadiumMap;

        const teamsResponse = await CricBuzzUtils.getAllTeams();
        state.allTeams = teamsResponse.data.map(team => ({
            id: team.id,
            name: team.name
        }));
        let teamMap = {};
        state.allTeams.forEach(team => {
            teamMap[team.id] = team.name;
        });
        state.teamMap = teamMap;

        state.allPlayers = (await CricBuzzUtils.getAllPlayers()).map(player => ({
            id: player.id,
            name: player.name
        }));
        let playerMap = {};
        state.allPlayers.forEach(player => {
            playerMap[player.id] = player.name;
        });
        state.playerMap = playerMap;

        state.stadiumId = match.stadiumId;
        state.stadiumName = state.stadiumMap[match.stadiumId];

        state.team1Id = match.team1;
        state.team1Name = state.teamMap[match.team1];
        state.teams.push({
            id: state.team1Id,
            name: state.team1Name
        });

        state.team2Id = match.team2;
        state.team2Name = state.teamMap[match.team2];
        state.teams.push({
            id: state.team2Id,
            name: state.team2Name
        });

        if (match.tossWinner) {
            state.tossWinnerId = match.tossWinner;
            state.tossWinnerName = state.teamMap[match.tossWinner];

            state.battingFirstId = match.batFirst;
            state.battingFirstName = state.teamMap[match.batFirst];

            state.resultName = match.result;

            if (match.winner) {
                state.winnerId = match.winner;
                state.winnerName = state.teamMap[match.winner];
                state.winMargin = parseInt(match.winMargin, 10);
                state.winMarginTypeId = (('RUN' === match.winMarginType) ? 0 : 1);
                state.winMarginTypeName = match.winMarginType;
            }
        }

        for (const motm of match.manOfTheMatchList) {
            state.manOfTheMatchIds.push(motm.playerId);
            state.manOfTheMatchNames.push(state.playerMap[motm.playerId]);
        }

        state.startTime = match.startTime;

        for (const playerObject of match.players) {
            const index = ((match.team1 === playerObject.teamId) ? 1 : 2);
            state.players[index].push({
                id: playerObject.playerId,
                name: state.playerMap[playerObject.playerId]
            });
        }

        let scorecards = [];
        let battingScores = {};

        for (const battingScore of match.battingScores) {
            const innings = battingScore.innings;

            if (battingScores.hasOwnProperty(innings)) {
                battingScores[innings].push(battingScore);
            } else {
                battingScores[innings] = [
                    battingScore
                ];
            }
        }

        let bowlingFigures = [];
        for (const bowlingFigure of match.bowlingFigures) {
            const innings = bowlingFigure.innings;

            if (bowlingFigures.hasOwnProperty(innings)) {
                bowlingFigures[innings].push(bowlingFigure);
            } else {
                bowlingFigures[innings] = [
                    bowlingFigure
                ];
            }
        }

        let extras = {};
        for (const extra of match.extras) {
            const innings = extra.innings;

            if (extras.hasOwnProperty(innings)) {
                extras[innings][extra.type] = extra.runs;
            } else {
                extras[innings] = {
                    [extra.type]: extra.runs
                };
            }
        }

        for (const [innings, battingScoreList] of Object.entries(battingScores)) {
            let batScores = [];

            for (const score of battingScoreList) {
                let scoreObject = {
                    batsmanId: score.playerId,
                    batsmanName: state.playerMap[score.playerId],
                    runs: score.runs,
                    balls: score.balls,
                    fours: score.fours,
                    sixes: score.sixes,
                    dismissalModeId: ((score.dismissalMode) ? score.dismissalMode : ''),
                    dismissalModeName: ((score.dismissalMode) ? dismissalModeMap[score.dismissalMode] : ''),
                    bowlerId: ((score.bowler) ? score.bowler.playerId : ''),
                    bowlerName: ((score.bowler) ? state.playerMap[score.bowler.playerId] : '')
                };

                let fielderIds = [];
                let fielderNames = [];

                for (const fielder of score.fielders) {
                    fielderIds.push(fielder.playerId);
                    fielderNames.push(state.playerMap[fielder.playerId]);
                }

                scoreObject.fielderIds = fielderIds.join(', ');
                scoreObject.fielderNames = fielderNames.join(', ');

                batScores.push(scoreObject);
            }


            scorecards.push({
                battingTeamId: battingScoreList[0].teamId,
                battingTeamName: state.teamMap[battingScoreList[0].teamId],
                battingScores: batScores,
                bowlingFigures: [],
                extras: []
            })
        }

        for (let innings = 1; innings <= 4; innings++) {
            let bowlFigures = [];
            if (bowlingFigures.hasOwnProperty(innings)) {
                let bowlingFigureList = bowlingFigures[innings];

                for (const figure of bowlingFigureList) {
                    let figureObject = {
                        bowlerId: figure.playerId,
                        bowlerName: state.playerMap[figure.playerId],
                        balls: figure.balls,
                        maidens: figure.maidens,
                        runs: figure.runs,
                        wickets: figure.wickets
                    };

                    bowlFigures.push(figureObject);
                }
            } else {
                bowlFigures = [
                    this.getDefaultBowlingFigureRow()
                ];
            }

            if (scorecards.hasOwnProperty(innings - 1)) {
                scorecards[innings - 1].bowlingFigures = bowlFigures;
            }
        }

        for (let inning = 1; inning <= 4; inning++) {
            let extrasItems = [];
            let e = {
                'BYE': 0,
                'LEG_BYE': 0,
                'WIDE': 0,
                'NO_BALL': 0,
                'PENALTY': 0
            };

            if (extras.hasOwnProperty(inning)) {
                e = Object.assign(e, extras[inning]);
            }

            for (const [type, runs] of Object.entries(e)) {
                extrasItems.push({
                    type,
                    runs
                });
            }

            if (scorecards.hasOwnProperty(inning - 1)) {
                scorecards[inning - 1].extras = extrasItems;
            }
        }

        state.scoreCards = scorecards;

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
            updatedState.tossWinnerId = '';
            updatedState.tossWinnerName = '';
            updatedState.battingFirstId = '';
            updatedState.battingFirstName = '';
            updatedState.winnerId = '';
            updatedState.winnerName = '';
            updatedState.scoreCards = [];
            updatedState.manOfTheMatchList = [];

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

    handleWinMarginKeyUp = event => {
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

    handleFielderRemove = (scoreNum, inning, playerId) => {
        let updatedState = Utils.copyObject(this.state);

        let scoresForInning = updatedState.scoreCards[inning].battingScores;

        for (let i in scoresForInning) {
            let score = scoresForInning[i];
            if (scoreNum === (parseInt(i, 10))) {
                let fielderIds = score.fielderIds.split(', ');
                let fielderNames = score.fielderNames.split(', ');
                let index = fielderIds.indexOf(playerId);
                if (index !== -1) {
                    fielderIds.splice(index, 1);
                    fielderNames.splice(index, 1);
                    updatedState.scoreCards[inning].battingScores[scoreNum].fielderIds = fielderIds.join(', ');
                    updatedState.scoreCards[inning].battingScores[scoreNum].fielderNames = fielderNames.join(', ');
                    break;
                }
            }
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
        updatedState.playerSuggestions = [];
        this.setState(updatedState);
    };

    handleBowlerSelectForBattingScore = (scoreNum, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let scoreObject = inningObject.battingScores[scoreNum];
        scoreObject.bowlerId = id;
        scoreObject.bowlerName = name;
        // inningObject[scoreNum] = scoreObject;
        updatedState.playerSuggestions = [];
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
        bowlingFigure[fieldName] = ((isNaN(value)) ? '' : value);

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
        extrasObject.runs = ((isNaN(value)) ? '' : value);
        extrasObject.type = type;
        this.setState(updatedState);
    };

    handleBowlerSelectForBowlingFigure = (index, inning, id, name) => {
        let updatedState = Utils.copyObject(this.state);

        let inningObject = updatedState.scoreCards[inning];
        let bowlingFigure = inningObject.bowlingFigures[index];
        bowlingFigure.bowlerId = id;
        bowlingFigure.bowlerName = name;
        updatedState.playerSuggestions = [];
        this.setState(updatedState);
    };

    handleStartTimeKeyUp = event => {
        // console.log(event);
        this.setState({
            startTime: event.target.value
        })
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

    handleStartTimeChange = (event) => {
        const startTime = (new Date(event.target.value)).getTime();

        let updatedState = Utils.copyObject(this.state);
        updatedState.startTime = startTime;
        this.setState(updatedState);
    };

    handleRemoveFigure = (inning, index) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.scoreCards[inning].bowlingFigures.splice(index, 1);
        if (updatedState.scoreCards[inning].bowlingFigures.length === 0) {
            updatedState.scoreCards[inning].bowlingFigures.push(this.getDefaultBowlingFigureRow());
        }
        this.setState(updatedState);
    }

    handleRemoveScore = (inning, index) => {
        let updatedState = Utils.copyObject(this.state);
        updatedState.scoreCards[inning].battingScores.splice(index, 1);
        if (updatedState.scoreCards[inning].battingScores.length === 0) {
            updatedState.scoreCards[inning].battingScores.push(this.getDefaultBattingScoreRow());
        }
        this.setState(updatedState);
    }

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
                    let battingScore = {
                        playerId: scoreObject.batsmanId,
                        runs: scoreObject.runs,
                        balls: scoreObject.balls,
                        fours: scoreObject.fours,
                        sixes: scoreObject.sixes,
                        innings: inningsNum,
                        teamInnings
                    };

                    if (scoreObject.dismissalModeId) {
                        battingScore.dismissalMode = scoreObject.dismissalModeId;
                    }

                    if (scoreObject.bowlerId) {
                        battingScore.bowlerId = scoreObject.bowlerId;
                    }

                    if (scoreObject.fielderIds) {
                        battingScore.fielders = scoreObject.fielderIds;
                    }
                    battingScores.push(battingScore);
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
            team1: this.state.team1Id,
            team2: this.state.team2Id,
            tossWinner: this.state.tossWinnerId,
            batFirst: this.state.battingFirstId,
            result: this.state.resultName,
            winner: this.state.winnerId,
            winMargin: this.state.winMargin,
            winMarginType: this.state.winMarginTypeName,
            stadium: this.state.stadiumId,
            startTime: (new Date(this.state.startTime)).getTime(),
            players
        };

        payload.battingScores = battingScores;

        payload.extras = extras;

        payload.bowlingFigures = bowlingFigures;

        payload.manOfTheMatchList = this.state.manOfTheMatchIds;

        Context.showLoader();
        const updatePromise = CricBuzzUtils.updateMatch(payload, Utils.getUrlParam('id'));
        updatePromise.then(response => {
            console.log(response);
            Context.showNotify('Updated Successfully', 'success');
            Context.hideLoader();
        });

        updatePromise.catch(response => {
            Context.showNotify('Failed to update match', 'error');
            console.log(response.data);
            Context.hideLoader();
        });
    };

    renderPage = () => {
        if (this.state.isLoaded) {
            return (
                <UpdateCore
                    {...this.state}
                    onSearch={this.handleSearch}
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
                    onWinMarginKeyUp={this.handleWinMarginKeyUp}
                    onWinMarginTypeSelect={this.handleWinMarginTypeSelect}
                    onPlayerSearchAll={this.handlePlayerSearchAll}
                    onPlayerRemove={this.handlePlayerRemove}
                    onManOfTheMatchRemove={this.handleManOfTheMatchRemove}
                    onSubmit={this.handleSubmit}
                    onStartTimeKeyUp={this.handleStartTimeKeyUp}
                    onTeamSelectForInnings={this.handleTeamSelectForInnings}
                    onSelectManOfTheMatch={this.handleSelectManOfTheMatch}
                    onSelectManOfTheSeries={this.handleSelectManOfTheSeries}
                    onStartTimeChange={this.handleStartTimeChange}
                    onRemoveFigure={this.handleRemoveFigure}
                    onRemoveScore={this.handleRemoveScore}
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

function mapStateToProps(store) {
    return ({
        match: store.cric.match,
        series: store.cric.series
    });
}

export default connect(mapStateToProps)(Update);
