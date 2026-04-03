
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

        const hero = document.getElementById('inicio');
        const images = [
            'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80")',
            'url("https://thumbs.dreamstime.com/b/ropa-y-accesorios-del-vintage-mujer-en-el-fondo-de-madera-61343543.jpg")',
             'url("https://i.pinimg.com/originals/fe/d5/12/fed51260f0a220991c1d181a2aa0f412.png")',
            'url("https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-clothing-store-in-shopping-mall-boutique-shop-interior-blur-defocused-background-image_15650933.jpg")'
        ];
        let currentImg = 0;
        setInterval(() => {
            currentImg = (currentImg + 1) % images.length;
            hero.style.backgroundImage = images[currentImg];
        }, 4000);

        const textElement = document.getElementById('changing-text');
        const phrases = ["Colección Primavera 2026", "Envíos a todo el Perú", "Lo último en tendencia"];
        let currentPhrase = 0;
        setInterval(() => {
            currentPhrase = (currentPhrase + 1) % phrases.length;
            textElement.style.opacity = 0;
            setTimeout(() => {
                textElement.innerText = phrases[currentPhrase];
                textElement.style.opacity = 1;
            }, 500);
        }, 3000);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

        // LÓGICA DE CAMBIO DE COLOR (Dinámica para todos)
        function changeColor(id, imgSrc) {
            const img = document.getElementById(`img-${id}`);
            if(img) {
                img.style.opacity = 0.5;
                setTimeout(() => {
                    img.src = imgSrc;
                    img.style.opacity = 1;
                }, 300);
            }
        }

        function orderWhatsApp(productName) {
            const tel = "51976956559";
            const msg = encodeURIComponent(`¡Hola Yami Fashion! Deseo más info sobre: ${productName}`);
            window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
        }

        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            header.style.background = window.scrollY > 50 ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)";
            header.style.height = window.scrollY > 50 ? "90px" : "90px";
        });



        
    // Lógica del Slider Personalizado
    const customYfData = [
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkGqfiiUYl_9tY6Ew0Z-Zvp0MtlibIdxmiLQ&s",
            caption: "Diseños exclusivos para ti"
        },
        {
            img: "imagenes/colores1.jpeg",
            caption: "Tendencia y elegancia 2026"
        },
        {
            img: " imagenes/colores2.jpeg",
            caption: "Encuentra tu estilo ideal"
        }
    ];

    let customYfIndex = 0;
    const customYfImgEl = document.getElementById('custom-yf-img');
    const customYfCapEl = document.getElementById('custom-yf-caption');

    function updateCustomSlider() {
        customYfIndex = (customYfIndex + 1) % customYfData.length;
        
        // Efecto de salida
        customYfImgEl.style.opacity = "0";
        customYfCapEl.style.opacity = "0";
        customYfCapEl.style.transform = "translateY(10px)";

        setTimeout(() => {
            // Cambio de contenido
            customYfImgEl.src = customYfData[customYfIndex].img;
            customYfCapEl.innerText = customYfData[customYfIndex].caption;

            // Efecto de entrada
            customYfImgEl.style.opacity = "1";
            customYfCapEl.style.opacity = "1";
            customYfCapEl.style.transform = "translateY(0)";
        }, 800);
    }

    // Intervalo de 3 segundos
    setInterval(updateCustomSlider, 3000);