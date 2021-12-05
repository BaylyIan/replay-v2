import React, { useState, useEffect, useContext } from 'react';
import { PageContext } from "../../utils/context";

import Button from '../Button'
import Input from '../Input'
import TextArea from '../TextArea'
import TagArea from '../TagArea'

import { Container, PhotoWrap, FormWrap, ButtonWrap, FileLabel, FileInput, TagWrap, PhotoCont } from './style'

import { BsUpload } from 'react-icons/bs'

import { Theme } from '../../styles/theme'
import { useForm } from "react-hook-form";

import axios from 'axios';
import router from 'next/router';
import { useRouter } from 'next/router'
import { useAuth } from '../../utils/authContext'

const CreatePlaylist = ({ closeModal, submit, error }) => {

    const router = useRouter()

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [tags, setTags] = useState([])
    const [file, setFile] = useState()
    const [tempFile, setTempFile] = useState()
    const [value, setValue] = useState('')

    let tempTags = [...tags]
    let ogTags = [...tags]



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
        console.log(file, 'file')
        if (file) {
            setTempFile(URL.createObjectURL(file))
            setFile(file)
        }
    }

    // const submit = async ({ name, desc, tags, file }) => {
    //     console.log('submitted')
    //     if (name === "" || file === undefined) {
    //         setError(true)
    //         return
    //     }
    //     setError(false)
    //     // console.log({ name: name, description: desc, tags: tags, image: file, user: user }, 'HEY')
    //     const result_ = await postImage({ image: file, type: 'playlist' })
    //     const result = await axios.post('http://localhost:4200/api/create_playlist', ({
    //         name: name,
    //         image: result_.imagePath.replace('/playlistImage/', ''),
    //         description: desc,
    //         userId: auth.user.id,
    //         tags: tags
    //     }))

    //     // console.log(result_.imagePath.replace('/playlistImage/', ''), 'upload imagepath')

    //     //new thing to work on - profile page
    //     // router.push('/Profile')
    // }

    return (
        <Container>
            <PhotoWrap onSubmit={submit}>
                <PhotoCont>
                    {tempFile ? <img src={tempFile} /> : <div ><BsUpload size={60} fill={Theme.colors.white} /></div>}
                </PhotoCont>
                <FileInput type='file' name='file' id='file' accept='image/*' onChange={fileSelected}></FileInput>
                <FileLabel htmlFor='file'>
                    <p style={{ color: `${Theme.colors.orange}` }}>Upload a Photo</p>
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
                        placeholder={'Add a tag and press enter (no spaces)'}
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
                    {error ? <p style={{ color: `${Theme.colors.orange}` }}>Please fill out all required fields</p> : null}
                    <ButtonWrap>
                        <Button
                            type='submit'
                            width={'110px'}
                            height={'51px'}
                            text={'Next'}
                            textColor={Theme.colors.orange}
                            border={Theme.colors.orange}
                            bgColor={'transparent'}
                            hoverBgColor={Theme.colors.orange}
                            hoverTextColor={Theme.colors.white}
                            // color={`${Theme.colors.orange}`}
                            onClick={() => { submit({ name, desc, tags, file }); closeModal() }}
                        />
                    </ButtonWrap>
                </div>
            </FormWrap>
        </Container>
    )
}

CreatePlaylist.defualtProps = {
    closeModal: () => { },
    submit: () => { },
    error: false
}

export default CreatePlaylist;