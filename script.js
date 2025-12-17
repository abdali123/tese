const selector = document.getElementById('fileSelector');
const grid = document.getElementById('cardsGrid');
const status = document.getElementById('status');

selector.addEventListener('change', async (e) => {
    const fileName = e.target.value;
    if (!fileName) return;

    status.textContent = "جاري تحميل البيانات...";
    grid.innerHTML = '';

    try {
        const response = await fetch(fileName);
        const countries = await response.json();
        
        renderCards(countries);
        status.textContent = ""; 
    } catch (err) {
        status.textContent = "خطأ: تعذر الوصول لملف البيانات.";
        console.error(err);
    }
});

function renderCards(countries) {
    countries.forEach(country => {
        country.المدن.forEach(city => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // تنظيف البيانات: إذا كانت تحتوي على "ابحث عن" لا تظهرها
            const cleanMahlali = city.المأكولات_المحلية.includes("ابحث عن") ? "غير متوفر" : city.المأكولات_المحلية;

            card.innerHTML = `
                <span class="country-tag">${country.اسم_الدولة}</span>
                <h2>${city.اسم_المدينة}</h2>
                <div class="info-box">
                    <strong>🏛️ المعالم التاريخية:</strong>
                    <span>${city.المعالم_التاريخية || 'غير متوفرة'}</span>
                    
                    <strong>🍽️ المأكولات المشهورة:</strong>
                    <span>${cleanMahlali}</span>
                    
                    <strong>🌳 الطبيعة:</strong>
                    <span>${city.المساحات_الخضراء}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    });
}