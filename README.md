# caro_chess
Chương trình chơi cờ caro với 2 người chơi (dùng D3 js, socket.io)

#Giới thiệu nguồn gốc trò chơi cờ Caro
* Ban đầu loại cờ này được chơi bằng các quân cờ vây (quân cờ màu trắng và đen) trên một bàn cờ vây (19x19). Quân đen đi trước và người chơi lần lượt đặt một quân cờ của họ trên giao điểm còn trống. 
* Người thắng là người đầu tiên có được một chuỗi liên tục gồm 5 quân hàng ngang, hoặc dọc, hoặc chéo. Tuy nhiên, vì một khi đã đặt xuống, các quân cờ không thể di chuyển hoặc bỏ ra khỏi bàn, do đó loại cờ này có thể chơi bằng giấy bút. Ở Việt Nam, cờ này thường chơi trên giấy tập học sinh (đã có sẵn các ô ca-rô), dùng bút đánh dấu hình tròn (O) và chữ X để đại diện cho 2 quân cờ.
* Một ván cờ caro Việt Nam với các quân cờ dạng X,O.
![co caro](CaroVN.jpg)
# Các công nghệ sử dụng để xây dựng chương trình
## Socket.io
* Socket io là một thư viện Javascript dùng để phát triển các ứng dụng thời gian thực. Thư viện Socket.IO được phát triển để dùng cho cả client và server(chạy Node.js) 
* Đầu tiên thư việc Socket.IO có thể được cài đặt trên server (Node.js) sử dụng chương trình quản lý package Node hay NPM. Sau khi cài đặt bạn có thể khởi động Socket.IO như sau: 
 ```javascript 
        var socket = require('socket.io');
```
* Với việc Socket.IO được sử dụng trên server thì sau đó server sẽ cung cấp một địa chỉ URL để client (trình duyệt ) có thể tải thư viện Socket.IO này về từ server và nhúng vào trang như sau:
```javascript 
        <script src="/socket.io/socket.io.js"></script>
```
## D3.js 
* Là một thư viện rất nổi tiếng trong thế giới Web Visualization, D3.js có thể sử dụng để trực quan hóa dữ liệu, vẽ các biểu đồ, đồ thị trực quan, bản đồ, ... thậm chí làm được cả Game. D3 vừa ra mắt 4.0, với các chức năng mới như modular, composed of small libraries. 













