import React, { useContext, useState } from 'react'
import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import UsersContext from '../context/UsersContext'

export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    // console.warn(Object.keys(props.route.params)) //acesso ao parametro que foi passado ["id", "name", "email", "avatarUrl"]
    const { dispatch } = useContext(UsersContext)

    return (
        <View style={style.form}>
            <Text>Nome</Text>
            <TextInput
                style={style.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Informe o nome"
                value={user.name}
            />

            <Text>Email</Text>
            <TextInput
                style={style.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Informe o email"
                value={user.email}
            />

            <Text>URL do Avatar</Text>
            <TextInput
                style={style.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder="Informe a URL do avatar"
                value={user.avatarUrl}
            />

            <Button
                title="Salvar"
                color="#32C271"
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })
                    navigation.goBack()
                }} />
        </View>

    )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: "#4B4CFF",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10
    }
})