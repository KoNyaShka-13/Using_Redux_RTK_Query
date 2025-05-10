//Эту папку можно создавать и в копонентах
//Пока что тут будут все запросы
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({//В сторе настраиваем это
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),//http://localhost:3001/heroes/
    tagTypes: ['Heroes'],//1.Обозначаем, какие метки есть в нашем api
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',//Тут указано, куда будет отправляться дальнейший запрос
            providesTags: ['Heroes']//2.Обозначили, когда данные запрашиваются при помощи query
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            //При использовании тегов, действия связаны последовательно 
            invalidatesTags: ['Heroes']//3.Если данные в мутации изменились, то указываем, по какой метке можем получить актуальные данные
        }), 
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,//Удалаяем по айдишнику
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })

    })
})
//Будет гененрироваться хук на каждое новое действие
export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;//экспортируем ендпоинт, который создается выше
//Достаем хук, который называется, как эндпоинт и приписываем тип, то есть в нашем случае запрос(query)
