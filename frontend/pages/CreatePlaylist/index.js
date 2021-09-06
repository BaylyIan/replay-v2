import React, { useState, useEffect } from 'react';

import Button from '../../components/Button'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import TagArea from '../../components/TagArea'

import { Container, Wrap, PhotoWrap, FormWrap, ButtonWrap, Photo, TagWrap } from '../../pageStyles/CreatePlaylist/style'

import { BsUpload } from 'react-icons/bs'

import { Theme } from '../../styles/theme'
import { useForm } from "react-hook-form";


const CreatePlaylist = ({ }) => {

    const { register, handleSubmit, errors } = useForm();

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [tags, setTags] = useState([])

    const [value, setValue] = useState()

    let tempTags = [...tags]

    const onSubmit = () => {
        console.log(name, desc, tags, 'submitted')
    }


    const addTag = (e) => {
        if (event.key === 'Enter' || event.key === " " && e.length > 1) {
            if (e.includes(" ") || e === "") return
            tempTags.push({
                text: e
            })
            setValue('')
            setTags(tempTags)
        }
    }

    const removeTag = (index) => {
        // console.log(i, 'page')
        // const tag = tempTags.indexOf(i)
        console.log(index, 'func')
    }

    return (
        <Container>
            <h1>Create Playlist</h1>
            <Wrap>
                <PhotoWrap>
                    <Photo>
                        <BsUpload size={60} fill={Theme.colors.white} />
                    </Photo>
                    <Button
                        width={'200px'}
                        height={'51px'}
                        textColor={`${Theme.colors.orange}`}
                        text={'Upload Photo'}
                        color={`${Theme.colors.medGrey}`}
                    />
                </PhotoWrap>
                <FormWrap>
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <Input
                            placeholder={'Playlist Name'}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <TextArea
                            height={'100px'}
                            placeholder={'Playlist description (optional)'}
                            value={desc}
                            onChange={(e) => {
                                setDesc(e.target.value)
                            }}
                        />
                        <Input
                            label={'Tags'}
                            placeholder={'Add a tag and press enter (can not contain spaces)'}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyPress={(e) => { addTag(e.target.value) }}
                        />
                        <TagWrap>
                            <TagArea
                                arr={tags}
                                deleteTag={(index)=> {
                                    removeTag(index)
                                }}
                            />
                        </TagWrap>
                        <ButtonWrap>
                            <Button
                                onClick={onSubmit}
                                type='submit'
                                width={'110px'}
                                height={'51px'}
                                text={'Next'}
                                textColor={`${Theme.colors.white}`}
                                color={`${Theme.colors.orange}`}
                            />
                        </ButtonWrap>
                    </form>
                </FormWrap>
            </Wrap>
        </Container>
    );
}

export default CreatePlaylist;