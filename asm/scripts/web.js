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
                </div>
            </div>
        </div>
    
    `
  });
  tbody.innerHTML = html
}

function showProductDetail(product) {
  console.log(product)
  const temSPElm = document.getElementById(`tenSanPham`)
  temSPElm.textContent= product.tenSanPham
  document.getElementById(`gia`).innerText = product.gia


}
