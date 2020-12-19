# Services

## vacanciesService

### Methods

| Methods      | Params   | Returns  | Description         |
| ------------ | -------- | -------- | ------------------- |
| createVacant | `Object` | `String` | create a new vacant |
| getVacancies | `Object` | `Array`  | get vacancies       |
| getVacant    | `String` | `Object` | get a vacant        |

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
    salary: 100000,
    coin: 'MXN',
    requirements: 'Estudiar en Platzi Master',
    skills:
      'Alto conocimiento y manejo de la suite de Adobe (Ilustrator, Photoshop, indesign, audiovisual). Desarrollo de diseño publicitario, identidad corporativa, packaging y para aplicaciones digitales (diseño web, redes sociales, apps). Conocimiento y adaptación en tendencias de diseño.Excelente ortografía.Administración del tiempo. Conocimientos básicos en Mercadotecnia',
    details:
      'Forma parte un gran equipo de trabajo dentro de una Agencia de mercadotecnia y publicidad. Eres Diseñador gráfico con experiencia en diseño publicitario e identidad corporativa, con alto grado de conocimiento en edición fotográfica en Adobe Photoshop e ilustración en Adobe Illustrator, te estamos buscando',
    tags: ['Fronted', 'Ilustrator', 'Photoshop', 'Mercadotecnia', 'diseño'],
    enabled: true,
  });

  console.log(vacantId); // 5fdce6fd6980241948bcfdf6
};

main();
```

#### getVacancies

```js
const VacanciesService = require('../services/vacancies');
const vacanciesService = new VacanciesService();

const main = async function () {
  const vacancies = await vacanciesService.getVacancies({
    branch: 'BACKEND',
    country: 'México',
    smax: 1000000,
    smin: 10000,
    enabled: true,
    page: 0,
    limit: 10,
  });

  console.log(vacancies);
};

main();
```

#### getVacant

```js
const VacanciesService = require('../services/vacancies');
const vacanciesService = new VacanciesService();

const main = async function () {
  const vacant = await vacanciesService.getVacant('5fdce6fd6980241948bcfdf6');

  console.log(vacant);
};

main();
```
