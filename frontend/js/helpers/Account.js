import { showBaloonAnimation } from './Common.js'
import { updateAccounts } from "./Transaction.js";

// GET accounts that already exist
// Show them to the list
export function showAccounts() {
  updateBalance();
}
//これなしでもいける？

// POST a new account
// Show them to the list
export function addNewAccount() {
  const accountName = $(".addNewAccountText").val();
  $.post("http://localhost:3000/accounts", {
    newAccount: accountName,
  })
    .done(() => {
      showAccounts();
      //ここもupdatebalanceでいける？
      $(".addNewAccountText").val("");
    })
    .fail((err) => console.log(err));
}

// Calclate balance
// Show them to the list

//⚠️parameter expecting: EACH user with id, username & transactions
//not sure if this works with transactions URL
export function updateBalance() {
  $.get("http://localhost:3000/accounts")
    .done((accounts) => {
      const accountAndBalance = $("#accountAndBalance");
      accountAndBalance.html("")
      $.each(accounts, (index, account) => {
        let balance = 0;
        const row = $(`<tr class="balloon-animation-parent">`);
        const accountName = $("<td>").text(account.username);
        $.each(account.transactions, (index, transaction) => {
          console.log(transaction);
          //add amount
          if (transaction.type === "Deposit") {
            balance = balance + transaction.amount;
            //subtract ammount
          } else if (transaction.type === "WithDraw") {
            balance = balance - transaction.amount;
          } else if (
            //transfer receive
            transaction.type === "Transfer" &&
            transaction.accountIdTo === transaction.accountId
          ) {
            balance = balance + transaction.amount;
          } else if (
            //transfer send
            transaction.type === "Transfer" &&
            transaction.accountIdTo !== null
          ) {
            balance = balance - transaction.amount;
          }
        });
        const accountBalance = $("<td>").text(balance);
        row.append(accountName, accountBalance);
        accountAndBalance.append(row);

        if(index === accounts.length - 1) {
          showBaloonAnimation(row, "A new account has been added.")
        }
      });
      updateAccounts(accounts);
    })
    .fail((err) => console.log(err));
}
