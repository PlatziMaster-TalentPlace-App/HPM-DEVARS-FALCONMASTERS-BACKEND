# Services

## vacanciesService

### Methods

| Methods      | Params | Returns  | Description         |
| ------------ | ------ | -------- | ------------------- |
| createVacant | vacant | vacantId | create a new vacant |

#### createVacant

```js
const VacanciesService = require('../services/vacancies');
const vacanciesService = new VacanciesService();

const main = async function () {
  const vacantId = await vacanciesService.createVacant({
    branch: 'BACKEND',
    country: 'México',
    company: 'Platzi',
    urlImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Platzi.jpg/1920px-Platzi.jpg',
    position: 'DESAROLLADOR FRONTEND',
    salary: '100,000',
    coin: 'MXN',
    requirements: 'Estudiar en Platzi Master',
    skills:
      'Alto conocimiento y manejo de la suite de Adobe (Ilustrator, Photoshop, indesign, audiovisual). Desarrollo de diseño publicitario, identidad corporativa, packaging y para aplicaciones digitales (diseño web, redes sociales, apps). Conocimiento y adaptación en tendencias de diseño.Excelente ortografía.Administración del tiempo. Conocimientos básicos en Mercadotecnia',
    details:
      'Forma parte un gran equipo de trabajo dentro de una Agencia de mercadotecnia y publicidad. Eres Diseñador gráfico con experiencia en diseño publicitario e identidad corporativa, con alto grado de conocimiento en edición fotográfica en Adobe Photoshop e ilustración en Adobe Illustrator, te estamos buscando',
    tags: ['Fronted', 'Ilustrator', 'Photoshop', 'Mercadotecnia', 'diseño'],
    enabled: true,
  });

  console.log(vacantId);
};

main();
```
