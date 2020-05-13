import React from "react";

import {Text, View, ScrollView, ToastAndroid} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText, Card, Title, Paragraph} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import {AsyncStorage} from 'react-native';
import axios from 'axios';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {isLogged} from "./authCheck";
import * as config from "../api/config";

function HomeScreen({route, navigation}) {

    const [userRole, setUserRole] = React.useState("LOADING");

    /*
    React.useEffect(async () => {
        console.log("HOME USE EFFECT");

            const logged = await isLogged();
            console.log(logged);
            if(logged === "") {
                navigation.navigate('Authentication')
            } else {
                console.log("LOGGED", logged);
                setUserRole(logged)
            }
            console.log("LOG", logged)


    }, []);
     */

    React.useEffect( () => {

        if(route.params) {
            const {roles} = route.params
            console.log(roles);
            setUserRole(roles)
        } else {
            navigation.navigate('Authentication')
        }

    });

    const Tab = createBottomTabNavigator();



    function Recruteur() {
        return <Tab.Navigator>
            <Tab.Screen name="Ajouter une offre" component={HomeRecruteurScreen}/>
            <Tab.Screen name="Mes offres" component={RecruteurOfferScreen}/>
        </Tab.Navigator>
    }

    function HomeRecruteurScreen() {

        const [name, onNameChange] = React.useState("");
        const [nameError, onNameChangeError] = React.useState(false);
        const [nameErrorMsg, onNameChangeErrorMsg] = React.useState("");

        const [description, onDescriptionChange] = React.useState("");
        const [descriptionError, onDescriptionError] = React.useState(false);
        const [descriptionErrorMsg, onDescriptionChangeErrorMsg] = React.useState("");


        const [descriptionCompany, onDescriptionCompanyChange] = React.useState("");
        const [descriptionCompanyError, onDescriptionCompanyError] = React.useState(false);
        const [descriptionCompanyErrorMsg, onDescriptionCompanyChangeErrorMsg] = React.useState("");


        const [startAt, onStartAtChange] = React.useState(today());
        const [startAtError, onstartAtError] = React.useState(false);
        const [startAtErrorMsg, onstartAtErrorMsg] = React.useState("");

        const [workingPlace, onWorkingPlaceChange] = React.useState("");
        const [workingPlaceError, onWorkingPlaceError] = React.useState(false);
        const [workingPlaceErrorErrorMsg, onWorkingPlaceErrorChangeErrorMsg] = React.useState("");

        const [contract, onChangeContract] = React.useState("");
        const [contractError, onChangeContractError] = React.useState(false);
        const [contractErrorMsg, onChangeContractErrorMsg] = React.useState("");

        const [btnDisabled, onSetBtnDisabled] = React.useState(false);

        const [date, setDate] = React.useState(today())


        function today(){
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10)
            {
                dd='0'+dd;
            }

            if(mm<10)
            {
                mm='0'+mm;
            }

            return today = yyyy+'-'+mm+'-'+dd;

        }

        const onSubmit = async () => {
            onSetBtnDisabled(true);

            const payload = {
                name: name,
                description: description,
                companyDescription: descriptionCompany,
                startAt: startAt,
                workingPlace: workingPlace,
                contract: contract
            };

            let isReady = true;

            if(!payload.name || payload.name.trim() === "") {
                onNameChangeError(true);
                onNameChangeErrorMsg("Nom invalide")
                isReady = false;
            } else {
                onNameChangeError(false);
                onNameChangeErrorMsg("")
            }

            if(!payload.description || payload.description.trim() === "") {
                onDescriptionError(true);
                onDescriptionChangeErrorMsg("Description offre invalide")
                isReady = false;
            } else {
                onDescriptionError(false);
                onDescriptionChangeErrorMsg("")
            }

            if(!payload.companyDescription || payload.companyDescription.trim() === "") {
                onDescriptionCompanyError(true);
                onDescriptionCompanyChangeErrorMsg("Description entreprise invalide")
                isReady = false;
            } else {
                onDescriptionError(false);
                onDescriptionCompanyChangeErrorMsg("")
            }

            if(!payload.contract || payload.contract.trim() === "") {
                onChangeContractError(true);
                onChangeContractErrorMsg("Type de contrat invalide")
                isReady = false;
            } else {
                onChangeContractError(false);
                onChangeContractErrorMsg("")
            }

            if(!payload.workingPlace || payload.workingPlace.trim() === "") {
                onWorkingPlaceError(true);
                onWorkingPlaceErrorChangeErrorMsg("Lieu de travail invalide")
                isReady = false;
            } else {
                onWorkingPlaceError(false);
                onWorkingPlaceErrorChangeErrorMsg("")
            }

            if(isReady === false) {
                onSetBtnDisabled(false) // release
            } else {
                
                try {
                    const t = await AsyncStorage.getItem('jwt');
                    if(t === null) {
                        navigation.navigate('Acceuil')
                    } else {
                        const me = await axios.post(`${config.default.URL}/me`, {token: t});

                        if(me.status === 200 || me.status === 201) {
                            const id = me.data[5].id;

                            payload["user"] = "/users/"+id; // IRI

                            const resp = await axios.post(`${config.default.URL}/offres`,payload, {
                                headers: {
                                    'Authorization': `Bearer ${t}`,
                                    'Content-type': 'application/json'
                                }
                            });

                            if(resp.status === 200 || resp.status === 201) {
                                onSetBtnDisabled(false); // release
                                navigation.navigate('Invitations', {offreIdTargetIRI: resp.data["@id"], userRole: userRole});
                            } else{
                                onSetBtnDisabled(false); // release
                                ToastAndroid.showWithGravity(
                                    "Erreur réseaux, veuillez réessayer",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            }
                        } else {
                            onSetBtnDisabled(false); // release
                            ToastAndroid.showWithGravity(
                                "Erreur réseaux, veuillez réessayer",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                    }
                } catch(e) {
                    onSetBtnDisabled(false); // release
                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }


        };

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
                <ScrollView>
                    <View style={{paddingTop: 15, margin: 30}}>
                        <TextInput style={{padding: 5, margin: 10}}
                                   label='Nom'
                                   value={name}
                                   mode={'outlined'}
                                   error={nameError}
                                   onChangeText={nameValue => onNameChange(nameValue)}
                        />
                        <HelperText
                            type="error"
                            visible={true}
                        >{nameErrorMsg}</HelperText>

                        <TextInput style={{padding: 5, margin: 10}}
                                   label='Description offre'
                                   value={description}
                                   mode={'outlined'}
                                   error={descriptionError}
                                   onChangeText={descriptionValue => onDescriptionChange(descriptionValue)}
                        />
                        <HelperText
                            type="error"
                            visible={true}
                        >{descriptionErrorMsg}</HelperText>


                        <TextInput style={{padding: 5, margin: 10}}
                                   label='Description entreprise'
                                   value={descriptionCompany}
                                   mode={'outlined'}
                                   error={descriptionCompanyError}
                                   onChangeText={descriptionCompanyValue => onDescriptionCompanyChange(descriptionCompanyValue)}
                        />
                        <HelperText
                            type="error"
                            visible={true}
                        >{descriptionCompanyErrorMsg}</HelperText>

                        <TextInput style={{padding: 5, margin: 10}}
                                   label='Type de contrat'
                                   value={contract}
                                   mode={'outlined'}
                                   error={contractError}
                                   onChangeText={contractValue => onChangeContract(contractValue)}
                        />
                        <HelperText
                            type="error"
                            visible={true}
                        >{contractErrorMsg}</HelperText>

                        <TextInput style={{padding: 5, margin: 10}}
                                   label='Lieu de travail'
                                   value={workingPlace}
                                   mode={'outlined'}
                                   error={workingPlaceError}
                                   onChangeText={workingPlaceValue => onWorkingPlaceChange(workingPlaceValue)}
                        />
                        <HelperText
                            type="error"
                            visible={true}
                        >{workingPlaceErrorErrorMsg}</HelperText>
                        <DatePicker
                            style={{width: 300}}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {
                                onStartAtChange(date)
                            }}
                        />

                        <Button style={{marginTop:50, marginBottom: 50}} mode="contained" onPress={() => onSubmit()} disabled={btnDisabled}>
                            Confirmer
                        </Button>
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }

    function RecruteurOfferScreen() {
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
                    <Text>Mes offres</Text>
                </View>
            </ScrollView>
        );
    }


    function Candidat() {
        return <Tab.Navigator>
            <Tab.Screen name="Invitation" component={HomeCandidatScreen}/>
            <Tab.Screen name="Mes offres" component={CandidatOfferScreen}/>
        </Tab.Navigator>
    }

    function HomeCandidatScreen() {
        const [code, onChangeCode] = React.useState('');

        const [loading, onSetLoading] = React.useState(false);
        const [disabled, setDisabled] = React.useState(false);


        const onSubmitCode = async() => {
            onSetLoading(true);
            setDisabled(true);
            const t = await AsyncStorage.getItem('jwt');
            if(t === null) {
                navigation.navigate('Authentication')
            } else {
                try {
                    const me = await axios.post(`${config.default.URL}/me`, {token: t});
                    if(me.status === 200 || me.status === 201 ) {
                        let userIri = `/users/${me.data[5].id}`;

                        const invitByToken = await axios.get(`${config.default.URL}/invits?token=${code}`, {
                            headers: {
                                'Authorization': `Bearer ${t}`,
                                'Content-type': 'application/json'
                            }
                        });


                        if(invitByToken.status === 200 || invitByToken.status === 201) {
                            if(invitByToken.data["hydra:totalItems"] === 0) {
                                ToastAndroid.showWithGravity(
                                    "Code invalide",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            } else {

                                const responseApply = await axios.post(`${config.default.URL}/applies`, {
                                    "status": "open",
                                    "email": me.data[4].email,
                                    "user": `/users/${me.data[5].id}`
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${t}`,
                                        'Content-type': 'application/json'
                                    }
                                });

                                const putOffre = await axios.put(`${config.default.URL}/offres/${invitByToken.data["hydra:member"][0]["offre"]["id"]}`, {
                                    applies:[`${responseApply.data["@id"]}`]
                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${t}`,
                                        'Content-type': 'application/json'
                                    }
                                });

                                if(putOffre.status === 200 || putOffre.status === 201) {
                                    navigation.navigate('Mes offres')
                                } else {
                                    ToastAndroid.showWithGravity(
                                        "Une erreur est survenue. Veuillez réessayer.",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.CENTER
                                    );
                                }
                            }
                        } else {
                            ToastAndroid.showWithGravity(
                                "Code invalide",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }

                    } else {
                        onSetLoading(false);
                        setDisabled(false);
                        ToastAndroid.showWithGravity(
                            "Une erreur est survenue, veuillez réessayer",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                } catch(e) {
                    onSetLoading(false);
                    setDisabled(false);
                     ToastAndroid.showWithGravity(
                        "Code invalide",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }

        };

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
                <View style={{paddingTop: 30, margin: 30}}>
                    <Text style={{textAlign: 'center', fontSize: 30}}>Code invitation ?</Text>
                    <HelperText
                        type="info"
                        visible={true}>Vous recevez vos codes via votre email d'inscription</HelperText>
                    <Divider style={{margin : 20}}/>
                    <Card style={{padding: 5, marginTop: 30}}>
                        <Card.Content>
                            <TextInput style={{padding: 15, fontSize: 40}}
                                onChangeText={newCode => onChangeCode(newCode)}
                                value={code}
                            />
                        </Card.Content>
                    </Card>
                    <Button style={{marginTop: 30}} icon="ticket" mode="contained" disabled={disabled} loading={loading} onPress={() => onSubmitCode()}>
                        Envoyer
                    </Button>
                </View>
            </ScrollView>
        );
    }

    function CandidatOfferScreen() {
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
                </View>
            </ScrollView>
        );
    }



    const homeCandidat = Candidat();
    const homeRecruteur = Recruteur();



    let renderScreen;

    if (userRole === "ROLE_CANDIDAT") {
        renderScreen = homeCandidat
    } else {
        renderScreen = homeRecruteur
    }


    return (
        renderScreen
    );
}

export default HomeScreen;
