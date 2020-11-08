import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Modals/Modal";
import DataTable from "./Tables/DataTable";
// import { CSVLink } from "react-csv";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";

class App extends Component {
  state = {
    items: [],
    page: 0,
    rowsPerPage: 10,
    totalRows: 0,
  };

  getItems() {
    axios
      .post(
        `/getTableData?page=${this.state.page + 1}&pageSize=${
          this.state.rowsPerPage
        }`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          items: res.data.pageOfItems,
          totalRows: res.data.pager.totalItems,
        });
      });
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  componentDidMount() {
    this.getItems();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        rowsPerPage: parseInt(event.target.value, 10),
      },
      () => {
        this.getItems();
      }
    );
    this.setState({ page: 0 });
    console.log(event.target.value, 10);
  };
  handleChangePage = (event, newPage) => {
    this.setState(
      {
        page: newPage,
      },
      () => {
        this.getItems();
      }
    );
  };

  render() {
    return (
      <div>
        <Container className="App">
          <Row>
            <Col>
              <h1
                style={{
                  margin: "20px 0",
                }}
              >
                {" "}
                CRUD Database{" "}
              </h1>{" "}
            </Col>{" "}
          </Row>
          <Row>
            <Col
              style={{
                margin: "10px 0",
              }}
            >
              {" "}
              {/* <CSVLink
                          filename={"db.csv"}
                          color="primary"
                          style={{ float: "left", marginRight: "10px" }}
                          className="btn btn-primary"
                          data={this.state.items}>
                          Download CSV
                      </CSVLink> */}{" "}
              <ModalForm
                buttonLabel="Add Item"
                addItemToState={this.addItemToState}
              />{" "}
            </Col>{" "}
          </Row>
          <Row>
            <Col>
              {" "}
              {this.state.items ? (
                <DataTable
                  items={this.state.items}
                  updateState={this.updateState}
                  deleteItemFromState={this.deleteItemFromState}
                />
              ) : null}{" "}
            </Col>{" "}
          </Row>{" "}
          <TablePagination
            className="App"
            component="div"
            count={this.state.totalRows}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            labelRowsPerPage={
              <div
                style={{
                  fontSize: 14,
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                تعداد نمایش در هر صفحه
              </div>
            }
          />{" "}
        </Container>{" "}
      </div>
    );
  }
}

export default App;
