# Một số bug hay tính năng chưa tối ưu

## Lọc chính xác khách sạn có số phòng mà khách hàng đặt

Khách đặt phòng có 3 người, 2 phòng thì mình chuyển khách sang khách sạn có yêu cầu đó
KHÔNG HIỆN THEO TỪNG PHÒNG CỦA KHÁCH SẠN VÌ KHI CLICK VÀO KHÁCH SẠN THÌ CŨNG SẼ HIỆN FULL PHÒNG

## Tính giá tiền linh động theo ngày khách chuyển

Ví dụ: Khách đang ở dấu tích $120 thì khi tăng số ngày sẽ tăng giá tiền lên

## Chỉnh lại giao diện lại transaction

Học cách chuyển màu từng row, chỉnh lại size chữ và độ đậm nhạt


## Một số yêu cầu của Asm :

- Người dùng sẽ cần bắt buộc chọn ngày nhận và trả phòng dự kiến. Sau khi chọn ở phần DatePicker thì bạn sẽ lọc các Room trống trong thời gian phù hợp đó và hiển thị bên dưới form như ảnh trên.

- Sau đó, người dùng nhập đầy đủ các thông tin Booking ở form bên tay phải (giá trị ban đầu của các ô sẽ tương ứng với thông tin của User đang đăng nhập).

- Tiếp theo, người dùng chọn các phòng muốn đặt. Hệ thống sẽ tính tổng giá tiền tương ứng (số tiền 1 phòng * số phòng * số ngày).

- Người dùng chọn cách thức thanh toán và nhấn "Reserve Now". Lúc này bạn sẽ gọi xuống API ở server để tạo giao dịch, nếu thành công sẽ chuyển người dùng về Transaction Dashboard (yêu cầu số 8).

# Hướng giải yêu cầu 1:
 - Khi ấn chọn xong ngày đi và đến thì màn hình sẽ thay đổi theo các phòng, nghĩa là phải gắn api vào useEffect và cho thêm date vào depences. Mỗi lần thay đổi date và phòng sẽ hiển thị theo api trả về. Khi click vào phòng thì sẽ lấy được dữ liệu người dùng qua check

 - Khi chọn phương thức thanh toán thì có thể hiển thị ra số tiền