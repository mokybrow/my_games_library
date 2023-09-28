import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { error } from 'console';


type FormData = {
    email: string
    password: string
    username: string
    name: string
}

const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');

    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        auth_store.registr(email,password, username, name )
    }
    const error: SubmitErrorHandler<FormData> = (data) => console.log(data)

    const uniqEmail = (email: string) => {
        auth_store.registr(email, password, username, name)
        if (!auth_store.emailError) {
            return false
        }
        return true;
    };
    const uniqUsername = (username: string) => {
        user_store.FindUser(username)
        if (user_store.anotherUser.username == username) {
            return false
        }
        return true;
    };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit, error)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input  {...register("email", {
                validate: uniqEmail, minLength: {
                    value: 2,
                    message: "min length is 5",
                },
            },)} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
            {errors.email && <p>Пользователь с такой почтой существует</p>}

            <input  {...register("username", {
                validate: uniqUsername, minLength: {
                    value: 2,
                    message: "min length is 5",
                },
            },)} onChange={e => setUsername(e.target.value)}  placeholder='Username'/>

            <input {...register("name", { required: true })} onChange={e => setName(e.target.value)} placeholder='Name'/>

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("password", { required: true })} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}


export default observer(RegForm);