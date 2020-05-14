import React from "react";

import {Text, View, ScrollView, FlatList} from "react-native";
import {Appbar, List, Button, Divider} from "react-native-paper";

function InvitationsScreen({ navigation }) {


    // TODO -> user debra être mis dans le AsyncStorage en se basent sur les données du token
    const [userRole, setUserRole] = React.useState("ROLE_RECRUTEUR");

    const [usersList, setUsersList] = React.useState([]);

    function sendInvit(email){
        let tk = Math.random().toString(36).substr(2);
        let tokeninv =`${tk}`;
        console.log("SEND INVIT TO " + email + " tk : " + tokeninv)
    }

    function Item({ email, username, roles }) {
        return (
            <View style={{margin: 15, padding: 10}}>
            <List.Item
                title={username}
                description={email}
                left={props => <List.Icon {...props} icon="rocket" />}
            />
            <Button icon={"message"} mode="contained" onPress={() => {sendInvit(email)}}>Inviter</Button>
            </View>
        );
    }

    const usersMock = [
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/2",
            "@type": "User",
            "id": 2,
            "email": "recruteur@recruteur.com",
            "username": "recruteur@recruteur.com",
            "roles": [
                "ROLE_RECRUTEUR"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$bE16dzc1M1l0ZFlWNUQ2Rw$d7Q1LYbjgCPHVRttoNCMz5vztQEx3uMQz/OHNIvEW7c"
        },
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        },
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        },
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        },
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        },
        {
            "@id": "/users/1",
            "@type": "User",
            "id": 1,
            "email": "candidat@candidat.com",
            "username": "candidat@candidat.com",
            "roles": [
                "ROLE_CANDIDAT"
            ],
            "password": "$argon2i$v=19$m=65536,t=4,p=1$RlpoMzNSTGIzVzFIL2d2WQ$hyMney1Qzkqg2qL1IZvZVCszl62B54Cpt83hSCtJpqQ"
        }
    ];

    function InvCandidatView(){
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
    
    function InvRecruteurView(){
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
                    data={usersMock}
                    renderItem={({ item }) => <Item email={item.email} username={item.username} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>)
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

    );
}

export default InvitationsScreen;
