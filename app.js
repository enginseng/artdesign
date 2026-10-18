document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");
    let allData = [];

    fetch("portfolio.json")
        .then(response => response.json())
        .then(data => {
            // "order" değerine göre küçükten büyüğe sırala
            allData = data.sort((a, b) => a.order - b.order); 
            
            // Kategorileri bul ve butonları oluştur
            const categories = ["Tümü", ...new Set(allData.map(item => item.category))];
            categories.forEach(cat => {
                const btn = document.createElement("button");
                btn.innerText = cat;
                btn.className = "px-4 py-2 rounded-full bg-white text-gray-700 shadow hover:bg-blue-500 hover:text-white transition focus:outline-none";
                btn.onclick = () => filterGallery(cat);
                filters.appendChild(btn);
            });

            // Başlangıçta tümünü göster
            renderGallery(allData);
        })
        .catch(error => console.error("Veri çekme hatası:", error));

    function filterGallery(category) {
        if (category === "Tümü") {
            renderGallery(allData);
        } else {
            const filteredData = allData.filter(item => item.category === category);
            renderGallery(filteredData);
        }
    }

    function renderGallery(data) {
        gallery.innerHTML = "";
        data.forEach(item => {
            const card = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img src="${item.filename}" alt="${item.title}" class="w-full h-64 object-cover">
                    <div class="p-4">
                        <span class="text-xs font-bold text-blue-500 uppercase tracking-wider">${item.category}</span>
                        <h3 class="text-lg font-semibold text-gray-800 mt-1">${item.title}</h3>
                        <p class="text-sm text-gray-500 mt-1">${item.description}</p>
                    </div>
                </div>
            `;
            gallery.innerHTML += card;
        });
    }
});