require('./Expense');
require('./ExpenseReport');
require('./MockReportPrinter');

module.exports = {
  setUp: function (callback) {
    this.report = new ExpenseReport();
    this.printer = new MockReportPrinter();

    callback()
  },

  "Print empty": function (test) {
    this.report.printReport(this.printer);

    test.equals(
      this.printer.getText(),
      "Expenses 9/12/2002\n" +
      "\n" +
      "Meal expenses $0.00\n" +
      "Total $0.00");

    test.done();
  },

  "Print one expense": function (test) {
    this.report.addExpense(new Expense(Expense.DINNER, 1678));
    this.report.printReport(this.printer);

    test.equals(
      this.printer.getText(),
      "Expenses 9/12/2002\n" +
      " \tDinner\t$16.78\n" +
      "\n" +
      "Meal expenses $16.78\n" +
      "Total $16.78");

    test.done();
  },

  "Two meals": function (test) {
    this.report.addExpense(new Expense(Expense.DINNER, 1000));
    this.report.addExpense(new Expense(Expense.BREAKFAST, 500));
    this.report.printReport(this.printer);

    test.equals(
      this.printer.getText(),
      "Expenses 9/12/2002\n" +
      " \tDinner\t$10.00\n" +
      " \tBreakfast\t$5.00\n" +

      "\n" +
      "Meal expenses $15.00\n" +
      "Total $15.00");

    test.done();
  },

  "Two meals and car rental": function (test) {
    this.report.addExpense(new Expense(Expense.DINNER, 1000));
    this.report.addExpense(new Expense(Expense.BREAKFAST, 500));
    this.report.addExpense(new Expense(Expense.CAR_RENTAL, 50000));
    this.report.printReport(this.printer);

    test.equals(
      this.printer.getText(),
      "Expenses 9/12/2002\n" +
      " \tDinner\t$10.00\n" +
      " \tBreakfast\t$5.00\n" +
      " \tCar Rental\t$500.00\n" +
      "\n" +
      "Meal expenses $15.00\n" +
      "Total $515.00");

    test.done();
  },

  "Overages": function (test) {
    this.report.addExpense(new Expense(Expense.BREAKFAST, 1000));
    this.report.addExpense(new Expense(Expense.BREAKFAST, 1001));
    this.report.addExpense(new Expense(Expense.DINNER, 5000));
    this.report.addExpense(new Expense(Expense.DINNER, 5001));
    this.report.printReport(this.printer);

    test.equals(
      this.printer.getText(),
      "Expenses 9/12/2002\n" +
      " \tBreakfast\t$10.00\n" +
      "X\tBreakfast\t$10.01\n" +
      " \tDinner\t$50.00\n" +
      "X\tDinner\t$50.01\n" +
      "\n" +
      "Meal expenses $120.02\n" +
      "Total $120.02");

    test.done();
  }
};