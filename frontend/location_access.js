const mapDiv = document.getElementById("map");
const manualBox = document.getElementById("manualBox");

let map, marker;

document.getElementById("useCurrent").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, handleError);
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

document.getElementById("enterManually").addEventListener("click", () => {
  manualBox.classList.remove("hidden");
  mapDiv.style.display = "none";
});

function showLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  mapDiv.style.display = "block";
  manualBox.classList.add("hidden");

  if (!map) {
    map = L.map("map").setView([lat, lon], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  } else {
    map.setView([lat, lon], 15);
  }

  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lon]).addTo(map).bindPopup("You are here 🟢").openPopup();
}

function handleError(error) {
  alert("Location access denied. Please enter pincode manually.");
  manualBox.classList.remove("hidden");
  mapDiv.style.display = "none";
}

document.getElementById("submitPincode").addEventListener("click", () => {
  const pin = document.getElementById("pincode").value.trim();
  if (/^[0-9]{6}$/.test(pin)) {
    alert("Pincode submitted: " + pin);
  } else {
    alert("Please enter a valid 6-digit pincode.");
  }
});
