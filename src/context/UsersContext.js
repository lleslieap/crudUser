import React, { createContext, useReducer } from "react"
import users from "../data/users"

const initialState = { users }
//criou um contexto, passando um objeto vazio para inicializar
const UsersContext = createContext({})

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user]
        }
    },

    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },

    deleteUser(state, action) {
        const user = action.payload
        return {
            ...state, //--> mais elementos, usar o state
            users: state.users.filter(u => u.id !== user.id)
        }
    }
}

export const UsersProvider = props => {

    //state vai sempre representar a lista dos elementos (nesse caso o usuário) na sua última versão
    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    //dispatch -> responsável por disparar um evento para todos os reducers
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        //criou um provider que irá receber uma lista de elementos, sendo renderizado no props.children
        <UsersContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UsersContext.Provider> //importante pois irá passar todos esses componentes e consegue acessar os valores
    )
}

export default UsersContext