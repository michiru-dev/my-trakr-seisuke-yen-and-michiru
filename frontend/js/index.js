import { showAccounts } from "./helpers/Account.js";
import { showTransactions } from "./helpers/Transaction.js";
import { addNewAccount } from "./helpers/Account.js";

$(() => {
  showAccounts();
  showTransactions();
  // showCategories();

  $("#addNewAccount").on("click", () => {
    addNewAccount();
  });

  $("addTransaction").on("click", () => {
    addNewTransaction(data);
  });

  $("addCategory").on("click", () => {
    addNewCategory(data);
  });
});
