import { React, useState, } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import styles from '../../assets/styles/AutoComplete.module.css'

const AutoCompleteTextField = (props) => {
    const [theToken, setTheToken] = useState('')
    const [completions, setCompletions] = useState([])
    const [display, setDisplay] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleAddressChange = async (address) => {
        props.callback(address)
        try{
            const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search/Autocomplete`, {
                addr: address,
                token: theToken,
            })

            const data = resp.data
            setCompletions(data.completions)
            setTheToken(data.token)
            setDisplay(true)
        } 
        catch (error) {
            setCompletions([])
            setDisplay(false)
        }
    }
    
    const handleCB = (e, i) => {
        const add = e.target.innerHTML.split('<')[0]
        props.callback(add)
        setDisplay(false)
        setSelectedIndex(i);
    }

    return (
        <div>
             <TextField
                id='auto'
                autoComplete='off'
                {...props}
                className={styles.input}
                onChange={e => handleAddressChange(e.target.value)}
            />
            { display && (
                <div className={styles.autoContainer}>
                    <List component='nav' aria-label='main mailbox folders' style={{zIndex: 9000, position: 'relative', height: '100px', overflow: 'auto'}}>
                    {
                    completions
                        .map((value, i) => {
                        return (
                            <ListItem
                                button
                                selected={selectedIndex === i}
                                onClick={(e) => handleCB(e, i)}
                            >
                                {value.name}
                            </ListItem>
                        );
                        })
                    }
                    </List>
                </div>
            )}
        </div>
    )
}

export default AutoCompleteTextField