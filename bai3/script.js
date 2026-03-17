const btnClick = document.getElementById('btn')
//click event work
btnClick.addEventListener("click", function(){
    input = document.getElementById('input').value;
    console.log(typeof inputElm)
    if(isNaN(input)) {
        alert("du lieu ko hop le")
        return
    }
    let html = ""
    if(input % 2 === 0) {
        html+=`<p class='red'>chia het cho 2 ${input}</p>`
    }else {
         html+=`<p class='blue'> ko chia het cho 2 ${input}</p>`
    }
    const elmKetqua = document.getElementById("ketqua");
    elmKetqua.innerHTML = html
    
    /**\
     * kt du lieu hop la so
     * check chia het cho 2
     *  dung ham innerHTML de in du lieu ra ket qua
     */
})

const btnbtnOn = document.getElementById('btnOn')
const lightElm = document.getElementById('light')

btnbtnOn.addEventListener("click", function(){
   lightElm.innerHTML+=`<img src="./on.png" width="100px"/>`
})
const btnbtnOff = document.getElementById('btnOff')
btnbtnOff.addEventListener("click", function(){
    lightElm.innerHTML+=`<img src="./off.png" width="100px"/>`
})



function bulon() {
    document.getElementById("mybul").src = "on.png";
}

function buloff() {
    document.getElementById("mybul").src = "off.png";
}

const btnToggle = document.getElementById('congtac')
btnToggle.addEventListener("click", function(){
    let toggle = document.getElementById('congtac')
    if (toggle.value === "on"){
        document.getElementById("mybul").src = "on.png";
        toggle.value = "off"
        toggle.textContent = Off
    }else{
        document.getElementById("mybul").src = "off.png";
        toggle.value = "on"
        toggle.textContent = "On"
    }
});

let user = document.getElementById("username").value
let password = document.getElementById("password").value
let login = document.getElementById("login")
login.addEventListener("click", function(){
   if (user=="admin"&&password=="123456") {
    document.getElementById("login").innerHTML += `<h1> dang nhap thanh cong</h1>`
} else {
    document.getElementById("login").innerHTML += `<h1> dang nhap that bai</h1>`
} 
})
