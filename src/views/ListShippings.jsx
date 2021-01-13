import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBCard,
} from "mdbreact";
import { useState, useEffect } from "react";
import axios from "axios";

function ListShippings() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-orders")
      .then((response) => {
        console.log(response);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <MDBContainer className="mt-5">
      <MDBCard className="p-3">
        <MDBTable>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>Name</th>
              <th>Weight(kg)</th>
              <th>Color</th>
              <th>Country</th>
              <th>Shopping Cost</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.weight}</td>
                  <td>
                    <div
                      style={{
                        width: "50px",
                        height: "20px",
                        backgroundColor: order.color,
                      }}
                    ></div>
                  </td>
                  <td>{order.country}</td>
                  <td>{order.cost}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </MDBCard>
    </MDBContainer>
  );
}

export default ListShippings;
