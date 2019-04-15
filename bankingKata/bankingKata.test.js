const {
  deposit,
  withdraw,
  prepareStatement,
  consolidateStatements,
  addStatement
} = require("./bankingKata");

describe("ATM", () => {
  test("should add to bank balance when deposited", () => {
    // ARRANGE
    const depositValue = 50;
    const prevBalance = 100;

    // ACT
    const newStatement = deposit(depositValue, prevBalance);

    // ASSERT
    expect(newStatement).toEqual(
      expect.objectContaining({
        date: expect.stringMatching(/\d{2}\.\d{2}\.\d{4}/i),
        amount: "+50",
        balance: "150"
      })
    );
  });

  test("should save to DB once deposit is completed", () => {
    const statements = [{ date: "10.04.2019", amount: "+500", balance: "500" }];
   

    const transaction = {
      date: "15.04.2019",
      amount: "+300",
      balance: "800"
    };

    const updatedStatements = addStatement(transaction, statements);

    const expectedOutput = [
      { date: "10.04.2019", amount: "+500", balance: "500" },
      {
        date: "15.04.2019",
        amount: "+300",
        balance: "800"
      }
    ];

    expect(updatedStatements.length).toBe(2);
    updatedStatements.forEach((statement, index) => {
      expect(statement).toEqual(expect.objectContaining(expectedOutput[index]));
    });
  });

  test("should deduct from bank balance when withdrawn", () => {
    // ARRANGE
    const withdrawnValue = 30;
    const prevBalance = 80;

    // ACT
    const newStatement = withdraw(withdrawnValue, prevBalance);

    // ASSERT
    expect(newStatement).toEqual(
      expect.objectContaining({
        date: expect.stringMatching(/\d{2}\.\d{2}\.\d{4}/i),
        amount: "-30",
        balance: "50"
      })
    );
  });

  test("should prepare one statement line", () => {
    // ARRANGE
    const oneStatement = {
      date: "11.04.2018",
      amount: "+300",
      balance: "300"
    };

    // ACT
    const preparedStatement = prepareStatement(oneStatement);

    // ASSERT
    expect(preparedStatement).toBe("11.04.2018 | +300   | 300");
  });

  test("should prepare all statements with headings", () => {
    // ARRANGE
    const statements = [
      {
        date: "11.04.2018",
        amount: "+300",
        balance: "300"
      },
      {
        date: "11.05.2018",
        amount: "+200",
        balance: "500"
      }
    ];

    const expectedOutput = `
Date       | Amount | Balance
11.04.2018 | +300   | 300
11.05.2018 | +200   | 500
    `;

    // ACT
    const customerStatement = consolidateStatements(statements);

    // ASSERT
    expect(customerStatement).toBe(expectedOutput);
  });
});
