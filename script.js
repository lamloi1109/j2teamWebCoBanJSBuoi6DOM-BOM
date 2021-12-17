let box = document.querySelector('.container');
let btn_add = document.querySelector('#btn_add');
let btn_del = document.querySelector('#btn_del');
let btn_x = document.querySelector('#btn_x');
let btn_rs = document.querySelector('#btn_rs');
let list_tc = document.querySelectorAll('.tc');
let list_diem = document.querySelectorAll('.diem');
let list_diem_4 = document.querySelectorAll('.diem4');
let list_ip = document.querySelectorAll('input');
let danh_sach_ma_mau = ["#497542","#779645","#274530","#6E3C3B","#BF403B","#EDB361","#94AA9E","#556F6E","#544A57","#544A57"];
let stt = 2;
let arr_diem_4 = [];
let arr_tin_chi = [];
let tong_tin_chi = 0;
let tc_diem_hp = 0;
let diem_tb_hk = 0;
function main() {
    // Mặc định số môn tối thiểu luôn là 1 và không thể xóa thêm nữa
    if (stt === 2) {
        btn_del.disabled = true;
    }
    // Xử lý khi click vào btn thêm
    btn_add.addEventListener('click', function () {
        const newDiv = document.createElement("div");
        newDiv.classList.add('row');
        newDiv.innerHTML = `<div class='col'><div class='stt'>${stt}</div></div><div class='col'><div class='input'><input type='text'  class='tc'></div></div><div class='col'><div class='input'><input type='text' class='diem'></div></div><div class='col'><div class='diem4'></div></div>`;
        box.appendChild(newDiv);
        stt++;
        btn_del.disabled = false;
        // Cập nhật lại node list
        list_tc = document.querySelectorAll('.tc');
        list_diem = document.querySelectorAll('.diem');
        list_ip = document.querySelectorAll('input');
        list_diem_4 = document.querySelectorAll('.diem4');
    });
    // Xử lý khi ấn reset
    btn_rs.addEventListener('click', function () {
        // for (let i = 0; i < list_ip.length; i++) {
        //     list_ip[i].value = "";
        // }
        window.location.reload();
    });

    // Xử lý khi click vào btn xóa
    btn_del.addEventListener('click', function () {
        if (stt > 2) {
            document.querySelectorAll('.row')[box.childElementCount - 1].remove();
            stt--;
        }
        if (stt === 2) {
            btn_del.disabled = true;
        }
        // Cập nhật lại node list
        list_tc = document.querySelectorAll('.tc');
        list_diem = document.querySelectorAll('.diem');
        list_ip = document.querySelectorAll('input');
        list_diem_4 = document.querySelectorAll('.diem4');
    });

    btn_x.addEventListener('click', function () {
        // Reset lại mảng chưa điểm và tín chỉ sau mỡi lần tính
        arr_diem_4 = [];
        arr_tin_chi = [];
        // Biến kiểm tra các thông tin đã điền đầy đủ hay chưa
        let check = true;
        for (let i = 0; i < list_ip.length; i++) {
            if (list_ip[i].value === "") {
                alert("Vui lòng điền đầy đủ thông tin!");
                check = false;
                break;
            }
        }
        if (check) {
            // BIến kiểm tra giá trị điểm hoặc tín chỉ có đúng định dạng hay chưa
            let checkvlue = true;
            for (let i = 0; i < list_ip.length; i++) {
                if (Number.isNaN(parseInt(list_ip[i].value)) || parseInt(list_ip[i].value) < 0 || parseInt(list_ip[i].value) > 10) {
                    list_ip[i].style.border = "2px solid red";
                    checkvlue = false;
                } else {
                    list_ip[i].style.border = "1px solid black";
                    checkvlue = true;
                }
            }
            // Kiểm tra giá trị có hợp lệ hay không
            if (checkvlue) {
                try {
                    for (let i = 0; i < list_diem.length; i++) {
                        arr_tin_chi.push(parseInt(list_tc[i].value));
                        // Duyệt qua khung điểm 10 để quy đổi ra khung điểm 4 trong hệ thống tín chỉ
                        if (parseFloat(list_diem[i].value) >= 9) {
                            list_diem_4[i].innerHTML = "A";
                            arr_diem_4.push(4);
                        } else if (parseFloat(list_diem[i].value) >= 8 && parseFloat(list_diem[i].value) < 9) {
                            list_diem_4[i].innerHTML = "B+";
                            arr_diem_4.push(3.5);
                        } else if (parseFloat(list_diem[i].value) >= 7 && parseFloat(list_diem[i].value) < 8) {
                            list_diem_4[i].innerHTML = "B";
                            arr_diem_4.push(3);
                        } else if (parseFloat(list_diem[i].value) >= 6.5 && parseFloat(list_diem[i].value) < 7) {
                            list_diem_4[i].innerHTML = "C+";
                            arr_diem_4.push(2.5);
                        } else if (parseFloat(list_diem[i].value) >= 5.5 && parseFloat(list_diem[i].value) < 6.5) {
                            list_diem_4[i].innerHTML = "C";
                            arr_diem_4.push(2);
                        } else if (parseFloat(list_diem[i].value) >= 5 && parseFloat(list_diem[i].value) < 5.5) {
                            list_diem_4[i].innerHTML = "D+";
                            arr_diem_4.push(1.5);
                        } else if (parseFloat(list_diem[i].value) >= 4 && parseFloat(list_diem[i].value) < 5) {
                            list_diem_4[i].innerHTML = "D";
                            arr_diem_4.push(1);
                        } else if (parseFloat(list_diem[i].value) < 4) {
                            list_diem_4[i].innerHTML = "F";
                            arr_diem_4.push(0);
                        }

                    }
                    // Tính tổng số tín chỉ đã học
                    for (const value of arr_tin_chi) {
                        tong_tin_chi = tong_tin_chi + value;
                    }
                    document.querySelector('#tong_tin_chi').innerHTML = `Tổng tín chỉ đã học: ${tong_tin_chi}`;
                    // Tính điểm TBHK 
                    for (let i = 0; i < arr_diem_4.length; i++) {
                        tc_diem_hp = arr_tin_chi[i] * arr_diem_4[i] + tc_diem_hp;
                    }
                    diem_tb_hk = tc_diem_hp / tong_tin_chi;
                    document.querySelector('#diem_tb_hk').innerHTML = `Điểm TBHK: ${diem_tb_hk.toFixed(3)}`;
                    // Xếp loại
                    if (diem_tb_hk >= 3.6 && diem_tb_hk <= 4) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Xuất sắc`;
                    } else if (diem_tb_hk >= 3.2 && diem_tb_hk < 3.6) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Giỏi`;
                    } else if (diem_tb_hk >= 2.5 && diem_tb_hk < 3.2) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Khá`;
                    } else if (diem_tb_hk >= 2 && diem_tb_hk < 2.5) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Trung Bình`;
                    } else if (diem_tb_hk >= 1 && diem_tb_hk < 2) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Yếu`;
                    } else if (diem_tb_hk < 1) {
                        document.querySelector('#xep_loai').innerHTML = `Xếp loại: Kém`;
                    }

                } catch (error) {
                    alert(error);
                    list_diem_4[i].innerHTML = "Điểm không hợp lệ!";
                }
            } else {
                alert("Giá trị phải là số, không được nhỏ hơn 0 và lớn hơn 10 !!");
            }

        }

    });
    setInterval(thay_doi_mau, 10000);
}
main();
// Quả đổi màu mù mắt :)))
function thay_doi_mau() {
    document.body.style.background = danh_sach_ma_mau[lay_index() - 1];
    box.style.background = danh_sach_ma_mau[lay_index() - 1];
    box.style.color = danh_sach_ma_mau[lay_index() - 1];
    document.querySelector('.bottom').style.background =  danh_sach_ma_mau[lay_index() - 1];
    document.querySelector('.bottom').style.color =  danh_sach_ma_mau[lay_index() - 1];
    document.getElementsByTagName('h1')[0].style.color = danh_sach_ma_mau[lay_index() - 1];
}
function lay_index(){
   let index = Math.floor(Math.random() * 10);
    return index;
}
