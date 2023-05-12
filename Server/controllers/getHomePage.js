const Hotel = require("../model/hotel");

exports.getCountHotel = (req, res, next) => {
  Hotel.find().then((hotel) => {
    res.send(hotel);
  });
};

exports.postHotel = (req, res, next) => {
  const nameHotel = req.body.nameHotel;
  const typeHotel = req.body.typeHotel;
  const cityHotel = req.body.cityHotel;
  const addressHotel = req.body.addressHotel;
  const distanceHotel = req.body.distanceHotel;
  const photoHotel = req.body.photoHotel;
  const descHotel = req.body.descHotel;
  const ratingHotel = req.body.ratingHotel;
  const featuredHotel = req.body.featuredHotel;
  const roomsHotel = req.body.roomsHotel;
  const hotel = new Hotel({
    nameHotel: nameHotel,
    typeHotel: typeHotel,
    cityHotel: cityHotel,
    addressHotel: addressHotel,
    distanceHotel: distanceHotel,
    photoHotel: photoHotel,
    descHotel: descHotel,
    ratingHotel: ratingHotel,
    featuredHotel: featuredHotel,
    roomsHotel: roomsHotel,
  });
  hotel
    .save()
    .then((results) => {
      console.log(results);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getGenreHotel = (req, res, next) => {
  res.send("genreHotel");
};

exports.getRatingHotel = (req, res, next) => {
  res.send("RatingHotel");
};
