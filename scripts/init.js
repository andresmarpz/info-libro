const LIBROS_URL = "https://danielk2020.github.io/biblioteca/libros.json";
const LIBRO_URL = "https://danikho2020.github.io/libros-biblioteca/" //+id.json

function getJSONData(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

function agregarLibro(libro, id) {
	const cajon = JSON.parse(localStorage.getItem("cajon")) || []; // []
	/*

		{
			"titulo": "Cuentos de amor, de locura y de muerte",
			"isbn": "ISBN - 902 - 3467",
			"editorial": "Editorial A",
			"paginas": "200",
			"autor": "Horacio Quiroga",
			"descripcion": "La obra trata principalmente de la muerte, aunque toca otros temas como la humanización de los animales, siendo estos quienes junto a un pensamiento enteramente racional dirigen las respectivas historias",
			"imagenes":[
					"https://danikho2020.github.io/img-biblioteca/1/1.jfif",
					"https://danikho2020.github.io/img-biblioteca/1/2.jfif",
					"https://danikho2020.github.io/img-biblioteca/1/3.jfif"
			],
			"relacionados":[4,5],
			"id": 1
		}

	*/
	cajon.push(
		{
			...libro,
			id: id
		}
	);

	localStorage.setItem('cajon', JSON.stringify(cajon));
}

function borrarLibro(id){
	const cajon = obtenerLibros(); // [0, 1, 2]
	const filtrado = cajon.filter((libro) => libro.id !== id);
	localStorage.setItem('cajon', JSON.stringify(filtrado));
	mostrarCajon();
}

function obtenerLibros(){
	const cajon = JSON.parse(localStorage.getItem("cajon")); // []
	return cajon;
}