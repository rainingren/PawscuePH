// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Prevent default only if it's an internal hash link, otherwise let the link navigate
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Search functionality
document.querySelector('.search-box').addEventListener('input', function() {
    console.log('Searching for:', this.value);
    // In a real application, you would typically trigger a data fetch here
    // based on the search query. For now, it just logs.
});

// Pagination functionality
document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        }
        // Add logic here to load specific page data if pagination is dynamic
        console.log('Pagination button clicked:', this.innerHTML);
    });
});

// Button hover effects (keep if desired, applies to general buttons)
document.querySelectorAll('.control-btn, .action-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});


// --- Table Population Logic ---
const dataTableBody = document.querySelector('.data-table tbody');

async function fetchAndDisplayAdopters() {
    try {
        // Corrected API endpoint based on MainController.java
        const response = await fetch('http://localhost:8080/api/adoption-record/full-application/all'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The data is now a list of AdoptionApplicationDTOs, not raw Adopters
        populateAdopterTable(data);
    } catch (error) {
        console.error('Error fetching adopter data:', error);
        dataTableBody.innerHTML = '<tr><td colspan="13">Error loading adopter data. Please try again later.</td></tr>';
    }
}

function populateAdopterTable(adoptionApplications) {
    dataTableBody.innerHTML = ''; // Clear existing rows

    if (adoptionApplications.length === 0) {
        dataTableBody.innerHTML = '<tr><td colspan="13">No adopter records found.</td></tr>';
        return;
    }

    adoptionApplications.forEach(applicationDTO => {
        const row = dataTableBody.insertRow();
        // Access the 'adopter' object nested within the AdoptionApplicationDTO
        const adopter = applicationDTO.adopter;

        // Ensure adopter object exists before accessing its properties
        if (adopter) {
            row.insertCell().textContent = adopter.adopterId || '';
            row.insertCell().textContent = adopter.adopterName || '';
            row.insertCell().textContent = adopter.contactNum || '';
            row.insertCell().textContent = adopter.emailAddress || '';

            // Adopter Home Details - access via adopter.adopterHomeDetails
            row.insertCell().textContent = adopter.addressDetails?.adopterAddressId || '';
            
            // Spouse Information - access via adopter.spouse
            row.insertCell().textContent = adopter.spouse?.spouseId || '';
            
            // Adopter Home Details (continued) - access via adopter.adopterHomeDetails
            row.insertCell().textContent = adopter.employmentStatus || '';
            row.insertCell().textContent = adopter.employerName || '';
            row.insertCell().textContent = adopter.workContactNum || '';
            row.insertCell().textContent = adopter.workAddress || '';
            row.insertCell().textContent = adopter.workingHrs || '';
            row.insertCell().textContent = adopter.petAloneHours || '';
            row.insertCell().textContent = adopter.petCareTaker || '';
        } else {
            // Handle cases where adopter data might be missing in a DTO
            console.warn("Adopter data missing for an applicationDTO:", applicationDTO);
            row.insertCell().textContent = ''; // Adopter ID
            row.insertCell().textContent = ''; // Adopter Name
            row.insertCell().textContent = ''; // Contact Number
            row.insertCell().textContent = ''; // Email Address
            row.insertCell().textContent = ''; // Adopter Address ID
            row.insertCell().textContent = ''; // Spouse ID
            row.insertCell().textContent = ''; // Employment Status
            row.insertCell().textContent = ''; // Employer Name
            row.insertCell().textContent = ''; // Work Contact Number
            row.insertCell().textContent = ''; // Work Address
            row.insertCell().textContent = ''; // Working Hours
            row.insertCell().textContent = ''; // Pet Alone Hours
            row.insertCell().textContent = ''; // Pet Caretaker
        }
    });
}

// Call the function to fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayAdopters);