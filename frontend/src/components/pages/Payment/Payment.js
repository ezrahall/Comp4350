import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
//Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// Util imports
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../assets/styles/pages/Payment.module.css";
import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
import PaymentCard from "../../PaymentCard/PaymentCard";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

function Payment() {
  const basket = useSelector((state) => state.cart.basket);

  const classes = useStyles();
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/Api/Restaurant/Payment",
      { email: email }
    );

    //Gets the client secret from backend
    const clientSecret = res.data["client_secret"];

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log("Payment Succesfull");
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label="Email"
          id="outlined-email-input"
          helperText={`Email you'll recive updates and receipts on`}
          margin="normal"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <PaymentCard />
        <div className={classes.div}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default Payment;
