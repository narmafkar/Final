import React, { useState } from "react";
import axios from "axios";
import HideAppBar from "../../src/components/header";

class App extends React.Component {
  state = {
    plan: "",
  };
  handleClick = (e) => {
    this.setState({ plan: e.currentTarget.id }, () => {
      axios
        .post("/x/handle/accepted", { plan: this.state.plan })
        .then((res) => {
          var peymant = res.data;
          document.location.href = peymant;
        });
    });
  };
  render() {
    return (
      <div className="myDiv">
        <HideAppBar />
        <section className="pricing-table">
          <div className="card-body">
            <h6 className="type">یک ماهه</h6>
            <div price="10000" className="price">
              10,000
            </div>
            <h5 className="plan">تومان </h5>
            <ul className="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
            <div id="A" onClick={this.handleClick} className="buy-button">
              <h3 className="btn">خرید آنلاین</h3>
            </div>
          </div>
          <div className="card-body">
            <h6 className="type">سه ماهه</h6>
            <div className="price">20,000</div>
            <h5 className="plan">تومان </h5>
            <ul className="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
            <div id="B" onClick={this.handleClick} className="buy-button">
              <h3 className="btn">خرید آنلاین</h3>
            </div>
          </div>

          <div className="card-body">
            <h6 className="type">شش ماهه</h6>
            <div className="price">50,000</div>
            <h5 className="plan">تومان</h5>
            <ul className="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
            <div id="C" onClick={this.handleClick} className="buy-button">
              <h3 className="btn">خرید آنلاین</h3>
            </div>
          </div>
          <div className="card-body">
            <h6 className="type">یک ساله</h6>
            <div className="price">100,000</div>
            <h5 className="plan">تومان</h5>
            <ul className="details">
              <li>FREE Stickers</li>
              <li>FREE Delivery</li>
              <li>24/7 support</li>
            </ul>
            <div id="D" onClick={this.handleClick} className="buy-button">
              <h3 className="btn">خرید آنلاین</h3>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default App;
