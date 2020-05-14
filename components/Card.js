import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Card extends Component
{
    static propTypes = {
        applicant: PropTypes.object.isRequired
    };

    formatName(firstname, lastname)
    {
        return firstname.charAt(0).toUpperCase() + firstname.slice(1) + ' ' + lastname.toUpperCase();
    }

    render()
    {
        const { applicant } = this.props;

        return (
            <View style={{backgroundColor: 'white', marginBottom: 5, marginLeft: 5, marginRight: 5, padding: 3, borderRadius: 5}}>
                <Text>{this.formatName(applicant.firstname, applicant.name)}</Text>
            </View>
        );
    }
}

export default Card;