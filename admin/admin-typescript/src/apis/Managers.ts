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
  async function getRoomsList() {
    const { data } = await instanceAxios.get("room-list");
    return data;
  }
  async function getHotelsList() {
    const { data } = await instanceAxios.get("hotel-list");
    return data;
  }
  return {
    getDashbroad,
    getTransactions,
    getRoomsList,
    getHotelsList,
  };
};
