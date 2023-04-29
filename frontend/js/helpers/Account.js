import { updateAccounts } from "./Transaction.js";

// GET accounts that already exist
// Show them to the list
export function showAccounts() {
  $.get("http://localhost:3000/accounts")
    .done((accounts) => {
      console.log(accounts);
      //   console.log(JSON.stringify(accounts));
      const accountAndBalance = $("#accountAndBalance");
      $.each(accounts, (index, account) => {
        console.log(account);
        const row = $("<tr>");
        const accountName = $("<td>").text(account.username);
        const balance = updateBalance(account);
        row.append(accountName, balance);
        accountAndBalance.append(row);
      });
      updateAccounts();
    })
    .fail((err) => console.log(err));
}

// POST a new account
// Show them to the list
export function addNewAccount() {
  const accountName = $(".addNewAccountText").val();
  $.post("http://localhost:3000/accounts", {
    newAccount: accountName,
  }).done(() => {
    updateAccounts();
    showAccounts();
  });
}

// Calclate balance
// Show them to the list

//⚠️parameter expecting: EACH user with id, username & transactions
//not sure if this works with transactions URL
export function updateBalance(account) {
  console.log(account);
  let balance = 0;
  $.each(account.transactions, (index, transaction) => {
    console.log(transaction);
    //add amount
    if (transaction.type === "Deposit") {
      balance = balance + transaction.ammount;
      //subtract ammount
    } else if ((transaction.type = "WithDraw")) {
      balance = balance - transaction.ammount;
    } else if (
      //transfer send
      transaction.type === "Transfer" &&
      transaction.accountIdTo !== null
    ) {
      balance = balance - transaction.ammount;
    } else if (
      //transfer receive
      transaction.type === "Transfer" &&
      transaction.accountIdTo === null
    ) {
      balance = balance + transaction.ammount;
    }
  });
  const accountBalance = $("<td>").text(balance);
  return accountBalance;
}
