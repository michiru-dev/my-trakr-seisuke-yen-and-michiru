import { SERVER_URL } from './Common.js'
import { updateAccounts } from "./Transaction.js";
const ACCOUNT_ENDPOINT = SERVER_URL + "accounts"


// POST a new account
// Show them to the list
export function addNewAccount() {
  const accountName = $(".addNewAccountText").val();
  $.post(ACCOUNT_ENDPOINT, {
    newAccount: accountName,
  })
    .done(() => {
      $(".addNewAccountText").val("");
      updateBalance().then(notifyNewAccountAdded);
    })
    .fail((err) => console.log(err));
}

// GET accounts that already exist
// Calclate balance
// Show them to the list
//⚠️parameter expecting: EACH user with id, username & transactions
//not sure if this works with transactions URL
export function updateBalance() {

  // Return promise because transaction list, pull-down menu, and notification process require account data
  return new Promise((resolve, reject) => {
    $.get(ACCOUNT_ENDPOINT)
    .done((accounts) => {
      console.log(accounts);
      const accountAndBalance = $("#accountAndBalance");
      accountAndBalance.html("")
      $.each(accounts, (index, account) => {
        let balance = 0;
        const row = $(`<tr class="balloon-animation-parent">`);
        const accountName = $("<td>").text(account.username);
        $.each(account.transactions, (index, transaction) => {
          //add amount
          if (transaction.type === "Deposit") {
            balance = balance + transaction.amount;
            //subtract ammount
          } else if (transaction.type === "Withdraw") {
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
      });
      updateAccounts(accounts);
      resolve();
    })
    .fail((err) => console.log(err));
  })
}


function notifyNewAccountAdded() {
  // Get the final row
  // because the animation should be displayed only for the new account that has just been added
  const accountAddedLast = $("#accountAndBalance").children().last()

  // Create an element for the animation
  const message = "A new account has been added."
  const animationElement = $(`
      <div class="balloon-left-animation">
          <div class="balloon-left">
              <p>${message}</p>
          </div>
      </div>
  `)

  // Add the animation element to the final row
  accountAddedLast.append(animationElement)

  // Remove the animation so that this animation can work next time
  setTimeout(() => {
      animationElement.remove()
  }, 4000)
}