import React, { CSSProperties } from "react";
import "./style.css";

interface Props {
  products: any;
  titleHead: Array<String>;
  pageTitle: string;
}

const Table: React.FC<Props> = ({ products, titleHead, pageTitle }) => {
  const navigationFormUpdated = (id: any, hotel: string) => {};
  const checker = (id: any) => {};
  console.log(pageTitle === "rooms List", products);
  const generateReactHTML = (): JSX.Element => {
    // const changeStyle = background-color: products[i].status ===
    //     ' Booked' ? 'red' : products[i].status==='Checkout' ? 'gray' : 'green' ; color: white; border: 0px; padding:
    //         5px; border-radius: 5px;
    // const changeStyleHotel = "
    //         background-color: red;
    //         color: white;
    //         border: 0px;
    //         padding: 5px;
    //         border-radius: 5px;
    //       "
    type Style = {
      backgroundColor: string;
      color: string;
      border: string;
      padding: string;
      borderRadius: string;
    };
    const StyleButtonDelete: Style = {
      backgroundColor: "red",
      color: "white",
      border: "0px",
      padding: "5px",
      borderRadius: "5px",
    };
    const StyleButtonUpdated: Style = {
      backgroundColor: "rgb(0, 255, 55)",
      color: "white",
      border: "0px",
      padding: "5px",
      borderRadius: "5px",
    };
    const getButtonStatusStyle = (statusRoom: string): CSSProperties => {
      return statusRoom === " Booked"
        ? { backgroundColor: "red", color: "white" }
        : statusRoom === "Checkout"
        ? { backgroundColor: "gray", color: "white" }
        : { backgroundColor: "green", color: "white" };
    };
    // const StyleButtonStatus: React.CSSProperties =
    //   getButtonStatusStyle(statusRoom);
    if (pageTitle === "Admin Page") {
      return (
        <tbody id="1">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">
                  <input type="checkbox" />
                </th>
                <td>{e._id}</td>
                {/* <td>{}</td> */}
                <td>{e.user}</td>
                <td>{e.hotel}</td>
                <td>
                  {e.room.map((t: any, key: number) => (
                    <span key={key}>{t.numberRoom}, </span>
                  ))}
                </td>
                <td>
                  {new Date(e.dateStart).toLocaleDateString("en-GB")} -{" "}
                  {new Date(e.dateEnd).toLocaleDateString("en-GB")}
                </td>
                <td>${e.price}</td>
                <td>{e.payment}</td>
                <td>
                  <input
                    type="button"
                    style={getButtonStatusStyle(e.status)}
                    value={e.status}
                    disabled
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "hotel List") {
      return (
        <tbody id="2">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>{e.type}</td>
                <td>{e.title}</td>
                <td>{e.city}</td>
                <td>
                  <form
                    id="deletedHotel=e._id"
                    action="/hotellist/deleted/=e._id"
                    method="post"
                  >
                    <input
                      style={StyleButtonDelete}
                      type="button"
                      value="Delete"
                      onClick={() => checker("deletedHotel=e._id")}
                    />
                  </form>
                </td>
                <td onClick={() => navigationFormUpdated(e._id, "hotel")}>
                  <input
                    style={StyleButtonUpdated}
                    type="button"
                    value="Edit"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "rooms List") {
      return (
        <tbody id="3">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id} </td>
                <td>{e.title} </td>
                <td>{e.desc} </td>
                <td>{e.price} </td>
                <td>{e.maxPeople}</td>
                <td>
                  <form
                    id="deleteRoom=e._id"
                    action="/roomlist/deleted/=e._id?idHotel==e._doc.hotel"
                    method="post"
                  >
                    <input
                      style={StyleButtonDelete}
                      type="button"
                      value="Delete"
                      onClick={() => checker("deleteRoom=e._id")}
                    />
                  </form>
                </td>
                <td onClick={() => navigationFormUpdated(e._id, "room")}>
                  <input
                    style={StyleButtonUpdated}
                    type="button"
                    value="Edit"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (pageTitle === "transaction List") {
      return (
        <tbody id="4">
          {products.map((e: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="col">
                  <input type="checkbox" name="check" id="check" />
                </th>
                <td>{e._id}</td>
                <td>{e.user}</td>
                <td>{e.hotel}</td>
                <td>
                  {e.room.map((n: any, key: number) => (
                    <span key={key}>{n.numberRoom}, </span>
                  ))}
                </td>
                <td>
                  {new Date(e.dateStart).toLocaleDateString("en-GB")} -{" "}
                  {new Date(e.dateEnd).toLocaleDateString("en-GB")}
                </td>
                <td>${e.price}</td>
                <td>{e.payment}</td>
                <td>
                  <input
                    style={getButtonStatusStyle(e.status)}
                    type="button"
                    value="e.status "
                    disabled
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    return (
      <tbody>
        <tr>
          <th>Chưa nhận được dữ liệu</th>
        </tr>
      </tbody>
    );
  };
  return (
    <table style={{ textAlign: "center", marginBottom: "4rem" }}>
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" name="check" id="check" />
          </th>
          {/* fix */}
          {titleHead.map((e: String, key: number) => {
            return (
              <th key={key} scope="col">
                {e}
              </th>
            );
          })}
        </tr>
      </thead>
      {generateReactHTML()}
    </table>
  );
};

export default Table;
