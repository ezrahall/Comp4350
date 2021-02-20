import React, { useState, useEffect, useContext } from 'react'
import { Button, ButtonGroup, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Login.module.css'
import { UserContext } from '../../context/user'
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        color: '#fff',
    }
})

const Login = (props) => {

    useEffect(() => {
        document.getElementsByClassName(styles.imageBtn)[0].addEventListener('click', () => {
            document.getElementsByClassName(styles.container)[0].classList.toggle(styles.sSignUp)
        })
    }, [])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const buttonClasses = useStyles()
    
    const { signIn, signUp, hasError, errorMessage } = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()

    const handleLoginSignup = async (e) => {

        const { from } = location.state || { from: { pathname: "/" } };
        e.preventDefault()

        const user = {
            "firstName" : firstName,
            "email" : email,
            "password" : password,
        }

        setIsLoading(true)
        if(isLogin) {
           await signIn(user)
        } else {
           await signUp(user)
        }
        setIsLoading(false)
        history.replace(from);
    }

    const swicthMode = () => {
        setIsLogin(!isLogin)
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
                        { hasError && <label style={{color: "#ff0000"}}> {errorMessage} </label> }
                        <label>
                            <span>Email Address</span>
                            <TextField onChange={e => setEmail(e.target.value)} value={email} type="email" required/>
                        </label>
                        <label>
                            <span>Password</span>
                            <TextField onChange={e => setPassword(e.target.value)} type="password" value={password} required/>
                        </label>
                        <Button type="submit"  className={styles.submit + " " + styles.buttonMarg} classes={buttonClasses}><span >Sign In </span></Button>
                        <p className={styles.forgotPass}>Forgot Password?</p>
                        <br/>
                        { isLoading &&  <CircularProgress color="secondary" size={20}/> }
                    </form>
                </div>
                <div className={styles.subContainer}>
                    <div className={styles.image}>
                        <div className={styles.imgText + " " + styles.mUp}>
                            <h2>New here?</h2>
                            <p>Sign Up and discover new Cuisine</p>
                        </div>
                        <div className={styles.imgText + " " + styles.mIn}>
                            <h2>Already have an account?</h2>
                            <p>Just Sign in and start your journey in discovering new cuisine</p>
                        </div>
                        <div className={styles.imageBtn} onClick={swicthMode}>
                            <span className={styles.mUp} >Sign Up</span>
                            <span className={styles.mIn }>Sign In</span>
                        </div>
                    </div>
                    <div className={styles.form + " " + styles.signUp}>
                        <form autoComplete="false" onSubmit={handleLoginSignup}>
                            <h2>Sign Up</h2>
                            <label>
                                <span>Firstname</span>
                                <TextField onChange={e => setFirstName(e.target.value)} value={firstName} required/>
                            </label>
                            <label>
                                <span>lastname</span>
                                <TextField onChange={e => setLastName(e.target.targetvalue)} value={lastName} required/>
                            </label>
                            <label>
                                 <span>Email Address</span>
                                <TextField onChange={e => setEmail(e.target.value)} value={email} required/>
                            </label>
                            <label>
                                <span>Password</span>
                                <TextField onChange={e => setPassword(e.target.value)} type="password" value={password} required/>
                            </label>
                            <label>
                                <span>Confirm Password</span>
                                <TextField onChange={e => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} required/>
                            </label>
                            <Button type="submit"  className={styles.submit + " " + styles.buttonMarg} classes={buttonClasses}><span>Sign Up</span></Button>
                            <br/>
                            { isLoading && <CircularProgress color="secondary" size={20}/> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login