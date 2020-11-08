import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Single from "../../../src/components/react-select/Singel";
import {
  tempRegionOptions,
  tempEstateTypeOptions,
  tempTransferTypeOptions,
  tempDcmTypeOptions,
  tempOptionsOptions,
  tempParkingOptions,
  tempElevatorOptions,
} from "../../../src/components/react-select/values";

class AddEditForm extends React.Component {
  state = {
    id: 0,
    region: "",
    estateType: "",
    transferType: "",
    dcmType: "",
    dateInsert: "",
    floors: "",
    rooms: "",
    area: "",
    mortgages: "",
    rent: "",
    price: "",
    age: "",
    units: "",
    floor: "",
    cabinets: "",
    covering: "",
    tell: "",
    cooler: "",
    heater: "",
    address: "",
    direction: "",
    wall: "",
    description: "",
    malek: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/crud", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        region: this.state.region,
        estateType: this.state.estateType,
        transferType: this.state.transferType,
        dcmType: this.state.dcmType,
        elevator: this.state.elevator,
        parking: this.state.parking,
        dateInsert: this.state.dateInsert,
        floors: this.state.floors,
        rooms: this.state.rooms,
        area: this.state.area,
        mortgages: this.state.mortgages,
        rent: this.state.rent,
        price: this.state.price,
        age: this.state.age,
        units: this.state.units,
        floor: this.state.floor,
        cabinets: this.state.cabinets,
        covering: this.state.covering,
        tell: this.state.tell,
        cooler: this.state.cooler,
        heater: this.state.heater,
        address: this.state.address,
        direction: this.state.direction,
        wall: this.state.wall,
        description: this.state.description,
        malek: this.state.malek,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/crud", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        region: this.state.region,
        estateType: this.state.estateType,
        transferType: this.state.transferType,
        dcmType: this.state.dcmType,
        elevator: this.state.elevator,
        parking: this.state.parking,
        dateInsert: this.state.dateInsert,
        floors: this.state.floors,
        rooms: this.state.rooms,
        area: this.state.area,
        mortgages: this.state.mortgages,
        rent: this.state.rent,
        price: this.state.price,
        age: this.state.age,
        units: this.state.units,
        floor: this.state.floor,
        cabinets: this.state.cabinets,
        covering: this.state.covering,
        tell: this.state.tell,
        cooler: this.state.cooler,
        heater: this.state.heater,
        address: this.state.address,
        direction: this.state.direction,
        wall: this.state.wall,
        description: this.state.description,
        malek: this.state.malek,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const {
        id,
        region,
        estateType,
        transferType,
        dcmType,
        elevator,
        parking,
        dateInsert,
        floors,
        rooms,
        area,
        mortgages,
        rent,
        price,
        age,
        units,
        floor,
        cabinets,
        covering,
        tell,
        cooler,
        heater,
        address,
        direction,
        wall,
        description,
        malek,
      } = this.props.item;
      this.setState({
        id,
        region,
        estateType,
        transferType,
        dcmType,
        elevator,
        parking,
        dateInsert,
        floors,
        rooms,
        area,
        mortgages,
        rent,
        price,
        age,
        units,
        floor,
        cabinets,
        covering,
        tell,
        cooler,
        heater,
        address,
        direction,
        wall,
        description,
        malek,
      });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Label for="region">منطقه</Label>
            <Single
              name="region"
              options2={tempRegionOptions}
              onHandleChange={(value) => this.handleChange("region", value)}
              value={tempRegionOptions.find(
                (option) => option.value === this.state.region
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="estateType">نوع ملک</Label>
            <Single
              name="estateType"
              options2={tempEstateTypeOptions}
              onHandleChange={(value) => this.handleChange("estateType", value)}
              value={tempEstateTypeOptions.find(
                (option) => option.value === this.state.estateType
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="transferType">نوع واگذاری</Label>
            <Single
              name="transferType"
              options2={tempTransferTypeOptions}
              onHandleChange={(value) =>
                this.handleChange("transferType", value)
              }
              value={tempTransferTypeOptions.find(
                (option) => option.value === this.state.transferType
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="dcmType">نوع سند</Label>
            <Single
              name="dcmType"
              options2={tempDcmTypeOptions}
              onHandleChange={(value) => this.handleChange("dcmType", value)}
              value={tempDcmTypeOptions.find(
                (option) => option.value === this.state.dcmType
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="parking">پارکینگ</Label>
            <Single
              name="parking"
              options2={tempParkingOptions}
              onHandleChange={(value) => this.handleChange("parking", value)}
              value={tempParkingOptions.find(
                (option) => option.value === this.state.parking
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="elevator">آسانسور</Label>
            <Single
              name="elevator"
              options2={tempElevatorOptions}
              onHandleChange={(value) => this.handleChange("elevator", value)}
              value={tempElevatorOptions.find(
                (option) => option.value === this.state.elevator
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="dateInsert">تاریخ ثبت</Label>
            <Input
              type="text"
              name="dateInsert"
              id="dateInsert"
              onChange={this.onChange}
              value={
                this.state.dateInsert === null ? "" : this.state.dateInsert
              }
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="floors">طبقات</Label>
            <Input
              type="text"
              name="floors"
              id="floors"
              onChange={this.onChange}
              value={this.state.floors === null ? "" : this.state.floors}
              placeholder="floors"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="rooms">تعداد اتاق</Label>
            <Input
              type="text"
              name="rooms"
              id="rooms"
              onChange={this.onChange}
              value={this.state.rooms === null ? "" : this.state.rooms}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="area">متراژ</Label>
            <Input
              name="area"
              id="area"
              onChange={this.onChange}
              value={this.state.area === null ? "" : this.state.area}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="mortgages">رهن</Label>
            <Input
              name="mortgages"
              id="mortgages"
              onChange={this.onChange}
              value={this.state.mortgages === null ? "" : this.state.mortgages}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="rent">اجاره</Label>
            <Input
              name="rent"
              id="rent"
              onChange={this.onChange}
              value={this.state.rent === null ? "" : this.state.rent}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="price">قیمت</Label>
            <Input
              name="price"
              id="price"
              onChange={this.onChange}
              value={this.state.price === null ? "" : this.state.price}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="age">سن بنا</Label>
            <Input
              name="age"
              id="age"
              onChange={this.onChange}
              value={this.state.age === null ? "" : this.state.age}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="units">تعداد واحد</Label>
            <Input
              type="text"
              name="units"
              id="units"
              onChange={this.onChange}
              value={this.state.units}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="floor">طبقه</Label>
            <Input
              name="floor"
              id="floor"
              onChange={this.onChange}
              value={this.state.floor === null ? "" : this.state.floor}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="cabinets">کابینت</Label>
            <Input
              name="cabinets"
              id="cabinets"
              onChange={this.onChange}
              value={this.state.cabinets === null ? "" : this.state.cabinets}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="covering">کفپوش</Label>
            <Input
              name="covering"
              id="covering"
              onChange={this.onChange}
              value={this.state.covering === null ? "" : this.state.covering}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="tell">تلفن</Label>
            <Input
              name="tell"
              id="tell"
              onChange={this.onChange}
              value={this.state.tell === null ? "" : this.state.tell}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="cooler">سرمایش</Label>
            <Input
              name="cooler"
              id="cooler"
              onChange={this.onChange}
              value={this.state.cooler === null ? "" : this.state.cooler}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Label for="heater">گرمایش</Label>
            <Input
              name="heater"
              id="heater"
              onChange={this.onChange}
              value={this.state.heater === null ? "" : this.state.heater}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Label for="direction">جهت ملک</Label>
            <Input
              name="direction"
              id="direction"
              onChange={this.onChange}
              value={this.state.direction === null ? "" : this.state.direction}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Label for="wall">دیوارپوش</Label>
            <Input
              name="wall"
              id="wall"
              onChange={this.onChange}
              value={this.state.wall === null ? "" : this.state.wall}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Label for="malek">مالک</Label>
            <Input
              name="malek"
              id="malek"
              onChange={this.onChange}
              value={this.state.malek === null ? "" : this.state.malek}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Label for="description">توضیح</Label>
            <Input
              name="description"
              id="description"
              onChange={this.onChange}
              value={
                this.state.description === null ? "" : this.state.description
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Label for="address">آدرس</Label>
            <Input
              name="address"
              id="address"
              onChange={this.onChange}
              value={this.state.address === null ? "" : this.state.address}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button color="primary">ثبت</Button>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export default AddEditForm;
