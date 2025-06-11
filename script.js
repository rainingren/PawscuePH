document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmSubmissionButton = document.getElementById('confirmSubmission');
    const cancelSubmissionButton = document.getElementById('cancelSubmission');
    const closeButton = document.querySelector('.close-button');

    let isFormSubmitting = false;

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
                form.submit();
            }
        });

        cancelSubmissionButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            console.log('Application submission cancelled by user.');
        });

        closeButton.addEventListener('click', function() {
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
            if (input.type === 'radio' && originalId.startsWith('adultAllergic')) {
                const newId = originalId.replace(/_\d+$/, '') + '_' + index; 
                input.id = newId;
                input.name = input.name.replace(/_\d+$/, '') + '_' + index; 
            } else {
                const newId = originalId.replace(/_\d+$/, '') + '_' + index;
                input.id = newId;
                if (input.name) {
                    input.name = input.name.replace(/_\d+$/, '') + '_' + index;
                }
            }
        });
        element.querySelectorAll('[for]').forEach(label => {
            const originalFor = label.getAttribute('for');
            const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
            label.setAttribute('for', newFor);
        });
        element.querySelectorAll('input').forEach(input => {
            input.value = ''; 
            if (input.type === 'radio') {
                input.checked = false;
                if (input.id.includes('adultAllergicYes')) {
                    input.required = true;
                } else if (input.id.includes('adultAllergicNo')) {
                    input.required = false; 
                }
            } else {
                if (!input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
                    input.required = true;
                }
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
            if (input.type === 'radio' && originalId.startsWith('spay') || originalId.startsWith('neuter') || originalId.startsWith('neither') || originalId.startsWith('vaccinated')) {
                const newId = originalId.replace(/_\d+$/, '') + '_' + index;
                input.id = newId;
                input.name = input.name.replace(/_\d+$/, '') + '_' + index;
            } else {
                const newId = originalId.replace(/_\d+$/, '') + '_' + index;
                input.id = newId;
                if (input.name) {
                    input.name = input.name.replace(/_\d+$/, '') + '_' + index;
                }
            }
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

    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            const icon = heart.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });
    });
});