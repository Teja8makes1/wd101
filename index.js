// Reference to the form element
let userForm = document.getElementById("form");

// Function to retrieve entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        return JSON.parse(entries);
    } else {
        return [];
    }
};

let userEntries = retrieveEntries();

// Function to display entries in a table format
const displayEntries = () => {
    const entries = retrieveEntries();

    // Create table rows for each entry
    const tableEntries = entries
        .map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const mailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passCell = `<td class='border px-4 py-2'>${entry.pass}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.date}</td>`;
            const accTerms = `<td class='border px-4 py-2'>${entry.act ? 'Yes' : 'No'}</td>`;
            const row = `<tr>${nameCell}${mailCell}${passCell}${dobCell}${accTerms}</tr>`;
            return row;
        })
        .join("\n");

    // Create the table structure
    const table = `<table class="table-auto w-full">
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">DoB</th>
            <th class="px-4 py-2">Accepted Terms</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

// Validate date of birth
const isValidDateOfBirth = (date) => {
    const today = new Date();
    const dob = new Date(date);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
        (age === 18 && monthDiff >= 0) || 
        (age === 55 && monthDiff <= 0) || 
        (age > 18 && age < 55)
    ) {
        return true;
    }
    return false;
};

// Save user form data
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("Name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const date = document.getElementById("date").value;
    const act = document.getElementById("check").checked;
    const dateError = document.getElementById("dateError");
    const checkError = document.getElementById("checkError");

    // Validate date of birth before saving
    if (!isValidDateOfBirth(date)) {
        dateError.textContent = "Date of birth must be for ages 18 to 55.";
        return;
    } else {
        dateError.textContent = "";
    }

    // Validate terms acceptance
    if (!act) {
        checkError.textContent = "";
        return;
    } else {
        checkError.textContent = "";
    }

    // Create an entry object with form data
    const entry = {
        name,
        email,
        pass,
        date,
        act
    };

    // Update entries and save to localStorage
    userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Refresh displayed entries
    displayEntries();
};

// Attach the save function to the form's submit event
userForm.addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
