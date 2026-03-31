
function checkAuth() {
    /**
     * 1. kiem tra localstorage co bien user ko neu co la dang nhap thanh cong
     * ko la dieu huong ve login or 403 page
     * 
     */
    const user = localStorage.getItem('user')
    if (user) {
        console.log(user)
        return JSON.parse(user)
    } else {
        window.location = "login.html"
    }
}

function initProduct() {
    const products = localStorage.getItem('products')
    if (products) {
        return JSON.parse(products)
    } else {
        const mockData = [
            {
                "maSanPham": "MH-001",
                "tenSanPham": "Màn hình Dell UltraSharp 27 inch U2723QE",
                "giaVND": 12500000,
                "soLuongTon": 15,
                "danhMuc": "Màn hình",
                "hinhAnh": "https://picsum.photos/seed/monitor1/400/300"
            },
            {
                "maSanPham": "LT-002",
                "tenSanPham": "Laptop MacBook Air M2 8GB/256GB",
                "giaVND": 26990000,
                "soLuongTon": 10,
                "danhMuc": "Laptop",
                "hinhAnh": "https://picsum.photos/seed/laptop1/400/300"
            },
            {
                "maSanPham": "BP-003",
                "tenSanPham": "Bàn phím cơ Keychron K2 V2 (Aluminum)",
                "giaVND": 18500000,
                "soLuongTon": 25,
                "danhMuc": "Bàn phím",
                "hinhAnh": "https://picsum.photos/seed/kb1/400/300"
            },
            {
                "maSanPham": "CH-004",
                "tenSanPham": "Chuột không dây Logitech MX Master 3S",
                "giaVND": 2350000,
                "soLuongTon": 30,
                "danhMuc": "Chuột",
                "hinhAnh": "https://picsum.photos/seed/mouse1/400/300"
            },
            {
                "maSanPham": "MH-005",
                "tenSanPham": "Màn hình Gaming LG UltraGear 24GQ50F",
                "giaVND": 4200000,
                "soLuongTon": 20,
                "danhMuc": "Màn hình",
                "hinhAnh": "https://picsum.photos/seed/monitor2/400/300"
            },
            {
                "maSanPham": "LT-006",
                "tenSanPham": "Laptop ASUS ROG Zephyrus G14 (2024)",
                "giaVND": 34500000,
                "soLuongTon": 5,
                "danhMuc": "Laptop",
                "hinhAnh": "https://picsum.photos/seed/laptop2/400/300"
            },
            {
                "maSanPham": "BP-007",
                "tenSanPham": "Bàn phím Akko 3068B Multi-mode Black Gold",
                "giaVND": 1450000,
                "soLuongTon": 12,
                "danhMuc": "Bàn phím",
                "hinhAnh": "https://picsum.photos/seed/kb2/400/300"
            },
            {
                "maSanPham": "CH-008",
                "tenSanPham": "Chuột Gaming Razer DeathAdder V3 Pro",
                "giaVND": 3100000,
                "soLuongTon": 18,
                "danhMuc": "Chuột",
                "hinhAnh": "https://picsum.photos/seed/mouse2/400/300"
            },
            {
                "maSanPham": "LT-009",
                "tenSanPham": "Laptop Lenovo ThinkPad X1 Carbon Gen 11",
                "giaVND": 38000000,
                "soLuongTon": 7,
                "danhMuc": "Laptop",
                "hinhAnh": "https://picsum.photos/seed/laptop3/400/300"
            },
            {
                "maSanPham": "MH-010",
                "tenSanPham": "Màn hình Cong Samsung Odyssey G5 32 inch",
                "giaVND": 7900000,
                "soLuongTon": 10,
                "danhMuc": "Màn hình",
                "hinhAnh": "https://picsum.photos/seed/monitor3/400/300"
            }
        ]
        localStorage.setItem('products', JSON.stringify(mockData))
        return mockData

    }

}

window.addEventListener('load', (event) => {
    const user = checkAuth()
    const showme = document.getElementById('show_me')
        .innerText = `xin chào ${user.name}`
    // init product 
    initProduct()
    hienthi()
})


function logout() {
    localStorage.removeItem("user")
    window.location = "login.html"
}

const logoutbtn = document.getElementById('logout')
logoutbtn.addEventListener('click', () => {
    logout()
})


function handleXoa (ma) {
    const check  = confirm(`bạn chắc xóa product id ${ma} không  ?`)
    if(check) {
        const products = initProduct();
        const deletedProducts = products.filter(product => product.maSanPham !== ma)
        console.log(deletedProducts)
         localStorage.setItem('products', JSON.stringify(deletedProducts))
         alert("xóa thanh cong")
    // load lai giao dien
        hienthi()
    }
}


/**
 * logout dang xuat
 * xoa cai gi ? -> localstorage key user
 *  di ve trang dang nhap login.html
 * 
 */
/**
 * QL san pham
 * thêm sản phẩm
 * Sửa sản phẩm
 * Xóa sản phẩm
 * Chi tiết
 * Xem sản phẩm ( phân trang, sắp xếp, lọc( tìm kiếm...))
 */
/**
 * 1 hien thi ds san pham
 * b1.lay du lieu tu initProduct
 * b2. dung vong lap de show tat ca item va ghi vao 1 bien string html
 * b3 gan bien html cho cai id 
 */

function hienthi() {
    const tbody = document.getElementById(`list_product`)
    let danhsachsanpham = initProduct()
    let html = ''
    danhsachsanpham.forEach((product, index) => {
        html += `
    
     <tr>
                                    
                                    <td>
                                    <img src="${product.hinhAnh}" width="200px">
                                    </td>
                                    <td>${product.maSanPham}</td>
                                    <td>${product.tenSanPham}</td>
                                    <td>${product.giaVND}</td>
                                    <td>${product.soLuongTon}</td>
                                    <td>${product.danhMuc}</td>
                                      <td>
                                       <button onClick="handleXoa('${product.maSanPham}')" id="btnXóa" type="button" class="btn btn-danger">Xóa</button>
                                         <button onClick="" id="btnXóa" type="button" class="btn btn-info">Sửa</button>
                                      </td>
                                </tr>
    
    `
    });
    tbody.innerHTML = html
}

// chuc nang luu san pham

const btnSave = document.getElementById('btnSave')

btnSave.addEventListener('click', () => {
    const ma = document.getElementById('productId').value;
    const ten = document.getElementById('productName').value;
    const gia = document.getElementById('productPrice').value;
    const soluong = document.getElementById('productStock').value;
    const danhMuc = document.getElementById('productCategory').value;
    const anhSP = document.getElementById('productImage').value;
    // validate
    if (ma === "" || ten === "" || gia === "" || soluong == "" || danhMuc == "") {
        return
    }
    // check trung
    const products = initProduct();
    console.log("ma", ma)
    const checktrung = products.find(product => product.maSanPham === ma)
    if (checktrung != undefined) {
        alert("ma da ton tai")
        //mode => update
        return
    }
    products.push({
        "maSanPham": ma,
        "tenSanPham": ten,
        "giaVND":  parseInt(gia),
        "soLuongTon": parseInt(soluong),
        "danhMuc":  danhMuc,
        "hinhAnh": anhSP
    }) // them moi
    //lu xong storage => xai lan sau
    localStorage.setItem('products', JSON.stringify(products))
    alert("them thanh cong")
    // load lai giao dien
    hienthi()
    return
})
