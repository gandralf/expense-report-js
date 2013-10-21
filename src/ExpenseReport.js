var util = require('util');

ExpenseReport = function() {
  var expenses = [];

  this.printReport = function(printer) {
    var total = 0;
    var mealExpenses = 0;

    printer.print("Expenses " + getDate() + "\n");

    for (var i=0; i < expenses.length; i++) {
      var expense = expenses[i];
      if (expense.type == Expense.BREAKFAST || expense.type == Expense.DINNER)
        mealExpenses += expense.amount;

      var name = "TILT";
      switch (expense.type) {
        case Expense.DINNER:
          name = "Dinner";
          break;
        case Expense.BREAKFAST:
          name = "Breakfast";
          break;
        case Expense.CAR_RENTAL:
          name = "Car Rental";
          break;
      }
      printer.print(util.format("%s\t%s\t$%s\n",
        (  (expense.type == Expense.DINNER && expense.amount > 5000)
        || (expense.type == Expense.BREAKFAST && expense.amount > 1000)) ? "X" : " ",
        name, toFixed(expense.amount / 100.0)));

      total += expense.amount;
    }

    printer.print(util.format("\nMeal expenses $%s", toFixed(mealExpenses / 100.0) ));
    printer.print(util.format("\nTotal $%s", toFixed(total / 100.0)));
  };

  this.addExpense = function(expense) {
    expenses.push(expense);
  };

  function getDate() {
    return "9/12/2002";
  }

  function toFixed(n) {
    var n2 = n * 100;
    var d = Math.floor(n2 / 100);
    var f = (n2 % 100);
    return d + '.' + (f > 9 ? f : '0' + f);
  }
};
