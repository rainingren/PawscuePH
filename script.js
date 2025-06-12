document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('adoptionForm'); 
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmSubmissionButton = document.getElementById('confirmSubmission');
    const cancelSubmissionButton = document.getElementById('cancelSubmission');
    const closeModalButton = confirmationModal.querySelector('.close-button');
    const formCloseButton = document.querySelector('.form-close-button');
    const applyNowBtn = document.getElementById('applyNowBtn');
    const heroSection = document.getElementById('heroSection');
    const howToApplySection = document.getElementById('howToApplySection');
    const applicationFormContainer = document.getElementById('applicationFormContainer');

    const signInLink = document.getElementById('signInLink');
    const logInLink = document.getElementById('logInLink');
    const logoutContainer = document.getElementById('logoutContainer');
    const logoutBtn = document.getElementById('logoutBtn');


    let isFormSubmitting = false;

    function checkLoginStatus() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function setLoginStatus(status) {
        localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
        updateNavigationVisibility(); 
    }

    function setFormSubmittedStatus(status) {
        localStorage.setItem('applicationSubmitted', status ? 'true' : 'false');
    }

    function getFormSubmittedStatus() {
        return localStorage.getItem('applicationSubmitted') === 'true';
    }

    function showDefaultSections() {
        heroSection.classList.remove('hidden');
        howToApplySection.classList.remove('hidden');
        applicationFormContainer.classList.add('hidden');
        applyNowBtn.textContent = 'Apply Now';
    }

    function initializeAdoptNowPage() {
        if (getFormSubmittedStatus()) {
            applyNowBtn.textContent = 'View Form';
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) {
                formCloseButton.classList.add('hidden');
            }
        } else {
            applicationFormContainer.classList.add('hidden');
            if (formCloseButton) {
                formCloseButton.classList.remove('hidden');
            }
        }
        updateNavigationVisibility(); 
    }

    function updateNavigationVisibility() {
        if (checkLoginStatus()) {
            if (signInLink) signInLink.classList.add('hidden');
            if (logInLink) logInLink.classList.add('hidden');
            if (logoutContainer) logoutContainer.classList.remove('hidden');
        } else {
            if (signInLink) signInLink.classList.remove('hidden');
            if (logInLink) logInLink.classList.remove('hidden');
            if (logoutContainer) logoutContainer.classList.add('hidden');
        }
    }


    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function(event) {
            event.preventDefault();

            if (!checkLoginStatus()) {
                localStorage.setItem('redirectAfterLogin', 'AdoptNow.html');
                window.location.href = 'SignIn.html';
            } else {
                if (getFormSubmittedStatus()) {
                    viewSubmittedForm();
                } else {
                    toggleFormVisibility();
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            setLoginStatus(false); 
            localStorage.removeItem('applicationSubmitted'); 
            console.log('User logged out.');
            window.location.href = 'HomePage.html'; 
        });
    }

    if (form && confirmationModal) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            if (form.checkValidity()) {
                confirmationModal.style.display = 'flex';
            } else {
                form.reportValidity();
            }
        });

        confirmSubmissionButton.addEventListener('click', async () => { // Add 'async' if sendAdopter is asynchronous
            // 1. Collect form data using logic previously in name.js
            const adopterData = collectAdopterFormData(); // Assuming collectAdopterFormData() is now accessible

            // 2. Send the data
            try {
                await sendAdopter(adopterData); // Assuming sendAdopter is now accessible and returns a Promise
                alert('Application submitted successfully!');
                setFormSubmittedStatus(true);
                confirmationModal.style.display = 'none';
                loadViewMode(); // This will show the viewFormContainer
                // Ensure other sections are hidden after submission
                applicationFormContainer.style.display = 'none';
                heroSection.style.display = 'none';
                howToApplySection.style.display = 'none';
                // These two lines are redundant if loadViewMode handles it, but harmless
                viewFormContainer.style.display = 'block';
                editViewButtons.style.display = 'block';
                applyNowBtn.style.display = 'none';
            } catch (error) {
                console.error("Error submitting application:", error);
                alert("Failed to submit application. Please try again.");
                // Optionally, handle error display or keep the modal open
            }
        });

        // Make sure your script.js still has the initial form submit listener to show the modal:
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            confirmationModal.style.display = 'flex'; // Show modal
        });

        cancelSubmissionButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            console.log('Application submission cancelled by user.');
        });

        closeModalButton.addEventListener('click', function() {
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

    if (formCloseButton) {
        formCloseButton.addEventListener('click', function() {
            showDefaultSections();
        });
    }

    function toggleFormVisibility() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
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

    function viewSubmittedForm() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
            form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) {
                formCloseButton.classList.add('hidden');
            }
        } else {
            showDefaultSections();
            applyNowBtn.textContent = 'View Form';
        }
    }

    initializeAdoptNowPage(); 

    const spouseYesRadio = document.getElementById('spouseYes');
    const spouseNoRadio = document.getElementById('spouseNo');
    const spouseInformationSection = document.getElementById('spouseInformationSection');

    const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
    const otherAdultsNoRadio = document = document.getElementById('otherAdultsNo');
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
                if (sectionElement.id === 'spouseInformationSection' && input.id === 'spouseName') {
                    input.required = true;
                } else if (sectionElement.id === 'adultInformationSection' && input.closest('.adult-info-entry') && !input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
                    input.required = true;
                } else if (sectionElement.id === 'petInformationSection' && input.closest('.pet-info-entry')) {
                     if (input.required !== false) {
                        input.required = true;
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


    spouseYesRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, this.checked);
    });
    spouseNoRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, !this.checked);
    });
    toggleSection(spouseInformationSection, spouseYesRadio.checked);

    let adultCount = 0;

    function updateAdultFieldAttributes(element, index) {
        element.querySelectorAll('[id]').forEach(input => {
            const originalId = input.id;
            const newId = originalId.replace(/_\d+$/, '') + '_' + index;
            input.id = newId;
        });
        element.querySelectorAll('[for]').forEach(label => {
            const originalFor = label.getAttribute('for');
            const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
            label.setAttribute('for', newFor);
        });
        element.querySelectorAll('[name]').forEach(input => {
            const originalName = input.name;
            const newName = originalName.replace(/_\d+$/, '') + '_' + index;
            input.name = newName;
        });
        element.querySelectorAll('input').forEach(input => {
            input.value = '';
            if (!input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
                 input.required = true;
            }
        });
    }

    function addAdultEntry() {
        adultCount++;
        const templateAdultEntry = document.querySelector('.adult-info-entry').cloneNode(true);
        templateAdultEntry.classList.remove('adult-info-entry');
        templateAdultEntry.classList.add('adult-info-entry-dynamic');

        updateAdultFieldAttributes(templateAdultEntry, adultCount);
        additionalAdultsContainer.appendChild(templateAdultEntry);

        updateAdultButtonsVisibility(); 
    }

    function updateAdultButtonsVisibility() {
        if (adultCount > 0) {
            if (!removeAdultButton) {
                removeAdultButton = document.createElement('button');
                removeAdultButton.type = 'button';
                removeAdultButton.classList.add('remove-button');
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

    otherAdultsYesRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, this.checked, true);
    });
    otherAdultsNoRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, !this.checked, true);
    });
    addAdultButton.addEventListener('click', addAdultEntry);

    toggleSection(adultInformationSection, otherAdultsYesRadio.checked, true);

    let petCount = 0;

    function updatePetFieldAttributes(element, index) {
        element.querySelectorAll('[id]').forEach(input => {
            const originalId = input.id;
            const newId = originalId.replace(/_\d+$/, '') + '_' + index;
            input.id = newId;
        });
        element.querySelectorAll('[for]').forEach(label => {
            const originalFor = label.getAttribute('for');
            const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
            label.setAttribute('for', newFor);
        });
        element.querySelectorAll('[name]').forEach(input => {
            const originalName = input.name;
            const newName = originalName.replace(/_\d+$/, '') + '_' + index;
            input.name = newName;
        });
        element.querySelectorAll('input').forEach(input => {
            input.value = '';
            if (input.type === 'radio') {
                input.checked = false;
            }
             if (input.required !== false) {
                input.required = true;
             }
        });
    }

    function addPetEntry() {
        petCount++;
        const templatePetEntry = document.querySelector('.pet-info-entry').cloneNode(true);
        templatePetEntry.classList.remove('pet-info-entry');
        templatePetEntry.classList.add('pet-info-entry-dynamic');

        updatePetFieldAttributes(templatePetEntry, petCount);
        additionalPetsContainer.appendChild(templatePetEntry);

        updatePetButtonsVisibility();
    }

    function updatePetButtonsVisibility() {
        if (petCount > 0) {
            if (!removePetButton) { 
                removePetButton = document.createElement('button');
                removePetButton.type = 'button';
                removePetButton.classList.add('remove-button');
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

    function removeLastPetEntry() {
        const dynamicPets = additionalPetsContainer.querySelectorAll('.pet-info-entry-dynamic');
        if (dynamicPets.length > 0) {
            dynamicPets[dynamicPets.length - 1].remove(); 
            petCount--;
            updatePetButtonsVisibility(); 
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

    const viewFormContainer = document.getElementById('viewFormContainer');
    const editButton = document.getElementById('editButton');
    const updateButton = document.getElementById('updateButton');
    const deleteInfoButton = document.getElementById('deleteInfoButton');

    const updateConfirmationModal = document.getElementById('updateConfirmationModal');
    const deleteWarningModal = document.getElementById('deleteWarningModal');

    const confirmUpdateButton = document.getElementById('confirmUpdateButton');
    const cancelUpdateButton = document.getElementById('cancelUpdateButton');

    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    const closeModalButtons = document.querySelectorAll('.close-modal');

    function loadViewMode() {
        const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
        formInputs.forEach(input => {
            input.disabled = true;
        });

        updateButton.style.display = 'none';
        deleteInfoButton.style.display = 'none';
    }

    editButton.addEventListener('click', () => {
        const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
        formInputs.forEach(input => {
            input.disabled = false;
        });

        updateButton.style.display = 'block';
        deleteInfoButton.style.display = 'block';
    });

    updateButton.addEventListener('click', () => {
        updateConfirmationModal.style.display = 'flex';
    });

    confirmUpdateButton.addEventListener('click', () => {
        alert('Changes saved successfully.');
        updateConfirmationModal.style.display = 'none';
        loadViewMode();
    });

    cancelUpdateButton.addEventListener('click', () => {
        updateConfirmationModal.style.display = 'none';
    });

    deleteInfoButton.addEventListener('click', () => {
        deleteWarningModal.style.display = 'flex';
    });

    confirmDeleteButton.addEventListener('click', () => {
        alert('Information deleted successfully. Redirecting to application page.');
        deleteWarningModal.style.display = 'none';
        window.location.href = 'AdoptNow.html';
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteWarningModal.style.display = 'none';
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    loadViewMode();

    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            const icon = heart.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });
    });
});