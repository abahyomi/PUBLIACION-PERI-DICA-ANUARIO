window.onload = () => {
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // Obtiene el ID de la URL

    fetch('../assets/data/data.json')
        .then(res => res.json())
        .then(data => {
            const trabajoEncontrado = data.find(work => work.Id === id);

            if (trabajoEncontrado) {
                const lista = document.querySelector(".detalle_uno");
                const primeraImagen = trabajoEncontrado.imagenes.split(', ')[0];

                const contenedorImagenes = document.createElement('div');
                contenedorImagenes.classList.add('imagenes_adicionales');

                const imagenesRestantes = trabajoEncontrado.imagenes.split(', ').slice(1);

                imagenesRestantes.forEach(imagen => {
                    const img = document.createElement('img');
                    img.src = imagen;
                    img.alt = 'Imagen adicional del trabajo';
                    contenedorImagenes.appendChild(img);
                });

                const imgDetalle = lista.querySelector('.img_detalle img');
                imgDetalle.addEventListener('click', () => {
                    const imagenCompleta = document.createElement('img');
                    imagenCompleta.src = primeraImagen; // URL de la imagen completa
                    imagenCompleta.alt = 'Imagen completa del trabajo';
                    
                    // Abre la imagen en una nueva ventana al hacer clic
                    const ventanaImagen = window.open('', '_blank');
                    ventanaImagen.document.write('<html><head><title>Imagen completa</title></head><body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">');
                    ventanaImagen.document.write(`<img src="${primeraImagen}" alt="Imagen completa del trabajo" style="max-width: 100%; max-height: 100%;"/>`);
                    ventanaImagen.document.write('</body></html>');
                });

                // Construir la estructura HTML
                lista.innerHTML = `

                <div class="scroll" data-aos="fade-down" data-aos-duration="1500">
                <span class="material-symbols-outlined">
                arrow_downward  </span>
                <span> scroll para ver más </span>
               </div>
                        <div class="img_detalle" data-aos="fade-right" data-aos-duration="2800">
                            <img src="${primeraImagen}" alt="Imagen principal">
                        </div>
                        <article class="info_trabajo">
                        <div class="titulo_trabajo" data-aos="fade-down" data-aos-duration="1000">
                        <h1>${trabajoEncontrado.titulo}</h1>
                        <h3>${trabajoEncontrado.subtitulo}</h3>

                    <p class="descripcion" data-aos="fade-down" data-aos-duration="1500">${trabajoEncontrado.descripcion}</p>
                    
                   <div class="info_abajo">
                     <div class="info_extra" data-aos="fade-down" data-aos-duration="2000">
                        <span> Especialidad: ${trabajoEncontrado.especialidad} </span>
                        <span> Asignatura: ${trabajoEncontrado.asignatura} </span>
                        <span> Curso: ${trabajoEncontrado.curso} </span>
                        <span> Profesor: ${trabajoEncontrado.nombre_docente}</span>
                     </div>
          
                     <div class="Info_Alumno" data-aos="fade-down" data-aos-duration="2500">
                        <h2>${trabajoEncontrado.nombre_estudiante}</h2>
                        <p> ${trabajoEncontrado.correo_estudiante} </p>
                     </div>
                  </div>
                        </article>
                    </div>
                    <div class="resto_imagenes" data-aos="fade-down" data-aos-duration="1000" >
                        <span data-aos="fade-down" data-aos-duration="1000"> ${trabajoEncontrado.desc_img1} </span>
                        <span data-aos="fade-down" data-aos-duration="1250"> ${trabajoEncontrado.desc_img2} </span>
                        <span data-aos="fade-down" data-aos-duration="1500"> ${trabajoEncontrado.desc_img3} </span>
                        <span data-aos="fade-down" data-aos-duration="1750"> ${trabajoEncontrado.desc_img4} </span>
                    </div>
                `;

                // Agregar el contenedor de imágenes adicionales al final del elemento con la clase "resto_imagenes"
                lista.querySelector('.resto_imagenes').appendChild(contenedorImagenes);
            } else {
                console.log('Trabajo no encontrado');
            }
        });
};


