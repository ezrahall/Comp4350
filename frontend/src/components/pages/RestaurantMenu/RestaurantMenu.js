import React, { useState, useEffect } from "react";

import styles from "../../../assets/styles/pages/RestaurantMenu.module.css";
import Hero from "../../Hero/Hero";
import FoodItem from "../../FoodItem/FoodItem";
import FeaturedItem from "../../FoodItem/FeaturedItem/FeaturedItem";
import Footer from "../../Footer/Footer";
import { foodData } from "../../FoodItem/data";
import NavBar from "../../NavBar/NavBar";
import KFC from "../../../assets/images/KFC.jpg";

function RestaurantMenu() {

  return (
    <div className={styles.restaurantMenu}>
      <NavBar />
      <Hero />
      <br />
      <br />
      <div className={styles.restaurantMenu__titleContainer}>
        <div className={styles.restaurantMenu__title}>Menu:</div>

        <div className={styles.restaurantMenu__subtitle}>
          Click below to select items
        </div> 

      </div>
      <br />

      <FoodItem
        image={KFC}
        id="1"
        title="Chicken"
        ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda"
        price="13.33"
      />
      <FoodItem
        image={KFC}
        id="2"
        title="Chicken"
        ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda"
        price="13.33"
      />
      <FoodItem
        image={KFC}
        id="3"
        title="Chicken"
        ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda"
        price="13.33"
      />
      <FoodItem
        image={KFC}
        id="4"
        title="Chicken"
        ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda"
        price="13.33"
      />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default RestaurantMenu;
