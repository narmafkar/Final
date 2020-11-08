import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import {
  region,
  estateType,
  transferType,
  dcmType,
  options,
  elevator,
  parking,
} from "../../../src/components/react-select/values";

class DataTable extends Component {
  deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("/crud", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((item) => {
          this.props.deleteItemFromState(id);
        })
        .catch((err) => console.log(err));
    }
  };

  dataLookup(value, val) {
    var result = "";
    result = value[val];
    return result;
  }

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <div
              style={{
                width: "110px",
              }}
            >
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Del
              </Button>
            </div>
          </td>
          <th scope="row">{item.id}</th>
          <td>{this.dataLookup(region, item.region)}</td>
          <td>{this.dataLookup(estateType, item.estateType)}</td>
          <td>{this.dataLookup(transferType, item.transferType)}</td>
          <td>{this.dataLookup(dcmType, item.dcmType)}</td>
          <td>{item.dateInsert}</td>
          <td>{item.floors}</td>
          <td>{item.rooms}</td>
          <td>{item.area}</td>
          <td>{item.mortgages}</td>
          <td>{item.rent}</td>
          <td>{item.price}</td>
          <td>{item.age}</td>
          <td>{item.units}</td>
          <td>{item.floor}</td>
          <td>{item.cabinets}</td>
          <td>{item.covering}</td>
          <td>{this.dataLookup(elevator, item.elevator)}</td>
          <td>{this.dataLookup(parking, item.parking)}</td>
          <td>{item.tell}</td>
          <td>{item.cooler}</td>
          <td>{item.heater}</td>
          <td>{item.address}</td>
          <td>{item.direction}</td>
          <td>{item.wall}</td>
          <td>{item.desc}</td>
        </tr>
      );
    });

    return (
      <div
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          maxWidth: "10000px",
          overflowX: "auto",
        }}
      >
        <Table responsive="responsive" hover="hover">
          <thead>
            <tr>
              <th>عملیات</th>
              <th>شماره</th>
              <th>منطقه</th>
              <th>نوع ملک</th>
              <th>نوع واگذاری</th>
              <th>نوع سند</th>
              <th>تاریخ ثبت</th>
              <th>طبقات</th>
              <th>تعداد اتاق</th>
              <th>متراژ</th>
              <th>رهن</th>
              <th>اجاره</th>
              <th>قیمت کل</th>
              <th>سن بنا</th>
              <th>تعداد واحد</th>
              <th>طبقه</th>
              <th>کابینت</th>
              <th>کفپوش</th>
              <th>آسانسور</th>
              <th>پارکینگ</th>
              <th>تلفن</th>
              <th>سرمایش</th>
              <th>گرمایش</th>
              <th>آدرس</th>
              <th>جهت ملک</th>
              <th>دیوارپوش</th>
              <th>توضیح</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </Table>
      </div>
    );
  }
}

export default DataTable;
