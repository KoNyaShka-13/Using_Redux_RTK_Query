import {useHttp} from '../../hooks/http.hook';//Чтобы сделать запрос
import { useEffect, useCallback, useMemo } from 'react';//Чтобы сделать запрос вовремя
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroDeleted, fetchHeroes } from './heroesSlice';//fetchHeroes не нужен, но к нему  пока подвязаны другие детали
import { useGetHeroesQuery } from '../../api/apiSlice';//При помощи его можно будет генерировать большое количество свойств

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './HeroesList.scss';



const HeroesList = () => {//Используя RTK query не нужно задействовать юзселектор и тп

    const {//Получаем данные из среза
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

//!Делаем все через RTK query, он не работает там, где чтото зависит от рук пользователя, по этому адаптируем, болше не знаю, как объяснить
    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {//ЮЗмемо нужен при обновлении данных, если что-то новое будет, то обновится 
        const filteredHeroes = heroes.slice();//Создаем копию массива и начинаем с ним работать
        
        if (activeFilter === 'all') {
            return heroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]); //Так будет оставаться нужный фильтр и отображаться только нужные данные

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line  
    }, []);

    // Удаление персонажа по его id
    const onDelete = useCallback(async (id) => {//У нас и мемоизация(useCallback) и безопасность при async/awit
        try {
            await request(`http://localhost:3001/heroes/${id}`, "DELETE");
            dispatch(heroDeleted(id));
        } catch (e) {
            console.error("Ошибка при удалении персонажа", e);
        }
    }, [request,dispatch]);


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition
                        timeout={0}
                        classNames={"hero"}>
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return <CSSTransition
                        key={id}
                        timeout={500}
                        classNames="hero">
                <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
            </CSSTransition>
        })
    }

    const elements = renderHeroesList(filteredHeroes);//Оборачиваем в TransitionGroup, чтобы работала анимация из CSSTransition
    return (
        <TransitionGroup component={"ul"}>
            {elements}
        </TransitionGroup>
            
        
    )
}

export default HeroesList;