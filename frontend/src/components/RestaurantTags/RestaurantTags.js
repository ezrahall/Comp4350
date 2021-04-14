import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Divider } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import nookies from 'nookies'
import axios from 'axios'

import Tags from '../Tags/Tags'
import { tags } from '../../data/Tags/Tags'


const RestaurantTags = () => {

    useEffect(() => {
        getTags()
    }, [])

    const history = useHistory()
    const [selectedTags, setSelectedTags] = useState([])
    const [openError, setOpenError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSelectItem = (tagName) => {
        if(!selectedTags.find((tag) => tag.name == tagName)) {
            handleUpdateTags(tagName)
        }
    }

    const handleRemoveItem = (tagName) => {
        const cookies = nookies.get('jwt_token')
        const tagToRemove = selectedTags.find((tag) => tag.name == tagName)
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Delete/Tag`, {
            cookies: cookies,
            id: tagToRemove.id,
        })
        .then((resp) => {
            const statusCode = resp.status
            const data = resp.data
            if (statusCode == 200) {
                nookies.set(null, 'jwt_token', data.jwt_token)
            }
            getTags()
        })
        .catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        history.push('./login')
                        break

                    case 404:
                    case 500:
                        setOpenError(true)
                        setErrorMessage('Trouble removing that tag, please try again')
                        break
                }
            }
        })
    }

    const handleUpdateTags = (tagName) => {
        const cookies = nookies.get('jwt_token')
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Create/Tag`, {
            cookies: cookies,
            tag: tagName,
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
                    nookies.set(null, 'jwt_token', data.jwt_token)
                }
                getTags()
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            history.push('./login')
                            break

                        case 404:
                        case 500:
                            setOpenError(true)
                            setErrorMessage('Trouble adding that tag, please try again')
                            break
                    }
                }
            })
    }

    const getTags = () => {

        const cookies = nookies.get('jwt_token')
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Tag/Data`, {
            cookies: cookies
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data 
                if (statusCode == 200) {                                   
                    setSelectedTags(data.tags.map((tag) => {
                        const tagImage = tags.find((theTag) => theTag.name == tag.name).img
                        return {...tag, img: tagImage}
                    }))
                    nookies.set(null, 'jwt_token', data.jwt_token)
                }
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            history.push('./login')
                            break

                        case 404:
                        case 500:
                            setOpenError(true)
                            setErrorMessage('Trouble loading your tags, please try again')
                            break
                    }
                }
            })
    }

    return (
        <div>
            { openError && 
                <Alert 
                    variant='filled' 
                    severity='error' 
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={() => {
                                setOpenError(false);
                            }}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            }
            <h1>Click on a tag here to add that to your restaurant menu tags</h1>
            <Tags selectItem={handleSelectItem} title='Cuisine Categories'/>
            <br />
            <Divider />
            <br />
            <h1>Click on a tag here to remove it from your restaurant menu tags</h1>
            { selectedTags.length > 0 && <Tags selectItem={handleRemoveItem} title='My Tag Categories' tags={selectedTags}/> }
            <br />
        </div>
    )
}

export default RestaurantTags