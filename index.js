var promises = [];
var Table = document.getElementById("tableBody");
var searchBar = document.getElementById("search-Bar");

const apiUtils = {
    fetchCafe: function () {
        let data = fetch(
            "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
        )
            .then((res) => res.json())
            .then((data) => data);

        return data;
    },
    fetchPlace: function () {
        let data = fetch(
            "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
        )
        .then((res) => res.json())
        .then((data) => data);

    return data;
}
};

promises.push(apiUtils.fetchPlace());
promises.push(apiUtils.fetchCafe());
console.log(promises);

async function generateTable(str = '') {
    const data = await Promise.all(promises);
    console.log(data);
    let result = [];
    let tableRow = "";

    data.map((item, index) => {
        let val = index === 0 ? "cafes" : "places";
        if (index === 0) {
            let Cafes = [...item[val]];
            let filterItem = str === '' ? Cafes : Cafes.filter((cafe) => (cafe.name.toLowerCase().includes(str.toLowerCase())));
            result = [...result, ...filterItem]
        } else {
            result.map((cafe, ind) => {
                item[val].map((place) => {
                    if (cafe.location_id === place.id) {
                        tableRow =
                            tableRow +
                            `<tr>
                            <td class="column1">${ind + 1}</td>
                            <td class="column2">${cafe.name}</td>
                            <td class="column3">${place.locality}</td>
                            <td class="column4">${place.postal_code}</td>
                            <td class="column5">${place.lat}</td>
                            <td class="column6">${place.lat}</td>
                        </tr>`;
                }
            });
        });
    }
});

Table.innerHTML = tableRow;
}

generateTable();

searchBar.addEventListener("input", (e) => {
  let keyStr = e.target.value;
  if (keyStr !== '') {
      generateTable(keyStr)
  }
  else {
      generateTable('')
}
});