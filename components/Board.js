import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import List from '../components/List';

class Board extends Component
{
    static propTypes = {
        applies: PropTypes.object.isRequired
    };

    render()
    {
        const { applies } = this.props;

        const appliesByStatus = {};

        applies.forEach(apply => {
            if (!Object.keys(appliesByStatus).includes(apply.status))
            {
                appliesByStatus[apply.status] = [];
            }

            appliesByStatus[apply.status].push(apply);
        });

        const lists = Object.keys(appliesByStatus).map(key =>
            //<Text>{JSON.stringify(appliesByStatus[key])}</Text>
            <List status={key} applicants={appliesByStatus[key]} />
        );

        return (
            <Text>
                {lists}
            </Text>
        );
    }
}

export default Board;