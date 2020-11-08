import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import purple from "@material-ui/core/colors/purple";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardFooter from "../../src/components/Card/CardFooter.js";
import Button from "../../src/components/CustomButtons/Button.js";
import Link from "next/link";
import { Rowing } from "@material-ui/icons";
import {
  region,
  estateType,
  transferType,
  dcmType,
  elevator,
  parking,
} from "../../src/components/react-select/values";

const dataLookup = (value, val) => {
  var result = "";
  result = value[val];
  return result;
};
export default function ElevatedCardHeader(props) {
  let [status, setStatus] = useState({
    state: "",
    target: "",
    href: "",
  });

  return (
    <div className={"cards-list"}>
      {props.persons.map((row) => (
        <div
          className="card"
          style={
            !props.detailButton ? { height: "600px" } : { height: "510px" }
          }
        >
          <div className="card-header-blue" style={{ height: "6rem" }}>
            <hr className="header-line-horizontal" />
            <div className="header-line-vertical" />
            <h5 className="label-transferType">
              {dataLookup(transferType, row.transferType)}
            </h5>
            <h6 className="label-id">{row.id}</h6>
            <h6 className="label-date">{row.dateInsert}</h6>
          </div>
          <label className="label-address">آدرس :</label>
          <label className="label-address-value">{row.address}</label>
          <hr className="body-line-horizontal" />

          <label className="label-right"> مساحت :</label>
          <label className="label-right-value">{row.area}</label>
          <label className="label-left">تعداد اتاق :</label>
          <label className="label-left-value">{row.rooms}</label>
          <hr className="body-line-horizontal" />
          <label className="label-right">طبقات :</label>
          <label className="label-right-value">{row.floors}</label>
          <label className="label-left">واحد ها :</label>
          <label className="label-left-value">{row.units}</label>
          <hr className="body-line-horizontal" />
          <label className="label-right">طبقه :</label>
          <label className="label-right-value">{row.floor}</label>
          <label className="label-left">سن بنا :</label>
          <label className="label-left-value">{row.age}</label>
          <hr className="body-line-horizontal" />
          <label className="label-right">کفپوش :</label>
          <label className="label-right-value">{row.covering}</label>
          <label className="label-left">کابینت :</label>
          <label className="label-left-value">{row.cabinets}</label>
          <hr className="body-line-horizontal" />
          <label className="label-right">سرمایش :</label>
          <label className="label-right-value">{row.cooler}</label>
          <label className="label-left">گرمایش :</label>
          <label className="label-left-value">{row.heater}</label>
          <hr className="body-line-horizontal" />
          <label className="label-right">آسانسور :</label>
          <label className="label-right-value">
            {dataLookup(elevator, row.elevator)}
          </label>
          <label className="label-left">پارکینگ :</label>
          <label className="label-left-value">
            {dataLookup(parking, row.parking)}
          </label>

          {!props.detailButton ? (
            <>
              <hr className="body-line-horizontal" />
              <label className="label-right">جهت ملک :</label>
              <label className="label-right-value">{row.direction}</label>
              <label className="label-left">دیوارپوش :</label>
              <label className="label-left-value">{row.wall}</label>
            </>
          ) : (
            ""
          )}

          {row.transferType === 1 || row.transferType === 2 ? (
            <>
              <hr className="body-line-horizontal" />
              <label className="label-right">سند :</label>
              <label className="label-right-value">
                {dataLookup(parking, row.parking)}
              </label>
              <label className="label-left"> </label>
              <label className="label-left-value"> </label>
            </>
          ) : (
            ""
          )}

          {row.transferType === 3 || row.transferType === 4 ? (
            <>
              <hr className="body-line-horizontal" />
              <label
                style={{ color: "blue", fontSize: "16px" }}
                className="label-right"
              >
                رهن (تومان) : {row.mortgages}
              </label>
              <label style={{ color: "blue" }} className="label-price">
                 
              </label>
              <label className="label-left"> </label>
              <label className="label-left-value"> </label>
              <hr className="body-line-horizontal" />
              <label
                style={{ color: "green", fontSize: "16px" }}
                className="label-right"
              >
                اجاره (تومان) : {row.rent}
              </label>
              <label style={{ color: "green" }} className="label-price">
                 
              </label>
              <label className="label-left"> </label>
              <label className="label-left-value"> </label>
            </>
          ) : (
            ""
          )}

          {row.transferType === 1 || row.transferType === 2 ? (
            <>
              <hr className="body-line-horizontal" />
              <label
                style={{ color: "red", fontSize: "16px" }}
                className="label-right"
              >
                قیمت کل (تومان) : {row.price}
              </label>
              <label style={{ color: "red" }} className="label-price">
                 
              </label>
              <label className="label-left"> </label>
              <label className="label-left-value"> </label>
            </>
          ) : (
            ""
          )}

          {props.detailButton ? (
            <Link href={`/post/${row.id}`} passHref>
              <Button
                target={"_blank"}
                className="detail-button"
                color="primary"
                type="Submit"
              >
                اطلاعات مالک
              </Button>
            </Link>
          ) : (
            <>
              <label className="label-desc">توضیح : {row.desc}</label>
              <label className="label-malek">تلفن مالک : {row.malek}</label>
            </>
          )}
          <div className="body-line-vertical " />
        </div>
      ))}
    </div>
  );
}
