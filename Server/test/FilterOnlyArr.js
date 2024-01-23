const lonelyarr = (a) => {
  UniqueHotel.push(a[0]);
  a.map((e) => {
    if (UniqueHotel.includes(e.name)) {
      UniqueHotel.push(e);
    }
  });
  return UniqueHotel;
};

// lăp 5 lần
for (const iterator of room) {
  for (const element of hotel) {
    element.rooms.map((e) => {
      console.log(element);
      // Map tùy vào số phòng mỗi hotel
      // map được 9
      console.log(e === iterator._id.toString());
      if (e === iterator._id.toString()) {
        // Lọc ra được 2 khách sạn còn lại
        // return {
        // ...iterator._doc,
        // idHotel:
        element._id;
        // };
      }
    });
  }
}
