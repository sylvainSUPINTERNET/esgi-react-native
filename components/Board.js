import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';

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
            <List status={key} applicants={appliesByStatus[key]} />
        );

        return (
            <ScrollView horizontal style={{display: 'flex', flexDirection: 'row', padding: 10, overflowX: 'scroll', width: '100%', boxSizing: 'border-box', maxHeight: 500}}>
                {lists}
            </ScrollView>
        );
    }
}

export default Board;
