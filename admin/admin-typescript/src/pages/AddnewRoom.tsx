import React, { useEffect, useState } from "react";
import "../components/css/addnew.css";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";

const AddnewRoom = () => {
  const [defaultHotels, setDefaultHotels] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("numberPeople", data.numberPeople);
    formData.append("roomNumbers", data.roomNumbers);
    formData.append("hotel", data.hotel);
    Managers()
      .postNewrooms(formData)
      .then((res) => {
        alert(res.message);
      })
      .then(() => navigate("/hotel_list"))
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
  }, []);
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
                <label htmlFor="Name">Title</label> <br />
                <input
                  type="text"
                  placeholder="2 bed rooms"
                  {...register("title")}
                />
                <label htmlFor="Price">Price</label> <br />
                <input type="text" placeholder="100" {...register("price")} />
              </div>
              <div>
                <label htmlFor="Description">Description</label> <br />
                <input
                  type="text"
                  placeholder="King size bed, 1 bathroom"
                  {...register("description")}
                />
                <label htmlFor="Type">Max People</label> <br />
                <input
                  type="text"
                  placeholder="2"
                  {...register("numberPeople")}
                />
              </div>
            </div>
            <div className="foot__newrooms">
              <div>
                <label htmlFor="Rooms">Rooms</label>
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
