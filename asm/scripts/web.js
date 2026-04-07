function intData() {
  /**
   * neu chu co localstorage 
   * tao moi => set 1 user default
   * co roi => return ds hien co
   */
  const users = localStorage.getItem('users')
  if (users) {
    return JSON.parse(users)
  } else {
    const mockData = [{
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123456'
    }]
    localStorage.setItem('users', JSON.stringify(mockData))
    return mockData

  }
}

function initCart() {
  const carts = localStorage.getItem('carts')
  if (carts) {
    return JSON.parse(carts)
  } else {
    localStorage.setItem('carts', JSON.stringify([]))
    return []
  }
}

function loadProduct() {
  // lay ds san pham hien tai
  const products = localStorage.getItem('products')
  if (products) {
    return JSON.parse(products)
  }
  return []
}

window.addEventListener('load', () => {
  //show product duct o trang chu
  const path = window.location.pathname
  if (path.includes('index')) {
    alert('go home')
  } else if (path.includes('cart')) {
    /**
     * lay cart tu localstorage
     *  show len table 
     * -> handle event xoa gio hang
     */
    const carts = initCart()
    console.log('carts', carts)
    showCarts(carts)
    return
  } else if (path.includes('checkout')) {
    alert('check out here')
    loadUserCheckoutForm()
    LoadCartCheckout()
    /**\
     * 1. load user profile -> vao dung cac o trong form
     * 2. load cart len len tuong tu trang cart
     */
  } else if (path.includes('product-detail')) {

  } else {
    const params = new URLSearchParams(window.location.search);
    const productList = loadProduct()
    const ma = params.get('id');
    console.log('ma', ma)
    if (ma != null) {
      // truong hop trang detail
      const current = productList.find(product => product.maSanPham === ma)
      if (current == undefined) {
        location.href = 'error.html'
      }
      showProductDetail(current)
    } else {

      showProduct(productList)
      // handle add cart
      handleCart()
    }
  }


})

function showProduct(productList, number = 8) {
  const tbody = document.getElementById(`productHome`)
  let html = ''
  productList.slice(0, number).forEach((product, index) => {
    html += `
         <div class="col-md-6 col-lg-3">
            <div class="card shadow-sm h-100">
                <img src="${product.hinhAnh}" alt="iPhone 15 Pro Max" class="product-img">
                <div class="card-body">
                    <h5 class="card-title">${product.tenSanPham}</h5>
                    <p class="card-text text-muted">${product.tenSanPham}</p>
                    <p class="text-danger fw-bold mb-3">${product.giaVND}</p>
                    <a href="product-detail.html?id=${product.maSanPham}" class="btn btn-outline-primary btn-sm">Xem chi tiết</a>
                    <button type="button" data-id=${product.maSanPham} class="btn btn-success btn-sm btn-add-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    
    `
  });
  tbody.innerHTML = html
}

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

function showCarts(carts) {
  const tbody = document.getElementById(`tableCart`)
  const totalSum = document.getElementById('summaryTotal')
  console.log('table', tbody)
  let html = ''
  let sum = 0
  carts.forEach((item, index) => {
    html += `
        <tr>
        <td>${item.tenSanPham}</td>
         <td>${item.soluong}</td>
         <td>${item.giaVND}</td>
         <td>${item.giaVND * item.soluong}</td>
          <td>
            <button class="btn btn-danger">X</button>
          </td>
        </tr>
    
    `
    sum += item.giaVND * item.soluong
  });
  console.log(html)
  tbody.innerHTML = html
  totalSum.textContent = formatter.format(sum) || 0
}

function showProductDetail(product) {
  console.log(product)
  const temSPElm = document.getElementById(`tenSanPham`)
  temSPElm.textContent = product.tenSanPham
  document.getElementById(`gia`).innerText = formatter.format(product.gia)

}

function handleCart() {
  const btnAddCart = document.querySelectorAll('.btn-add-cart')
  for (const btn of btnAddCart) {
    btn.addEventListener('click', (e) => {
      const maSanPham = e.currentTarget.dataset.id;
      const products = loadProduct()
      const sanppham = products.find(product => product.maSanPham === maSanPham)
      if (sanppham !== null) {
        // kien tra xem da co trong gio hang chua => findIndex
        // co => lam gi? => cap nhat lai so luong (soluong hien tai + 1) => luu lai storage
        // ko co thi lam gi => them vao gio hang hien tai  ? 
        // luu lai gio hang sau khi da chinh sua
        alert(`neu cssp thi +sl`)
        const carts = initCart()
        const vitri = carts.findIndex(product => product.maSanPham === maSanPham)
        if (vitri == -1) {
          sanppham.soluong = 1
          carts.push(sanppham)

        } else {
          carts[vitri].soluong += 1
        }
        localStorage.setItem("carts", JSON.stringify(carts))
        alert('san phan da luu');
      } else {

        alert('ma sp khong ton tai')
      }

    })
  }
}

const goCheckOut = document.getElementById('goCheckOut')

goCheckOut?.addEventListener('click', (event) => {
  event.preventDefault()
  /**
   * neu dang nhap thi goto => checkout.html
   * neu khong redirect to login.html
   */
  const user = localStorage.getItem('user')
  if (user) {
    window.location = "checkout.html"
  } else {
    window.location = "login.html"
  }

})

function loadUserCheckoutForm() {
  /**
   * localstorage user -> do du lieu vao form
   */
  const user = localStorage.getItem('user')
  const customerName = document.getElementById('customerName')
  const customerEmail = document.getElementById('customerEmail')

  if (user) {
    const userobject = JSON.parse(user)
    customerName.value = userobject.name
    customerEmail.value = userobject.email
  }
}

function LoadCartCheckout() {
  /**
   * localstorage cart -> do du lieu vao html  
   */
  const carts = localStorage.getItem('carts')
  const summaryItems = document.getElementById('checkoutItemCount')
  const summaryTotal = document.getElementById('checkoutTotal')
  console.log('summaryItems',summaryItems)
  console.log('summaryTotal',summaryTotal)

  if (carts) {
    const cartsObj = JSON.parse(carts)

    const summary = cartsObj.reduce((acc, item) => {
      acc.totalPrice += item.soluong * item.giaVND;
      acc.totalItems += item.soluong;
      return acc;
    }, { totalPrice: 0, totalItems: 0 });
    console.log('carts', summary)
    summaryItems.textContent = summary.totalItems
    summaryTotal.textContent = formatter.format(summary.totalPrice)
  }

}