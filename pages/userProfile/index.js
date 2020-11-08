import React, { Component, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../src/components/Grid/GridItem.js";
import GridContainer from "../../src/components/Grid/GridContainer.js";
import Button from "../../src/components/CustomButtons/Button.js";
import Card from "../../src/components/Card/Card.js";
import CardHeader from "../../src/components/Card/CardHeader.js";
import CardBody from "../../src/components/Card/CardBody.js";
import CardFooter from "../../src/components/Card/CardFooter.js";
import Select from "../../src/components/react-select/Select.js";
import TextField from "@material-ui/core/TextField";
import { sizing } from "@material-ui/system";
import axios from "axios";
import EleventHeaderCard from "./ElevatedHeaderCard";
import AppBar from "../../src/components/AppBar/AppBar.js";
import Navbar from "../../src/components/Navbar/Navbar.js";
import routes from "../../src/routes.js";
import layoutStyles from "../../src/assets/jss/material-dashboard-react/components/adminStyle.js";
import Box from "@material-ui/core/Box";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import HideAppBar from "../../src/components/header";
import TablePagination from "@material-ui/core/TablePagination";
import { useRouter } from "next/router";
import DatePicker from "react-modern-calendar-datepicker";

import {
  regionOptions,
  estateTypeOptions,
  transferTypeOptions,
  ageOptions,
  dcmTypeOptions,
  roomsOptions,
  floorOptions,
  optionsOptions,
} from "../../src/components/react-select/values";
// import classes from "*.module.css";

const styles = {
  textAlign: "right",

  input: {
    "&::placeholder": {
      fontFamily: "'Cairo', sans-serif",
      fontSize: "14px",
    },
  },
};
const useStyles = makeStyles(styles);
const useLayoutStyles = makeStyles(layoutStyles);
const muiBaseTheme = createMuiTheme();

export default function UserProfile({ stars }) {
  const classes = useStyles(styles);
  const router = useRouter();
  const tType = router.asPath.substr(router.asPath.length - 1);
  const [open, setOpen] = React.useState(true);
  const [modal, setModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [items, setItems] = React.useState("");
  const [totalRows, setTotalRows] = React.useState(0);

  const [changeText, setChangeText] = useState({
    priceLow: "",
    priceHigh: "",
    mortgagesLow: "",
    mortgagesHigh: "",
    rentLow: "",
    rentHigh: "",
    areaLow: "",
    areaHigh: "",
    address: "",
  });
  const [selectedOption, setSelectedOption] = useState({
    region: "",
    transferType: "",
    estateType: "",
    age: "",
    dcmType: "",
    rooms: "",
    floor: "",
    options: "",
  });
  useEffect(() => {
    axios({
      method: "post",
      url: `/postUserUseEffect?page=${page + 1}&pageSize=${rowsPerPage}`,
      data: { transferType: tType },
    }).then((res) => {
      setItems(res.data.pageOfItems);
      setTotalRows(res.data.pager.totalItems);
    });
  }, [rowsPerPage, page]);

  const handleChange = (key, selectedOption) => {
    setSelectedOption((prev) => ({
      ...prev,
      [key]: selectedOption,
    }));
  };

  const handleChangeText = (evt) => {
    const value = evt.target.value;
    setChangeText({
      ...changeText,
      [evt.target.name]: value,
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    return axios({
      method: "post",
      url: `/postUser?page=${page + 1}&pageSize=${rowsPerPage}`,
      data: {
        allSelectedOptions: selectedOption,
        allTextBox: changeText,
      },
    }).then((res) => {
      setItems(res.data.pageOfItems);
      setTotalRows(res.data.pager.totalItems);
    });
  };
  const mainPanel = React.createRef();

  const color = "blue";
  const mobileOpen = false;
  return (
    <div>
      <HideAppBar />
      <Card>
        <CardHeader color="primary">
          <h4 className="userProfile-CardHeader">جستجوی پیشرفته</h4>
        </CardHeader>
        <CardBody>
          <div className="userProfile-CardBody">
            <div id="region" className="right">
              <label className={"userProfile-headerLabel"}>منطقه</label>
              <Select
                id="region"
                onHandleChange={(value) => handleChange("region", value)}
                selectedOption={selectedOption.region}
                options2={regionOptions}
              />
            </div>
            <div id="transferType" className="center">
              <label className={"userProfile-headerLabel"}>نوع واگذاری</label>
              <Select
                id="transferType"
                onHandleChange={(value) => handleChange("transferType", value)}
                selectedOption={selectedOption.transferType}
                options2={transferTypeOptions}
              />
            </div>
            <div id="estateType" className="left">
              <label className={"userProfile-headerLabel"}>نوع ملک</label>
              <Select
                id="estateType"
                onHandleChange={(value) => handleChange("estateType", value)}
                selectedOption={selectedOption.estateType}
                options2={estateTypeOptions}
              />
            </div>

            <div id="priceLow" className="right">
              <label className={"userProfile-headerLabel"}>قیمت (تومان)</label>
              <TextField
                type="number"
                id="priceLow"
                placeholder="حداقل"
                variant="outlined"
                size="small"
                name="priceLow"
                value={changeText.priceLow}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>

            <div id="priceHigh" className="right">
              <TextField
                id="priceHigh"
                type="number"
                placeholder="حداکثر"
                variant="outlined"
                size="small"
                name="priceHigh"
                value={changeText.priceHigh}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="mortgagesLow" className="center">
              <label className={"userProfile-headerLabel"}>رهن (تومان)</label>
              <TextField
                id="mortgagesLow"
                type="number"
                placeholder="حداقل"
                variant="outlined"
                size="small"
                name="mortgagesLow"
                value={changeText.mortgagesLow}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>

            <div id="mortgagesHigh" className="center">
              <TextField
                id="mortgagesHigh"
                type="number"
                placeholder="حداکثر"
                variant="outlined"
                size="small"
                name="mortgagesHigh"
                value={changeText.mortgagesHigh}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="rentLow">
              <label>اجاره (تومان)</label>
              <TextField
                id="rentLow"
                type="number"
                placeholder="حداقل"
                variant="outlined"
                size="small"
                name="rentLow"
                value={changeText.rentLow}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="rentHigh">
              <TextField
                id="rentHigh"
                type="number"
                placeholder="حداکثر"
                variant="outlined"
                size="small"
                name="rentHigh"
                value={changeText.rentHigh}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="age">
              <label>سن بنا</label>
              <Select
                id="age"
                onHandleChange={(value) => handleChange("age", value)}
                selectedOption={selectedOption.age}
                options2={ageOptions}
              />
            </div>
            <div id="areaHigh">
              <label>مساحت</label>
              <TextField
                id="areaHigh"
                type="number"
                placeholder="حداکثر"
                variant="outlined"
                size="small"
                name="areaHigh"
                value={changeText.areaHigh}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="areaLow">
              <TextField
                id="areaLow"
                type="number"
                placeholder="حداقل"
                variant="outlined"
                size="small"
                name="areaLow"
                value={changeText.areaLow}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="dcmType">
              <label>سند</label>
              <Select
                id="dcmType"
                onHandleChange={(value) => handleChange("dcmType", value)}
                selectedOption={selectedOption.dcmType}
                options2={dcmTypeOptions}
              />
            </div>
            <div id="rooms">
              <label>تعداد اتاق</label>
              <Select
                id="rooms"
                onHandleChange={(value) => handleChange("rooms", value)}
                selectedOption={selectedOption.rooms}
                options2={roomsOptions}
              />
            </div>
            <div id="floor">
              <label>طبقه</label>
              <Select
                id="floor"
                onHandleChange={(value) => handleChange("floor", value)}
                selectedOption={selectedOption.floor}
                options2={floorOptions}
              />
            </div>
            <div id="options">
              <label>امکانات</label>
              <Select
                id="options"
                onHandleChange={(value) => handleChange("options", value)}
                selectedOption={selectedOption.options}
                options2={optionsOptions}
              />
            </div>
            <div id="address">
              <label>آدرس</label>
              <TextField
                variant="outlined"
                size="small"
                name="address"
                value={changeText.address}
                onChange={handleChangeText}
                fullWidth
                InputProps={{ classes: { input: classes["input"] } }}
              />
            </div>
            <div id="userProfile-button">
              <Button color="primary" type="Submit" onClick={handleClick}>
                جستجو
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {items ? <EleventHeaderCard persons={items} detailButton={true} /> : ""}
      <TablePagination
        style={{ direction: "ltr" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={
          <lable
            style={{
              fontSize: 14,
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            تعداد نمایش در هر صفحه
          </lable>
        }
        labelDisplayedRows={() => {
          ("");
        }}
      />
    </div>
  );
}
