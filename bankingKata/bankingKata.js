const { format } = require("date-fns");

const statements = [];
let balance = 0;

const deposit = (amount, prevBalance) => {
  const balance = prevBalance + amount;
  const date = format(new Date(), "DD.MM.YYYY");
  return {
    date: date,
    amount: `+${amount}`,
    balance: balance.toString()
  };
};

const withdraw = (amount, prevBalance) => {
  //   if (prevBalance < 0) {
  //     return new Error("Insufficient Balance!");
  //   }
  const balance = prevBalance - amount;
  const date = format(new Date(), "DD.MM.YYYY");
  return {
    date: date,
    amount: `-${amount}`,
    balance: balance.toString()
  };
};

const prepareStatement = statement => {
  return `${statement.date} | ${statement.amount}   | ${statement.balance}`;
};

const consolidateStatements = statements => {
  const allStatements = statements
    .map(statement => {
      return prepareStatement(statement);
    })
    .join("\n");
  const headers = `Date       | Amount | Balance`;
  return `
${headers}
${allStatements}
    `;
};

const addStatement = (transaction, statements) => {
  statements.push(transaction);
  return statements;
};

module.exports = {
  deposit,
  withdraw,
  prepareStatement,
  consolidateStatements,
  addStatement
};
