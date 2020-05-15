import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Card from '../components/Card';

class List extends Component
{
    static propTypes = {
        status: PropTypes.string.isRequired,
        applicants: PropTypes.array.isRequired
    };

    render()
    {
        const { status, applicants } = this.props;
        Object.keys(applicants).map(key =>
        { console.log(" -----> L" ,applicants); }
        );
        const cards = Object.keys(applicants).map(key =>
            <Card applicant={applicants[key]} />
        );

        return (
            <View style={{width: 200, backgroundColor: '#e3e4e6', marginRight: 10, borderRadius: 5, display: 'flex', flexDirection: 'column', height: 'auto', flexGrow: 0, overflowY: 'scroll'}}>
                <Text style={{padding: 5, fontWeight: 'bold'}}>{status}</Text>
                <ScrollView>
                    {cards}
                </ScrollView>
            </View>
        );
    }
}

export default List;
