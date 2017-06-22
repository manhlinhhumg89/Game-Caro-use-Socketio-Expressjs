/**
 * Created by thanhhuyen on 6/12/17.
 */
const express = require("express")
let app = express();
//vi trang web minh la co rat nhieu file javascript hay css
// ma cu moi lan co request cua khach hang gui len ma lai tao ra thi khong duoc
//cho nen phia server minh se tao 1 thu muc la public
//va tat ca cac file de trong public khach hang truy cap dc het
app.use(express.static("./public"));//-> tata cac requet gui len thi khach hang di vao  public ma tim
app.set("view engine", "ejs")//
app.set("/views", "./views")//thu muc chua "trangchu"
let server = require("http").Server(app);
//khai bao socket
var io = require("socket.io")(server)
server.listen(3000);
//lang nghe co nguoi ket noi len server
let mangUser = [];
let mangnguoichoi = [];
//Tao ra mang ban co trong do cac cell co gia tri ban dau la 0 muc dich tao ra ma tran ban co nay de xet thang thua cho nguoi choi
//dung method cua Array
Array.matrix = function (n, init) {
    let mat = [];
    for (let i = 0; i < n; i++) {
        a = [];
        for (let j = 0; j < n; j++) {
            a[j] = init;
        }
        mat[i] = a;
    }
    return mat;
}
let Arr_Board = Array.matrix(8, 0)
//mang ma tran ban co sau khi khoi tao se co dang nhu sau:
/*[ [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ],
 [ 0, 0, 0, 0, 0, 0, 0, 0 ] ]*/
//Kiem tra thang thua khi nguoi choi danh nuoc moi tren ban co
//Theo phương thẳng đứng phía trên
let Vertically_up = (Matrix, Cur_row, Cur_col, value) => {

}
//Theo phương thẳng đứng phía duoi
let Vertically_down = (Mat, Cur_row, Cur_col, Value) => {
    let count = 0;
    for (let i = 0; i <5; i++) {
        if (Mat[i][Cur_col] === Value) {
            count++;
            if(count ===5){
                return 1;
            }
        }
    }
}
//Theo phương ngang bên phải
function Horizontal_right (Mat, Cur_row, Cur_col, Value) {
    let count = 0;
    for (let i = 0; i < 5; i++) {
        if (Mat[Cur_row][Cur_col+i] === Value) {
            count++;
            if (count === 5) {
                return 1;
            }
        }
    }
}
//Theo phương ngang bên trái
let Horizontal_left = (Cur_row, Cur_col) => {

}
//Theo phương đường chéo phía trên bên phải
let Diagonal_right_up = (Cur_row, Cur_col) => {

}
//Theo phương đường chéo phía dưới bên phải
let Diagonal_right_down = (Cur_row, Cur_col) => {

}
//Theo phương đường chéo phía trên bên trái
let Diagonal_left_up = (Cur_row, Cur_col) => {

}
//Theo phương đường chéo phía dưới bên trái
let Diagonal_left_down = (Cur_row, Cur_col) => {

}
//Ket thuc
io.on("connection", function (socket) {
    console.log("co nguoi ket noi:" + socket.id)
    //lang nghe su kien tu client gui len
    socket.on("client-send-name", function (data) {
        if (mangUser.length > 2) {
            socket.emit("send-dki-that-bai")
        }
        else {
            mangUser.push(data);
            socket.Username = data;
            io.sockets.emit("server-send-danhsach-user", mangUser)
        }
    })
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
                    //check ma tran hien tai cua ban co
                    //Kiem tra so luong quan cung mau tren hang ngang tu trai sang phai
                    let string = ''
                    let count = 0;
                    /*for (let i = 0; i < 6; i++) {
                        if (Arr_Board[Row][i] === 1) {
                            count++;
                            if (count === 5) {
                                string = "BAN DA THUA"
                                socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua")
                                socket.broadcast.emit("phat-su-kien-thang-thua", string)
                            }
                        }
                    }*/
                    if(Horizontal_right(Arr_Board,Row,Columb,1)){
                        string ="BAN DA THUA CUOC";
                        socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua");
                        socket.broadcast.emit("phat-su-kien-thang-thua", string)
                    }
                    if(Vertically_down(Arr_Board,Row,Columb,1)){
                        string ="BAN DA THUA CUOC";
                        socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua");
                        socket.broadcast.emit("phat-su-kien-thang-thua", string)
                    }
                }
            }
            else {
                if (Arr_Board[Row][Columb] === 0) {
                    Arr_Board[Row][Columb] = 2;
                    io.sockets.emit("server-send-data", {
                        name: socket.Username,
                        x: data.x,
                        y: data.y,
                        nguoichoi: vitri,
                        ArrId: mangnguoichoi,
                        Board: Arr_Board,
                        value: 2
                    })
                    let string = ''
                    let count1 = 0;
                    /*for (let i = 0; i < 6; i++) {
                        if (Arr_Board[Row][i] === 2) {
                            count1++;
                            if (count1 === 5) {
                                string = "BAN DA THUA"
                                socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua")
                                socket.broadcast.emit("phat-su-kien-thang-thua", string)
                            }

                        }
                    }*/
                    if(Horizontal_right(Arr_Board,Row,Columb,2)){
                        string ="BAN DA THUA CUOC";
                        socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua");
                        socket.broadcast.emit("phat-su-kien-thang-thua", string)
                    }
                    if(Vertically_down(Arr_Board,Row,Columb,2)){
                        string ="BAN DA THUA CUOC";
                        socket.broadcast.emit("khong-cho-doi-thu-click-khi-thua");
                        socket.broadcast.emit("phat-su-kien-thang-thua", string)
                    }
                }
            }
        }
    })
})
//Tao 1 routter
app.get("/", function (req, res) {
    res.render("trangchu")//vi dang dung ham cua express nen ta co ham render
    //muon render duoc thi khai bao chung ta dang dung ejs
})