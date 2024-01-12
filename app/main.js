window.onload = () => {
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

        // NAV RESPONSIVE
        let nav = document.querySelector("#nav");
        let abrir_nav = document.querySelector("#abrir_nav");
        let cerrar_nav = document.querySelector("#cerrar_nav");
    
        abrir_nav.addEventListener("click", () => {
            nav.classList.add("visible");
        })
    
        cerrar_nav.addEventListener("click", () => {
            nav.classList.remove("visible");
        })

       
      // TRABAJOS Y MINIATURAS   

    let datos;
    let trabajosCargados = 9; // para cargar siempre 6 trabajos y quitar peso de la web

    const verDetalle = (e) => {
        const currentWorkTitle = e.target.closest('.trabajo_indv').querySelector('h3').textContent;
        const currentWork = datos.find(work => work.titulo === currentWorkTitle);

        if (currentWork) {
            window.location.href = `/pages/detalle1.html?id=${currentWork.Id}`;
        }
    };

    const cargarTrabajos = (cantidad) => {
        let lista = document.querySelector(".categoria_trabajos");
        lista.innerHTML = ''; // Limpiar la lista antes de cargar más trabajos

        let trabajosMostrados = 0;

        for (let i = 0; i < datos.length && trabajosMostrados < cantidad; i++) {
            let work = datos[i];
            if (work && work.titulo && work.linea_investigacion && work.imagenes) {
                let imagesArray = work.imagenes.split(', ');
                let firstImage = imagesArray[0];

                let item = `
                    <div class="categoria">
                        <section class="categoria_trabajos">
                            <article class="trabajo_indv">
                                <img class="img_work" src="${firstImage}" alt="">
                                <div class="text">
                                    <div class="arrow">
                                        <span class="material-symbols-outlined">
                                            arrow_outward
                                        </span>
                                    </div>
                                    <div class="info">
                                        <h3>${work.titulo}</h3>
                                        <p>${work.linea_investigacion}</p>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>`;
                lista.innerHTML += item;
                trabajosMostrados++;
            }
        }

        // Agregar evento click a los nuevos trabajos cargados
        document.querySelectorAll(".trabajo_indv").forEach(work => {
            work.addEventListener("click", verDetalle);
        });
    };

    fetch('assets/data/data.json')
        .then(res => res.json())
        .then(data => {
            datos = data;
            cargarTrabajos(trabajosCargados); // Cargar trabajos iniciales

            const botonCargarMas = document.querySelector("#botonCargarMas");
            botonCargarMas.addEventListener("click", () => {
                trabajosCargados += 9; // Incrementar la cantidad de trabajos a cargar en pasos de 6
                cargarTrabajos(trabajosCargados);
            });
        });
};







