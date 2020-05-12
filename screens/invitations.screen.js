import React from "react";

import {Text, View, Button} from "react-native";

function InvitationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}


export default InvitationsScreen;
