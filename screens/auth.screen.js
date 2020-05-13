import React from "react";

import {View, ScrollView, Text, ToastAndroid} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText, TouchableRipple} from 'react-native-paper';
import {AsyncStorage} from 'react-native';

import axios from 'axios';

import * as config from '../api/config'
import {isLogged} from "./authCheck";

function AuthScreen({navigation}) {

    const [isInputsLoading, setIsInputLoading] = React.useState(true);
    const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);

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
        setIsInputLoading(false); // not editable
        setIsButtonEnabled(true); // disable

        const formData = {
            email: email,
            password: password
        };

        let isReady = true;

        if (!formData.email || formData.email.trim() === "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) === false) {
            onChangeErrorEmailRegister(true);
            onChangeErrorEmailRegisterMsg("Email invalide");
            isReady = false;
        } else {
            onChangeErrorEmailRegisterMsg("");
            onChangeErrorEmailRegister(false)
        }

        if (!formData.password || formData.password.trim() === "" || formData.password.trim().length < 6) {
            onChangePasswordErrorRegister(true)
            onChangePasswordErrorRegisterMsg("Indiqué votre mot de passe")
            isReady = false;
        } else {
            onChangePasswordErrorRegister(false)
            onChangePasswordErrorRegisterMsg("")
        }

        if (isReady) {
            let payload = {
                email: formData.email,
                password: formData.password
            };

            try {
                const res = await axios.post(`${config.default.URL}/authentication_token`, {
                    email: payload.email,
                    password: payload.password
                });

                if (res.status === 200) {
                    setIsInputLoading(true); // editable
                    setIsButtonEnabled(false); // not disable

                    const t = await AsyncStorage.setItem(
                        'jwt',
                        res.data.token
                    );

                    const me = await axios.post(`${config.default.URL}/me`, {token: res.data.token});

                    if (me.status === 200) {
                        setIsInputLoading(true); // editable
                        setIsButtonEnabled(false); // not disable
                        navigation.navigate('Accueil', {
                            roles: me.data[4].roles
                        });
                    } else {
                        setIsInputLoading(true); // editable
                        setIsButtonEnabled(false); // not disable

                        ToastAndroid.showWithGravity(
                            "Erreur réseaux, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }

                } else if(res.status === 400) {
                    setIsInputLoading(true); // editable
                    setIsButtonEnabled(false); // not disable
                    ToastAndroid.showWithGravity(
                        "Aucun utilisateur pour ces identifiants",
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                } else {
                    setIsInputLoading(true); // editable
                    setIsButtonEnabled(false); // not disable
                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            } catch (e) {
                setIsInputLoading(true); // editable
                setIsButtonEnabled(false); // not disable
                ToastAndroid.showWithGravity(
                    "Erreur réseaux, veuillez réessayer",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }

        } else {
            setIsInputLoading(true); // editable
            setIsButtonEnabled(false); // not disable
        }
    };

    const submitFormRegister = async () => {

        setIsInputLoading(false); // not editable
        setIsButtonEnabled(true); // disable

        const formData = {
            email: email,
            password: password,
            passwordConfirmed: passwordConfirmed
        };

        let isReady = true;

        if (!formData.email || formData.email.trim() === "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) === false) {
            onChangeErrorEmailRegister(true);
            onChangeErrorEmailRegisterMsg("Email non valide");
            isReady = false;
        } else {
            onChangeErrorEmailRegisterMsg("");
            onChangeErrorEmailRegister(false)
        }

        if (!formData.password || formData.password.trim() === "" || formData.password.trim().length < 6) {
            onChangePasswordErrorRegister(true)
            onChangePasswordErrorRegisterMsg("7 caractères minimum")
            isReady = false;
        } else {
            onChangePasswordErrorRegister(false)
            onChangePasswordErrorRegisterMsg("")
        }


        if (!formData.passwordConfirmed || formData.passwordConfirmed.trim() === "") {
            onChangePasswordConfirmedErrorRegister(true)
            isReady = false;
            onChangePasswordConfirmedErrorRegisterMsg("Remplissez votre mot de passe")
        } else {
            onChangePasswordConfirmedErrorRegisterMsg("")
            onChangePasswordConfirmedErrorRegister(false)
        }

        if (formData.passwordConfirmed.trim() !== formData.password.trim()) {
            onChangePasswordConfirmedErrorRegister(true)
            onChangePasswordConfirmedErrorRegisterMsg("Les mots de passe correspondent pas")
            isReady = false;
        } else {
            onChangePasswordConfirmedErrorRegister(false)
            onChangePasswordConfirmedErrorRegisterMsg("")
        }

        if (isReady === true) {
            const ROLES = [
                'ROLE_CANDIDAT',
                'ROLE_RECRUTEUR'
            ];
            let role = isChecked === true ? ROLES[1] : ROLES[0];

            let payload = {
                email: formData.email,
                password: formData.password,
                roles: role
            };

            try {

                const res = await axios.post(`${config.default.URL}/register`, {
                    email: payload.email,
                    password: payload.password,
                    roles: payload.roles
                });

                console.log(payload)

                if (res.status === 200) {

                    const tok = await axios.post(`${config.default.URL}/authentication_token`, {
                        email: payload.email,
                        password: payload.password,
                        roles: payload.roles
                    });

                    if (tok.status === 200) {
                        console.log("TOKEN -> ", tok.data.token);
                        try {
                            await AsyncStorage.setItem(
                                'jwt',
                                tok.data.token
                            );

                            const me = await axios.post(`${config.default.URL}/me`, {token: tok.data.token});

                            if (me.status === 200) {
                                setIsInputLoading(true); // editable
                                setIsButtonEnabled(false); // not disable
                                navigation.navigate('Accueil', {
                                    roles: me.data[4].roles
                                });
                            } else {
                                setIsInputLoading(true); // editable
                                setIsButtonEnabled(false); // not disable

                                ToastAndroid.showWithGravity(
                                    "Erreur réseaux, veuillez réessayer",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            }

                        } catch (error) {

                            setIsInputLoading(true); // editable
                            setIsButtonEnabled(false); // not disable

                            ToastAndroid.showWithGravity(
                                "Erreur réseaux, veuillez réessayer",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                    }

                } else if(res.status === 400) {
                    setIsInputLoading(true); // editable
                    setIsButtonEnabled(false); // not disable

                    ToastAndroid.showWithGravity(
                        "Cet uttilisateur existe déjà",
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                } else {
                    setIsInputLoading(true); // editable
                    setIsButtonEnabled(false); // not disable

                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }

            } catch (e) {
                setIsInputLoading(true); // editable
                setIsButtonEnabled(false); // not disable

                ToastAndroid.showWithGravity(
                    "Erreur réseaux, veuillez réessayer",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        } else {
            setIsInputLoading(true); // editable
            setIsButtonEnabled(false); // not disable
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
                       editable={isInputsLoading}
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
                       editable={isInputsLoading}
            />
            <HelperText
                type="error"
                visible={true}
            >{passwordErrorRegisterMsg}</HelperText>

            <Button icon="lock-open" mode="contained" onPress={() => submitFormLogin()} disabled={isButtonEnabled}>
                Se connecter
            </Button>

            <Button style={{textAlign: 'center', margin: 30}} onPress={() => {
                setIsLogin(false)
            }}> Pas de compte ?</Button>
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
                       editable={isInputsLoading}
            />
            <HelperText
                type="error"
                visible={true}
            >{errorEmailRegisterMsg}</HelperText>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20}}>
                <Text styte={{fontSize: 20}}>Je suis recruteur</Text>
                <Checkbox
                    color="purple"
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        isChecked === true ? onCheck(false) : onCheck(true)
                    }}
                />
            </View>
            <TextInput style={{padding: 5, margin: 10}}
                       label='Mot de passe'
                       value={password}
                       mode={'outlined'}
                       secureTextEntry={true}
                       error={passwordErrorRegister}
                       onChangeText={passwordValue => onChangePassword(passwordValue)}
                       editable={isInputsLoading}
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
                       editable={isInputsLoading}
            />
            <HelperText
                type="error"
                visible={true}
            >{passwordConfirmedErrorRegisterMsg}</HelperText>
            <Divider style={{margin: 30}}/>

            <Button icon="lock-open" mode="contained" onPress={() => submitFormRegister()} disabled={isButtonEnabled}>
                S'enregistrer
            </Button>
            <Button style={{textAlign: 'center', margin: 30}} onPress={() => {
                setIsLogin(true)
            }}> Déjà un compte ?</Button>
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
