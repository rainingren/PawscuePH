document.addEventListener('DOMContentLoaded', function() {
    const spouseYesRadio = document.getElementById('spouseYes');
    const spouseNoRadio = document.getElementById('spouseNo');
    const spouseInformationSection = document.getElementById('spouseInformationSection');

    const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
    const otherAdultsNoRadio = document.getElementById('otherAdultsNo');
    const adultInformationSection = document.getElementById('adultInformationSection');

    const ownedDogYesRadio = document.getElementById('ownedDogYes');
    const ownedDogNoRadio = document.getElementById('ownedDogNo');
    const petInformationSection = document.getElementById('petInformationSection');

    // Function to toggle section visibility
    function toggleSection(sectionElement, isVisible) {
        if (isVisible) {
            sectionElement.classList.remove('hidden');
            // Make inputs inside visible section required/not required
            sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
                if (input.id !== 'spouseEmployerName' && input.id !== 'spouseWorkContactNumber' && input.id !== 'spouseCompanyAddress' && input.id !== 'spouseWorkingHours') { // Exclude optional fields
                     input.required = true;
                }
            });
        } else {
            sectionElement.classList.add('hidden');
            // Remove required attribute when hidden
            sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
                input.required = false;
            });
        }
    }

    // Event listener for "Do you have a spouse?"
    spouseYesRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, this.checked);
    });
    spouseNoRadio.addEventListener('change', function() {
        toggleSection(spouseInformationSection, !this.checked);
    });

    // Event listener for "Are there any other adults living in the household?"
    otherAdultsYesRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, this.checked);
    });
    otherAdultsNoRadio.addEventListener('change', function() {
        toggleSection(adultInformationSection, !this.checked);
    });

    // Event listener for "Do you own or have you owned other dog?"
    ownedDogYesRadio.addEventListener('change', function() {
        toggleSection(petInformationSection, this.checked);
    });
    ownedDogNoRadio.addEventListener('change', function() {
        toggleSection(petInformationSection, !this.checked);
    });

    // Initial state setup (sections are hidden by default in HTML and CSS)
    // You might want to pre-check "No" if that's the desired default, or ensure fields are initially non-required if hidden.
    // For this example, they start hidden and required status is handled by toggleSection.
});