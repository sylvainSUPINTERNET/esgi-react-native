import React from "react";

import {Text, View, Button, TextInput, ScrollView} from "react-native";

function AuthScreen({ navigation }) {

    const [username, onChangeUsername] = React.useState('Nom d\'utilisateur');
    const [email, onChangeEmail] = React.useState('Email);
    const [password, onChangePassword] = React.useState('Mot de passe');
    const [passwordConfirmed, onChangePasswordConfirmed] = React.useState('Confirmer le mot de passe');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={userNameValue => onChangeUsername(userNameValue)}
                value={username}
            />
            {/* ICI integrer les chalmps email / password / password Confirmed (attention lire la doc car il y a des champs tout existant pour mdp / email*/}
            {/* trouver une lib cool pour le style*/}
        </View>
    );
}

export default AuthScreen;
