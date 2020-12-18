const VacanciesServices = require('../../services/vacancies');

const vacanciesServices = new VacanciesServices();

const main = async function () {
  const a = await vacanciesServices.createVacant({
    branch: 'Backend',
  });
  console.log(a);
  process.exit(0);
};

main();
