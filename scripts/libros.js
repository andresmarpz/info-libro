let listaLibros = [];
let min = undefined;
let max = undefined;
let search = undefined;

function redireccionar(id) {
    localStorage.setItem("libroID", id);
}

function mostrarLibros(arrayLibros) {
    document.getElementById("listado").innerHTML = "";
    for (let libro of arrayLibros) {
        libro.paginas = parseInt(libro.paginas);

        if  (!(libro.paginas < min) && !(libro.paginas > max))
         /* ((min == undefined && max == undefined) || (libro.paginas >= min && libro.paginas <= max) ||
        (libro.paginas >= min && max == undefined) || (libro.paginas <= max && min == undefined)) */ {

            if (search == undefined || search == "" || libro.titulo.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                let contenido = `
                <li>
					<a class="libro-list" href="ver-libro.html" onclick="redireccionar(${libro.id})">
						<div>
						Título: ${libro.titulo} <br>
						Autor: ${libro.autor} <br>
						Páginas: ${libro.paginas}</div>
					</a>
                </li>
                <hr>
                `;
                document.getElementById("listado").innerHTML += contenido;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(LIBROS_URL).then(resultado => {
        if (resultado.status == "ok") {
            listaLibros = resultado.data;
            mostrarLibros(listaLibros);
            document.getElementById("filtrar").addEventListener("click", function () {
                if (document.getElementById("rango-min").value != "") {
                    min = parseInt(document.getElementById("rango-min").value);
                }else{
                    min = undefined;
                }
        
                if (document.getElementById("rango-max").value != "") {
                    max = parseInt(document.getElementById("rango-max").value);
                }else{
                    max = undefined;
                }
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("limpiar").addEventListener("click", function () {
                min = undefined;
                max = undefined;
                document.getElementById("rango-min").value = "";
                document.getElementById("rango-max").value = "";
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("buscador").addEventListener("input", function () {
                search = document.getElementById("buscador").value;
                mostrarLibros(listaLibros);
            })
        
            document.getElementById("sortPagDesc").addEventListener("click", function () {
                listaLibros.sort(function (a, b) {
                    return parseInt(b.paginas) - parseInt(a.paginas);
                })
                mostrarLibros(listaLibros);
            })

						document.getElementById("sortPagAsc").addEventListener("click", function () {
							listaLibros.sort(function (a, b) {
									return parseInt(a.paginas) - parseInt(b.paginas);
							})
							mostrarLibros(listaLibros);
					})
        }else{
            alert("Algo salió mal: " + resultado.data);
        }
    })




});













































//(!(parseInt(libro.paginas) < min) && !(parseInt(libro.paginas) > max))