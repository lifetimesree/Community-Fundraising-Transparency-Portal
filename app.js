// Global variables to store money amounts
let goal = 0;
let raised = 0;
let spent = 0;

// 1. Create a Campaign
function createCampaign() {
  let title = document.getElementById("titleInput").value;
  let goalInput = document.getElementById("goalInput").value;

  if (title == "" || goalInput == "") {
    alert("Please enter title and goal!");
    return;
  }

  // Convert goal to a number
  goal = Number(goalInput);
  raised = 0;
  spent = 0;

  // Display values on screen
  document.getElementById("campaignTitle").innerText = title;
  document.getElementById("targetGoal").innerText = goal;
  document.getElementById("totalRaised").innerText = 0;
  document.getElementById("totalSpent").innerText = 0;
  document.getElementById("balance").innerText = 0;
  document.getElementById("status").innerText = "Pending Admin Verification";

  updateProgress();
  addAudit("Campaign created: " + title + " (Goal: ₹" + goal + ")");
  alert("Campaign Created!");
}

// 2. Make a Donation
function donate() {
  let name = document.getElementById("donorName").value;
  let amount = Number(document.getElementById("donorAmount").value);

  if (name == "" || amount <= 0) {
    alert("Please enter a valid name and amount!");
    return;
  }

  // Add donation to raised amount
  raised = raised + amount;

  // Update screen text
  document.getElementById("totalRaised").innerText = raised;
  document.getElementById("balance").innerText = raised - spent;

  updateProgress();

  // Add row to Donor Table
  let table = document.getElementById("donorTable");
  table.innerHTML += "<tr><td>" + name + "</td><td>₹" + amount + "</td></tr>";

  addAudit("Donation received: ₹" + amount + " from " + name);
  alert("Thank you for your donation!");

  // Clear inputs
  document.getElementById("donorName").value = "";
  document.getElementById("donorAmount").value = "";
}

// 3. Add an Expense
function addExpense() {
  let item = document.getElementById("expenseItem").value;
  let amount = Number(document.getElementById("expenseAmount").value);
  let receipt = document.getElementById("expenseReceipt").value;

  if (item == "" || amount <= 0 || receipt == "") {
    alert("Please fill all expense fields!");
    return;
  }

  // Check if we have enough money collected!
  let currentBalance = raised - spent;
  if (amount > currentBalance) {
    alert("Error: Cannot spend more money than collected!");
    return;
  }

  // Add to spent amount
  spent = spent + amount;

  // Update screen text
  document.getElementById("totalSpent").innerText = spent;
  document.getElementById("balance").innerText = raised - spent;

  // Add row to Expense Table
  let table = document.getElementById("expenseTable");
  table.innerHTML += "<tr><td>" + item + "</td><td>₹" + amount + "</td><td>" + receipt + "</td><td class='expStatus'>Pending</td></tr>";

  addAudit("Expense recorded: ₹" + amount + " for " + item + " (Bill: " + receipt + ")");
  alert("Expense added!");

  // Clear inputs
  document.getElementById("expenseItem").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseReceipt").value = "";
}

// 4. Update the Progress Bar
function updateProgress() {
  if (goal > 0) {
    let percent = Math.round((raised / goal) * 100);
    document.getElementById("progressBar").value = percent;
    document.getElementById("progressText").innerText = percent + "%";
  }
}

// 5. Post an Update
function postUpdate() {
  let text = document.getElementById("updateText").value;
  if (text == "") {
    alert("Enter an update message!");
    return;
  }

  let list = document.getElementById("updatesList");
  list.innerHTML += "<li>" + text + "</li>";

  addAudit("Update posted: " + text);
  document.getElementById("updateText").value = "";
}

// 6. Admin Verification
function verifyCampaign() {
  document.getElementById("status").innerText = "Verified by Admin";
  addAudit("Campaign verified by Admin");
  alert("Campaign verified!");
}

function verifyExpenses() {
  let statusList = document.getElementsByClassName("expStatus");
  for (let i = 0; i < statusList.length; i++) {
    statusList[i].innerText = "Approved";
  }
  addAudit("All expenses approved by Admin");
  alert("All expenses approved!");
}

// 7. Add Entry to Audit Trail
function addAudit(action) {
  let time = new Date().toLocaleTimeString();
  let table = document.getElementById("auditTable");
  table.innerHTML += "<tr><td>" + time + "</td><td>" + action + "</td></tr>";
}
