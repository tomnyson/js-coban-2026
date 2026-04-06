
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

function initPost() {
    const posts = localStorage.getItem('posts')
    if (posts) {
        return JSON.parse(posts)
    } else {
        localStorage.setItem('products', JSON.stringify([]))
        return []

    }

}

window.addEventListener('load', (event) => {
    // const user = checkAuth()
    // const showme = document.getElementById('show_me')
    //     .innerText = `xin chào ${user.name}`
    // init product 
    initPost()
    // hienthi()
})


function logout() {
    localStorage.removeItem("user")
    window.location = "login.html"
}

const logoutbtn = document.getElementById('logout')
logoutbtn?.addEventListener('click', () => {
    logout()
})


function handleXoa(ma) {
    const check = confirm(`bạn chắc xóa product id ${ma} không  ?`)
    if (check) {
        const products = initProduct();
        const deletedProducts = products.filter(product => product.maSanPham !== ma)
        console.log(deletedProducts)
        localStorage.setItem('products', JSON.stringify(deletedProducts))
        alert("xóa thanh cong")
        // load lai giao dien
        // hienthi()
    }
}
// khoi tao model



function handleEdit(ma) {
    const check = confirm(`bạn chắc sửa product id ${ma} không  ?`)
    const frmModel = document.getElementById(`modalForm`)
    const myModal = bootstrap.Modal.getOrCreateInstance(frmModel)
    if (check) {
        myModal.show()
        console.log(document.body)
        const maElm = document.getElementById('productUpdateId')
        const tenElm = document.getElementById('productUpdatetName')
        const giaElm = document.getElementById('productUpdatePrice')
        const soluongElm = document.getElementById('productUpdateStock')
        const danhMucElm = document.getElementById('productUpdateCategory');
        const anhSPElm = document.getElementById('productUpdateImage');
        // validate
        const products = initProduct();
        console.log('maElm', maElm)
        console.log("ma", ma)

        const productUpdate = products.find(product => product.maSanPham === ma)
        if (productUpdate == undefined) {
            alert(`ma sp ko ton tai`)
            return
        }
        console.log(productUpdate)
        maElm.value = productUpdate.maSanPham
        maElm.readOnly = true;
        tenElm.value = productUpdate.tenSanPham
        giaElm.value = productUpdate.giaVND
        soluongElm.value = productUpdate.soLuongTon
        danhMucElm.value = productUpdate.danhMuc
        anhSPElm.value = productUpdate.hinhAnh



        //   setTimeout(() => {
        //     myModal.hide()
        //   },1000)

        // load lai giao dien
        // hienthi()
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
    const tbody = document.getElementById(`baiviet`)
    let danhsachbaiviet = initProduct()
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
                                         <button  onClick="handleEdit('${product.maSanPham}')"type="button" class="btn btn-info">Sửa</button>
                                      </td>
                                </tr>
    
    `
    });
    tbody.innerHTML = html
}

// chuc nang luu san pham

const btnSavePost = document.getElementById('btnSavePost')

btnSavePost.addEventListener('click', () => {
    alert('save bai viet')
    const postTitle = document.getElementById('postTitle').value;
    const postSlug = document.getElementById('postSlug').value;
    const postCat = document.getElementById('postCategory').value;
    const postAuthor = document.getElementById('postAuthor').value;

    const publishDate = document.getElementById('publishDate').value;

    const thumbnailUrl = document.getElementById('thumbnailUrl').value;

    const postExcerpt = document.getElementById('postExcerpt').value;

    const postContent = document.getElementById('postContent').value;

    const postTags = document.getElementById('postTags').value;

    const postStatus = document.getElementById('postStatus').value;

    // validate
    if (postTitle === "" || postSlug === "" || postCat === "" || publishDate == "" || postExcerpt == "" || postContent == "") {
        alert("thiếu trường dữ liệu bắt buộc")
        return
    }
    // check trung
    const posts = initPost();
    const checktrung = posts.find(post => post.slug === postSlug)
    if (checktrung != undefined) {
        alert("ma da ton tai")
        return
    }
    posts.push({
        "title": postTitle,
        "slug": postSlug,
        "cat": postCat,
        "author": postAuthor,
        "date": publishDate,
        "thumbnailUrl": thumbnailUrl,
        "excerpt": postExcerpt,
        "content": postContent,
        "tags": postTags,
        "status": postStatus
    }) // them moi
    //lu xong storage => xai lan sau
    localStorage.setItem('posts', JSON.stringify(posts))
    alert("them thanh cong")
    // load lai giao dien
    // hienthi()
    return
})

const btnUpdate = document.getElementById('btnUpdate')
btnUpdate?.addEventListener('click', () => {
    const ma = document.getElementById('productUpdateId').value;
    const ten = document.getElementById('productUpdatetName').value;
    const gia = document.getElementById('productUpdatePrice').value;
    const soluong = document.getElementById('productUpdateStock').value;
    const danhMuc = document.getElementById('productUpdateCategory').value;
    const anhSP = document.getElementById('productUpdateImage').value;
    // validate
    if (ma === "" || ten === "" || gia === "" || soluong == "" || danhMuc == "") {
        return
    }
    // check trung
    const products = initProduct();
    console.log("ma", ma)
    const currenProduct = products.find(product => product.maSanPham === ma)
    if (currenProduct != undefined) {
        const viTri = products.findIndex(product => product.maSanPham === ma)
        if (viTri != -1) {
            products[viTri] = {
                "maSanPham": ma,
                "tenSanPham": ten,
                "giaVND": parseInt(gia),
                "soLuongTon": parseInt(soluong),
                "danhMuc": danhMuc,
                "hinhAnh": anhSP
            }
        }
    }

    localStorage.setItem('products', JSON.stringify(products))
    alert("Cap nhat thanh cong")
    // load lai giao dien
    hienthi()
    return
})
