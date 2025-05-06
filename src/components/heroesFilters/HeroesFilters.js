import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { useEffect } from 'react';//Чтобы сделать запрос вовремя
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';


import { fetchFilters, filtersChanged, selectAll } from './filtersSlice';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    // Запрос на сервер для получения фильтров и последовательной смены состояния
    useEffect(() => {
        dispatch(fetchFilters(request));   //Все делаем через общий диспатч, в котором все есть
        // eslint-disable-next-line
    }, []);

    //Ошибки и загрузочная вставка
    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }
    
    //Достаем массив фильтров и создаем из них кнопки 
        return arr.map(({ name, label, className }) => {
            // Используем classnames для условного добавления класса active
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(filtersChanged(name))}
                >
                    {label}
                </button>
            );
        });
    }
  
    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
};

export default HeroesFilters;