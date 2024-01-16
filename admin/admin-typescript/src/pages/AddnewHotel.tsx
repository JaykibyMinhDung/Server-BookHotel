import React from "react";
import Navigator from "../components/dashbroad/Navigator";
import { useForm } from "react-hook-form";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";

const AddnewHotel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.Images[0]);
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
    // const request = keyObject.map((e, index) => {
    // for (const [key, value] of Object.entries(data)) {
    //   return formData.append(key, value);
    // }
    // });
    // data = { ...data, Images: data.Images[0].name };
    // formData.append("recipe", JSON.stringify(data));
    Managers()
      .postNewhotels(formData)
      .then((res) => {
        alert(res.response.data.message);
      })
      .then(() => navigate("/room_list"))
      .catch((err) => {
        alert(err.response.data.message);
        console.error(err);
      });
  };
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Add New Hotel</h2>
        </header>
        {/* Hiển thị lỗi sai ở đây */}
        <article className="form__input">
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <label htmlFor="Images">Images</label> <br />
                <input
                  type="file"
                  // value="<%= updated.photos %>"
                  placeholder="Images"
                  {...register("Images")}
                  multiple
                />
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
