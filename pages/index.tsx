import React from "react";
import Slider from "../src/components/Slider";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import UserProfile from "../pages/userProfile";
import Link from "next/link";

export default function Index() {
  const router = useRouter();

  return (
    <div>
      <Slider />
      <h1 className="home-title">حرفه ای بودن را تجربه کنید</h1>
      <div className="shake-horizontal">
        <h5 className="home-detail">
          هوشمند ترین سامانه اطلاعات املاک در مشهد
        </h5>
      </div>
      <div className="wrapper">
        <ul>
          <li
            className="facebook"
            onClick={() => {
              router.push({
                pathname: "/userProfile",
                query: {
                  tType: "3",
                },
              });
            }}
          >
            <label className="rahn" aria-hidden="true">
              رهن و اجاره
            </label>
          </li>
          {/* </Link> */}
          <li
            className="twitter"
            onClick={() => {
              router.push({
                pathname: "/userProfile",
                query: {
                  tType: "1",
                },
              });
            }}
          >
            <label className="sale" aria-hidden="true">
              خرید-فروش
            </label>
          </li>
          <li
            className="instagram"
            onClick={() => {
              router.push({
                pathname: "/userProfile",
                query: {
                  tType: "4",
                },
              });
            }}
          >
            <label className="rahn2" aria-hidden="true">
              رهن کامل
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
