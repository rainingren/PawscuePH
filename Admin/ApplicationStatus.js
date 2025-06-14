const statusMessageModal = document.getElementById('statusMessageModal');
const messageModalTitle = document.getElementById('messageModalTitle');
const messageModalText = document.getElementById('messageModalText');
const closeMessageModalBtn = document.getElementById('closeMessageModalBtn');

// Function to show the message modal
function showMessageModal(title, message, isSuccess = true) {
    messageModalTitle.textContent = title;
    messageModalText.textContent = message;
    // You could add classes here to change color based on success/error
    // e.g., messageModalTitle.style.color = isSuccess ? '#4CAF50' : '#F44336';
    statusMessageModal.style.display = 'flex';
}

// Function to hide the message modal
function hideMessageModal() {
    statusMessageModal.style.display = 'none';
}

// Event listener for the "OK" button in the message modal
closeMessageModalBtn.addEventListener('click', hideMessageModal);

// Hide modal if clicking outside it
window.addEventListener('click', (event) => {
    if (event.target === statusMessageModal) {
        hideMessageModal();
    }
});


// --- Table Population and Status Update Logic ---
const statusTableBody = document.querySelector('.status-table tbody');

// Function to fetch and display application data
async function fetchAndDisplayApplications() {
    try {
        const response = await fetch('http://localhost:8080/api/adoption-record/application-status'); // Assuming new endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        populateApplicationTable(data);
    } catch (error) {
        console.error('Error fetching application status data:', error);
        statusTableBody.innerHTML = '<tr><td colspan="5">Error loading application data. Please try again later.</td></tr>';
        showMessageModal('Error', 'Failed to load application data. Please try again later.', false);
    }
}

// Function to populate the application status table
function populateApplicationTable(applications) {
    statusTableBody.innerHTML = ''; // Clear existing rows

    if (applications.length === 0) {
        statusTableBody.innerHTML = '<tr><td colspan="5">No application records found.</td></tr>';
        return;
    }

    applications.forEach(appRecord => {
        const row = statusTableBody.insertRow();

        row.insertCell().textContent = appRecord.adopterId || 'N/A';
        row.insertCell().textContent = appRecord.adopterName || 'N/A';
        row.insertCell().textContent = appRecord.contactNum || 'N/A';
        row.insertCell().textContent = appRecord.emailAddress || 'N/A';

        // Create the status dropdown
        const statusCell = row.insertCell();
        const statusSelect = document.createElement('select');
        statusSelect.classList.add('status-select');
        statusSelect.dataset.adopterId = appRecord.adopterId; // Store adopterId in a data attribute

        const statuses = ["For Interview", "For Adoption", "Pending", "Done", "Rejected"];
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        if (appRecord.status) {
            statusSelect.value = appRecord.status;
        }

        // Add event listener for status change
        statusSelect.addEventListener('change', async (event) => {
            const selectedAdopterId = event.target.dataset.adopterId;
            const newStatus = event.target.value;
            await updateApplicationStatus(selectedAdopterId, newStatus);
        });

        statusCell.appendChild(statusSelect);
    });
}

// Function to send status update to the backend
async function updateApplicationStatus(adopterId, newStatus) {
    try {
        const response = await fetch(`http://localhost:8080/api/adoption-record/status-update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adopterId: adopterId,
                status: newStatus
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        showMessageModal('Success', `Application status for ${adopterId} updated to "${newStatus}".`, true);

    } catch (error) {
        console.error('Error updating application status:', error);
        showMessageModal('Error', `Failed to update status for ${adopterId}. Error: ${error.message}`, false);
    }
}

// Call the function to fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayApplications);