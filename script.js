let currentCategory = 'sim';
let allTarife = {};

async function loadCategory(category) {
  const response = await fetch(`tarife_${category}.json`);
  const data = await response.json();
  allTarife[category] = data;
  render(data);
}

function render(list) {
  const tbody = document.querySelector('#tarifTable tbody');
  tbody.innerHTML = '';
  list.forEach(t => {
    tbody.innerHTML += `
      <tr>
        <td>${t.anbieter}</td>
        <td>${t.beschreibung}</td>
        <td>${t.preis.toFixed(2)} €</td>
        <td><a href="${t.link}" target="_blank">Zum Anbieter</a></td>
      </tr>`;
  });
}

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.dataset.target;
    if (allTarife[currentCategory]) {
      render(allTarife[currentCategory]);
    } else {
      loadCategory(currentCategory);
    }
  });
});

// Suchfunktion
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  render(allTarife[currentCategory].filter(t =>
    t.anbieter.toLowerCase().includes(q) ||
    t.beschreibung.toLowerCase().includes(q)
  ));
});

// Startkategorie laden
loadCategory('sim');
