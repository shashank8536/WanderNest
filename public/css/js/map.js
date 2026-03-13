
// //     // {/* extracted from the show.ejs directly the js file  */}
//     mapboxgl.accessToken = mapToken;
//     const map = new mapboxgl.Map({
//         container: 'map', // container ID
//         center: [77.209,28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
//         zoom: 9 // starting zoom
//     });

// // const marker = new mapboxgl.Marker({color:"red"})
// //  .setLngLat(listing.geometry.coordinates)// ye wo cooredinates jo hmne listing k andar geometry k andar coordinates save kraye hai
// //  .setPopup(new mapboxgl.Popup({offset: 25, className: 'my-class'})
// //     .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking!</p>`))
// //  .addTo(map);
// // Guard clause – VERY IMPORTANT
// console.log(coordinates);

console.log(listing.geometry.coordinates);

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 9
});

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);
