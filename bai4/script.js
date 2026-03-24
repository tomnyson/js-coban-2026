const dtbs = [1, 2, 4, 5, 6]
//for
// for(let i=0; i < dtbs.length; i++) {
//     console.log(dtbs[i])
// }
// for of

// for(let i of dtbs) {
//      console.log(i)
// }
// for each
dtbs.forEach((item, index) => {
    console.log(`vi tri ${index}`)
    console.log(`gia tri ${item}`)
})
/**
  * yêu cầu nhập vào một số nếu ko phải số yêu cầu nhập lại
  * chỉ xuất ra giá trị chẵn mảng  
  * chỉ in lẻ mảng
  * in ra các số chia hết cho 3 và 5 mảng
  * tính tổng của mảng
  * tinh trung bình công mảng
  * in ra số chính phương mảng
  * in ra số nguyên tố mảng
  * * in ra số hoàn hảo mảng
  * nhập vào 2 số a và b in ra giá trị trong khoảng [a,b]
  * đếm số phần tử chẵn trong mảng
  * đếm số phần tử lẻ trong mảng hay không
  * sắp xếp tăng dần
  * sắp xếp giảm dần
  */

// const mangNgauNhien = [...Array(100).keys()].map(i => Math.floor(Math.random() * 100) + 1);
// console.log(mangNgauNhien)
// tong = 0;  
// function isChan(num) {
//     if (num % 2 === 0) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// let dem = 0;
// for (let i of mangNgauNhien) {
//         if (isChan(i)) {
//             console.log(`la so chan ${i}`)
//         } else {
//             console.log(`la so le ${i}`)
//             dem= dem + 1
//         }
//        tong = tong + mangNgauNhien[i]; 
// tong = tong/dem
//  }
//  console.log(`tong ${i}`)

 const mylaptop  = {
    id: 3131,
    model: 'macbook',
    ram: 32,
    ssd: 1024
 }
 console.log("hello world")
 console.log(JSON.stringify(mylaptop))
  console.log(mylaptop['model'])


