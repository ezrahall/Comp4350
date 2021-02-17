// import React, { useState } from 'react'
// import { Button, ButtonGroup, Container, TextField } from '@material-ui/core'
// import { makeStyles, rgbToHex } from '@material-ui/core/styles';
// import styles from '../../styles/Login.module.css'
// import InputAdornment from '@material-ui/core/InputAdornment';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import GTranslateIcon from '@material-ui/icons/GTranslate';

// const useStyles = makeStyles({
//     root: {
//       maxWidth: 1000,
//       backgroundColor: 50,
//       borderRadius: 50,
//     },
//     media: {
//       height: 140,
//     },
//   }); 

// const Login = (props) => {
//     const classes = useStyles()
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
    
//     const handleLogin = () => {
//         const user = {
//             "email": email,
//             password: "password",
//         }
//         // TODO: "Add signin call from user context"
        
//     }

//     return (
//         <div className={styles.loginDiv}>
//             <div className={styles.container}>
//                 <div className={styles.form} >
//                     <form id="loginForm" className="loginForm" autoComplete="off">
                        
//                         <h2> Sign In</h2>
//                         <GroupButton>
                            
//                         </GroupButton>
//                         <label>
//                             <span>Email Address</span>
//                             <TextField onChange={e => setEmail(e.target.value)} value={email} InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountCircle /></InputAdornment>),}}className={styles.textField}/>
//                         </label>
//                         <label>
//                             <span>Password</span>
//                             <TextField onChange={e => setPassword(e.target.value)} value={password} InputProps={{ startAdornment: (<InputAdornment position="start"> <VpnKeyIcon /></InputAdornment>),}}className={styles.textField}/>
//                         </label>
//                         <button className={styles.submit} type="button">Sign In</button>
//                         <p className={styles.forgotPass}>Forgot Password?</p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }



// .loginDiv { 
//     height: 100vh;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: -webkit-linear-gradient(left, #744774, #b2b2b2);
//     font-family: sans-serif;
// }

// input, button {
//     border: none;
//     outline: none;
//     background: none;
// }

// .container {
//     overflow: hidden;
//     position: relative;
//     width: 900px;
//     height: 550px;
//     background: #fff;
//     box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
// }

// .form {
//     position: relative;
//     width: 640px;
//     height: 100%;
//     padding: 50px 30px;
//     border-radius: 250;
//     -webkit-transition:-webkit-transform 1.2s ease-in-out;
//             transition: -webkit-transform 1.2s ease-in-out;
//             transition: transform 1.2s ease-in-in;
//             transition: transform 1.2s ease-in-in, -webkit-transform 1.2s ease-in-out;
// }

// h2{ 
//     width: 100%;
//     font-size: 30px;
//     text-align: center;
// }

// label {
//     display: block;
//     width: 260px;
//     margin: 25px auto;
//     text-align: center;
// }

// label span{
//     font-size: 14px;
//     font-weight: 600;
//     color: #505f75;
//     text-transform: uppercase;
// }

// input{
//     display: block;
//     width: 100%;
//     margin-top: 5px;
//     font-size: 16px;
//     padding-bottom: 5px;
//     border-bottom: 1px solid rbga(109, 93, 93, 0.4);
//     text-align: center;
//     font-family: sans-serif;
// }

// Button {
//     display: block;
//     margin: 0 auto;
//     width: 260px;
//     height: 36px;
//     border-radius: 30px;
//     color: #fff;
//     font-size: 15px;
// }

// .submit {
//     margin-top: 40px;
//     margin-bottom: 30px;
//     text-transform: uppercase;
//     font-weight: 600;
//     font-family: sans-serif;
//     background: -webkit-linear-gradient(left, #744774, #b2b2b2);
// }

// .submit:hover { 
//     background: -webkit-linear-gradient(left, #b224ef, #7579ff);
// }

// .forgotPass { 
//     margin-top: 15px;
//     text-align: center;
//     font-size: 14px;
//     font-weight: 600;
//     color: #0c0101;
//     cursor: pointer;
// }

// .forgotPass:hover { 
//     color: rgb(245, 29, 209);
// }

// .socialMedia {
//     width: 300px;
//     text-align: center;
//     margin-top: 20px;

// }

// .socialMedia Button { 
//     display: inline-block;
//     cursor: pointer;
// }

// .subContainer {
//     overflow: hidden;
//     position: absolute;
//     left: 640px;
//     top: 0;
//     width: 900px;
//     height: 100%;
//     padding-left: 260px;
//     background: #fff;
//     -webkit-transition: -webkit-transform 1.2s ease-in-out;
//             transition: -webkit-transform 1.2s ease-in-out;
//             transition: transform 1.2s ease-in-out;
// }

// .container.sSingUp .subContainer{
//     -webkit-transform: translate3d(-640px, 0, 0);
//             transform: translate3d(-640px, 0, 0);
// }

// .image {
//     overflow: hidden;
//     z-index: 2;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 260px;
//     height: 100%;
//     padding-top: 360px;
// }

// .image:before {
//     content: '';
//     position: absolute;
//     right: 0;
//     top: 0;
//     width: 900px;
//     height: 100%;
//     background-image: url(images/bg.jpg);
//     background-size: cover;
//     transition: -webkit-transform 1.2s ease-in-out;
//     transition: -webkit-transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
// }

// .image:after {
//     content:'';
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0,0,0,0.3);
// }

// .container.sSingUp .image:before {
//     -webkit-transform: translate3d(640px, 0, 0);
//             transform: translate3d(640px, 0, 0);

// }

// .imgText {
//     z-index: 2;
//     position: absolute;
//     left: 0;
//     top: 50px;
//     width: 100%;
//     padding: 0 20px;
//     text-align: center;
//     color: #fff;
//     -webkit-transition: -webkit-transform 1.2s ease-in-out;
//             transition: -webkit-transform 1.2s ease-in-out;
//             transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
// }

// .imgText h2 {
//     margin-bottom: 10px;
//     font-weight: normal;
// }

// .imgText p {
//     font-size: 14px;
//     line-height: 1.5;
// }

// .container.sSingUp .imgText.mUp {
//     -webkit-transform: translateX(520px);
//             transform: translateX(520px);
// }

// .imgText.mIn {
//     -webkit-transform: translateX(-520px);
//             transform: translateX(-520px);
// }

// .container.sSingUp .imgText.mIn{
//     -webkit-transform: translateX(0);
//             transform: translateX(0);
// }

// .signIn {
//     padding-top: 65px;
//     -webkit-transition-timing-function: ease-in-out;
//             transition-timing-function: ease-in-out;
// }

// .container .sSingUp .signIn { 
//     -webkit-transition-timing-function: ease-in-out;
//             transition-timing-function: ease-in-out;
//     -webkit-transition-duration: 1.2s;
//             transition-duration: 1.2s; 
//     -webkit-transform: translate3d(640px, 0, 0);
//             transform: translate3d(640px, 0, 0);
// }

// .imageBtn {
//     overflow: hidden;
//     z-index: 2;
//     position: relative;
//     width: 100px;
//     height: 36px;
//     margin: 0 auto;
//     background: transparent;
//     color: #fff;
//     text-transform: uppercase;
//     font-size: 15px;
//     cursor: pointer;
// }

// .imageBtn:after {
//     content: '';
//     z-index: 2;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     border: 2px solid #fff;
//     border-radius: 30px;
// }

// .imageBtn span {
//     position: absolute;
//     left: 0;
//     top: 0;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-pack: center;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//     -webkit-transition: -webkit-transform 1.2s;
//             transition: -webkit-transform 1.2s;
//             transition: transform 1.2s;
//             transition: transform 1.2s, -webkit-transform 1.2s;
// }

// .imageBtn span.mIn {
//     -webkit-transform: translateY(-72px);
//             transform: translateY(-72px);
// }

// .container.sSignUp .imageBtn span.mIn{
//     -webkit-transform:translateY(0);
//             transform:translateY(0);
// }

// .container.sSignUp .imageBtn span.mUp{
//     -webkit-transform:translateY(72px);
//             transform:translateY(72px);
// }
  
// .signUp {
//     -webkit-transform: translate3d(-900px, 0, 0);
//             transform: translate3d(-900px, 0, 0);
// }

// .container.sSingUp .signUp {
//     -webkit-transform: translate3d(0, 0, 0);
//             transform: translate3d(0, 0, 0);
// }
// export default Login