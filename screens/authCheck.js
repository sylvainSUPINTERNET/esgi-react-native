'use strict';

import {AsyncStorage} from "react-native";
import axios from "axios";
import * as config from "../api/config";




export const isLogged = async () => {
    const t = await AsyncStorage.getItem('jwt');
    if(t === null) {
        return ""
    } else {
        try {
            const me = await axios.post(`${config.default.URL}/me`, {token: t});
            if(me.status ===200) {
                console.log("DATA", me.data);
                return me.data[4].roles
            } else {
                return ""
            }
        } catch(e) {
            return ""
        }

    }
};

