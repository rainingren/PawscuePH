// Search functionality
document.querySelector('.search-box').addEventListener('input', function() {
    console.log('Searching for:', this.value);
    // You'll implement actual search/filter logic here later
});

// Pagination functionality
document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // You'll need to update the table data based on pagination here
        }
    });
});

// Button hover effects
document.querySelectorAll('.control-btn, .filter-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Filter Modal Functionality
const filterModal = document.getElementById('filterModal');
const openFilterBtn = document.getElementById('openFilterBtn');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const clearFilterBtn = document.getElementById('clearFilterBtn');
const filterForm = document.getElementById('filterForm');

filterModal.style.display = 'none';

// Function to show the modal
openFilterBtn.addEventListener('click', () => {
    filterModal.style.display = 'flex';
});

// Function to hide the modal when clicking the close button
closeFilterBtn.addEventListener('click', () => {
    console.log('Close button clicked!');
    filterModal.style.display = 'none';
});

// Function to hide the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === filterModal) {
        console.log('Clicked outside modal!');
        filterModal.style.display = 'none';
    }
});

// Handle Apply Filters button click
applyFilterBtn.addEventListener('click', () => {
    const filters = {};
    const formData = new FormData(filterForm);

    // Iterate over all form elements to collect values
    for (let [name, value] of formData.entries()) {
        if (filterForm.elements[name] && filterForm.elements[name].type === 'radio') {
            const checkedRadio = filterForm.querySelector(`input[name="${name}"]:checked`);
            if (checkedRadio) {
                filters[name] = checkedRadio.value;
            }
        } else if (filterForm.elements[name] && filterForm.elements[name].type === 'checkbox') {
            filters[name] = filterForm.elements[name].checked ? value : '';
        } else {
            filters[name] = value;
        }
    }

    console.log('Applying Filters:', filters);
    // In a real application, you would send these filters to your backend
    // Example: fetch('/api/data?city=' + filters.city + '&status=' + filters.adopterStatus)
    filterModal.style.display = 'none'; // Hide modal after applying
});

// Handle Clear Filters button click
clearFilterBtn.addEventListener('click', () => {
    filterForm.reset(); // Resets all form elements to their initial state
    console.log('Filters Cleared');
});

// --- Custom Delete Confirmation Modal Logic ---
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const deleteModalMessage = document.getElementById('deleteModalMessage');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

deleteConfirmModal.style.display = 'none';

let currentAdopterIdToDelete = null; // Variable to store the ID of the record to be deleted

// Function to show the delete confirmation modal
function showDeleteConfirmModal(adopterId) {
    currentAdopterIdToDelete = adopterId;
    deleteModalMessage.textContent = `Are you sure you want to delete adopter record ID: ${adopterId}? This action cannot be undone.`;
    deleteConfirmModal.style.display = 'flex'; // Show the modal using flex for centering
}

// Function to hide the delete confirmation modal
function hideDeleteConfirmModal() {
    deleteConfirmModal.style.display = 'none';
    currentAdopterIdToDelete = null; // Clear the stored ID
}

// Event listener for the "Yes, Delete" button in the modal
confirmDeleteBtn.addEventListener('click', async () => {
    if (currentAdopterIdToDelete) {
        try {
            const response = await fetch(`http://localhost:8080/api/adoption-record/full-application/${currentAdopterIdToDelete}/delete-record`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            hideDeleteConfirmModal(); // Hide modal after success
            fetchAndDisplayAdopterData(); // Re-fetch data to update the table
        } catch (error) {
            console.error('Error deleting adopter record:', error);
            alert(`Failed to delete adopter record ${currentAdopterIdToDelete}. Error: ${error.message}`); 
            hideDeleteConfirmModal(); // Hide modal even on error
        }
    }
});

// Event listener for the "Cancel" button in the modal
cancelDeleteBtn.addEventListener('click', () => {
    hideDeleteConfirmModal();
});

// Hide modal if clicking outside it
window.addEventListener('click', (event) => {
    if (event.target === deleteConfirmModal) {
        hideDeleteConfirmModal();
    }
});

// *** Code for Table Population ***

const tableBody = document.querySelector('.data-table tbody');

async function fetchAndDisplayAdopterData() {
    try {
        const response = await fetch('http://localhost:8080/api/adoption-record/full-application/all'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Error fetching adopter data:', error);
        // Corrected colspan to 40 as 'adopterid' column was removed
        tableBody.innerHTML = '<tr><td colspan="40">Error loading data. Please try again later.</td></tr>';
    }
}
// Call the function to fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayAdopterData);

function populateTable(adopters) {
    const tableBody = document.querySelector('.data-table tbody'); 
    tableBody.innerHTML = ''; // Clear existing table rows

    if (adopters.length === 0) {
        // Corrected colspan to 40 as 'adopterid' column was removed
        tableBody.innerHTML = '<tr><td colspan="40">No adopter records found.</td></tr>';
        return;
    }

    adopters.forEach(adopterRecord => {
        const adopter = adopterRecord.adopter || {};
        const addressDetails = adopter.addressDetails || {};
        const spouse = adopter.spouse || {};
        const householdAdults = adopterRecord.householdAdults || [];
        const adopterPets = adopterRecord.adopterPets || [];

        const rowspan = Math.max(1, householdAdults.length, adopterPets.length);

        const firstRow = tableBody.insertRow();
        let currentCell;

        // Populate Adopter Information and apply rowspan
        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.adopterId || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.adopterName || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.contactNum || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.emailAddress || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.adopterAddressId || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.homeAddress || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.city || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.state || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.zipCode || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.employmentStatus || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.employerName || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.workContactNum || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.workAddress || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.workingHrs || '';
        currentCell.rowSpan = rowspan;

        // Spouse info
        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.spouseId || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.spouseName || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.employerName || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.workContactNum || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.workAddress || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = spouse.workingHrs || '';
        currentCell.rowSpan = rowspan;

        // Household Adult Information - First adult or default ""
        const firstAdult = householdAdults.length > 0 ? householdAdults[0] : null;

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (firstAdult.householdadultid || '') : ''; // Corrected capitalization

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (firstAdult.adultname || '') : ''; 

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (typeof firstAdult.adultallergy === 'boolean' ? (firstAdult.adultallergy ? 'Yes' : 'No') : '') : '';

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (firstAdult.workcontactnum || '') : '';

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (firstAdult.adultemployer || '') : '';

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstAdult ? (firstAdult.adultworkaddress || '') : '';

        // Remaining Adopter info (after household adults, before pets)
        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.petAloneHours || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = adopter.petCareTaker || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.homeChildrenNum || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.housingStatus || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.homePetPolicy || '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = typeof addressDetails.windowScreens === 'boolean' ? (addressDetails.windowScreens ? 'Yes' : 'No') : '';
        currentCell.rowSpan = rowspan;

        currentCell = firstRow.insertCell();
        currentCell.textContent = addressDetails.petLivingArea || '';
        currentCell.rowSpan = rowspan;

        // Adopter Pet Information - First pet or default ""
        const firstPet = adopterPets.length > 0 ? adopterPets[0] : null;

        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.petid || '') : '';
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.petbreed || '') : '';
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.petage || '') : '';
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.surgicalSterilization || '') : ''; // Reverted to surgicalSterilization
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.petyrsowned || '') : '';
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (firstPet.petStatus || '') : ''; // Reverted to petStatus
    
        currentCell = firstRow.insertCell();
        currentCell.textContent = firstPet ? (typeof firstPet.vaccinated === 'boolean' ? (firstPet.vaccinated ? 'Yes' : 'No') : '') : ''; // Reverted to vaccinated

        // --- Add the Actions column with the Delete button ---
        currentCell = firstRow.insertCell();
        currentCell.rowSpan = rowspan; 
        const rowDeleteButton = document.createElement('button'); // Corrected variable name
        rowDeleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete'; 
        rowDeleteButton.classList.add('delete-btn'); 
        
        // Use the custom modal instead of native confirm/alert
        rowDeleteButton.addEventListener('click', () => {
            showDeleteConfirmModal(adopter.adopterId); // Call the new modal function
        });
        currentCell.appendChild(rowDeleteButton);

        // --- Add subsequent rows for additional household adults and pets ---
        for (let i = 1; i < rowspan; i++) {
            const newRow = tableBody.insertRow(); 

            const currentAdult = householdAdults[i] || null;
            const currentPet = adopterPets[i] || null;

            // Add cells for Household Adult data for this row
            newRow.insertCell().textContent = currentAdult ? (currentAdult.householdadultid || '') : ''; // Corrected capitalization
            newRow.insertCell().textContent = currentAdult ? (currentAdult.adultname || '') : '';
            newRow.insertCell().textContent = currentAdult ? (typeof currentAdult.adultallergy === 'boolean' ? (currentAdult.adultallergy ? 'Yes' : 'No') : '') : '';
            newRow.insertCell().textContent = currentAdult ? (currentAdult.workcontactnum || '') : '';
            newRow.insertCell().textContent = currentAdult ? (currentAdult.adultemployer || '') : '';
            newRow.insertCell().textContent = currentAdult ? (currentAdult.adultworkaddress || '') : '';

            // Add cells for Adopter Pet data for this row
            newRow.insertCell().textContent = currentPet ? (currentPet.petid || '') : '';
            newRow.insertCell().textContent = currentPet ? (currentPet.petbreed || '') : '';
            newRow.insertCell().textContent = currentPet ? (currentPet.petage || '') : '';
            newRow.insertCell().textContent = currentPet ? (currentPet.surgicalSterilization || '') : ''; // Reverted to surgicalSterilization
            newRow.insertCell().textContent = currentPet ? (currentPet.petyrsowned || '') : '';
            newRow.insertCell().textContent = currentPet ? (currentPet.petStatus || '') : ''; // Reverted to petStatus
            newRow.insertCell().textContent = currentPet ? (typeof currentPet.vaccinated === 'boolean' ? (currentPet.vaccinated ? 'Yes' : 'No') : '') : '';
            // IMPORTANT: No new cell is added here for the 'Actions' column, as it's spanned from the firstRow.
        }
    });
}