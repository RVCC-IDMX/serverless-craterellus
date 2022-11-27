const chalk = require('chalk');
const { DateTime } = require('luxon');

// mod.cjs
// eslint-disable-next-line no-shadow, import/no-extraneous-dependencies
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// eslint-disable-next-line func-names
exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body);
  const date = DateTime.now();
  // const color = eventBody.region === 'kanto' ? chalk.blue : chalk.green;

  console.log(chalk.black.bgCyan(`${date}: Fetching data from PokeAPI`));
  console.log(chalk.bold.magenta(`\teventbody.region: ${eventBody.region}`));

  const POKE_API = `https://pokeapi.co/api/v2/pokedex/${eventBody.region}`;

  const response = await fetch(POKE_API);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      pokemon: data.pokemon_entries,
    }),
  };
};
