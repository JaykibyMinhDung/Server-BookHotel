// Tính chênh lệch giữa các ngày
export const dateDiff = (first, second) => {
  const firstDate = new Date(first); //
  const secondDate = new Date(second); //
  const firstDateInMs = firstDate.getTime();
  const secondDateInMs = secondDate.getTime();
  const differenceBtwDates = secondDateInMs - firstDateInMs;
  const aDayInMs = 24 * 60 * 60 * 1000;
  return Math.round(differenceBtwDates / aDayInMs);
};

// Cấu trúc lại date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-CL");
};

export const isMatchDate = hasFilterPeople.filter(
  (rooms) =>
    new Date(rooms.createdAt).getDate() >
      new Date(timeClient[0].endDate).getDate() ||
    new Date(rooms.updatedAt).getDate() <
      console.log(new Date(timeClient[0].startDate).getDate())
);

// So sánh ngày bị trùng
export const comparesOutDate = (
  startDateRemote,
  endDateRemote,
  startDateLocal,
  endDateLocal
) => {
  const formatMonth = (month) => {
    return new Date(month).getMonth();
  };
  const compareMonth = (firstDate, secondDate) => {
    if (formatMonth(firstDate) === formatDate(secondDate)) {
      return true; // Cùng tháng
    } else {
      return false; // Khác tháng
    }
  };
  // Điều kiện 1: là 2 khoảng thời gian này nằm cùng 1 tháng
  if (compareMonth(startDateRemote, startDateLocal)) {
    // Trường hợp 1: ngày bắt đầu người dùng mới gửi về lớn hơn với ngày kết thúc của người dùng cũ
    return (
      new Date(startDateLocal).getDate() > new Date(endDateRemote).getDate() ||
      // Trường hợp 2: Ngày kết thúc người dùng mới gửi về nhỏ hơn ngày bắt đầu của người dùng cũ
      new Date(endDateLocal).getDate() < new Date(startDateRemote).getDate()
    );
    // Trường hợp thứ 3: Ngày kết thúc của người dùng mới ít hơn ngày bắt đầu và cả ngày kết thúc của người dùng cũ
    // Trường hợp thứ 4: Ngày bắt đầu của người dùng mới nhiều hơn
  } else {
    // Điều kiện 2: là 2 khoảng thời gian nằm ở các tháng khác nhau, không cùng 1 tháng
    if (
      compareMonth(startDateRemote, startDateLocal) &&
      compareMonth(endDateRemote, endDateLocal)
    ) {
      // Mọi tháng khác đều sẽ là hợp lệ để booked
      return true;
    } else {
      return (
        new Date(startDateLocal).getDate() >
          new Date(endDateRemote).getDate() ||
        new Date(endDateLocal).getDate() < new Date(startDateRemote).getDate()
      );
    }
  }
};

/*
const b = [];
for (const element of roomsSearch) {
  results.map((e) => {
    if (element.id === e.hotel) {
      const isMatchDate =
        new Date(e.dateStart).getDate() >
          new Date(timeClient[0].endDate).getDate() ||
        new Date(e.dateEnd).getDate() <
          new Date(timeClient[0].startDate).getDate();
      console.log(
        new Date(e.dateStart).getDate(),
        new Date(timeClient[0].endDate).getDate()
      );
      return b.push(element);
      // return res.json(isMatchDate);
    }
  });
}

15 - 20 local

17 - 25 remote

*/
