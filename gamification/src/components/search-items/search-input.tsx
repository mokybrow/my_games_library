import React, { useContext } from 'react'
import { FollowButton } from '../buttons/follow-button'
import './search-input.css'
import { SubmitButton } from '../buttons/submit-button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Context } from '../..'
import { useSearchParams } from 'react-router-dom'

enum SearchEnum {
    what = "Что ищем?",
    game = "Игра",
    article = "Статья",
}

interface IFormInput {
    title: string
    tag: SearchEnum;
}

const SearchInput = () => {
    const { search_store } = useContext(Context);
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data.tag, data.title)
        search_store.searchFunc(data.tag, data.title)
        setSearchParams({ tag: String(data.tag), title: String(data.title)})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='search-container' >
            <select className='sort-filter-selector' {...register("tag", {
                required: true
            })}>
                <option value=''>Что ищем?</option>
                <option value="game">Игра</option>
                <option value="article">Статья</option>
            </select>
            <input type="text" {...register("title", {
                required: {
                    value: true,
                    message: "Поле не может быть пустым"
                },
            })} placeholder='Введите название того, что хотите найти'/>
            <SubmitButton type={'submit'} onClick={undefined}>
                Поиск
            </SubmitButton>
        </form>

    )
}

export default SearchInput