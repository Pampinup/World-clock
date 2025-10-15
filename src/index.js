function updateTime() {
 // Los Angeles
let losAngelesElement = document.querySelector("#los-angeles");
let losAngelesDate = losAngelesElement.querySelector(".date");
let losAngelesTime = losAngelesElement.querySelector(".time");
losAngelesDate.innerHTML = moment.tz("America/Los_Angeles").format("MMMM Do YYYY");
losAngelesTime.innerHTML = moment.tz("America/Los_Angeles").format("hh:mm:ss [<small>]A[</small>]");
 // Beijing
let beijingElement = document.querySelector("#beijing");
let beijingDate = beijingElement.querySelector(".date");
let beijingTime = beijingElement.querySelector(".time");
beijingDate.innerHTML = moment.tz("Asia/Shanghai").format("MMMM Do YYYY");
beijingTime.innerHTML = moment.tz("Asia/Shanghai").format("hh:mm:ss [<small>]A[</small>]");
 // Barcelona
let barcelonaElement = document.querySelector("#barcelona");
let barcelonaDate = barcelonaElement.querySelector(".date");
let barcelonaTime = barcelonaElement.querySelector(".time");
barcelonaDate.innerHTML = moment.tz("Europe/Madrid").format("MMMM Do YYYY");
barcelonaTime.innerHTML = moment.tz("Europe/Madrid").format("hh:mm:ss [<small>]A[</small>]");
}

setInterval(updateTime, 1000);