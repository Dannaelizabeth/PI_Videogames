const initialState = {
    videogames : [],
    allVideogames : [],
    genres : [],
    detail :[]
}


function rootReducer (state = initialState, action){
    switch (action.type){
        case 'GET_VIDEOGAMES' :
            return {
                ...state,
                videogames : action.payload,
                allVideogames :action.payload

            }
            case 'GET_GENRES' :
                return {
                    ...state,
                    genres :action.payload
                }
            case 'POST_VIDEOGAME':
                return{
                    ...state,
                }

            case 'GET_DETAILS':
                return {
                    ...state,
                    detail:action.payload
                }
            case 'GET_NAME_VIDEOGAMES' :
            return {
                ...state,
                videogames: action.payload
            }

            case 'ORDER_BY_NAME':
                let sorteArrName = action.payload === 'asc' ?
                    state.videogames.sort (function( a, b){
                        if ( a.name > b.name){
                            return 1;
                        }
                        if (b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }):
                    state.videogames.sort (function ( a, b){
                        if ( a.name > b.name){
                            return -1;
                        }
                        if (b.name> a.name){
                            return 1;
                        }
                        return 0;
                    })
                    return{
                        ...state,
                        videogames:sorteArrName
                    }
            case 'ORDER_BY_RATING':
                const sorteArrRating = action.payload === 'min' ?
                state.videogames.sort(function (a, b){
                    if (a.rating > b.rating){
                        return 1;
                    }
                    if (b.rating > a.rating){
                        return -1;
                    }
                    return 0
                })
                :state.videogames.sort(function (a, b){
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if (b.rating > a.rating){
                        return 1;
                    }
                    return 0
                });
                return {
                    ...state,
                    videogames: sorteArrRating,
                };

                case 'FILTER_BY_GENRES':
                    const allVideogames2 =state.allVideogames;
                    // const genresFilter = action.payload === 'All' ? allVideogames2 : allVideogames2.filter ((e)=> e.genres.includes(action.payload));
                     const filterGenres = allVideogames2.filter((el)=> el.genres.includes(action.payload))
                    return{
                        ...state,
                        videogames : action.payload === 'All' ? allVideogames2 : filterGenres
                    }



            case 'FILTER_CREATED':
                const allVideogames = state.allVideogames
                const createdFilter =action.payload === 'created' ? allVideogames.filter(el => el.createdInDb) : allVideogames.filter( el => !el.createdInDb)
                return {
                    ...state,
                    videogames: action.payload === 'All' ? state.allVideogames : createdFilter
                }

            default : 
                return state;

    }

}

export default rootReducer ;