import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './style'

import Tag from '../Tag'


const TagArea = ({ arr, deleteTag }) => {

    return (
        <Container>
            {arr && arr.length !== 0 ? arr.map((o, i) => {
               const index = Object.assign({}, o, { id: i })
                return (
                    <Tag
                        key={index}
                        text={o.text}
                        showClose={true}
                        deleteTag={()=>{
                            deleteTag(index)
                        }}>
                    </Tag>
                )
            }) : null}
        </Container>
    );
}

TagArea.defaultProps = {
    deleteTag:()=>{}
}

TagArea.propTypes = {

}

export default TagArea;