import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class List extends Component
{
    static propTypes = {
        status: PropTypes.string.isRequired,
        applicants: PropTypes.array.isRequired
    };

    render()
    {
        const { status, applicants } = this.props;

        return (
            <Text>{status}</Text>
        );
    }
}

export default List;