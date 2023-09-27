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

    const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)
    const error : SubmitErrorHandler<FormData> = (data) => console.log(data)
    const uniqUsername = (username: string) => {
        user_store.FindUser(username)
        if (user_store.anotherUser.username == username){
            return false
        }
        return true;
      };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit, error)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input  {...register("email", {validate: uniqUsername})} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}


export default observer(RegForm);