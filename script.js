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

    const editSubmissionButton = document.getElementById('editSubmissionButton');
    const deleteSubmissionButton = document.getElementById('deleteSubmissionButton');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const submitApplicationButton = document.getElementById('submitApplicationButton'); 

    const deleteWarningModal = document.getElementById('deleteWarningModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    const updateConfirmationModal = document.getElementById('updateConfirmationModal'); 
    const confirmUpdateButton = document.getElementById('confirmUpdateButton');
    const cancelUpdateButton = document.getElementById('cancelUpdateButton');

    let isFormSubmitting = false;
    const applicationDataKey = 'lastApplicationData'; // Key for localStorage

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
        if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
        if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
        if (saveChangesButton) saveChangesButton.classList.add('hidden');
        if (submitApplicationButton) submitApplicationButton.classList.remove('hidden'); 
        form.reset(); 
        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.disabled = false; 
        });
    }

    function initializeAdoptNowPage() {
        if (getFormSubmittedStatus()) {
            applyNowBtn.textContent = 'View Form';
            heroSection.classList.remove('hidden'); 
            howToApplySection.classList.remove('hidden');
            applicationFormContainer.classList.add('hidden'); 
            if (formCloseButton) {
                formCloseButton.classList.add('hidden');
            }
        } else {
            applicationFormContainer.classList.add('hidden');
            heroSection.classList.remove('hidden'); 
            howToApplySection.classList.remove('hidden');
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

    function collectFormData() {
        const data = {};
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.id) { 
                if (element.type === 'radio') {
                    if (element.checked) {
                        data[element.name] = element.value;
                    }
                } else if (element.type === 'checkbox') {
                    data[element.id] = element.checked;
                } else {
                    data[element.id] = element.value;
                }
            }
        });
        return data;
    }

    function fillFormWithData(data) {
        if (!data) return;
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.id && data[element.id] !== undefined) {
                if (element.type === 'radio') {
                    if (data[element.name] !== undefined && element.value === data[element.name]) {
                        element.checked = true;
                    } else {
                        element.checked = false; 
                    }
                } else if (element.type === 'checkbox') {
                    element.checked = data[element.id];
                } else {
                    element.value = data[element.id];
                }
            }
        });
    }

    function saveApplicationData(data) {
        localStorage.setItem(applicationDataKey, JSON.stringify(data));
        console.log('Application data saved:', data);
    }

    function loadApplicationData() {
        const data = localStorage.getItem(applicationDataKey);
        return data ? JSON.parse(data) : null;
    }

    function toggleEditMode(enable) {
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' &&
                element.id !== 'applyNowBtn' && element.id !== 'editSubmissionButton' &&
                element.id !== 'deleteSubmissionButton' && element.id !== 'saveChangesButton' &&
                element.id !== 'submitApplicationButton') {
                element.disabled = !enable;
            }
        });

        if (enable) { // Entering edit mode
            if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
            if (saveChangesButton) saveChangesButton.classList.remove('hidden');
            if (formCloseButton) formCloseButton.classList.remove('hidden'); 
        } else {
            if (editSubmissionButton) editSubmissionButton.classList.remove('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.remove('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
            form.querySelectorAll('input, select, textarea').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' &&
                    element.id !== 'applyNowBtn' && element.id !== 'editSubmissionButton' &&
                    element.id !== 'deleteSubmissionButton' && element.id !== 'saveChangesButton' &&
                    element.id !== 'submitApplicationButton') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) formCloseButton.classList.add('hidden'); 
        }
    }

    function saveChangesToAppData() {
        const updatedData = collectFormData();
        saveApplicationData(updatedData);
        toggleEditMode(false); 
    }

    function viewSubmittedForm() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form'; 

            const savedData = loadApplicationData();
            fillFormWithData(savedData); 

            form.querySelectorAll('input, select, textarea').forEach(element => {
                element.disabled = true;
            });

            if (editSubmissionButton) editSubmissionButton.classList.remove('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.remove('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.add('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');

            if (formCloseButton) {
                formCloseButton.classList.add('hidden'); 
            }
        } else {
            showDefaultSections();
            applyNowBtn.textContent = 'View Form'; 
            if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.remove('hidden'); // Show submit button
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
        }
    }

    function toggleFormVisibility() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
            form.querySelectorAll('input, select, textarea').forEach(element => {
                element.disabled = false; 
            });
            if (formCloseButton) {
                formCloseButton.classList.remove('hidden');
            }
            if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.remove('hidden');
            form.reset(); 
        } else {
            showDefaultSections(); 
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
            localStorage.removeItem(applicationDataKey); 
            console.log('User logged out. Application data cleared.');
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

        confirmSubmissionButton.addEventListener('click', function() {
            if (!isFormSubmitting) {
                isFormSubmitting = true;
                confirmationModal.style.display = 'none';
                console.log('Application submitted successfully!');
                setFormSubmittedStatus(true);
                applyNowBtn.textContent = 'View Form';

                const submittedData = collectFormData(); 
                saveApplicationData(submittedData); 
                
                isFormSubmitting = false;
                window.location.href = 'AdoptNow.html'; 
            }
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

    if (editSubmissionButton) {
        editSubmissionButton.addEventListener('click', function() {
            toggleEditMode(true); 
        });
    }

    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', function() {
            if(updateConfirmationModal) {
                updateConfirmationModal.style.display = 'flex';
            }
        });
    }

    if (confirmUpdateButton) {
        confirmUpdateButton.addEventListener('click', function() {
            saveChangesToAppData();
            updateConfirmationModal.style.display = 'none';
        });
    }
    if (cancelUpdateButton) {
        cancelDeleteButton.addEventListener('click', () => {
            updateConfirmationModal.style.display = 'none';
        });
    }

    if (deleteSubmissionButton) {
        deleteSubmissionButton.addEventListener('click', function() {
            if (deleteWarningModal) deleteWarningModal.style.display = 'flex'; 
        });
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function() {
            localStorage.removeItem(applicationDataKey); 
            setFormSubmittedStatus(false); 
            console.log('Application data deleted successfully!');
            deleteWarningModal.style.display = 'none';
            form.reset(); 
            showDefaultSections(); 
            applyNowBtn.textContent = 'Apply Now'; 
        });
    }
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', () => {
            deleteWarningModal.style.display = 'none';
        });
    }

    initializeAdoptNowPage(); 

    const spouseYesRadio = document.getElementById('spouseYes');
    const spouseNoRadio = document.getElementById('spouseNo');
    const spouseInformationSection = document.getElementById('spouseInformationSection');

    const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
    const otherAdultsNoRadio = document.getElementById('otherAdultsNo');
    const adultInformationSection = document.getElementById('adultInformationSection');
    const additionalAdultsContainer = document.getElementById('additionalAdultsContainer');
    const addAdultButton = document.getElementById('addAdultButton');
    const adultButtonContainer = adultInformationSection ? adultInformationSection.querySelector('.button-container') : null;
    let adultCount = 0; 
    
    const ownedDogYesRadio = document.getElementById('ownedDogYes');
    const ownedDogNoRadio = document.getElementById('ownedDogNo');
    const petInformationSection = document.getElementById('petInformationSection');
    const additionalPetsContainer = document.getElementById('additionalPetsContainer');
    const addPetButton = document.getElementById('addPetButton');
    const petButtonContainer = petInformationSection ? petInformationSection.querySelector('.button-container') : null;
    let petCount = 0; 

    function toggleSection(sectionElement, isVisible, manageDynamicFields = false) {
        if (!sectionElement) return; // Add null check

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
            if (manageDynamicFields && sectionElement.id === 'adultInformationSection' && adultButtonContainer) {
                adultButtonContainer.style.display = 'flex';
                updateAdultButtonsVisibility();
            } else if (manageDynamicFields && sectionElement.id === 'petInformationSection' && petButtonContainer) {
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
                if (adultButtonContainer) adultButtonContainer.style.display = 'none';
            } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
                additionalPetsContainer.innerHTML = '';
                petCount = 0;
                if (petButtonContainer) petButtonContainer.style.display = 'none';
            }
        }
    }

    if (spouseYesRadio && spouseInformationSection) {
        spouseYesRadio.addEventListener('change', () => toggleSection(spouseInformationSection, true));
    }
    if (spouseNoRadio && spouseInformationSection) {
        spouseNoRadio.addEventListener('change', () => toggleSection(spouseInformationSection, false));
    }

    if (otherAdultsYesRadio && adultInformationSection) {
        otherAdultsYesRadio.addEventListener('change', () => toggleSection(adultInformationSection, true, true));
    }
    if (otherAdultsNoRadio && adultInformationSection) {
        otherAdultsNoRadio.addEventListener('change', () => toggleSection(adultInformationSection, false, true));
    }

    if (ownedDogYesRadio && petInformationSection) {
        ownedDogYesRadio.addEventListener('change', () => toggleSection(petInformationSection, true, true));
    }
    if (ownedDogNoRadio && petInformationSection) {
        ownedDogNoRadio.addEventListener('change', () => toggleSection(petInformationSection, false, true));
    }

    // Dynamic adult fields
    if (addAdultButton) {
        addAdultButton.addEventListener('click', () => {
            adultCount++;
            const newAdultEntry = document.createElement('div');
            newAdultEntry.classList.add('adult-info-entry');
            newAdultEntry.innerHTML = `
                <h3>Additional Adult ${adultCount}</h3>
                <div class="form-group full-width">
                    <label for="adultName${adultCount}">Adult Name<span class="required">*</span></label>
                    <input type="text" id="adultName${adultCount}" class="adult-name" placeholder="Last Name, First Name, MI" required>
                </div>
                <div class="form-group">
                    <label>Allergies?<span class="required">*</span></label>
                    <div class="radio-group">
                        <input type="radio" id="adultAllergyYes${adultCount}" name="adultAllergy${adultCount}" value="Yes" required>
                        <label for="adultAllergyYes${adultCount}">Yes</label>
                        <input type="radio" id="adultAllergyNo${adultCount}" name="adultAllergy${adultCount}" value="No">
                        <label for="adultAllergyNo${adultCount}">No</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group half-width">
                        <label for="adultEmployerName${adultCount}">Employer's name</label>
                        <input type="text" id="adultEmployerName${adultCount}" class="adult-employer-name" placeholder="First Name MI. Last Name">
                    </div>
                    <div class="form-group half-width">
                        <label for="adultWorkContactNumber${adultCount}">Work Contact Number</label>
                        <input type="text" id="adultWorkContactNumber${adultCount}" class="adult-work-contact-number" placeholder="Telephone/Cellular Phone Number">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group large-width">
                        <label for="adultCompanyAddress${adultCount}">Company Address</label>
                        <input type="text" id="adultCompanyAddress${adultCount}" class="adult-company-address" placeholder="Street, Barangay/Subdivision, City/Municipality, Province">
                    </div>
                    <div class="form-group small-width">
                        <label for="adultWorkingHours${adultCount}">Working Hours</label>
                        <input type="text" id="adultWorkingHours${adultCount}" class="adult-working-hours" placeholder="Number of working hours">
                    </div>
                </div>
            `;
            additionalAdultsContainer.appendChild(newAdultEntry);
            updateAdultButtonsVisibility();
        });
    }

    function updateAdultButtonsVisibility() {
        const currentAdultEntries = additionalAdultsContainer.querySelectorAll('.adult-info-entry').length;
        if (currentAdultEntries > 0 && !document.getElementById('removeAdultButton')) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.id = 'removeAdultButton';
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove Last Adult';
            if (adultButtonContainer) adultButtonContainer.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                const lastAdultEntry = additionalAdultsContainer.lastElementChild;
                if (lastAdultEntry) {
                    additionalAdultsContainer.removeChild(lastAdultEntry);
                    adultCount--;
                    updateAdultButtonsVisibility();
                }
            });
        } else if (currentAdultEntries === 0 && document.getElementById('removeAdultButton')) {
            const removeButton = document.getElementById('removeAdultButton');
            if (removeButton && removeButton.parentNode === adultButtonContainer) {
                adultButtonContainer.removeChild(removeButton);
            }
        }
    }

    // Dynamic pet fields
    if (addPetButton) {
        addPetButton.addEventListener('click', () => {
            petCount++;
            const newPetEntry = document.createElement('div');
            newPetEntry.classList.add('pet-info-entry');
            newPetEntry.innerHTML = `
                <h3>Additional Pet ${petCount}</h3>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label for="petName${petCount}">Pet Name<span class="required">*</span></label>
                        <input type="text" id="petName${petCount}" class="pet-name" placeholder="Pet's Name" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group half-width">
                        <label for="petBreed${petCount}">Breed</label>
                        <input type="text" id="petBreed${petCount}" class="pet-breed" placeholder="Breed">
                    </div>
                    <div class="form-group half-width">
                        <label for="petAge${petCount}">Age</label>
                        <input type="number" id="petAge${petCount}" class="pet-age" placeholder="Age in years">
                    </div>
                </div>
                <div class="form-group">
                    <label>Spayed/Neutered?<span class="required">*</span></label>
                    <div class="radio-group">
                        <input type="radio" id="petSpayedNeuteredYes${petCount}" name="petSpayedNeutered${petCount}" value="Yes" required>
                        <label for="petSpayedNeuteredYes${petCount}">Yes</label>
                        <input type="radio" id="petSpayedNeuteredNo${petCount}" name="petSpayedNeutered${petCount}" value="No">
                        <label for="petSpayedNeuteredNo${petCount}">No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Vaccination Up-to-date?<span class="required">*</span></label>
                    <div class="radio-group">
                        <input type="radio" id="petVaccinationYes${petCount}" name="petVaccination${petCount}" value="Yes" required>
                        <label for="petVaccinationYes${petCount}">Yes</label>
                        <input type="radio" id="petVaccinationNo${petCount}" name="petVaccination${petCount}" value="No">
                        <label for="petVaccinationNo${petCount}">No</label>
                    </div>
                </div>
            `;
            additionalPetsContainer.appendChild(newPetEntry);
            updatePetButtonsVisibility();
        });
    }

    function updatePetButtonsVisibility() {
        const currentPetEntries = additionalPetsContainer.querySelectorAll('.pet-info-entry').length;
        if (currentPetEntries > 0 && !document.getElementById('removePetButton')) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.id = 'removePetButton';
            removeButton.classList.add('remove-button');
            removeButton.textContent = 'Remove Last Pet';
            if (petButtonContainer) petButtonContainer.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                const lastPetEntry = additionalPetsContainer.lastElementChild;
                if (lastPetEntry) {
                    additionalPetsContainer.removeChild(lastPetEntry);
                    petCount--;
                    updatePetButtonsVisibility();
                }
            });
        } else if (currentPetEntries === 0 && document.getElementById('removePetButton')) {
            const removeButton = document.getElementById('removePetButton');
            if (removeButton && removeButton.parentNode === petButtonContainer) {
                petButtonContainer.removeChild(removeButton);
            }
        }
    }
    
    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            const icon = heart.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });
    });

    function setAdultWorkingFieldsEnabled(adultEntry, enabled) {
        const employer = adultEntry.querySelector('.adult-employer-name');
        const contact = adultEntry.querySelector('.adult-work-contact-number');
        const address = adultEntry.querySelector('.adult-company-address');
        if (employer) employer.disabled = !enabled;
        if (contact) contact.disabled = !enabled;
        if (address) address.disabled = !enabled;
    }

    function attachAdultWorkingListeners(adultEntry) {
        const yesRadio = adultEntry.querySelector('.adult-working[id^="adultWorkingYes"]');
        const noRadio = adultEntry.querySelector('.adult-working[id^="adultWorkingNo"]');
        if (yesRadio) {
            yesRadio.addEventListener('change', function() {
                setAdultWorkingFieldsEnabled(adultEntry, true);
            });
        }
        if (noRadio) {
            noRadio.addEventListener('change', function() {
                setAdultWorkingFieldsEnabled(adultEntry, false);
            });
        }
    }

    const mainAdultEntry = document.querySelector('.adult-info-entry');
    if (mainAdultEntry) {
        attachAdultWorkingListeners(mainAdultEntry);
    }

    if (addAdultButton) {
        addAdultButton.addEventListener('click', () => {
            setTimeout(() => {
                const newAdultEntry = additionalAdultsContainer.lastElementChild;
                if (newAdultEntry) {
                    attachAdultWorkingListeners(newAdultEntry);
                }
            }, 0);
        });
    }
});