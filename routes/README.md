# Routes

## Vacancies Api

### Route `/api/vacancies`

#### GET

Response:

```json
{
  "data": [
    {
      "id": "5fdce6fd6980241948bcfdf7",
      "branch": "BACKEND",
      "country": "México",
      "company": "Platzi",
      "urlImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Platzi.jpg/1920px-Platzi.jpg",
      "position": "SAROLLADOR FRONTEND",
      "salary": "100000",
      "coin": "MXN",
      "requirements": "Estudiar en Platzi Master",
      "skills": "Alto conocimiento y manejo de la suite de Adobe (Ilustrator, Photoshop, indesign, audiovisual). Desarrollo de diseño publicitario, identidad corporativa, packaging y para aplicaciones digitales (diseño web, redes sociales, apps). Conocimiento y adaptación en tendencias de diseño.Excelente ortografía.Administración del tiempo. Conocimientos básicos en Mercadotecnia",
      "details": "Forma parte un gran equipo de trabajo dentro de una Agencia de mercadotecnia y publicidad. Eres Diseñador gráfico con experiencia en diseño publicitario e identidad corporativa, con alto grado de conocimiento en edición fotográfica en Adobe Photoshop e ilustración en Adobe Illustrator, te estamos buscando",
      "tags": ["Fronted", "Ilustrator", "Photoshop", "Mercadotecnia", "Diseño"],
      "enabled": true,
      "createdAt": "2020-12-18T17:29:33.436Z",
      "updatedAt": "2020-12-18T17:29:33.436Z"
    }
  ],
  "massage": "vacancies retrieved"
}
```

#### POST

body:

```json
{
  "branch": "BACKEND",
  "country": "México",
  "company": "Platzi",
  "urlImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Platzi.jpg/1920px-Platzi.jpg",
  "position": "DESAROLLADOR FRONTEND",
  "salary": 100000,
  "coin": "MXN",
  "requirements": "Estudiar en Platzi Master",
  "skills": "Alto conocimiento y manejo de la suite de Adobe (Ilustrator, Photoshop, indesign, audiovisual). Desarrollo de diseño publicitario, identidad corporativa, packaging y para aplicaciones digitales (diseño web, redes sociales, apps). Conocimiento y adaptación en tendencias de diseño.Excelente ortografía.Administración del tiempo. Conocimientos básicos en Mercadotecnia",
  "details": "Forma parte un gran equipo de trabajo dentro de una Agencia de mercadotecnia y publicidad. Eres Diseñador gráfico con experiencia en diseño publicitario e identidad corporativa, con alto grado de conocimiento en edición fotográfica en Adobe Photoshop e ilustración en Adobe Illustrator, te estamos buscando",
  "tags": ["Fronted", "Ilustrator", "Photoshop", "Mercadotecnia", "Diseño"],
  "enabled": true
}
```

Response:

```json
{
  "data": "5fdce6fd6980241948bcfdf7",
  "message": "vacant created"
}
```

### Route `/api/vacancies/:vacantId`

#### GET

Response:

```json
{
  "data": {
    "id": "5fdce6fd6980241948bcfdf7",
    "branch": "BACKEND",
    "country": "México",
    "company": "Platzi",
    "urlImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Platzi.jpg/1920px-Platzi.jpg",
    "position": "DESAROLLADOR FRONTEND",
    "salary": 100000,
    "coin": "MXN",
    "requirements": "Estudiar en Platzi Master",
    "skills": "Alto conocimiento y manejo de la suite de Adobe (Ilustrator, Photoshop, indesign, audiovisual). Desarrollo de diseño publicitario, identidad corporativa, packaging y para aplicaciones digitales (diseño web, redes sociales, apps). Conocimiento y adaptación en tendencias de diseño.Excelente ortografía.Administración del tiempo. Conocimientos básicos en Mercadotecnia",
    "details": "Forma parte un gran equipo de trabajo dentro de una Agencia de mercadotecnia y publicidad. Eres Diseñador gráfico con experiencia en diseño publicitario e identidad corporativa, con alto grado de conocimiento en edición fotográfica en Adobe Photoshop e ilustración en Adobe Illustrator, te estamos buscando",
    "tags": ["Fronted", "Ilustrator", "Photoshop", "Mercadotecnia", "Diseño"],
    "enabled": true,
    "createdAt": "2020-12-18T17:29:33.436Z",
    "updatedAt": "2020-12-18T17:29:33.436Z"
  },
  "massage": "vacant retrieved"
}
```
