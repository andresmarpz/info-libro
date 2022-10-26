document.addEventListener('DOMContentLoaded', () => {
	mostrarCajon();

	document.getElementById('form-prestamo').addEventListener('submit', () => {

	})
})

function mostrarCajon(){
	const container = document.getElementById('container');
	container.innerHTML = '';
	let contenido = ''
	obtenerLibros().forEach(libro => {
		contenido += `
			<div class="card" style="width: 18rem;">
				<img src="${libro.imagenes[0]}" class="card-img-top" style="height: 85%;" alt="...">
				<div class="card-body">
					<h5 class="card-title">${libro.titulo}</h5>
					<p class="card-text">Páginas: ${libro.paginas}</p>
					<button id="eliminar-libro-${libro.id}" class="btn btn-danger">Eliminar</button>
				</div>
			</div>
		`
	})
	container.innerHTML = `
		<div class="container d-flex gap-4 justify-content-center flex-wrap">
			${contenido}
		</div>
	`
	
	let totalPaginas = 0;
	obtenerLibros().forEach(libro => {
		document.getElementById(`eliminar-libro-${libro.id}`).addEventListener('click', () => {
			borrarLibro(libro.id)
		});

		totalPaginas += parseInt(libro.paginas);
	})
	
	document.getElementById('fecha-limite').innerHTML = `en ${Math.floor(totalPaginas / 50)} días.`
}