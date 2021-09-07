import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'

import Tag from '../Tag'


const TagArea = ({ arr, deleteTag }) => {

    return (
        <Container>
            {arr && arr.length !== 0 ? arr.map((o, i) => {
                return (
                    <Tag
                        key={i}
                        text={o.text}
                        showClose={true}
                        deleteTag={() => {
                            deleteTag(i)
                        }}>
                    </Tag>
                )
            }) : null}
        </Container>
    );
}

TagArea.defaultProps = {
    deleteTag: () => { }
}

TagArea.propTypes = {

}

export default TagArea;