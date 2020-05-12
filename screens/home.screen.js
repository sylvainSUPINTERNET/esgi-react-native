import React from "react";

import {Text, View, ScrollView} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText} from 'react-native-paper';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen({navigation}) {

    // TODO -> user debra être mis dans le AsyncStorage en se basent sur les données du token
    const [userRole, setUserRole] = React.useState("ROLE_RECRUTEUR");

    const Tab = createBottomTabNavigator();


    function Recruteur() {
        return <Tab.Navigator>
            <Tab.Screen name="Ajouter une offre" component={HomeRecruteurScreen}/>
            <Tab.Screen name="Mes offres" component={RecruteurOfferScreen}/>
        </Tab.Navigator>
    }
    function HomeRecruteurScreen() {
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
                        />
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
