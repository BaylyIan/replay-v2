import React, { useState, useEffect, useContext } from 'react';
import { PageContext } from "../../utils/context";

import Button from '../../components/Button'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import TagArea from '../../components/TagArea'

import { Container, Wrap, PhotoWrap, FormWrap, ButtonWrap, FileLabel, FileInput, TagWrap, Pic } from '../../pageStyles/CreatePlaylist/style'

import { BsUpload } from 'react-icons/bs'

import { Theme } from '../../styles/theme'
import { useForm } from "react-hook-form";

import { postImage } from '../../utils'
import axios from 'axios';


const CreatePlaylist = ({ }) => {

    const { register, handleSubmit, errors } = useForm();

    const { user } = useContext(PageContext);

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [tags, setTags] = useState([])
    const [file, setFile] = useState()
    const [tempFile, setTempFile] = useState()
    const [value, setValue] = useState()

    let tempTags = [...tags]
    let ogTags = [...tags]

    const onSubmit = () => {
        // console.log(name, desc, tags, 'submitted')
    }

    //need to check f user is logged in, if not show a login modal
    useEffect(() => {
        console.log(user, 'user')
    }, [user])


    const addTag = (e) => {
        if (event.key === 'Enter' || event.key === " " && e.length > 1) {
            if (e.includes(" ") || e === "") return
            tempTags.push({
                text: e
            })
            setValue('')
            // console.log(tempTags)
            setTags(tempTags)
        }
    }

    const removeTag = (tag) => {
        for (let i = 0; i < tempTags.length; i++) {
            if (tag === tempTags.indexOf(tempTags[i])) {
                tempTags.splice(tag, 1)
            }
        }
        setTags(tempTags)
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        // console.log(file, 'file')
        if (file) {
            setTempFile(URL.createObjectURL(file))
            setFile(file)
        }
    }

    const submit = async ({ name, desc, tags, file }) => {

        console.log({ name: name, description: desc, tags: tags, image: file })
        const result = await axios.post('http://localhost:4200/api/create_playlist', ({
            name:name,
            image:file.name,
            description:desc,
            userId:user.id,
            tags:tags
        }))
        console.log(result)
        // const result = await postImage({image: file, type:'playlist'})
        // console.log(result)

    }

    return (
        <Container>
            <h1>Create Playlist</h1>
            <Wrap>
                <PhotoWrap onSubmit={submit}>
                    <FileInput type='file' name='file' id='file' accept='image/*' onChange={fileSelected}></FileInput>
                    {tempFile ? <img src={tempFile} /> : <div ><BsUpload size={60} fill={Theme.colors.white} /></div>}
                    <FileLabel for='file'>
                        <p style={{ color: `${Theme.colors.orange}` }}>Upload Photo</p>
                    </FileLabel>
                </PhotoWrap>
                <FormWrap>
                    <div>
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
                                deleteTag={(tag) => {
                                    removeTag(tag)
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
                                onClick={() => submit({ name, desc, tags, file })}
                            />
                        </ButtonWrap>
                    </div>
                </FormWrap>
            </Wrap>
        </Container>
    );
}

export default CreatePlaylist;