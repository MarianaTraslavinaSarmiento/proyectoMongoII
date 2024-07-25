# cineCampus

### 1.Listar todas las películas disponibles en el catálogo, 

**Descripción:** Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

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
    error: error.name, message: error.message
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
