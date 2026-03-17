/**
 * chia het cho 1-100 2 va 4
 * 3 & 5
 */
function chia2va4(n) {
    if (n % 2 == 0 && n % 4 == 0) {
        return true
    }
    return false
}

function chia2va4(n) {
    if (n % 2 == 0 && n % 4 == 0) {
        return true
    }
    return false
}


function tong(n) {
    tong = 0;
    for (let i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            tong = tong + i;

        }
        return tong

    }


}
let html = "";
for (let i = 0; i < 100; i++) {
    const result = chia2va4(i);
    
    console.log(result)
    if (result) {
        console.log("ok")
        // document.writeln(`<p style='color:red'>${i}<p>`)
        html+=`<p style='color:red'>${i}<p>`
    } else {
        console.log("no")
        //document.writeln(`<p>${i}<p>`)
    }

}
const element = document.getElementById("ketqua")
element.innerHTML = html
console.log(element)