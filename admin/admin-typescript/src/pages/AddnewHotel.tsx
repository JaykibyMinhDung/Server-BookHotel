import React, { useEffect, useState } from "react";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useLocation, useNavigate } from "react-router-dom";

interface hotelDetail {
  name: String;
  type: String;
  city: String;
  address: String;
  distance: String;
  desc: String;
  cheapestPrice: Number;
  title: String;
  rating: String;
  featured: boolean;
  rooms: [];
}

const AddnewHotel = () => {
  const [updatedHotel, setUpdatedHotel] = useState<hotelDetail>({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    desc: "",
    cheapestPrice: 0,
    title: "",
    rating: "",
    featured: false,
    rooms: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append(
      "image",
      location.state?.updated === "hotel" ? null : data.Images[0]
    );
    formData.append("Name", data.Name);
    formData.append("Address", data.Address);
    formData.append("City", data.City);
    formData.append("Price", data.Price);
    formData.append("Description", data.Description);
    formData.append("Distance", data.Distance);
    formData.append("Type", data.Type);
    formData.append("Rooms", data.Rooms);
    formData.append("Feature", data.Feature);
    formData.append("Title", data.Title);
    if (location.state?.updated === "hotel") {
      return Managers()
        .updatedhotelsList(formData, location.state.idHotel)
        .then((res) => {
          alert(res.message);
        })
        .then(() => navigate("/hotel_list"))
        .catch((err) => {
          alert(err.message);
          console.error(err);
        });
    }
    Managers()
      .postNewhotels(formData)
      .then((res) => {
        alert(res.message);
      })
      .then(() => navigate("/hotel_list"))
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };
  useEffect(() => {
    if (location.state?.updated === "hotel") {
      Managers()
        .getDetailHotelsList(location.state.idHotel)
        .then((res) => {
          console.log(res);
          setUpdatedHotel(res.hotelDetail);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state?.updated]);

  useEffect(() => {
    setValue("Name", updatedHotel.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("City", updatedHotel.city, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Distance", updatedHotel.distance, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Description", updatedHotel.desc, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Address", updatedHotel.address, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Price", updatedHotel.cheapestPrice, {
      shouldValidate: true,
      shouldDirty: true,
    });
    // setValue("Name", updatedHotel.photos);
    // setValue("Name", updatedHotel.rating);
    setValue("Title", updatedHotel.title, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Rooms", updatedHotel.rooms, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("Type", updatedHotel.type, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [updatedHotel]);

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>
            {location.state?.updated ? "Updated" : "Add New"} Hotel
          </h2>
        </header>
        {/* Hiển thị lỗi sai ở đây */}
        <article className="form__input">
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input--flex">
              <div>
                <label htmlFor="Name">Name</label> <br />
                <input
                  type="text"
                  {...register("Name")}
                  placeholder="My Hotel"
                />
                <label htmlFor="City">City</label> <br />
                <input
                  type="text"
                  placeholder="New York"
                  {...register("City")}
                />
                <label htmlFor="far">Distance from city center</label> <br />
                <input
                  type="text"
                  placeholder="500"
                  {...register("Distance")}
                />
                <label htmlFor="Description">Description</label> <br />
                <input
                  type="text"
                  placeholder="Description"
                  id="Description"
                  {...register("Description")}
                />
                {!location.state?.updated && (
                  <>
                    <label htmlFor="Images">Images</label> <br />
                    <input
                      type="file"
                      // value="<%= updated.photos %>"
                      placeholder="Images"
                      {...register("Images")}
                      multiple
                    />
                  </>
                )}
              </div>
              <div>
                <label htmlFor="Type">Type</label> <br />
                <input type="text" placeholder="hotel" {...register("Type")} />
                <label htmlFor="Address">Address</label> <br />
                <input
                  type="text"
                  placeholder="elton st, 216"
                  {...register("Address")}
                />
                <label htmlFor="Title">Title</label> <br />
                <input
                  type="text"
                  placeholder="The best hotel"
                  {...register("Title")}
                />
                <label htmlFor="Price">Price</label> <br />
                <input type="text" placeholder="100" {...register("Price")} />
                <label htmlFor="Feature">Feature</label> <br />
                <select {...register("Feature")}>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </div>
            </div>
            <label htmlFor="Rooms">Rooms</label>
            <textarea {...register("Rooms")} cols={30} rows={5}></textarea>
            <br />
            <button type="submit">Send</button>
          </form>
        </article>
      </main>
    </>
  );
};

export default AddnewHotel;
