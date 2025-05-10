//Эту папку можно создавать и в копонентах
//Пока что тут будут все запросы
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({//В сторе настраиваем это
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),//http://localhost:3001/heroes/
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes'//Тут указано, куда будет отправляться дальнейший запрос
        })
    })
})
//Будет гененрироваться хук на каждое новое действие
export const {useGetHeroesQuery} = apiSlice;//экспортируем ендпоинт, который создается выше
//Достаем хук, который называется, как эндпоинт и приписываем тип, то есть в нашем случае запрос(query)
