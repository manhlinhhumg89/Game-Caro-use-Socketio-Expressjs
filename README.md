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
* Download trực tiếp trên trang chủ D3js.com
* Dùng link CDN nhúng vào trang html
# Hướng dẫn cách chạy chương trình
1. clone chương trình bằng lệnh sau: https://github.com/manhlinhhumg1985/caro_chess
2. Vào thư mục vừa tải về chạy file server.js bằng lệnh: node server.js
3. Mở 2 trình duyệt chrome nhập vào địa chỉ: 192.168.1.102:3000 (nếu máy khác thì dùng lệnh ifconfig để lấy địa chỉ IP máy rồi thay vào dòng 29 bên trang trangchu.ejs) sẽ hiện lên giao diện như sau:

![cho](2.png)

4. Tiến hành gõ tên đăng nhập để tạo người chơi
5. Sau khi tiến hành chơi người chơi thứ 2 đạt 5 ô X thì sẽ báo cho người chơi 1 bị thua cuộc và sẽ không cho cả 2 bên click thêm vào bàn cờ nữa kết quả như sau:

![co1](1.png)

# Giải thích chương trình 
## Cách dữ liệu trong chương trình gửi từ client lên server và server trả về cho người chơi như sau:
* Khi một trong 2 người chơi click lên 1 ô vuông trên bàn cờ thì phía người chơi phát 1 sự kiện gửi lên server và dữ liệu kèm theo đó là một object(x: x,
y: y) với x, y là tọa độ của ô vuông trên bàn cờ bằng đoạn code như sau:

![co1](3.png)

* Phía server sẽ lắng nghe sự kiện phát ra từ người chơi 1 với dữ liệu nhận được là tọa độ (x,y) của người chơi 1 và đồng thời từ server sau khi lắng nghe sự kiện phát ra từ người chơi 1 thì sẽ add thêm tọa độ (x,y) vừa gửi từ người chơi 1 vào mảng chứa các nước đi trên server và kiểm tra thắng thua sử dụng mảng 2 chiều này, đồng thời sẽ phát lại cho 2 người chơi tọa độ (x,y) của người chơi 1  

```javascript 
        socket.on("su-kien-click", function (data) {
        let vitri = mangUser.indexOf(socket.Username)
        let Columb = data.x / 50;
        let Row = data.y / 50;
        //Kiem tra khong cho nguoi choi gui du lieu 2 lan lien tuc len server
        if (socket.Username !== mangnguoichoi[0]) {
            mangnguoichoi.unshift(socket.Username);
            if (vitri === 0) {
                if (Arr_Board[Row][Columb] === 0) {
                    Arr_Board[Row][Columb] = 1;
                    io.sockets.emit("server-send-data", {
                        name: socket.Username,
                        x: data.x,
                        y: data.y,
                        nguoichoi: vitri,
                        ArrId: mangnguoichoi,
                        Board: Arr_Board,
                        value: 1
                    })
          }
```
* Tương tự cũng như vậy cho các nước đi của người chơi thứ 2.
## Logic của toàn bộ chương trình như sau:
### Phía Client
1. Vì chương trình có sử dụng D3 js, bootstrap, socket.IO do đó có thể dùng link cdn hay dùng thư mục tải về từ trang chủ. Trong chương trình sử dụng link cdn.
2. Phần logic nằm trong thẻ script
* Đầu tiên tạo 1 kết nối lên server bằng code sau:

```javascript 
        var socket = io("192.168.1.102:3000")
        trong đó: 192.168.1.102 là địa chỉ IP của máy
```

* Tiến hành nhập tên người chơi vào ô input và phát sự kiện "socket.emit gửi lên server" mục đích nhập tên người chơi để tạo mảng kiểm tra sau này.

```javascript 
        $(document).ready(function () {
        //nguoi choi emit ten dang nhap len server
            $("#btnRegister").click(function () {
                socket.emit("client-send-name", $("#txtUsername").val())
            })
         })
``` 

* Sau khi gửi lên server thì server trả về  tên người chơi cho cả 2 người chơi bằng lệnh sau:

```javascript 
        socket.on("server-send-danhsach-user", function (data) {
            $("#boxContent").html("");
            data.forEach(function (i) {
                $("#boxContent").append("<div class='user'>" + i + "</div>")
             })
        })
```
trong đó: socket.on là lắng nghe sự kiện gửi từ server với name phải trùng tên với name ở trên server
* Tiếp theo tiến hành vẽ các ô vuông tượng trưng cho bàn cờ bằng code sau:

```javascript 
        const div = d3.select("body").append("div").attr("id", "content").style("text-align","center");
         const svg = div.append("svg").attr("width", 800).attr("height", 600);
         for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            // draw each chess field
            const box = svg.append("rect")
                .attr("x", i * 50)
                .attr("y", j * 50)
                .attr("width", 50)
                .attr("height", 50)
                .attr("id", "b" + i + j)
                .style("stroke","black")
                .on("click", function () {
                    let selected = d3.select(this);
                    socket.emit("su-kien-click", {x: selected.attr('x'), y: selected.attr('y')})

                });
            if ((i + j) % 2 === 0) {
                box.attr("fill", "beige");
            } else {
                box.attr("fill", "beige");
            }
        }
        }
```

- ở mỗi ô vuông ta sẽ gán cho 1 sự kiện click với mục đích khi người chơi click vào 1 ô trên bàn cờ thì tiến hành lấy tọa độ (x,y) của ô vuông vừa click đồng thời sẽ phát 1 sự kiện gửi tọa độ này lên server

* Sau khi người chơi gửi tọa độ (x,y) khi người chơi click vào ô vuông trên bàn cờ thì server lắng nghe sự kiện đó và trả về các giá trị sau:
- người chơi các thuộc tính của người chơi là 1 đối tượng trong đó có các thuộc tính thông qua biến data {tọa độ x, tọa độ y, giá trị của người chơi}. Ở đây giá trị người có thể là 1 hoặc 0 nếu là 1 thì đánh "X" nếu là 0 thì đánh"0".
- nếu bị thua tức là thỏa điều kiện thua sau khi kiểm tra ma trận nước đi trên server và sẽ gửi thông điệp không cho người chơi click tiếp vào bàn cờ, code thực hiện như sau:
- code này thể hiện khi ai sẽ là người đánh "X" hay "0"

```javascript 
       
        socket.on("server-send-data", function (data) {
        console.log("gia tri ma client nhan tu server:")
        console.log("mang nguoi choi :" + data.ArrId)
        console.log("Id:" + data.name);
        console.log("nguoi cho thu:", data.nguoichoi)
        console.log("Ma tran cac nuoc di:",data.Board)
        console.log("Gia tri cua nguoi choi:"+ data.value)
        console.log("x_client:" + data.x);
        console.log("y_client:" + data.y);
        let matrix = data.Board;
        let Cur_Row = parseInt(data.x);
        let Cur_Col = parseInt(data.y);
        let Value = parseInt(data.value);
        const tick = svg
            .append("text")
            .attr("x", parseInt(data.x))
            .attr("y", parseInt(data.y))
            .attr("text-anchor", "middle")
            .attr("dx", 50 / 2)
            .attr("dy", 50 / 2 + 8)
            .text(function () {
                if (data.nguoichoi === 1) {
                    return "X"
                }
                else if (data.nguoichoi === 0) {
                    return "O"
                }
            })
            .style("font-weight", "bold")
            .style("font-size", "30px")
            .style("fill", function () {
                if (data.nguoichoi === 1) {
                    return "000066"
                }
                else if (data.nguoichoi === 0) {
                    return "FF0000"
                }
            })

        })
```

- code thể hiện khi người thua thì sẽ in lên mà hình đối thủ string="BAN DA BI THUA" với data được gửi từ server

```javascript 
         socket.on("phat-su-kien-thang-thua",function (data) {
        const lost = svg
            .append("text")
            .attr("x",400)
            .attr("y",200)
            .text(data)
            .style("fill","red")
            .style("font-size", "40px")
        })
```
- code thể hiện không cho cả 2 người chơi click vào màn hình khi 1 trong 2 người chơi bị thua cuộc

```javascript 
         socket.on("khong-cho-doi-thu-click-khi-thua",function () {
            $('#content').css('pointer-events', 'none');
        })
```













