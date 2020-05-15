import React from "react";

import {Text, View, ScrollView, FlatList, AsyncStorage, ToastAndroid} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText, List, Card, Paragraph} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Board from '../components/Board';

import axios from 'axios';

import * as config from "../api/config";

function OfferAppliesScreen({navigation, route}) {

    const [data, setData] = React.useState([]);

    async function api() {

        try {
            const t = await AsyncStorage.getItem('jwt');

            if(t === null) {
                navigation.navigate('Authentication')
            } else {
                console.log("oK")

                const {offerApplies} = route.params;
                const iri = encodeURIComponent(`/offers${offerApplies["id"]}`);
                const req = await axios.get(`${config.default.URL}/applies?offer=${iri}`, {
                    headers: {
                        'Authorization': `Bearer ${t}`,
                        'Content-type': 'application/json'
                    }
                });

                if(req.status === 200 || req.status === 201) {
                    console.log(req);
                    console.log(`${config.default.URL}/applies?offer=${iri}`)
                    console.log(iri)
                    setData(req.data["hydra:member"]);
                } else {
                    ToastAndroid.showWithGravity(
                        "Erreur réseaux, veuillez réessayer",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            }
        } catch(e){
            console.log(e)
            ToastAndroid.showWithGravity(
                "Erreur réseaux, veuillez réessayer",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }
    console.log(route.params)

    React.useEffect( () => {
        api()
        console.log("called")
    });


    console.log("DATA",data);


    // const applies = route.params;
    const applies = [
        {
            name: "Denisot",
            firstname: "Quentin",
            status: "Created"
        },
        {
            name: "Joly",
            firstname: "Sylvain",
            status: "Validated"
        },
        {
            name: "Mallet",
            firstname: "Thomas",
            status: "Canceled"
        },
        {
            name: "Smith",
            firstname: "John",
            status: "Validated"
        },
        {
            name: "Martin",
            firstname: "Jacques",
            status: "Created"
        },
        {
            name: "Dupont",
            firstname: "Michel",
            status: "Validated"
        }
    ];

    console.log("LENGTH",data.length);
    console.log("------ - -- - -- - -- -")
    console.log("------ - -- - -- - -- -")
    console.log("------ - -- - -- - -- -")
    console.log("------ - -- - -- - -- -")

    console.log(data);
    console.log("------ - -- - -- - -- -")

    if(data.length <= 1) {
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
                <Card>
                    <Card.Content>
                        <Paragraph>Pas d'offres pour le moment</Paragraph>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>)
    } else {
        console.log("ENTER ICI -------")
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
            <View style={{}}>
                <Board applies={data} />
            </View>
        </ScrollView>)
    }


    /*
        let content = <Text>Aucune candidature</Text>;

        if (applies.length > 0)
        {
            content = <Board applies={applies} />;
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
               <View>
                   <View>{content}</View>
               </View>
            </ScrollView>
        );
     */
}

export default OfferAppliesScreen;
