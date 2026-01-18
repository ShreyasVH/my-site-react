import { createBrowserRouter } from "react-router-dom";
import Home from "./containers/home";
import MoviesDashboard from './containers/movies/dashboard';
import BrowseMovies from './containers/movies/browseMovies';
import MovieDetail from './containers/movies/movieDetail';
import MovieAdd from './containers/movies/add';

export default createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        exact: true
    },
    {
        path: '/movies/dashboard',
        element: <MoviesDashboard />
    },
    {
        path: '/movies/browseMovies',
        element: <BrowseMovies />
    },
    {
        path: '/movies/movieDetail',
        element: <MovieDetail />
    },
    {
        path: '/movies/add',
        element: <MovieAdd />
    },
    // {
    //     route: '/movies/update',
    //     filePath: './containers/movies/update'
    // },
    // {
    //     route: '/movies/artists/add',
    //     filePath: './containers/movies/artists/add'
    // },
    // {
    //     route: '/movies/artists/update',
    //     filePath: './containers/movies/artists/update'
    // },
    // {
    //     route: '/cards/browse',
    //     filePath: './containers/cards/browse'
    // },
    // {
    //     route: '/cards/detail',
    //     filePath: './containers/cards/detail'
    // },
    // {
    //     route: '/logs/filters',
    //     filePath: './containers/logs'
    // },
    // {
    //     route: '/cricbuzz/browse',
    //     filePath: './containers/cricbuzz/browse'
    // },
    // {
    //     route: '/cricbuzz/tours/detail',
    //     filePath: './containers/cricbuzz/tour/detail'
    // },
    // {
    //     route: '/cricbuzz/tours/update',
    //     filePath: './containers/cricbuzz/tour/update'
    // },
    // {
    //     route: '/cricbuzz/series/detail',
    //     filePath: './containers/cricbuzz/series/detail'
    // },
    // {
    //     route: '/cricbuzz/series/update',
    //     filePath: './containers/cricbuzz/series/update'
    // },
    // {
    //     route: '/cricbuzz/matches/detail',
    //     filePath: './containers/cricbuzz/match/detail'
    // },
    // {
    //     route: '/cricbuzz/matches/create',
    //     filePath: './containers/cricbuzz/match/create'
    // },
    // {
    //     route: '/cricbuzz/matches/update',
    //     filePath: './containers/cricbuzz/match/update'
    // },
    // {
    //     route: '/cricbuzz/stadiums/update',
    //     filePath: './containers/cricbuzz/stadium/update'
    // },
    // {
    //     route: '/cricbuzz/stadiums/list',
    //     filePath: './containers/cricbuzz/stadium/list'
    // },
    // {
    //     route: '/cricbuzz/countries/update',
    //     filePath: './containers/cricbuzz/country/update'
    // },
    // {
    //     route: '/cricbuzz/countries/create',
    //     filePath: './containers/cricbuzz/country/create'
    // },
    // {
    //     route: '/cricbuzz/countries/list',
    //     filePath: './containers/cricbuzz/country/list'
    // },
    // {
    //     route: '/cricbuzz/teams/update',
    //     filePath: './containers/cricbuzz/team/update'
    // },
    // {
    //     route: '/cricbuzz/teams/list',
    //     filePath: './containers/cricbuzz/team/list'
    // },
    // {
    //     route: '/cricbuzz/players/update',
    //     filePath: './containers/cricbuzz/player/update'
    // },
    // {
    //     route: '/cricbuzz/players/list',
    //     filePath: './containers/cricbuzz/player/list'
    // },
    // {
    //     route: '/cricbuzz/players/detail',
    //     filePath: './containers/cricbuzz/player/details'
    // },
    // {
    //     route: '/cricbuzz/players/stats',
    //     filePath: './containers/cricbuzz/player/stats'
    // },
    // {
    //     route: '/cricbuzz/players/scores',
    //     filePath: './containers/cricbuzz/player/scores'
    // },
    // {
    //     route: '/pogo/mons/update',
    //     filePath: './containers/pogo/mons/update'
    // },
    // {
    //     route: '/pogo/forms/update',
    //     filePath: './containers/pogo/forms/update'
    // },
    // {
    //     route: '/pogo/forms/add',
    //     filePath: './containers/pogo/forms/add'
    // },
    // {
    //     route: '/pogo/forms/browse',
    //     filePath: './containers/pogo/forms/browse'
    // },
    // {
    //     route: '/pogo/events/update',
    //     filePath: './containers/pogo/events/update'
    // },
    // {
    //     route: '/pogo/events/add',
    //     filePath: './containers/pogo/events/add'
    // },
    // {
    //     route: '/pogo/events/detail',
    //     filePath: './containers/pogo/events/detail'
    // },
    // {
    //     route: '/pogo/events/list',
    //     filePath: './containers/pogo/events/list'
    // },
    // {
    //     filePath: './containers/notFound'
    // }
]);
