import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Card extends Component
{
    static propTypes = {
        applicant: PropTypes.object.isRequired
    };


    formatName(name)
    {
        if(name !== null) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            return 'en attente'
        }
    }



    render()
    {
        const { applicant } = this.props;
        console.log(applicant);

        return (
            <View style={{backgroundColor: 'white', marginBottom: 5, marginLeft: 5, marginRight: 5, padding: 3, borderRadius: 5}}>
                <Text>{this.formatName(applicant.name)}</Text>
            </View>
        );
    }
}

export default Card;
