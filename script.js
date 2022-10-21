const ip = document.querySelector("#ip");
const loc = document.querySelector("#location");
const timeZone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
const input = document.querySelector("input");
const search = document.querySelector(".search");

let valuesupplied = 0;
let addressip = "";



search.addEventListener("click", () => {
  valuesupplied = input.value;
  addressip = "http://ip-api.com/json/" + valuesupplied;
  fetchInfo(addressip);
  //
  fetchLocation(addressip);
});

let v1 = 51.505;
let v2 = -0.09;
const map = L.map("map").setView([v1, v2], 13);


//90.220.117.106

const fetchInfo = async (addressip) => {
  try {
    let response = await fetch(addressip);
    let answer = await response.json();
    let ipValue = answer.query;
    let locValue = answer.country + " " + answer.region;
    let timeZoneValue = answer.timezone;
    let ispValue = answer.isp;

    displayinfo(ipValue, locValue, timeZoneValue, ispValue);
  } catch (error) {
    console.log(error);
  }
};

const updateMap = (v1, v2) => {
   map.setView([v1, v2], 13);
   var marker = L.marker([v1, v2]).addTo(map);
};

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  var marker = L.marker([v1, v2]).addTo(map);

const displayinfo = (ipValue, locValue, timeZoneValue, ispValue) => {
  ip.innerHTML = ipValue;
  loc.innerHTML = locValue;
  timeZone.innerHTML = timeZoneValue;
  isp.innerHTML = ispValue;
};

const fetchLocation = async (addressip) => {
  const response = await fetch(addressip);
  const data = await response.json();
  v1 = data.lat;
  v2 = data.lon;
  updateMap(v1, v2);
};
