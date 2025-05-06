//const initialState = {
//    filters: [],
//    filtersLoadingStatus: 'idle',// Статус загрузки фильтров
//    activeFilter: 'all'// Активный фильтр (по умолчанию 'all' — все герои)
//    
//}
//
//const filters = (state = initialState, action) => {
//    switch (action.type) {//Если action.type не соответствует ни одному из кейсов, возвращается текущее состояние (state).        
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
//            default: return state
//    }
//}
//
//export default filters;