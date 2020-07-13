import React from "react"

let id = null

async function success(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude

  const address = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
  // const addressG = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`
  const addressCoords = `Latitude: ${latitude} °, Longitude: ${longitude} °`
  // const data = await fetch(address, {
  //   mode: "no-cors"
  // })
  console.log(position, address, addressCoords)
}

function error(err) {
  const status = `${
    err.code
  }: Unable to retrieve your location due to: ${err.message}`
  console.log(status, err)
}

function navigationHandler() {
  if (!navigator.geolocation) {
    const status = "Geolocation is not supported by your browser"
    console.log(status)
  } else {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
  }
}

function navigationWHandler() {
  if ("geolocation" in navigator) {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    id = navigator.geolocation.watchPosition(success, error, options)
    console.log(id)
  }
}

function clearWatchN() {
  console.log(id)
  navigator.geolocation.clearWatch(id)
}

const Location = () => {
  return (
    <>
      <p>Geolocation Current Position</p>
      <button onClick={() => navigationHandler()}>Location</button>
      <hr />
      <p>Geolocation Watch Position</p>
      <button onClick={() => navigationWHandler()}>Location</button>
      <button onClick={() => clearWatchN()}>Clear</button>
    </>
  )
}

export default Location
