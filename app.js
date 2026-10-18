document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const filters = document.getElementById("filters");
    
    // Lightbox Elementleri
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightbox = document.getElementById("close-lightbox");

    let allData = [];

    fetch("portfolio.json")
        .then(response => response.json())
        .then(data => {
            allData = data.sort((a, b) => a.order - b.order); 
            
            const categories = ["All", ...new Set(allData.map(item => item.category))];
            categories.forEach(cat => {
                const btn = document.createElement("button");
                btn.innerText = cat;
                btn.className = "px-4 py-2 rounded-full bg-white text-gray-700 shadow hover:bg-gray-800 hover:text-white transition focus:outline-none";
                btn.onclick = () => filterGallery(cat);
                filters.appendChild(btn);
            });

            renderGallery(allData);
        })
        .catch(error => console.error("Veri çekme hatası:", error));

    function filterGallery(category) {
        if (category === "All") {
            renderGallery(allData);
        } else {
            const filteredData = allData.filter(item => item.category === category);
            renderGallery(filteredData);
        }
    }

    function renderGallery(data) {
        gallery.innerHTML = "";
        data.forEach(item => {
            // Resim kartına onclick (tıklama) özelliği eklendi
            const card = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" 
                     onclick="openLightbox('${item.filename}', '${item.title}')">
                    <img src="${item.filename}" alt="${item.title}" class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300">
                    <div class="p-4">
                        <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">${item.category}</span>
                        <h3 class="text-lg font-semibold text-gray-800 mt-1">${item.title}</h3>
                    </div>
                </div>
            `;
            gallery.innerHTML += card;
        });
    }

    // Lightbox'ı Açma Fonksiyonu
    window.openLightbox = (src, title) => {
        lightboxImg.src = src;
        lightboxCaption.innerText = title;
        lightbox.classList.remove("hidden");
    };

    // X butonuna basınca kapat
    closeLightbox.onclick = () => lightbox.classList.add("hidden");

    // Siyah arka plana tıklayınca kapat
    lightbox.onclick = (e) => {
        if(e.target === lightbox) lightbox.classList.add("hidden");
    };
});