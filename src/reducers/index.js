//const initialState = {
//    heroes: [],
//    heroesLoadingStatus: 'idle',// Статус загрузки героев (по умолчанию 'idle' — бездействие)
//    filters: [],
//    filtersLoadingStatus: 'idle',// Статус загрузки фильтров
//    activeFilter: 'all'// Активный фильтр (по умолчанию 'all' — все герои)
//    
//}
//
//const reducer = (state = initialState, action) => {
//    switch (action.type) {//Если action.type не соответствует ни одному из кейсов, возвращается текущее состояние (state).
//        case 'HEROES_FETCHING':
//            return {
//                ...state,
//                heroesLoadingStatus: 'loading'
//            }
//        case 'HEROES_FETCHED':
//            return {
//                ...state,
//                heroes: action.payload,//heroes обновляется данными из action.payload (новый список героев)
//                
//                //filteredHeroes: state.activeFilter === 'all' ? //Убрал фильтрацию и вклеил ее в хероис лист
//                //                action.payload : 
//                //                action.payload.filter(item => item.element === state.activeFilter),//Если активный фильтр 'all', то filteredHeroes равен всему списку героев. Иначе фильтруются герои, у которых element совпадает с activeFilter.
//                heroesLoadingStatus: 'idle'//Снова бездейтвие 
//            }
//        case 'HEROES_FETCHING_ERROR':
//            return {
//                ...state,
//                heroesLoadingStatus: 'error'
//            }
//        case 'FILTERS_FETCHING':
//            return {
//                ...state,
//                filtersLoadingStatus: 'loading'
//            }
//        case 'FILTERS_FETCHED':
//            return {
//                ...state,
//                filters: action.payload,//filters обновляется данными из action.payload (новый список фильтров)
//                filtersLoadingStatus: 'idle'
//            }
//        case 'FILTERS_FETCHING_ERROR':
//            return {
//                ...state,
//                filtersLoadingStatus: 'error'
//            }
//        case 'ACTIVE_FILTER_CHANGED':
//            return {
//                ...state,
//                activeFilter: action.payload,
//                //filteredHeroes: action.payload === 'all' ? //filteredHeroes обновляется в зависимости от нового активного фильтра: Если фильтр 'all', то filteredHeroes равен всему списку героев.Иначе фильтруются герои, у которых element совпадает с новым активным фильтром.
//                //                state.heroes :
//                //                state.heroes.filter(item => item.element === action.payload)
//            }
//        
//        case 'HERO_CREATED':
//            //Новый массив    
//            //let newCreatedHeroList = [...state.heroes, action.payload];
//            return {
//                ...state,
//                heroes: [...state.heroes, action.payload]
//                //heroes: newCreatedHeroList,
//                // Фильтруем новые данные по фильтру, который сейчас применяется
//                //filteredHeroes: state.activeFilter === 'all' ? 
//                //                newCreatedHeroList : 
//                //                newCreatedHeroList.filter(item => item.element === state.activeFilter)
//            }
//        case 'HERO_DELETED': 
//            //Новый массив
//            //const newHeroList = state.heroes.filter(item => item.id !== action.payload);
//            return {
//                ...state,
//                heroes: state.heroes.filter(item => item.id !== action.payload)
//                //heroes: newHeroList,
//                // Фильтруем новые данные по фильтру, который сейчас применяется
//                //filteredHeroes: state.activeFilter === 'all' ? 
//                //                newHeroList : 
//                //                newHeroList.filter(item => item.element === state.activeFilter)
//            }
//        default: return state
//    }
//}
//
//export default reducer;