import React, { CSSProperties } from "react";
import "./style.css";

interface Props {
  products: any;
  pageTitle: string;
}

const Table: React.FC<Props> = ({ products, pageTitle }) => {
  const navigationFormUpdated = (id: any, hotel: string) => {};
  const checker = (id: any) => {};
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
        ? { backgroundColor: "red" }
        : statusRoom === "Checkout"
        ? { backgroundColor: "gray" }
        : { backgroundColor: "green" };
    };
    // const StyleButtonStatus: React.CSSProperties =
    //   getButtonStatusStyle(statusRoom);
    if (pageTitle === "Admin Page") {
      return (
        <tbody id="1">
          {products.map((e: any, i: any) => {
            return (
              <tr>
                <th scope="row">{i}</th>
                <td>{e._id}</td>
                <td>{e.user}</td>
                <td>'namehotel[i]'</td>
                <td>
                  {e.room.map((t: any) => (
                    <span>{t.numberRoom}</span>
                  ))}
                </td>
                <td>{new Date(e.dateStart).toLocaleDateString("en-GB")}</td>
                <td>{new Date(e.dateEnd).toLocaleDateString("en-GB")}</td>
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
    } else if (pageTitle === "hotel List") {
      return (
        <tbody id="2">
          {products.map((e: any, i: any) => {
            return (
              <tr>
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
    } else if (pageTitle === "rooms List") {
      <tbody id="3">
        {products.map((e: any, i: any) => {
          return (
            <tr>
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
                <input style={StyleButtonUpdated} type="button" value="Edit" />
              </td>
            </tr>
          );
        })}
      </tbody>;
    } else if (pageTitle === "transaction List") {
      <tbody id="3">
        {products.map((e: any) => {
          return (
            <tr>
              <th scope="col">
                <input type="checkbox" name="check" id="check" />
              </th>
              <td>{e._id}</td>
              <td>{e.user}</td>
              <td>Namehotel[i]</td>
              <td>
                {e.room.forEach((n: any) => {
                  <span>{n.numberRoom}</span>;
                })}
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
      </tbody>;
    }
    return <div></div>;
  };
  return (
    <table style={{ textAlign: "center", marginBottom: "4rem" }}>
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" name="check" id="check" />
          </th>
          {/* fix */}
          {products.map((e: any) => {
            return <th scope="col">{e.titleHead}</th>;
          })}
        </tr>
        {generateReactHTML()}
      </thead>
    </table>
  );
};

export default Table;
