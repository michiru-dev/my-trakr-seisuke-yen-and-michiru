import { showCategories, addNewCategory } from "./helpers/Category.js";
import {
    handleNewTransaction,
    updateAccounts,
    updateAccountSelection,
} from "./helpers/Transaction.js";
import { updateBalance } from "./helpers/Account.js";
import { showTransactions } from "./helpers/Transaction.js";
import { addNewAccount } from "./helpers/Account.js";

$(() => {
    updateBalance();
    showTransactions();
    showCategories();
    updateAccountSelection();

    $("#add-new-category-btn").on("click", () => {
        addNewCategory();
    });
    $("#new-transaction").on("submit", (event) => {
        event.preventDefault();
        handleNewTransaction();
    });
    $("#transaction-options").on("change", () => {
        updateAccountSelection();
    });
    $("#addNewAccount").on("click", (event) => {
        event.preventDefault();
        addNewAccount();
    });
});
