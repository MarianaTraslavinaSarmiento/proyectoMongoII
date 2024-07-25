# cineCampus

### 1.1 Listar todas las películas disponibles en el catálogo, 

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
### 1.2. Información detallada sobre una película específica, incluyendo sinopsis.

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

----
### 2.1 Compra de boletos para una proyección de una película específica

**Descripción:**  Creación de método de la clase 'Boleto' llamado ```buyTickets``` que permite la compra de boletos para una película específica, icluyendo la proyección y los asientos deseados para ver la película

**Actor principal:** Administrador, cliente estándar y VIP

**Parámetros obligatorios** (```tickets```,```metodo_pago```)

```tickets:```
- **Tipo:** Array de objetos.
- **Descripción:** Es una lista de boletos que se desea comprar. 
- Cada objeto dentro del array representa un boleto e incluye la siguiente información:
```proyeccion_id:``` (String) Identificador de la proyección a la que se desea asistir.
```usuario_id:``` (String) Identificador del usuario que está comprando el boleto.
```codigo_asiento:``` (String) Código del asiento que se desea reservar (por ejemplo, "A1").

```metodo_pago```
- **Tipo**: String.
- **Descripción**: Especifica el método de pago que se utilizará para completar la compra del boleto. Los valores válidos que puede tomar este campo son:  "en efectivo", "tarjeta credito VISA", "tarjeta debito VISA" y "mastercard".

<table>
<tr>
<th> Respuestas </th>
<th> Errores </th>
</tr>
<tr>
<td>

```javascript
{
  success: true,
  message: 'Boletos comprados con éxito',
  tickets: [
    {
      _id: new ObjectId('66a3da5b21f245d665cfce09'),
      proyeccion_id: new ObjectId('66a05c73f034045fab999a25'),
      usuario_id: new ObjectId('66a05449f034045fab9999e6'),
      codigo_asiento: 'A1',
      subtotal: 18000,
      porcentaje_descuento_VIP: 15,
      total: 15300,
      estado: 'pago'
    },

    //Objeto de cada boleto si hay varios
  ],
  pagos: [
    {
      boleto_id: new ObjectId('66a3da5b21f245d665cfce09'),
      monto: 15300,
      metodo_pago: 'en efectivo',
      estado: 'completado',
      fecha_hora_pago: 2024-07-26T17:18:19.574Z,
      _id: new ObjectId('66a3da5b21f245d665cfce0a')
    },
    //Pagos de cada boleto si hay varios
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

// Si la proyeccion ingresada NO existe
message: La proyección con id ${ticket.proyeccion_id} no existe.

// Si el usuario ingreso NO existe
message: El usuario con id ${ticket.usuario_id} no existe.


// Si el codigo del asiento ingresado NO existe
message: El asiento con código ${ticket.codigo_asiento} no existe. 
Verifique si su formato es válido: (ej: A1)

// El asiento ingresado no está en la sala de la proyección
message: El asiento no está en la sala de la proyección.

//Si el asiento ya tiene un boleto asociado a esa proyeccion
El asiento ya tiene un boleto asociado a esta proyección.

```
</td>
</tr>
</table>

#### Ejemplo de uso
``` javascript
obj = new Boleto()
console.log(await obj.buyTickets(
    [
        {
            proyeccion_id: "66a05c73f034045fab999a25",
            usuario_id: "66a05449f034045fab9999e6",
            codigo_asiento: "A1"
        },

        //Cada boleto requiere de un objeto
    ],
    "en efectivo"
));
```
----
