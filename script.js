async function loadTarife() {
  const response = await fetch('tarife.json');
  const tarife = await response.json();
  const tbody = document.querySelector('#tarifTable tbody');
  
  function render(list) {
    tbody.innerHTML = '';
    list.forEach(t => {
      tbody.innerHTML += `
        <tr>
          <td>${t.anbieter}</td>
          <td>${t.daten}</td>
          <td>${t.preis.toFixed(2)} €</td>
          <td><a href="${t.link}" target="_blank">Zum Anbieter</a></td>
        </tr>`;
    });
  }

  render(tarife);

  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(tarife.filter(t => 
      t.anbieter.toLowerCase().includes(q) || t.daten.toLowerCase().includes(q)
    ));
  });
}

loadTarife();
