
// --- FILTROS Y BÚSQUEDA ---
const filterButtons = document.querySelectorAll('.btn-filter');
const productCards = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('search');

function filterProducts() {
    const activeCategory = document.querySelector('.btn-filter.active').dataset.filter;
    const searchText = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3').innerText.toLowerCase();
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = title.includes(searchText);
        if (matchesCategory && matchesSearch) card.classList.remove('hidden');
        else card.classList.add('hidden');
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
    });
});

searchInput.addEventListener('input', filterProducts);

// --- HERO BACKGROUND SLIDER ---
const hero = document.getElementById('inicio');
const bgImages = [
    'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80")',
    'url("https://thumbs.dreamstime.com/b/ropa-y-accesorios-del-vintage-mujer-en-el-fondo-de-madera-61343543.jpg")',
    'url("https://i.pinimg.com/originals/fe/d5/12/fed51260f0a220991c1d181a2aa0f412.png")'
];
let currentBg = 0;
setInterval(() => {
    currentBg = (currentBg + 1) % bgImages.length;
    hero.style.backgroundImage = bgImages[currentBg];
}, 5000);

// --- REVELACIÓN AL SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// --- LÓGICA DE CAMBIO DE COLOR EN TARJETA ---
function changeColor(id, imgSrc) {
    const img = document.getElementById(`img-${id}`);
    if (img) {
        img.style.opacity = 0.5;
        setTimeout(() => {
            img.src = imgSrc;
            img.style.opacity = 1;
        }, 300);
    }
}

// --- WHATSAPP ---
function orderWhatsApp(productName) {
    const tel = "51976956559";
    const msg = encodeURIComponent(`¡Hola Yami Fashion! Deseo más info sobre: ${productName}`);
    window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
}

// --- MODAL DE PRODUCTO (LO NUEVO) ---
function openModal(id) {
    const card = document.getElementById(`img-${id}`).closest('.product-card');
    const title = card.querySelector('h3').innerText;
    const price = card.querySelector('.price').innerText;
    const desc = card.querySelector('p').innerText;
    const currentImg = card.querySelector('.product-img').src;
    const colorDots = card.querySelector('.colors').innerHTML;

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalDesc').innerText = desc + ". Esta prenda cuenta con acabados premium y diseño exclusivo de nuestra temporada 2026.";
    document.getElementById('modalImg').src = currentImg;
    document.getElementById('modalColors').innerHTML = colorDots;

    // Re-asignar eventos a los puntos de color dentro del modal
    const modalDots = document.getElementById('modalColors').querySelectorAll('.color-dot');
    modalDots.forEach(dot => {
        const onClickStr = dot.getAttribute('onclick');
        // Modificamos el onclick para que cambie la imagen del modal
        const newImgPath = onClickStr.split("'")[3];
        dot.onclick = function () {
            document.getElementById('modalImg').src = newImgPath;
            // También actualiza la tarjeta de atrás por coherencia
            changeColor(id, newImgPath);
        };
    });

    document.getElementById('modalBtnOrder').onclick = () => orderWhatsApp(title);
    document.getElementById('productModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) closeModal();
}

// --- SLIDER PERSONALIZADO DE ESENCIA ---
const customYfData = [
    { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkGqfiiUYl_9tY6Ew0Z-Zvp0MtlibIdxmiLQ&s", caption: "Diseños exclusivos para ti" },
    { img: "imagenes/colores1.jpeg", caption: "Tendencia y elegancia 2026" },
    { img: "imagenes/colores2.jpeg", caption: "Encuentra tu estilo ideal" }
];
let customYfIndex = 0;
setInterval(() => {
    customYfIndex = (customYfIndex + 1) % customYfData.length;
    const imgEl = document.getElementById('custom-yf-img');
    const capEl = document.getElementById('custom-yf-caption');
    imgEl.style.opacity = 0;
    capEl.style.opacity = 0;
    setTimeout(() => {
        imgEl.src = customYfData[customYfIndex].img;
        capEl.innerText = customYfData[customYfIndex].caption;
        imgEl.style.opacity = 1;
        capEl.style.opacity = 1;
    }, 800);
}, 4000);

// Header color change on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.style.background = window.scrollY > 50 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)";
});