document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery");

    // Ruta de la carpeta de imágenes
    const imagePath = "images/";

    // Obtener la lista de archivos del repositorio
    fetch(`https://api.github.com/repos/AlexRuiz-11/AlexRuiz-11.github.io/contents/${imagePath}`)
        .then(response => response.json())
        .then(data => {
            const imageNames = data
                .filter(item => item.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(item.name))
                .map(item => item.name);

            // Calcular el número de columnas y filas
            const columns = 6;
            const rows = Math.ceil(imageNames.length / columns);

            // Crear elementos de imagen y agregar al contenedor de la galería
            let imgIndex = 0;
            for (let i = 0; i < rows; i++) {
                const rowContainer = document.createElement("div");
                rowContainer.classList.add("img-row");

                for (let j = 0; j < columns; j++) {
                    if (imgIndex < imageNames.length) {
                        const imgContainer = document.createElement("div");
                        imgContainer.classList.add("img-container");

                        const imgElement = document.createElement("img");
                        imgElement.src = imagePath + imageNames[imgIndex];

                        // Agregar evento de clic para mostrar la imagen en pantalla completa
                        imgElement.addEventListener("click", function () {
                            showFullscreenImage(imgElement.src);
                        });

                        imgContainer.appendChild(imgElement);
                        rowContainer.appendChild(imgContainer);
                        imgIndex++;
                    }
                }

                galleryContainer.appendChild(rowContainer);
            }
        })
        .catch(error => console.error("Error al obtener la lista de imágenes:", error));

    // Función para mostrar la imagen en pantalla completa
    function showFullscreenImage(imageSrc) {
        const fullscreenContainer = document.createElement("div");
        fullscreenContainer.classList.add("fullscreen-container");

        const fullscreenImage = document.createElement("img");
        fullscreenImage.src = imageSrc;

        // Agregar evento de clic para cerrar la imagen en pantalla completa
        fullscreenImage.addEventListener("click", function () {
            fullscreenContainer.remove();
        });

        fullscreenContainer.appendChild(fullscreenImage);
        document.body.appendChild(fullscreenContainer);
    }
});
