import React, { useContext } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { Avatar, Button, Icon, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import UsersContext from '../context/UsersContext'

export default props => {

    //informação dentro do contexto que foi compartilhado
    const { state, dispatch } = useContext(UsersContext)
    // console.warn(Object.keys(state))

    function confirmUserDeletion(user) {
        Alert.alert("Excluir usuário", "Deseja excluir o usuário?", [
            {
                text: "Sim",
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    }) //passada para a função reducer -> usersContext
                    // console.warn(`delete ${user.id}`)
                }
            },
            {
                text: "Não"
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
            >
                <Avatar rounded source={{ uri: user.avatarUrl }} />

                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>

                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="#F59727" />}
                />

                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="#F53227" />}
                />
            </ListItem>

        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}