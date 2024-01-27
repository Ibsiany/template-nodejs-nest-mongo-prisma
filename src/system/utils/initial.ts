import chalk from 'chalk';

export const initial = (host: string) => {
  const name = `
    CHAMELEON STACK - KANBAN!!! 🔥 🔥 🔥
  `;

  const text = `
   Start developer current environment: ${
     process.env.CURRENT_ENVIRONMENT || 'dev'
   }
   Start developer server at ${host}
   Start developer docs at ${host}/api  👨‍💻
  `;

  console.log(chalk.blue(name));

  console.log(chalk.green(text));
};
