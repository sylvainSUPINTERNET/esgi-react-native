/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'purple',
    accent: 'blue',
  },
};

import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from "./screens/home.screen";
import InvitationsScreen from "./screens/invitations.screen";
import AuthScreen from "./screens/auth.screen";
import OfferAppliesScreen from "./screens/offerApplies.screen";

const Drawer = createDrawerNavigator();


const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView/>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Authentication">


                        <Drawer.Screen name="Authentication" component={AuthScreen} options={{ drawerLabel: 'Compte' }}/>
                        <Drawer.Screen name="Accueil" component={HomeScreen} options={{ drawerLabel: 'Dashboard' }}/>
                        <Drawer.Screen name="Invitations" component={InvitationsScreen} options={{ drawerLabel: 'Invitation' }}/>
                        <Drawer.Screen name="OfferApplies" component={OfferAppliesScreen} options={{ drawerLabel: 'Offres' }}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
