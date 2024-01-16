import { instanceAxios } from "../config/axios";

export const Managers = () => {
  async function getDashbroad() {
    const { data } = await instanceAxios.get("admin");
    return data;
  }
  async function getTransactions() {
    const { data } = await instanceAxios.get("transactionlist");
    return data;
  }
  async function getHotelsList() {
    const { data } = await instanceAxios.get("hotel-list");
    return data;
  }
  async function postNewhotels(request: any) {
    const { data } = await instanceAxios.post("hotel-list/new-hotel", request);
    return data;
  }
  async function updatedhotelsList(id: string) {
    const { data } = await instanceAxios.put(`hotel-list/updated/${id}`);
    return data;
  }
  async function deletedhotelsList(id: string) {
    const { data } = await instanceAxios.delete(`hotel-list/deleted/${id}`);
    return data;
  }
  async function getRoomsList() {
    const { data } = await instanceAxios.get("room-list");
    return data;
  }
  async function postNewrooms(request: any) {
    const { data } = await instanceAxios.post("room-list/new-room", request);
    return data;
  }
  async function updatedroomsList(id: string) {
    const { data } = await instanceAxios.put(`room-list/updated/${id}`);
    return data;
  }
  async function deletedroomsList(idRoom: string, idHotel: string | undefined) {
    const query = "?" + `idHotel=${idHotel}`;
    const { data } = await instanceAxios.delete(
      `room-list/deleted/${idRoom}${query}`
    );
    return data;
  }
  async function optionhotelsList() {
    const { data } = await instanceAxios.get("room-list/new-room");
    return data;
  }
  return {
    getDashbroad,
    getTransactions,
    getRoomsList,
    getHotelsList,
    postNewhotels,
    updatedhotelsList,
    deletedhotelsList,
    postNewrooms,
    updatedroomsList,
    deletedroomsList,
    optionhotelsList,
  };
};
