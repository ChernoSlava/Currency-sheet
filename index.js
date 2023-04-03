const newTable = document.querySelector("#table tbody");

const firstLetter = (value) => {
  return typeof(value) === 'number' ? value : value.slice(0, 1).toUpperCase() + value.slice(1);
}

const addRow = (data, color) => {
  const row = newTable.insertRow(-1);
  row.insertCell(0).textContent = firstLetter(data.id);
  row.insertCell(1).textContent = data.symbol;
  row.insertCell(2).textContent = data.name;
  if (color) {
    row.classList.add(color);
  }
}

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1")
	.then(response => response.json())
	.then(data => {
		const firstValues = data.slice(0, 5);
		const anotherValues = data.slice(5);
    
		firstValues.forEach(data => addRow(data, data.symbol === "usdt" ? "color-green" : "color-blue"));
		anotherValues.forEach(data => {
			const rowColor = data.symbol === "usdt" ? "color-green" : "";
			addRow(data, rowColor);
		});
	})
	.catch(error => console.error(error));
