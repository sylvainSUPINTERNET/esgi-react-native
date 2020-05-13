import React from "react";

import {Text, View, ScrollView, FlatList} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText, List} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen({navigation}) {

    // TODO -> user debra être mis dans le AsyncStorage en se basent sur les données du token
    const [userRole, setUserRole] = React.useState("ROLE_RECRUTEUR");

    const Tab = createBottomTabNavigator();

    const offresData = [
        {
            "id": 1,
            "name": "Développeur PHP",
            "description": "Nous recherchons un développeur PHP avec au moins 3 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Paris"
        },
        {
            "id": 2,
            "name": "Développeur JS",
            "description": "Nous recherchons un développeur JS avec au moins 5 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Rouen"
        },
        {
            "id": 3,
            "name": "Développeur C#",
            "description": "Nous recherchons un développeur C# avec au moins 10 ans d'expérience.",
            "companyDescription": "Bonne ambiance.",
            "startAt": "2020-05-13T09:58:30+00:00",
            "workingPlace": "Nancy"
        }
    ];

    function Item({ name,  applies}) {
        return (
            <View style={{margin: 15, padding: 10}}>

            <List.Item
                title={name}
            />
            <Button icon={"message"} mode="contained" onPress={() => {navigation.navigate('OfferApplies', {offerApplies: applies})}}>Voir les candidats</Button>
            </View>
        );
    }

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


        const [startAt, onStartAtChange] = React.useState("");
        const [startAtError, onstartAtError] = React.useState(false);
        const [startAtErrorMsg, onstartAtErrorMsg] = React.useState("");

        const [workingPlace, onWorkingPlaceChange] = React.useState("");
        const [workingPlaceError, onWorkingPlaceError] = React.useState(false);
        const [workingPlaceErrorErrorMsg, onWorkingPlaceErrorChangeErrorMsg] = React.useState("");


        const onSubmit = async () => {
            const payload = {
                name: name
            };

            let isReady = true


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
                                   label='Description'
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
                                   label='Emplacement'
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
                            style={{width: 200}}
                            date={"2016-05-15"}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
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
                            onDateChange={(date) => { onStartAtChange(date)}}
                        />

                    </View>
                </ScrollView>
            </ScrollView>
        );
    }

    function RecruteurOfferScreen() {

        let mesOffres = <Text>Aucune offre</Text>;

        if (offresData.length > 0)
        {
            mesOffres = <FlatList
                            data={offresData}
                            renderItem={({ item }) => <Item name={item.name} applies={['test']}/>}
                            keyExtractor={item => item.id}
                        />;
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
                    {mesOffres}
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
    } else if (userRole === "ROLE_RECRUTEUR") {
        renderScreen = homeRecruteur
    } else {
        navigation.navigate('Authentication')
    }


    return (
        renderScreen
    );
}

export default HomeScreen;
