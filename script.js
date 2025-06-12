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

        confirmSubmissionButton.addEventListener('click', function() {
            if (!isFormSubmitting) {
                isFormSubmitting = true;
                confirmationModal.style.display = 'none';
                console.log('Application submitted successfully!');
                setFormSubmittedStatus(true);
                applyNowBtn.textContent = 'View Form';

                form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
                    if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
                        element.disabled = true;
                    }
                });
                if (formCloseButton) {
                    formCloseButton.classList.add('hidden');
                }
                isFormSubmitting = false;
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

    addAdultButton.addEventListener('click', addAdultEntry);

    let petCount = 0;

    function addPetEntry() {
        const petInfoEntry = document.createElement('div');
        petInfoEntry.classList.add('pet-info-entry-dynamic');
        petInfoEntry.innerHTML = `
            <div class="form-row">
            <div class="form-group third-width">
              <label for="petBreed_${petCount + 1}">Breed<span class="required">*</span></label>
              <input type="text" id="petBreed_${petCount + 1}" class="pet-breed" required>
            </div>
            <div class="form-group third-width">
              <label for="petAge_${petCount + 1}">Age<span class="required">*</span></label>
              <input type="number" id="petAge_${petCount + 1}" class="pet-age" min="0" required>
            </div>
            <div class="form-group third-width">
              <label>Spay/Neuter?<span class="required">*</span></label>
              <div class="radio-group">
                <input type="radio" id="spay_${petCount + 1}" name="spayNeuter_${petCount + 1}" value="Spay" required>
                <label for="spay_${petCount + 1}">Spay</label>
                <input type="radio" id="neuter_${petCount + 1}" name="spayNeuter_${petCount + 1}" value="Neuter">
                <label for="neuter_${petCount + 1}">Neuter</label>
                <input type="radio" id="neither_${petCount + 1}" name="spayNeuter_${petCount + 1}" value="Neither">
                <label for="neither_${petCount + 1}">No</label>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label for="yearsOwned_${petCount + 1}">Years owned<span class="required">*</span></label>
              <input type="number" id="yearsOwned_${petCount + 1}" class="pet-years-owned" min="0" required>
            </div>
            <div class="form-group half-width">
              <label for="stillHavePet_${petCount + 1}">Do you still have this pet? If not, where is it?<span class="required">*</span></label>
              <input type="text" id="stillHavePet_${petCount + 1}" class="pet-still-have" required>
            </div>
          </div>

          <div class="form-group">
            <label>Is it Vaccinated?<span class="required">*</span></label>
            <div class="radio-group">
              <input type="radio" id="vaccinatedYes_${petCount + 1}" name="vaccinated_${petCount + 1}" value="Yes" required>
              <label for="vaccinatedYes_${petCount + 1}">Yes</label>
              <input type="radio" id="vaccinatedNo_${petCount + 1}" name="vaccinated_${petCount + 1}" value="No">
              <label for="vaccinatedNo_${petCount + 1}">No</label>
            </div>
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