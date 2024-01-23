import React, { useEffect, useState } from "react";
import "../components/css/addnew.css";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useLocation, useNavigate } from "react-router-dom";

interface roomDetail {
  title: String;
  price: Number;
  desc: String;
  maxPeople: Number;
  hotel: String;
  roomNumbers: [];
}

const AddnewRoom = () => {
  const [defaultHotels, setDefaultHotels] = useState([]);
  const [updatedRoom, setUpdatedRoom] = useState<roomDetail>({
    title: "",
    price: 0,
    desc: "",
    maxPeople: 0,
    hotel: "HANOI ROYAL PALACE HOTEL 2",
    roomNumbers: [],
  });
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("numberPeople", data.numberPeople);
    formData.append("roomNumbers", data.roomNumbers);
    formData.append("hotel", data.hotel);
    if (location.state?.updated === "room") {
      Managers()
        .updatedroomsList(formData, location.state?.idRoom)
        .then((res) => {
          alert(res.message);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
    Managers()
      .postNewrooms(formData)
      .then((res) => {
        alert(res.message);
      })
      .then(() => navigate("/room_list"))
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };
  useEffect(() => {
    Managers()
      .optionhotelsList()
      .then((res) => {
        setDefaultHotels(res.optionHotel);
      })
      .catch((err) => console.error(err));
    if (location.state?.updated === "room") {
      Managers()
        .getDetailRoomsList(location.state.idRoom)
        .then((res) => {
          console.log(res);
          setUpdatedRoom(res.roomDetail);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state?.updated]);

  useEffect(() => {
    setValue("title", updatedRoom.title, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("price", updatedRoom.price, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("description", updatedRoom.desc, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("numberPeople", updatedRoom.maxPeople, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("roomNumbers", updatedRoom.roomNumbers, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [updatedRoom]);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Add New Rooms</h2>
        </header>
        <div>
          <h2 style={{ color: "rgb(255, 0, 0)", textAlign: "center" }}>
            {/* Hiển thị lỗi ở đây */}
          </h2>
        </div>
        <article className="form__input">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input--flex">
              <div>
                <label htmlFor="title">Title</label> <br />
                <input
                  type="text"
                  placeholder="2 bed rooms"
                  {...register("title")}
                />
                <label htmlFor="price">Price</label> <br />
                <input type="text" placeholder="100" {...register("price")} />
              </div>
              <div>
                <label htmlFor="description">Description</label> <br />
                <input
                  type="text"
                  placeholder="King size bed, 1 bathroom"
                  {...register("description")}
                />
                <label htmlFor="numberPeople">Max People</label> <br />
                <input
                  type="text"
                  placeholder="2"
                  {...register("numberPeople")}
                />
              </div>
            </div>
            <div className="foot__newrooms">
              <div>
                <label htmlFor="roomNumbers">Rooms</label>
                <textarea
                  style={{ width: "90%" }}
                  {...register("roomNumbers")}
                  cols={30}
                  rows={10}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
              <div className="foot__newrooms--align">
                <label htmlFor="hotel">Choose a hotel</label>
                <br />
                <select {...register("hotel")}>
                  {defaultHotels.map((hotel) => (
                    <option value={hotel}>{hotel}</option>
                  ))}
                </select>
                <br />
              </div>
              <div className="foot__newrooms--align">
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default AddnewRoom;
