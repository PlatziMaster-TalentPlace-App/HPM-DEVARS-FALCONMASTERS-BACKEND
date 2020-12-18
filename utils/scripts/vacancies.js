const VacanciesService = require('../../services/vacancies');

const vacanciesService = new VacanciesService();

const main = async function () {
  const a = await vacanciesService.createVacant({
    branch: 'Backend',
  });
  console.log(a);
  process.exit(0);
};

main();
