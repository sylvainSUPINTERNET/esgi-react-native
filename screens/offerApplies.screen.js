import React from "react";

import {Text, View, ScrollView, FlatList} from "react-native";
import {Appbar, Button, TextInput, Divider, Checkbox, HelperText, List} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function OfferAppliesScreen({navigation, route}) {

    // TODO -> user debra être mis dans le AsyncStorage en se basent sur les données du token
    const [userRole, setUserRole] = React.useState("ROLE_RECRUTEUR");

    const applies = route.params;

    function screenContent({navigation})
    {

    }

    if (userRole === "ROLE_RECRUTEUR")
    {
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
                   <Text>teeest</Text>
                   <Text>{JSON.stringify(applies)}</Text>
               </View>
            </ScrollView>
        );
    }
    else
    {
        navigation.navigate('Authentication')
    }
}

export default OfferAppliesScreen;
