const lonelyarr = (a) => {
  UniqueHotel.push(a[0]);
  a.map((e) => {
    if (UniqueHotel.includes(e.name)) {
      UniqueHotel.push(e);
    }
  });
  return UniqueHotel;
};
