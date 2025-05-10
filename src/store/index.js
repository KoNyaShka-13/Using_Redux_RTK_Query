import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import {apiSlice} from '../api/apiSlice';


const stringMiddleware = () => (next) => (action) => {//Расширяем функцию диспэтч
     if (typeof action =='string') {
          return next({
               type: action
          }) 
     }
     return next(action)
};

const store = configureStore({
     reducer: {heroes, 
               filters, 
               [apiSlice.reducerPath]: apiSlice.reducer},//Наглядно, как работает деструктуризация
     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),//В апислайс существует готовый миддлвэйр, который и достали
     devTools: process.env.NODE_ENV !== 'production',//Пока мы в режиме разработки, то дев тулс включен, в продакшене он отключается
     
})
export default store;