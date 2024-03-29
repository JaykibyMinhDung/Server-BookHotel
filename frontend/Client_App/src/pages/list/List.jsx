import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";

const List = () => {
	const location = useLocation();
	// console.log(location.state.data);
	// Cài đặt thêm nếu khách muốn đổi ý
	const resultsHotel = location.state.data.results;
	const [destination, setDestination] = useState(location.state.destination);
	const [newSearchResponse, setNewSearchResponse] = useState([]);
	const [date, setDate] = useState(location.state.date);
	const [openDate, setOpenDate] = useState(false);
	const [options, setOptions] = useState(location.state.options);

	const getDataSearchHotel = async () => {
		const requestSearch = {
			data: {
				city: destination,
				time: date,
				amountPeople: options
		  }
		}
		const res = await axios.post("http://localhost:5000/searchhotels", requestSearch);
		const changeData = await res.data;
		console.log(changeData);
		return setNewSearchResponse(changeData.results)
	};

	useEffect(() => {
		if (!newSearchResponse[0]) {
			setNewSearchResponse(resultsHotel);
		}
	}, [])
	// Tạo redux toolkit để quản lý các dữ liệu mà server gửi về

	return (
		<div>
			<Navbar />
			<Header type="list" />
			<div className="listContainer">
				<div className="listWrapper">
					<div className="listSearch">
						<h1 className="lsTitle">Search</h1>
						<div className="lsItem">
							<label>Destination</label>
							<input
								placeholder={destination}
								onChange={(event) => {
									setDestination(event.target.value);
								}}
								type="text"
							/>
						</div>
						<div className="lsItem">
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>{`${format(
								date[0].startDate,
								"MM/dd/yyyy"
							)} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
							{openDate && (
								<DateRange
									onChange={(item) => setDate([item.selection])}
									minDate={new Date()}
									ranges={date}
								/>
							)}
						</div>
						<div className="lsItem">
							<label>Options</label>
							<div className="lsOptions">
								<div className="lsOptionItem">
									<span className="lsOptionText">
										Min price <small>per night</small>
									</span>
									<input type="number" className="lsOptionInput" />
								</div>
								<div className="lsOptionItem">
									<span className="lsOptionText">
										Max price <small>per night</small>
									</span>
									<input type="number" className="lsOptionInput" />
								</div>
								<div className="lsOptionItem">
									<span className="lsOptionText">Adult</span>
									<input
										type="number"
										min={1}
										className="lsOptionInput"
										placeholder={options.adult}
									/>
								</div>
								<div className="lsOptionItem">
									<span className="lsOptionText">Children</span>
									<input
										type="number"
										min={0}
										className="lsOptionInput"
										placeholder={options.children}
									/>
								</div>
								<div className="lsOptionItem">
									<span className="lsOptionText">Room</span>
									<input
										type="number"
										min={1}
										className="lsOptionInput"
										onChange={(event) => {
											setOptions(event.target.value);
										}}
										placeholder={options.room}
									/>
								</div>
							</div>
						</div>
						<button onClick={getDataSearchHotel}>Search</button>
					</div>
					<div className="listResult">
						{newSearchResponse.map((hotel, i) => (
							<SearchItem key={i} data={hotel} date={date} />
						))}
						{/* 
            <SearchItem />
            <SearchItem /> */}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default List;
