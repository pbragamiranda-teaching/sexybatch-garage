import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
    this.garageName = "sexygarage"
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    fetch(this.garageUrl)
    .then(response => response.json())
    .then((data) => {
      data.forEach((car) => this.insertCar(car))
    })
  }

  insertCar(car) {
    const carCard = `<div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/300/300/${car.brand}%20${car.model}">
      </div>
      <div class="car-info">
        <h4>${car.brand} - ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>`
    this.carsListTarget.insertAdjacentHTML("beforeend", carCard)
  }

  createCar(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const newCar = Object.fromEntries(formData)
    fetch(this.garageUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newCar)
    })
    .then(response => response.json())
    .then((data) => {
      this.insertCar(data)
    })
    event.currentTarget.reset();
  }
}
