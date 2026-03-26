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




const listUser = intData()

console.log(listUser);
console.log(TimKiemUserFind('adm1in@gmail.com'))

const btnDangKy = document.getElementById('btnDangKy');
const btnDangNhap = document.getElementById('btnDangNhap');
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// forEach
function TimKiemUserForeach(email) {
  let user = undefined
  listUser.forEach(item => {
    if (item.email === email) {
      user = item
      return
    }
  });
  return user
}

//ForOf
function TimKiemUserForOf(email) {
  for (const item of listUser) {
    if (item.email === email) {
      return item
    }
  }
}
// Find => filter
function TimKiemUserFind(email) {
  return listUser.find(user => user.email === email)
}


function login(email, pass) {
  return listUser.find(user => user.email === email && user.pass === pass)
}


btnDangKy?.addEventListener('click', function () {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const pass = document.getElementById('registerPassword').value;
  const passConfirm = document.getElementById('registerConfirmPassword').value;

  if (name === "" || email === "" || pass === "" || passConfirm === "") {
    alert("fied ko duoc de trong")
    return false
  }

  if (!validateEmail(email)) {
    alert("email khong dung dinh dang")
    return false
  }

  if (pass.length < 8) {
    alert("mk phai lon hon 8 ky tu")
    return false
  }

  if (pass !== passConfirm) {
    alert("passConfirm ko khop")
    return false
  }
  /**
   * tao user object
   * day len localstorage 
   * 1 thêm mới
   * 2 là tồn tại => báo lỗi
   */
  const user = {
    name,
    email,
    pass
  }
  // check trung
  const currentUser = TimKiemUserFind(user.email);
  if (currentUser === undefined) {
    // chua co tk
    listUser.push(user) // them moi
    console.log("list user", listUser)
    //lu xong storage => xai lan sau
    localStorage.setItem('users', JSON.stringify(listUser))
    alert('dang ky thanh cong')
    return
  } else {
    alert('email da ton tai')
  }

})


btnDangNhap.addEventListener('click', function () {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;

  if (email === "" || pass === "") {
    alert("fied ko duoc de trong")
    return false
  }

  if (!validateEmail(email)) {
    alert("email khong dung dinh dang")
    return false
  }

  if (pass.length < 8) {
    alert("mk phai lon hon 8 ky tu")
    return false
  }
  const loginUser = login(email,pass)
  if(loginUser) {
    localStorage.setItem('user', JSON.stringify(loginUser))
    location.href = 'product.html'
    alert('dn thanh cong')
  } else {
    alert('tk or mk ko ton tai')
  }
  /**
   * b1 function login(email, pass) => user or return null
   * neu user => dang nhap thanh cong => luu lai user hien tai localstorage.setItem('user', user) => da ve trang product
   * neu null => dang nhap that bai
   */


})