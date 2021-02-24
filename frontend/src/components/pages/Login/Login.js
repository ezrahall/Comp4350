import React, { useState, useEffect, useContext, useReducer } from 'react'
import { Button, ButtonGroup, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import styles from './Login.module.css'
import { UserContext } from '../../../context/user'
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import { useHistory, useLocation } from 'react-router-dom'
import * as Validator from 'validatorjs'

const useStyles = makeStyles({
    root: {
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        color: '#fff',
    }
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {

    useEffect(() => {
        document.getElementsByClassName(styles.imageBtn)[0].addEventListener('click', () => {
            document.getElementsByClassName(styles.container)[0].classList.toggle(styles.sSignUp)
        })
    }, [])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [checked, setChecked] = useState(false)
    const [vError, setVError] = useState(false)
    const [vErrorMessage, setVErrorMessage] = useState('')
    const [openError, setOpenError] = useState(false)
    const buttonClasses = useStyles()
    const { signIn, signUp, hasError, respMessage, isLoading } = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()

    const data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
    }

    const rules = {
        name: 'required',
        email: 'required|email',
        password: 'required|min:5',
        confirmPassword: 'required|validConfirmPassword',
        address: 'validAddress',
    }

    Validator.register('validConfirmPassword', () => { console.log("checking password"); return confirmPassword === password }, 'Passwords must match');
    Validator.register('validAddress', () => { if(!isLogin) {return address !== ''} else return true}, 'Please enter an address location');

    const loginValidator = new Validator({email: email, password: password}, {email: 'required|email', password: 'required|min:5',})
    const signupValidator = new Validator(data, rules)

    const [displayTexts, dispatch] = useReducer((displayTexts, action) => {
        switch (action.type) {
            case 'RESTAURANT':      
                return {
                    ...displayTexts,
                    h1First: 'Not yet part of the team??',
                    pFirst: 'Discover a world of customers now within your reach!',
                    h1Second: 'Already a world changer?',
                    pSecond: 'Hop back in to continue providing great customer value!',
                }
            case 'USER':      
                return {
                    ...displayTexts,
                    h1First: 'New here?',
                    pFirst: 'Sign Up and discover new Cuisine!',
                    h1Second: 'Already have an account?',
                    pSecond: 'Just Sign in and start your journey in discovering new cuisine!',
                }
            default: return displayTexts
        }
    }, {
        h1First: 'New here?',
        pFirst: 'Sign Up and discover new Cuisine!',
        h1Second: 'Already have an account?',
        pSecond: 'Just Sign in and start your journey in discovering new cuisine!',
    })

    const handleLoginSignup = async (e) => {

        e.preventDefault()
        if(validate()) {
            setVError(false)
            const { from } = location.state || { from: { pathname: "/account" } };
            
            const user = {
                "name" : name,
                "email" : email,
                "password" : password,
            }
            let res
            if(isLogin) {
            res = await signIn(user)
            } else {
            res = await signUp(user, checked)
            }
            if(res) {
                history.replace(from);
            } else {
                setOpenError(true);
            }
        }
    }

    const swicthMode = () => {
        setIsLogin(!isLogin)
    }

    const handleCheckedChange = () => {
        console.log("changing");
        setChecked(!checked)
        dispatch({ type: checked ? "USER" : "RESTAURANT" })
        document.getElementById('restAddress').classList.toggle(styles.invisible)
    }

    const validate = () => {
        let errors
        let result = true
        let message
        if(isLogin) {
            console.log("loging validation passed: ", loginValidator.fails());
            if (loginValidator.fails()) {
                errors = loginValidator.errors.all()
                result = false
            }
        } else {
            if (signupValidator.fails()) {
                errors = signupValidator.errors.all()
                result = false
            } 
        }
        console.log("error is ", errors);
        if(errors) {
            setVErrorMessage(errors.name || errors.email || errors.password || errors.address || errors.confirmPassword || '')
            setVError(true)
        }
        setOpenError(!result)
        return result
    }
    return (
        <div className={styles.loginDiv}>
            <div className={styles.container}>
                <div className={styles.form + " " +styles.signIn}>
                    <form autoComplete="off"  onSubmit={handleLoginSignup}>
                        <h2> Sign In</h2>
                        <ButtonGroup orientation="horizontal" className={styles.socialMedia} variant="text" >
                            <Button><FacebookIcon/></Button>
                            <Button><GTranslateIcon/></Button>
                        </ButtonGroup>
                        <label>Or sign in with your email address</label>
                        <label>
                            <span>Email Address</span>.
                            <TextField onChange={e => setEmail(e.target.value)} value={email} />
                        </label>
                        <label>
                            <span>Password</span>
                            <TextField onChange={e => setPassword(e.target.value)} type="password" value={password} />
                        </label>
                        <Button type="submit"  className={styles.submit + " " + styles.buttonMarg} classes={buttonClasses}><span >Sign In</span></Button>
                        <p className={styles.forgotPass}>Forgot Password?</p>
                        <br/>
                        { isLoading &&  <CircularProgress color="secondary" size={20}/> }
                    </form>
                </div>
                <div className={styles.subContainer}>
                    <div id="image-div" className={styles.image}>
                        <div className={styles.imgText + " " + styles.mUp}>
                            <h2 id="signup-h1-first">{displayTexts.h1First}</h2>
                            <p id="signup-p1-secondText">{displayTexts.pSecond}</p>
                        </div>
                        <div className={styles.imgText + " " + styles.mIn}>
                            <h2 id="login-h1-first" >{displayTexts.h1Second}</h2>
                            <p id="login-p1-secondText">{displayTexts.pSecond}</p>
                        </div>
                        <div className={styles.imageBtn} onClick={swicthMode}>
                            <span className={styles.mUp}>Sign Up</span>
                            <span className={styles.mIn}>Sign In</span>
                        </div>
                    </div>
                    <div className={styles.form + " " + styles.signUp}>
                        <form autoComplete="false" onSubmit={handleLoginSignup}>
                            <h2>Sign Up</h2>
                            <label>
                                <span>{checked ? 'Restaurant' : 'Full'} Name</span>
                                <TextField onChange={e => setName(e.target.value)} value={name} />
                            </label>
                            <label>
                                 <span>Email Address</span>
                                <TextField onChange={e => setEmail(e.target.value)} value={email} />
                            </label>
                            <label>
                                <span>Password</span>
                                <TextField onChange={e => setPassword(e.target.value)} type="password" value={password} />
                            </label>
                            <label>
                                <span>Confirm Password</span>
                                <TextField onChange={e => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} />
                            </label>
                            <label id="restAddress" className={styles.invisible}>
                                <span>Restaurant Address</span>
                                <TextField onChange={e => setAddress(e.target.value)} type="text" value={address} />
                            </label>
                            <Button type="submit"  className={styles.submit + " " + styles.buttonMarg} classes={buttonClasses}><span>Sign Up</span></Button>
                            <br/>
                            { isLoading && <CircularProgress color="secondary" size={20}/> }
                        </form>
                    </div>
                </div>
            </div>
            <span style={{ position: 'relative', top: '315px', marginRight: '12px'}}>
                <Switch
                    checked={checked}
                    onChange={handleCheckedChange}
                    color="secondary"
                    name="Restaurant?"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <p style={{color: '#fff'}}>Restaurant?</p>
            </span>
            <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
                <Alert onClose={() => setOpenError(false)} severity={"error"}>
                  {vError ? vErrorMessage : respMessage}
                </Alert> 
            </Snackbar>
        </div>
    )
}

export default Login