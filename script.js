document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmSubmissionButton = document.getElementById('confirmSubmission');
    const cancelSubmissionButton = document.getElementById('cancelSubmission');
    const closeModalButton = confirmationModal.querySelector('.close-button'); 
    const formCloseButton = document.querySelector('.form-close-button'); 
    const applyNowBtn = document.getElementById('applyNowBtn');
    const heroSection = document.getElementById('heroSection');
    const howToApplySection = document.getElementById('howToApplySection');
    const applicationFormContainer = document.getElementById('applicationFormContainer');

    let isFormSubmitting = false;

    function checkLoginStatus() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function setLoginStatus(status) {
        localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    }

    // Function to handle form submission status
    function setFormSubmittedStatus(status) {
        localStorage.setItem('applicationSubmitted', status ? 'true' : 'false');
    }

    function getFormSubmittedStatus() {
        return localStorage.getItem('applicationSubmitted') === 'true';
    }

    // Function to show hero and how-to-apply sections and hide the form
    function showDefaultSections() {
        heroSection.classList.remove('hidden');
        howToApplySection.classList.remove('hidden');
        applicationFormContainer.classList.add('hidden');
        applyNowBtn.textContent = 'Apply Now'; // Reset button text
    }

    // Initial state setup on page load
    function initializeAdoptNowPage() {
        if (getFormSubmittedStatus()) {
            applyNowBtn.textContent = 'View Form';
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            // Disable form fields if it's already submitted and being viewed
            form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) { // Hide the form close button if form is just for viewing
                formCloseButton.classList.add('hidden');
            }
        } else {
            applicationFormContainer.classList.add('hidden');
            if (formCloseButton) {
                formCloseButton.classList.remove('hidden'); // Ensure it's visible when not submitted
            }
        }
    }

    // Event listener for the "Apply Now" button
    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            if (!checkLoginStatus()) {
                // If not logged in, redirect to Sign In page
                localStorage.setItem('redirectAfterLogin', 'AdoptNow.html'); // Store current page for redirection
                window.location.href = 'SignIn.html';
            } else {
                // If logged in, toggle form visibility
                if (getFormSubmittedStatus()) {
                    viewSubmittedForm(); // If already submitted, use view logic
                } else {
                    toggleFormVisibility(); // Otherwise, use toggle logic for filling form
                }
            }
        });
    }

    // Modify form submission confirmation
    if (form && confirmationModal) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            if (form.checkValidity()) {
                confirmationModal.style.display = 'flex';
            } else {
                form.reportValidity(); // Show native browser validation messages
            }
        });

        confirmSubmissionButton.addEventListener('click', function() {
            if (!isFormSubmitting) {
                isFormSubmitting = true;
                confirmationModal.style.display = 'none';
                // Simulate form submission success
                console.log('Application submitted successfully!');
                setFormSubmittedStatus(true); // Mark form as submitted
                applyNowBtn.textContent = 'View Form'; // Change button text to "View Form"
                
                // Disable all form fields except the submission buttons in the modal and the apply/view button
                form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                    if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                        element.disabled = true;
                    }
                });
                if (formCloseButton) { // Hide the form close button after submission
                    formCloseButton.classList.add('hidden');
                }
                isFormSubmitting = false; // Reset for future interactions if needed
            }
        });

        cancelSubmissionButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            console.log('Application submission cancelled by user.');
        });

        closeModalButton.addEventListener('click', function() { // Used closeModalButton
            confirmationModal.style.display = 'none';
            console.log('Application submission cancelled by closing modal.');
        });

        window.addEventListener('click', function(event) {
            if (event.target == confirmationModal) {
                confirmationModal.style.display = 'none';
                console.log('Application submission cancelled by clicking outside modal.');
            }
        });
    }

    // New: Event listener for the form's close button
    if (formCloseButton) {
        formCloseButton.addEventListener('click', function() {
            showDefaultSections();
        });
    }

    // Helper function for toggling form visibility (used when button is "Apply Now" or "Hide Form")
    function toggleFormVisibility() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
            // Ensure form fields are enabled when displaying for editing
            form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                    element.disabled = false;
                }
            });
            if (formCloseButton) {
                formCloseButton.classList.remove('hidden');
            }
        } else {
            showDefaultSections();
        }
    }

    // Helper function for viewing submitted form (used when button is "View Form")
    function viewSubmittedForm() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
            // Disable form fields when viewing
            form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) {
                formCloseButton.classList.add('hidden'); // Hide close button in view mode
            }
        } else {
            showDefaultSections();
            applyNowBtn.textContent = 'View Form'; // Stays "View Form" when hidden after submission
        }
    }

    // Initial setup on page load
    initializeAdoptNowPage();

    // --- Existing script.js functionality below (retained) ---
    const spouseYesRadio = document.getElementById('spouseYes');
    const spouseNoRadio = document.getElementById('spouseNo');
    const spouseInformationSection = document.getElementById('spouseInformationSection');

    const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
    const otherAdultsNoRadio = document.getElementById('otherAdultsNo');
    const adultInformationSection = document.getElementById('adultInformationSection');
    const additionalAdultsContainer = document.getElementById('additionalAdultsContainer');
    const addAdultButton = document.getElementById('addAdultButton');
    const adultButtonContainer = adultInformationSection.querySelector('.button-container');
    let removeAdultButton = null;

    const ownedDogYesRadio = document.getElementById('ownedDogYes');
    const ownedDogNoRadio = document.getElementById('ownedDogNo');
    const petInformationSection = document.getElementById('petInformationSection');
    const additionalPetsContainer = document.getElementById('additionalPetsContainer');
    const addPetButton = document.getElementById('addPetButton');
    const petButtonContainer = petInformationSection.querySelector('.button-container');
    let removePetButton = null;


    function toggleSection(sectionElement, isVisible, manageDynamicFields = false) {
        if (isVisible) {
            sectionElement.classList.remove('hidden');
            sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
                // Only make fields required if the form is NOT in "view submitted" mode
                if (!getFormSubmittedStatus()) { 
                    if (sectionElement.id === 'spouseInformationSection' && input.id === 'spouseName') {
                        input.required = true;
                    } else if (sectionElement.id === 'adultInformationSection' && input.closest('.adult-info-entry')) {
                        if (!input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
                            if (input.type !== 'radio' || (input.type === 'radio' && input.id.includes('adultAllergicYes'))) {
                                 input.required = true;
                            }
                        }
                    } else if (sectionElement.id === 'petInformationSection' && input.closest('.pet-info-entry')) {
                        if (input.required !== false) {
                            input.required = true;
                        }
                    }
                }
            });
            if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
                adultButtonContainer.style.display = 'flex';
                updateAdultButtonsVisibility();
            } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
                petButtonContainer.style.display = 'flex';
                updatePetButtonsVisibility();
            }
        } else {
            sectionElement.classList.add('hidden');
            sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
                input.required = false;
                input.value = '';
                if (input.type === 'radio' || input.type === 'checkbox') {
                    input.checked = false;
                }
            });
            if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
                additionalAdultsContainer.innerHTML = '';
                adultCount = 0;
                if (removeAdultButton) {
                    removeAdultButton.remove();
                    removeAdultButton = null;
                }
                adultButtonContainer.style.display = 'none';
            } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
                additionalPetsContainer.innerHTML = '';
                petCount = 0;
                if (removePetButton) {
                    removePetButton.remove();
                    removePetButton = null;
                }
                petButtonContainer.style.display = 'none';
            }
        }
    }

    // Spouse Information Section
    spouseYesRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, this.checked);
    });
    spouseNoRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, !this.checked);
    });
    toggleSection(spouseInformationSection, spouseYesRadio.checked);

    // Other Adults Information Section
    otherAdultsYesRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, this.checked, true);
    });
    otherAdultsNoRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, !this.checked, true);
    });
    toggleSection(adultInformationSection, otherAdultsYesRadio.checked, true);

    let adultCount = 0;

    function addAdultEntry() {
        const adultInfoEntry = document.createElement('div');
        adultInfoEntry.classList.add('adult-info-entry-dynamic');
        adultInfoEntry.innerHTML = `
            <div class="form-group full-width">
                <label for="adultName_${adultCount + 1}">Adult's name<span class="required">*</span></label>
                <input type="text" id="adultName_${adultCount + 1}" class="adult-name" placeholder="First Name MI. Last Name" required>
            </div>
            <div class="form-group full-width">
                <label for="adultRelationship_${adultCount + 1}">Relationship to applicant<span class="required">*</span></label>
                <input type="text" id="adultRelationship_${adultCount + 1}" class="adult-relationship" placeholder="e.g., Parent, Sibling, Friend" required>
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="adultEmployerName_${adultCount + 1}">Employer's name</label>
                    <input type="text" id="adultEmployerName_${adultCount + 1}" class="adult-employer-name" placeholder="First Name MI. Last Name">
                </div>
                <div class="form-group half-width">
                    <label for="adultWorkContactNumber_${adultCount + 1}">Work Contact Number</label>
                    <input type="text" id="adultWorkContactNumber_${adultCount + 1}" class="adult-work-contact-number" placeholder="Telephone/Cellular Phone Number">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group large-width">
                    <label for="adultCompanyAddress_${adultCount + 1}">Company Address</label>
                    <input type="text" id="adultCompanyAddress_${adultCount + 1}" class="adult-company-address" placeholder="Street, Barangay/Subdivision, City/Municipality, Province">
                </div>
                <div class="form-group small-width">
                    <label for="adultWorkingHours_${adultCount + 1}">Working Hours</label>
                    <input type="text" id="adultWorkingHours_${adultCount + 1}" class="adult-working-hours" placeholder="Number of working hours">
                </div>
            </div>
            <div class="form-group">
                <label>Is this person allergic to animals?<span class="required">*</span></label>
                <div class="radio-group">
                    <input type="radio" id="adultAllergicYes_${adultCount + 1}" name="adultAllergic_${adultCount + 1}" value="Yes" required>
                    <label for="adultAllergicYes_${adultCount + 1}">Yes</label>
                    <input type="radio" id="adultAllergicNo_${adultCount + 1}" name="adultAllergic_${adultCount + 1}" value="No">
                    <label for="adultAllergicNo_${adultCount + 1}">No</label>
                </div>
            </div>
            <hr>
        `;
        additionalAdultsContainer.appendChild(adultInfoEntry);
        adultCount++;
        updateAdultButtonsVisibility();
    }

    function updateAdultButtonsVisibility() {
        if (adultCount > 0) {
            if (!removeAdultButton) {
                removeAdultButton = document.createElement('button');
                removeAdultButton.type = 'button';
                removeAdultButton.classList.add('modal-button', 'cancel-button', 'remove-button');
                removeAdultButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
                adultButtonContainer.appendChild(removeAdultButton);
                removeAdultButton.addEventListener('click', removeLastAdultEntry);
            }
        } else {
            if (removeAdultButton) {
                removeAdultButton.remove();
                removeAdultButton = null;
            }
        }
    }

    function removeLastAdultEntry() {
        const dynamicAdults = additionalAdultsContainer.querySelectorAll('.adult-info-entry-dynamic');
        if (dynamicAdults.length > 0) {
            dynamicAdults[dynamicAdults.length - 1].remove();
            adultCount--;
            updateAdultButtonsVisibility();
        }
    }

    addAdultButton.addEventListener('click', addAdultEntry);

    let petCount = 0;

    function addPetEntry() {
        const petInfoEntry = document.createElement('div');
        petInfoEntry.classList.add('pet-info-entry-dynamic');
        petInfoEntry.innerHTML = `
            <div class="form-group full-width">
                <label for="petBreed_${petCount + 1}">Breed<span class="required">*</span></label>
                <input type="text" id="petBreed_${petCount + 1}" class="pet-breed" placeholder="e.g., Golden Retriever" required>
            </div>
            <div class="form-group full-width">
                <label for="petAge_${petCount + 1}">Age<span class="required">*</span></label>
                <input type="text" id="petAge_${petCount + 1}" class="pet-age" placeholder="e.g., 3 years" required>
            </div>
            <div class="form-group full-width">
                <label for="petSex_${petCount + 1}">Sex<span class="required">*</span></label>
                <input type="text" id="petSex_${petCount + 1}" class="pet-sex" placeholder="Male/Female" required>
            </div>
            <div class="form-group full-width">
                <label for="petSpayedNeutered_${petCount + 1}">Spayed/Neutered?<span class="required">*</span></label>
                <input type="text" id="petSpayedNeutered_${petCount + 1}" class="pet-spayed-neutered" placeholder="Yes/No" required>
            </div>
            <hr>
        `;
        additionalPetsContainer.appendChild(petInfoEntry);
        petCount++;
        updatePetButtonsVisibility();
    }

    function updatePetButtonsVisibility() {
        if (petCount > 0) {
            if (!removePetButton) {
                removePetButton = document.createElement('button');
                removePetButton.type = 'button';
                removePetButton.classList.add('modal-button', 'cancel-button', 'remove-button');
                removePetButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
                petButtonContainer.appendChild(removePetButton);
                removePetButton.addEventListener('click', removeLastPetEntry);
            }
        } else {
            if (removePetButton) {
                removePetButton.remove();
                removePetButton = null;
            }
        }
    }

    ownedDogYesRadio.addEventListener('change', function() {
        toggleSection(petInformationSection, this.checked, true);
    });
    ownedDogNoRadio.addEventListener('change', function() {
        toggleSection(petInformationSection, !this.checked, true);
    });
    addPetButton.addEventListener('click', addPetEntry);

    toggleSection(petInformationSection, ownedDogYesRadio.checked, true);

    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            const icon = heart.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });
    });
});