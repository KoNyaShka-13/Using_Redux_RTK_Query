import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const heroesAdapter = createEntityAdapter();//Эта функция должна вернуть объект, у которого будут свои методы, коллбэки и тп.

const initialState = heroesAdapter.getInitialState({//Получаем начальное состояние 
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        
        heroCreated: (state, action) => {
            heroesAdapter.addOne(state, action.payload);//Код понимает, кого добавлять из-за того,что на самом деле за место пэйлоада стоит айди, за нас все делает адаптер
        },
        heroDeleted: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'; 
                heroesAdapter.setAll(state, action.payload);//Здесь мы получаем героев и добавляем в них все из актион пэйлоад
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;//Выше настроили слайсер, а тут его разделили, чтобы редьюсер поместить в дальнейшем в главную функцию по созданию стора

export default reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes); //Достаем и экспортируем селект олл из хероес адаптер

export const filteredHeroesSelector = createSelector(//Оптимизация, при нажатии одной и той же кнопки фильтров было регулярное обновление фильтров, теперь один раз до того, пока фильтр не поеняется
    (state) => state.filters.activeFilter,
    selectAll,//Она пошла на замену функции, что выше
    (filter,heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;
