import React from "react";

import {View, ScrollView, Text,ToastAndroid} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText} from 'react-native-paper';

import axios from 'axios';

import * as config from '../api/config'

function AuthScreen({navigation}) {

    const [isChecked, onCheck] = React.useState(true);

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [passwordConfirmed, onChangePasswordConfirmed] = React.useState("");


    const [errorEmailRegister, onChangeErrorEmailRegister] = React.useState(false);
    const [passwordErrorRegister, onChangePasswordErrorRegister] = React.useState(false);
    const [passwordConfirmedErrorRegister, onChangePasswordConfirmedErrorRegister] = React.useState(false);

    const [errorEmailRegisterMsg, onChangeErrorEmailRegisterMsg] = React.useState("");
    const [passwordErrorRegisterMsg, onChangePasswordErrorRegisterMsg] = React.useState("");
    const [passwordConfirmedErrorRegisterMsg, onChangePasswordConfirmedErrorRegisterMsg] = React.useState("");


    const [isLogin, setIsLogin] = React.useState(true);

    const submitFormLogin = async () => {
        const formData = {
            email: email,
            password: password
        };

        let isReady = true;

        if(!formData.email || formData.email.trim() === "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) === false) {
            onChangeErrorEmailRegister(true);
            onChangeErrorEmailRegisterMsg("Email invalide");
            isReady = false;
        } else {
            onChangeErrorEmailRegisterMsg("");
            onChangeErrorEmailRegister(false)
        }

        if(!formData.password || formData.password.trim() === "" || formData.password.trim().length < 6) {
            onChangePasswordErrorRegister(true)
            onChangePasswordErrorRegisterMsg("Indiqué votre mot de passe")
            isReady = false;
        } else {
            onChangePasswordErrorRegister(false)
            onChangePasswordErrorRegisterMsg("")
        }

        console.log("LOGIN : " + isReady)
    };

    const submitFormRegister = async () => {

        const formData = {
            email: email,
            password: password,
            passwordConfirmed: passwordConfirmed
        };

        let isReady = true;

        if(!formData.email || formData.email.trim() === "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) === false) {
            onChangeErrorEmailRegister(true);
            onChangeErrorEmailRegisterMsg("Email non valide");
            isReady = false;
        } else {
            onChangeErrorEmailRegisterMsg("");
            onChangeErrorEmailRegister(false)
        }

        if(!formData.password || formData.password.trim() === "" || formData.password.trim().length < 6) {
            onChangePasswordErrorRegister(true)
            onChangePasswordErrorRegisterMsg("7 caractères minimum")
            isReady = false;
        } else {
            onChangePasswordErrorRegister(false)
            onChangePasswordErrorRegisterMsg("")
        }


        if(!formData.passwordConfirmed || formData.passwordConfirmed.trim() === "") {
            onChangePasswordConfirmedErrorRegister(true)
            isReady = false;
            onChangePasswordConfirmedErrorRegisterMsg("Remplissez votre mot de passe")
        } else {
            onChangePasswordConfirmedErrorRegisterMsg("")
            onChangePasswordConfirmedErrorRegister(false)
        }

        if(formData.passwordConfirmed.trim() !== formData.password.trim()) {
            onChangePasswordConfirmedErrorRegister(true)
            onChangePasswordConfirmedErrorRegisterMsg("Les mots de passe correspondent pas")
            isReady = false;
        } else {
            onChangePasswordConfirmedErrorRegister(false)
            onChangePasswordConfirmedErrorRegisterMsg("")
        }

        if(isReady === true) {
            const ROLES = [
                'ROLE_CANDIDAT',
                'ROLE_RECRUTEUR'
            ];
            let role = isChecked === true ? ROLES[1] : ROLES[0] ;

            let payload = {
                email: formData.email,
                password: formData.password,
                roles: role
            };

            console.log("before try")

                console.log("1")
                console.log(payload);

                const res = await axios.post(`${config.default.URL}/register`, {email : payload.email, password: payload.password, roles: payload.roles})

                if(res.status === 200) {

                    const tok = await axios.post(`${config.default.URL}/authentication_token`, {email : payload.email, password: payload.password, roles: payload.roles})

                    if(tok.status === 200) {
                        console.log("TOKEN -> ", tok.data.token);
                    } else {
                        ToastAndroid.showWithGravity(
                            "Erreur réseaux, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                } else {
                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
                //if(response.status === 200) {

                /*
                    const response = await fetch(`${config.default.URL}/authentication_token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data;charset=utf-8; boundary='+ Math.random().toString().substr(2)
                        },
                        body: {email: body.email, password: body.password}
                    });
                    const jsonResponse = await response.json();
                    console.log("FINAL", jsonResponse);

                 */

                //} else {
                // ToastAndroid.showWithGravity(
                //    "Utilisateur existe déjà !",
                //    ToastAndroid.SHORT,
                //     ToastAndroid.CENTER
                //  );
                // }



        }


    };

    let loginForm;
    let registerForm;
    let formRender;

    loginForm =
        <View>
            <TextInput style={{padding: 5, margin: 10}}
                       label='Email'
                       value={email}
                       mode={'outlined'}
                       keyboardType={'email-address'}
                       error={errorEmailRegister}
                       onChangeText={emailValue => onChangeEmail(emailValue)}
            />
            <HelperText
                type="error"
                visible={true}
            >{errorEmailRegisterMsg}</HelperText>

            <TextInput style={{padding: 5, margin: 10}}
                       label='Mot de passe'
                       value={password}
                       mode={'outlined'}
                       secureTextEntry={true}
                       error={passwordErrorRegister}
                       onChangeText={passwordValue => onChangePassword(passwordValue)}
            />
            <HelperText
                type="error"
                visible={true}
            >{passwordErrorRegisterMsg}</HelperText>

            <Button icon="lock-open" mode="contained" onPress={() => submitFormLogin() }>
                Se connecter
            </Button>

            <Button style={{textAlign: 'center', margin: 30}} onPress={ () => {setIsLogin(false)}}> Pas de compte ?</Button>
        </View>;

    registerForm =
        <View>
            <TextInput style={{padding: 5, margin: 10}}
                       label='Email'
                       value={email}
                       mode={'outlined'}
                       keyboardType={'email-address'}
                       error={errorEmailRegister}
                       onChangeText={emailValue => onChangeEmail(emailValue)}
            />
            <HelperText
                type="error"
                visible={true}
            >{errorEmailRegisterMsg}</HelperText>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                <Text styte={{fontSize: 20}}>Je suis recruteur</Text>
                <Checkbox
                    color="purple"
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => { isChecked === true ? onCheck(false): onCheck(true) }}
                />
            </View>
            <TextInput style={{padding: 5, margin: 10}}
                       label='Mot de passe'
                       value={password}
                       mode={'outlined'}
                       secureTextEntry={true}
                       error={passwordErrorRegister}
                       onChangeText={passwordValue => onChangePassword(passwordValue)}
            />
            <HelperText
                type="error"
                visible={true}
            >{passwordErrorRegisterMsg}</HelperText>
            <TextInput style={{padding: 5, margin: 10}}
                       label='Confirmé votre mot de passe'
                       value={passwordConfirmed}
                       mode={'outlined'}
                       error={passwordConfirmedErrorRegister}
                       secureTextEntry={true}
                       onChangeText={passwordConfirmedValue => onChangePasswordConfirmed(passwordConfirmedValue)}
            />
            <HelperText
                type="error"
                visible={true}
            >{passwordConfirmedErrorRegisterMsg}</HelperText>
            <Divider style={{margin: 30}}/>

            <Button icon="lock-open" mode="contained" onPress={() => submitFormRegister() }>
                S'enregistrer
            </Button>
            <Button style={{textAlign: 'center', margin: 30}} onPress={ () => {setIsLogin(true)}}> Déjà un compte ?</Button>
        </View>;


    if (isLogin) {
        formRender = loginForm
    } else {
        formRender = registerForm
    }


    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={() => {
                    navigation.openDrawer()
                }}/>

                <Appbar.Content
                    title="Recruiter"
                    subtitle="L'application pour les recruteurs !"
                />
            </Appbar.Header>
            <View style={{paddingTop: 15, margin: 30}}>
                {formRender}
            </View>
        </ScrollView>
    );
}

export default AuthScreen;
