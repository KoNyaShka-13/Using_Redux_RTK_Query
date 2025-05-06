// !!! Нам этот файл больше не нужен, но я оствляю его для практики, чтобы можно было вернуться
//import { createReducer } from "@reduxjs/toolkit"
//
//import {
//    heroesFetching,
//    heroesFetched,
//    heroesFetchingError,
//    heroCreated,
//    heroDeleted
//} from '../actions'

//const initialState = {
//    heroes: [],
//    heroesLoadingStatus: 'idle',// Статус загрузки героев (по умолчанию 'idle' — бездействие)
//    
//}

//const heroes =createReducer(initialState, builder => {//Билдек помогет строить компонент при помощи встроенных в него компонентов
//    builder
//        .addCase(heroesFetching, state => {//При помощи креате редюсер можно писать без принципа иммутабельности
//            state.heroesLoadingStatus = 'loading';//В итоге он будет иммутабельным
//        })
//        .addCase(heroesFetched, (state, action) => {
//            state.heroesLoadingStatus = 'idle';
//            state.heroes = action.payload;//payload нужен для содержания фактических данных в объекте действия
//        })
//        .addCase(heroesFetchingError, state =>{
//            state.heroesLoadingStatus = 'error';
//        })
//        .addCase(heroCreated, (state, action) => {
//            state.heroes.push(action.payload);//Через пейлоад легче делать 
//        })
//        .addCase(heroDeleted, (state, action) => {
//            state.heroes = state.heroes.filter(item => item.id !== action.payload);
//        })
//        .addDefaultCase(() => {})
//})

//const heroes = (state = initialState, action) => {
//    switch (action.type) {//Если action.type не соответствует ни одному из кейсов, возвращается текущее состояние (state).
//        case 'HEROES_FETCHING':
//            return {
//                ...state,
//                heroesLoadingStatus: 'loading'
//            }
//       case 'HEROES_FETCHED':
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
//           }
//        
//        case 'HERO_CREATED':
//            //Новый массив    
//            //let newCreatedHeroList = [...state.heroes, action.payload];
//            return {
//                ...state,
//                heroes: [...state.heroes, action.payload]
//                //heroes: newCreatedHeroList,
//                // Фильтруем новые данные по фильтру, который сейчас применяется
//               //filteredHeroes: state.activeFilter === 'all' ? 
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

//export default heroes;