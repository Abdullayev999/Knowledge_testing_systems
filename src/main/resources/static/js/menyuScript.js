//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//CLASS headerMenu FOR THEME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11

let headerMenus = document.querySelectorAll(".headerMenu");

function changeTheme(color) {
    for (const headerMenu of headerMenus) {
        headerMenu.classList.add(color);
    }
}

document.addEventListener('DOMContentLoaded', function () {


    let theme = document.cookie.split("=")[1].split(";")[0];
    console.log(theme)
    console.log(document.cookie.split("=")[1])
    if (theme && theme == 'bg-secondary') {
        changeTheme('bg-secondary');
    } else if (theme && theme == 'bg-info') {
        changeTheme('bg-info');
    } else if (theme && theme == 'bg-warning') {
        changeTheme('bg-warning');
    } else if (theme && theme == 'bg-dark') {
        changeTheme('bg-dark')
    } else if (theme && theme == 'bg-white') {
        changeTheme('bg-white')
    }
})


let btnGrey = document.querySelector("#btnGrey");
let btnLighBlue = document.querySelector("#btnLighBlue");
let btnOrange = document.querySelector("#btnOrange");
let btnBlack = document.querySelector("#btnBlack");
let btnWhite = document.querySelector("#btnWhite");

function changeItems(color) {
    for (const headerMenu of headerMenus) {
        if (headerMenu.classList.contains("bg-secondary")) headerMenu.classList.remove('bg-secondary');
        if (headerMenu.classList.contains("bg-info")) headerMenu.classList.remove('bg-info');
        if (headerMenu.classList.contains("bg-warning")) headerMenu.classList.remove('bg-warning');
        if (headerMenu.classList.contains("bg-dark")) headerMenu.classList.remove('bg-dark');
        if (headerMenu.classList.contains("bg-white")) headerMenu.classList.remove('bg-white');
        headerMenu.classList.add(color);
    }
}

btnGrey.addEventListener("click", function () {
    changeItems("bg-secondary");

    document.cookie = "theme=bg-secondary;max-age=604800;";
})

btnLighBlue.addEventListener("click", function () {
    changeItems("bg-info");
    document.cookie = "theme=bg-info;max-age=604800;";
})

btnOrange.addEventListener("click", function () {
    changeItems("bg-warning");
    document.cookie = "theme=bg-warning;max-age=604800;";
})

btnBlack.addEventListener("click", function () {
    changeItems("bg-dark");
    document.cookie = "theme=bg-dark;max-age=604800;";
})

btnWhite.addEventListener("click", function () {
    changeItems("bg-white");
    document.cookie = "theme=bg-white;max-age=604800;";
})