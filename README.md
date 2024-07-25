# cineCampus

### 1. Listar todas las películas disponibles en el catálogo, 

**Descripción:**  Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

**Actor principal:** Administrador, cliente estándar y VIP

<table>
<tr>
<th> Respuestas </th>
<th> Errores </th>
</tr>
<tr>
<td>

```javascript
[
    {
        _id: new ObjectId('66a0510bf034045fab9999da'),
        titulo: 'Spider-Man: Beyond the Spider-Verse',
        generos: [ 'Animación', 'Acción', 'Aventura' ],
        duracion_min: 120,
        clasificacion: 'PG',
        proyecciones: [ [Object] ]
    },
    {
        _id: new ObjectId('66a0510bf034045fab9999d6'),
        titulo: 'Mission: Impossible – Dead Reckoning Part One',
        generos: [ 'Acción', 'Aventura', 'Suspense' ],
        duracion_min: 130,
        clasificacion: 'PG-13',
        proyecciones: [ [Object] ]
    },
    ...
]
```
    
</td>
<td>

```javascript
{
    error: error.name, 
    message: error.message
}
```
</td>
</tr>
</table>

#### Ejemplo de uso
``` javascript
let obj
obj = new Pelicula()
console.log(await obj.getAllAvailableMovies())
```
----
### 2. Información detallada sobre una película específica, incluyendo sinopsis.

**Descripción:**  Creación de método de la clase 'Pelicula' llamado ```getAllDetailsOfAMovie``` que permite ver los detalles de una película específica. 

**Actor principal:** Administrador, cliente estándar y VIP

**Parámetros obligatorios**
 - ```id```: Id de la película específica

<table>
<tr>
<th> Respuestas </th>
<th> Errores </th>
</tr>
<tr>
<td>

```javascript
{
  _id: new ObjectId('66a0510bf034045fab9999d1'),
  titulo: 'The Marvels',
  generos: [ 'Acción', 'Aventura', 'Ciencia Ficción' ],
  duracion_min: 105,
  sinopsis: 'Carol Danvers, Kamala Khan y Monica Rambeau...',
  clasificacion: 'PG-13',
  proyecciones: [
    {
      _id: new ObjectId('66a05c73f034045fab999a25'),
      fecha_hora: 2024-07-30T19:00:00.000Z,
      precio: 18000,
      sala: [Object]
    }
  ]
}
```
    
</td>
<td>

```javascript

{
    error: error.name, 
    message: error.message
}

// Si la película ingresada NO existe:

{ error: 
'La película con id 66a0510bf034049fab9999d1 no existe.' }
```
</td>
</tr>
</table>

#### Ejemplo de uso
``` javascript
let obj
obj = new Pelicula()
console.log(await obj.getAllDetailsOfAMovie(
    {
        id:"66a0510bf034045fab9999d1"
    }
    ));
```