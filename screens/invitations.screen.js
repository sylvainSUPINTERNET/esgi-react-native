import React from "react";

import {Text, View, ScrollView, FlatList, AsyncStorage, ToastAndroid} from "react-native";
import {Appbar, List, Button, Divider,Card} from "react-native-paper";
import axios from "axios";
import * as config from "../api/config";

function InvitationsScreen({navigation, route}) {

    const [offerIRITarget, setOfferTarget] = React.useState(null);
    const [userRole, setUserRole] = React.useState("ROLE_RECRUTEUR");
    const [usersList, setUsersList] = React.useState([]);


    async function apiPreProcess(){
        if (route.params) {
            const {userRole} = route.params;
            const {offreIdTargetIRI} = route.params;

            setUserRole(userRole);
            setOfferTarget(offreIdTargetIRI);

            const t = await AsyncStorage.getItem('jwt');
            if (t === null) {
                navigation.navigate('Acceuil')
            } else {
                const resp = await axios.get(`${config.default.URL}/users`, {
                    headers: {
                        'Authorization': `Bearer ${t}`,
                        'Content-type': 'application/json'
                    }
                });

                let candidats = resp.data["hydra:member"].filter(el => {
                    return el.roles[0] !== "ROLE_RECRUTEUR"
                });
                setUsersList(candidats);

            }

            // GET TOKEN
            // GET USERS LIST -> filter on role === role_candidat

        } else {
            navigation.navigate('Authentication')
        }
    }
    React.useEffect( () => {
        apiPreProcess();

        return () => {
            console.log("unmount")
        }
    }, []);

    console.log("TARGET OFFER : ", offerIRITarget);
    console.log("USER ROLE : ", userRole);


    async function sendInvit(email) {
        let tk = Math.random().toString(36).substr(2);
        let tokeninv = `${tk}`;

        //setUsersList(usersList.filter(el => el.email !== email));

        try {
            const t = await AsyncStorage.getItem('jwt');
            console.log(route.params.offreIdTargetIRI)

            const resp = await axios.post(`${config.default.URL}/invits`, {
                email : email,
                offre: `${route.params.offreIdTargetIRI}`,
                token: tokeninv
            },{
                headers: {
                    'Authorization': `Bearer ${t}`,
                    'Content-type': 'application/json'
                }
            });
            if(resp.status === 200 || resp.status === 201) {
                console.log("ici")
                console.log(resp.status !== 200);

                ToastAndroid.showWithGravity(
                    `Invitation envoyé à ${email}`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            } else {
                ToastAndroid.showWithGravity(
                    "Erreur réseaux, veuillez réessayer",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        }  catch (e) {
            ToastAndroid.showWithGravity(
                "Erreur réseaux, veuillez réessayer",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        console.log("SEND INVIT TO " + email + " tk : " + tokeninv)
    }

    function Item({email}) {
        return (
            <Card style={{margin: 15, padding: 10}}>
                <Card.Content>
                <List.Item
                    title={email}
                    left={props => <List.Icon {...props} icon="account-arrow-right"/>}
                />

                <Button mode="contained" onPress={() => {
                    sendInvit(email)
                }} disabled={false}>Inviter</Button>

                </Card.Content>
            </Card>
        );
    }

    function InvCandidatView() {
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
                    <Text>Invitations - Candidat</Text>
                </View>
            </ScrollView>
        )
    }

    function InvRecruteurView() {
        if (usersList.length === 0) {
            return (<ScrollView>
                <Appbar.Header>
                    <Appbar.Action icon="menu" onPress={() => {
                        navigation.openDrawer()
                    }}/>

                    <Appbar.Content
                        title="Recruiter"
                        subtitle="L'application pour les recruteurs !"
                    />
                </Appbar.Header>
                <View style={{
                    marginTop: 200, alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text>Tous les candidats sont invités.</Text>
                </View>
            </ScrollView>)
        } else {
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
                    <View style={{paddingTop: 0, margin: 10}}>
                        <FlatList
                            data={usersList}
                            renderItem={({item}) => <Item email={item.email}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    const invCandidat = InvCandidatView();
    const invRecruteur = InvRecruteurView();

    let renderScreen;

    if (userRole === "ROLE_CANDIDAT") {
        renderScreen = invCandidat
    } else if (userRole === "ROLE_RECRUTEUR") {
        renderScreen = invRecruteur
    } else {
        navigation.navigate('Authentication')
    }


    return (
        renderScreen
    );
}


export default InvitationsScreen;
