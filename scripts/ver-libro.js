function redireccionar(id) {
    localStorage.setItem("libroID", id);
}

document.addEventListener("DOMContentLoaded", () => {
	const id = localStorage.getItem("libroID");
	const url = "https://danikho2020.github.io/libros-biblioteca/" + id + ".json";

	fetch(url)
		.then((res) => res.json())
		.then((libro) => {
			const contenido = document.getElementById("contenido");
			const contenido2 = document.getElementById("contenido2");
			const imagenes = document.getElementById("imagenes");
			const relacionados = document.getElementById("relacionados");

			contenido.innerHTML = `
				<div class="container">
					<h2>${libro.autor} - ${libro.titulo}</h2>
					<div>${libro.descripcion}</div>
				</div>
			`;
			contenido2.innerHTML = `
				<div class="container text-center">
					<div><b>Editorial:</b> ${libro.editorial}</div>
					<div><b>ISBN:</b> ${libro.isbn}</div>
					<div><b>Paginas:</b> ${libro.paginas}</div>
					<div><button class="btn btn-primary" id="agregar-libro">Agregar al cajon</button></div>
				</div>
			`

			document.getElementById('agregar-libro').addEventListener('click', () => {
				agregarLibro(libro, id);
			})

			let imagenesHtml = "";
			for (let img of libro.imagenes) {
				imagenesHtml += `
					<div class="carousel-item ${imagenesHtml ? '' : 'active'}">
						<img src="${img}" class="d-block w-100" height="500px" alt="...">
					</div>
				`;
			}
			imagenes.innerHTML = `
				<div id="carousel" class="carousel slide carousel-img px-2" data-bs-ride="carousel">
					<div class="carousel-inner">
						${imagenesHtml}
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			`;
			
			for (let rel of libro.relacionados){
				fetch("https://danikho2020.github.io/libros-biblioteca/" + rel + ".json")
					.then((res) => res.json())
					.then((libro) => {
						relacionados.innerHTML += `
						<a href="ver-libro.html" class="rel-link" onclick="redireccionar(${rel})">
							<div class="card" style="width: 18rem; height: 100%;">
								<img src="${libro.imagenes[0]}" class="card-img-top" style="height: 85%;" alt="...">
								<div class="card-body">
									<h5 class="card-title">${libro.titulo}</h5>
								</div>
							</div>
						</a>
						`
					});
			}
		});
});