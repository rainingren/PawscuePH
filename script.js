// document.addEventListener('DOMContentLoaded', function() {

//     const form = document.getElementById('adoptionForm'); 
//     const confirmationModal = document.getElementById('confirmationModal');
//     const confirmSubmissionButton = document.getElementById('confirmSubmission');
//     const cancelSubmissionButton = document.getElementById('cancelSubmission');
//     const closeModalButton = confirmationModal.querySelector('.close-button');
//     const formCloseButton = document.querySelector('.form-close-button');
//     const applyNowBtn = document.getElementById('applyNowBtn');
//     const heroSection = document.getElementById('heroSection');
//     const howToApplySection = document.getElementById('howToApplySection');
//     const applicationFormContainer = document.getElementById('applicationFormContainer');

//     const signInLink = document.getElementById('signInLink');
//     const logInLink = document.getElementById('logInLink');
//     const logoutContainer = document.getElementById('logoutContainer');
//     const logoutBtn = document.getElementById('logoutBtn');


//     let isFormSubmitting = false;

//     function checkLoginStatus() {
//         return localStorage.getItem('isLoggedIn') === 'true';
//     }

//     function setLoginStatus(status) {
//         localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
//         updateNavigationVisibility(); 
//     }

//     function setFormSubmittedStatus(status) {
//         localStorage.setItem('applicationSubmitted', status ? 'true' : 'false');
//     }

//     function getFormSubmittedStatus() {
//         return localStorage.getItem('applicationSubmitted') === 'true';
//     }

//     function showDefaultSections() {
//         heroSection.classList.remove('hidden');
//         howToApplySection.classList.remove('hidden');
//         applicationFormContainer.classList.add('hidden');
//         applyNowBtn.textContent = 'Apply Now';
//     }

//     function initializeAdoptNowPage() {
//         if (getFormSubmittedStatus()) {
//             applyNowBtn.textContent = 'View Form';
//             heroSection.classList.add('hidden');
//             howToApplySection.classList.add('hidden');
//             applicationFormContainer.classList.remove('hidden');
//             form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                 if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                     element.disabled = true;
//                 }
//             });
//             if (formCloseButton) {
//                 formCloseButton.classList.add('hidden');
//             }
//         } else {
//             applicationFormContainer.classList.add('hidden');
//             if (formCloseButton) {
//                 formCloseButton.classList.remove('hidden');
//             }
//         }
//         updateNavigationVisibility(); 
//     }

//     function updateNavigationVisibility() {
//         if (checkLoginStatus()) {
//             if (signInLink) signInLink.classList.add('hidden');
//             if (logInLink) logInLink.classList.add('hidden');
//             if (logoutContainer) logoutContainer.classList.remove('hidden');
//         } else {
//             if (signInLink) signInLink.classList.remove('hidden');
//             if (logInLink) logInLink.classList.remove('hidden');
//             if (logoutContainer) logoutContainer.classList.add('hidden');
//         }
//     }


//     if (applyNowBtn) {
//         applyNowBtn.addEventListener('click', function(event) {
//             event.preventDefault();

//             if (!checkLoginStatus()) {
//                 localStorage.setItem('redirectAfterLogin', 'AdoptNow.html');
//                 window.location.href = 'SignIn.html';
//             } else {
//                 if (getFormSubmittedStatus()) {
//                     viewSubmittedForm();
//                 } else {
//                     toggleFormVisibility();
//                 }
//             }
//         });
//     }

//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', function(event) {
//             event.preventDefault();
//             setLoginStatus(false); 
//             localStorage.removeItem('applicationSubmitted'); 
//             console.log('User logged out.');
//             window.location.href = 'HomePage.html'; 
//         });
//     }

//     if (form && confirmationModal) {
//         form.addEventListener('submit', function(event) {
//             event.preventDefault();

//             if (form.checkValidity()) {
//                 confirmationModal.style.display = 'flex';
//             } else {
//                 form.reportValidity();
//             }
//         });

//         confirmSubmissionButton.addEventListener('click', function() {
//             if (!isFormSubmitting) {
//                 isFormSubmitting = true;
//                 confirmationModal.style.display = 'none';
//                 console.log('Application submitted successfully!');
//                 setFormSubmittedStatus(true);
//                 applyNowBtn.textContent = 'View Form';

//                 form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                     if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                         element.disabled = true;
//                     }
//                 });
//                 if (formCloseButton) {
//                     formCloseButton.classList.add('hidden');
//                 }
//                 isFormSubmitting = false;
//                 window.location.href = 'AdoptNow.html'; // Redirect after submission
//             }
//         });

//         cancelSubmissionButton.addEventListener('click', function() {
//             confirmationModal.style.display = 'none';
//             console.log('Application submission cancelled by user.');
//         });

//         closeModalButton.addEventListener('click', function() {
//             confirmationModal.style.display = 'none';
//             console.log('Application submission cancelled by closing modal.');
//         });

//         window.addEventListener('click', function(event) {
//             if (event.target == confirmationModal) {
//                 confirmationModal.style.display = 'none';
//                 console.log('Application submission cancelled by clicking outside modal.');
//             }
//         });
//     }

//     if (formCloseButton) {
//         formCloseButton.addEventListener('click', function() {
//             showDefaultSections();
//         });
//     }

//     function toggleFormVisibility() {
//         if (applicationFormContainer.classList.contains('hidden')) {
//             heroSection.classList.add('hidden');
//             howToApplySection.classList.add('hidden');
//             applicationFormContainer.classList.remove('hidden');
//             applyNowBtn.textContent = 'Hide Form';
//             form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                 if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                     element.disabled = false;
//                 }
//             });
//             if (formCloseButton) {
//                 formCloseButton.classList.remove('hidden');
//             }
//         } else {
//             showDefaultSections();
//         }
//     }

//     function viewSubmittedForm() {
//         if (applicationFormContainer.classList.contains('hidden')) {
//             heroSection.classList.add('hidden');
//             howToApplySection.classList.add('hidden');
//             applicationFormContainer.classList.remove('hidden');
//             applyNowBtn.textContent = 'Hide Form';
//             form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                 if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                     element.disabled = true;
//                 }
//             });
//             if (formCloseButton) {
//                 formCloseButton.classList.add('hidden');
//             }
//         } else {
//             showDefaultSections();
//             applyNowBtn.textContent = 'View Form';
//         }
//     }

//     initializeAdoptNowPage(); 

//     const spouseYesRadio = document.getElementById('spouseYes');
//     const spouseNoRadio = document.getElementById('spouseNo');
//     const spouseInformationSection = document.getElementById('spouseInformationSection');

//     const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
//     const otherAdultsNoRadio = document = document.getElementById('otherAdultsNo');
//     const adultInformationSection = document.getElementById('adultInformationSection');
//     const additionalAdultsContainer = document.getElementById('additionalAdultsContainer');
//     const addAdultButton = document.getElementById('addAdultButton');
//     const adultButtonContainer = adultInformationSection.querySelector('.button-container'); 
//     let removeAdultButton = null; 

//     const ownedDogYesRadio = document.getElementById('ownedDogYes');
//     const ownedDogNoRadio = document.getElementById('ownedDogNo');
//     const petInformationSection = document.getElementById('petInformationSection');
//     const additionalPetsContainer = document.getElementById('additionalPetsContainer');
//     const addPetButton = document.getElementById('addPetButton');
//     const petButtonContainer = petInformationSection.querySelector('.button-container'); 
//     let removePetButton = null; 


//     function toggleSection(sectionElement, isVisible, manageDynamicFields = false) {
//         if (isVisible) {
//             sectionElement.classList.remove('hidden');
//             sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
//                 if (sectionElement.id === 'spouseInformationSection' && input.id === 'spouseName') {
//                     input.required = true;
//                 } else if (sectionElement.id === 'adultInformationSection' && input.closest('.adult-info-entry') && !input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
//                     input.required = true;
//                 } else if (sectionElement.id === 'petInformationSection' && input.closest('.pet-info-entry')) {
//                      if (input.required !== false) {
//                         input.required = true;
//                      }
//                 }
//             });

//             if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
//                 adultButtonContainer.style.display = 'flex'; 
//                 updateAdultButtonsVisibility();
//             } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
//                 petButtonContainer.style.display = 'flex'; 
//                 updatePetButtonsVisibility();
//             }

//         } else {
//             sectionElement.classList.add('hidden');
//             sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
//                 input.required = false;
//                 input.value = '';
//                 if (input.type === 'radio' || input.type === 'checkbox') {
//                     input.checked = false;
//                 }
//             });

//             if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
//                 additionalAdultsContainer.innerHTML = '';
//                 adultCount = 0;
//                 if (removeAdultButton) {
//                     removeAdultButton.remove();
//                     removeAdultButton = null;
//                 }
//                 adultButtonContainer.style.display = 'none'; 
//             } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
//                 additionalPetsContainer.innerHTML = '';
//                 petCount = 0;
//                 if (removePetButton) { 
//                     removePetButton.remove();
//                     removePetButton = null;
//                 }
//                 petButtonContainer.style.display = 'none';
//             }
//         }
//     }


//     spouseYesRadio.addEventListener('change', function() {
//         toggleSection(spouseInformationSection, this.checked);
//     });
//     spouseNoRadio.addEventListener('change', function() {
//         toggleSection(spouseInformationSection, !this.checked);
//     });
//     toggleSection(spouseInformationSection, spouseYesRadio.checked);

//     let adultCount = 0;

//     function updateAdultFieldAttributes(element, index) {
//         element.querySelectorAll('[id]').forEach(input => {
//             const originalId = input.id;
//             const newId = originalId.replace(/_\d+$/, '') + '_' + index;
//             input.id = newId;
//         });
//         element.querySelectorAll('[for]').forEach(label => {
//             const originalFor = label.getAttribute('for');
//             const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
//             label.setAttribute('for', newFor);
//         });
//         element.querySelectorAll('[name]').forEach(input => {
//             const originalName = input.name;
//             const newName = originalName.replace(/_\d+$/, '') + '_' + index;
//             input.name = newName;
//         });
//         element.querySelectorAll('input').forEach(input => {
//             input.value = '';
//             if (!input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
//                  input.required = true;
//             }
//         });
//     }

//     function addAdultEntry() {
//         adultCount++;
//         const templateAdultEntry = document.querySelector('.adult-info-entry').cloneNode(true);
//         templateAdultEntry.classList.remove('adult-info-entry');
//         templateAdultEntry.classList.add('adult-info-entry-dynamic');

//         updateAdultFieldAttributes(templateAdultEntry, adultCount);
//         additionalAdultsContainer.appendChild(templateAdultEntry);

//         updateAdultButtonsVisibility(); 
//     }

//     function updateAdultButtonsVisibility() {
//         if (adultCount > 0) {
//             if (!removeAdultButton) {
//                 removeAdultButton = document.createElement('button');
//                 removeAdultButton.type = 'button';
//                 removeAdultButton.classList.add('remove-button');
//                 removeAdultButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
//                 adultButtonContainer.appendChild(removeAdultButton); 
//                 removeAdultButton.addEventListener('click', removeLastAdultEntry);
//             }
//         } else {
//             if (removeAdultButton) { 
//                 removeAdultButton.remove();
//                 removeAdultButton = null;
//             }
//         }
//     }

//     function removeLastAdultEntry() {
//         const dynamicAdults = additionalAdultsContainer.querySelectorAll('.adult-info-entry-dynamic');
//         if (dynamicAdults.length > 0) {
//             dynamicAdults[dynamicAdults.length - 1].remove(); 
//             adultCount--;
//             updateAdultButtonsVisibility(); 
//         }
//     }

//     otherAdultsYesRadio.addEventListener('change', function() {
//         toggleSection(adultInformationSection, this.checked, true);
//     });
//     otherAdultsNoRadio.addEventListener('change', function() {
//         toggleSection(adultInformationSection, !this.checked, true);
//     });
//     addAdultButton.addEventListener('click', addAdultEntry);

//     toggleSection(adultInformationSection, otherAdultsYesRadio.checked, true);

//     let petCount = 0;

//     function updatePetFieldAttributes(element, index) {
//         element.querySelectorAll('[id]').forEach(input => {
//             const originalId = input.id;
//             const newId = originalId.replace(/_\d+$/, '') + '_' + index;
//             input.id = newId;
//         });
//         element.querySelectorAll('[for]').forEach(label => {
//             const originalFor = label.getAttribute('for');
//             const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
//             label.setAttribute('for', newFor);
//         });
//         element.querySelectorAll('[name]').forEach(input => {
//             const originalName = input.name;
//             const newName = originalName.replace(/_\d+$/, '') + '_' + index;
//             input.name = newName;
//         });
//         element.querySelectorAll('input').forEach(input => {
//             input.value = '';
//             if (input.type === 'radio') {
//                 input.checked = false;
//             }
//              if (input.required !== false) {
//                 input.required = true;
//              }
//         });
//     }

//     function addPetEntry() {
//         petCount++;
//         const templatePetEntry = document.querySelector('.pet-info-entry').cloneNode(true);
//         templatePetEntry.classList.remove('pet-info-entry');
//         templatePetEntry.classList.add('pet-info-entry-dynamic');

//         updatePetFieldAttributes(templatePetEntry, petCount);
//         additionalPetsContainer.appendChild(templatePetEntry);

//         updatePetButtonsVisibility();
//     }

//     function updatePetButtonsVisibility() {
//         if (petCount > 0) {
//             if (!removePetButton) { 
//                 removePetButton = document.createElement('button');
//                 removePetButton.type = 'button';
//                 removePetButton.classList.add('remove-button');
//                 removePetButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
//                 petButtonContainer.appendChild(removePetButton); 
//                 removePetButton.addEventListener('click', removeLastPetEntry);
//             }
//         } else {
//             if (removePetButton) { 
//                 removePetButton.remove();
//                 removePetButton = null;
//             }
//         }
//     }

//     function removeLastPetEntry() {
//         const dynamicPets = additionalPetsContainer.querySelectorAll('.pet-info-entry-dynamic');
//         if (dynamicPets.length > 0) {
//             dynamicPets[dynamicPets.length - 1].remove(); 
//             petCount--;
//             updatePetButtonsVisibility(); 
//         }
//     }


//     ownedDogYesRadio.addEventListener('change', function() {
//         toggleSection(petInformationSection, this.checked, true);
//     });
//     ownedDogNoRadio.addEventListener('change', function() {
//         toggleSection(petInformationSection, !this.checked, true);
//     });
//     addPetButton.addEventListener('click', addPetEntry);

//     toggleSection(petInformationSection, ownedDogYesRadio.checked, true);

//     const viewFormContainer = document.getElementById('viewFormContainer');
//     const editButton = document.getElementById('editButton');
//     const updateButton = document.getElementById('updateButton');
//     const deleteInfoButton = document.getElementById('deleteInfoButton');

//     const updateConfirmationModal = document.getElementById('updateConfirmationModal');
//     const deleteWarningModal = document.getElementById('deleteWarningModal');

//     const confirmUpdateButton = document.getElementById('confirmUpdateButton');
//     const cancelUpdateButton = document.getElementById('cancelUpdateButton');

//     const confirmDeleteButton = document.getElementById('confirmDeleteButton');
//     const cancelDeleteButton = document.getElementById('cancelDeleteButton');

//     const closeModalButtons = document.querySelectorAll('.close-modal');

//     function loadViewMode() {
//         const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
//         formInputs.forEach(input => {
//             input.disabled = true;
//         });

//         updateButton.style.display = 'none';
//         deleteInfoButton.style.display = 'none';
//     }

//     editButton.addEventListener('click', () => {
//         const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
//         formInputs.forEach(input => {
//             input.disabled = false;
//         });

//         updateButton.style.display = 'block';
//         deleteInfoButton.style.display = 'block';
//     });

//     updateButton.addEventListener('click', () => {
//         updateConfirmationModal.style.display = 'flex';
//     });

//     confirmUpdateButton.addEventListener('click', () => {
//         alert('Changes saved successfully.');
//         updateConfirmationModal.style.display = 'none';
//         loadViewMode();
//     });

//     cancelUpdateButton.addEventListener('click', () => {
//         updateConfirmationModal.style.display = 'none';
//     });

//     deleteInfoButton.addEventListener('click', () => {
//         deleteWarningModal.style.display = 'flex';
//     });

//     confirmDeleteButton.addEventListener('click', () => {
//         alert('Information deleted successfully. Redirecting to application page.');
//         deleteWarningModal.style.display = 'none';
//         window.location.href = 'AdoptNow.html';
//     });

//     cancelDeleteButton.addEventListener('click', () => {
//         deleteWarningModal.style.display = 'none';
//     });

//     closeModalButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             button.closest('.modal').style.display = 'none';
//         });
//     });

//     loadViewMode();

//     document.querySelectorAll('.heart').forEach(heart => {
//         heart.addEventListener('click', () => {
//             heart.classList.toggle('active');
//             const icon = heart.querySelector('i');
//             icon.classList.toggle('fa-regular');
//             icon.classList.toggle('fa-solid');
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {

//     const form = document.getElementById('adoptionForm');
//     const confirmationModal = document.getElementById('confirmationModal');
//     const confirmSubmissionButton = document.getElementById('confirmSubmission');
//     const cancelSubmissionButton = document.getElementById('cancelSubmission');
//     const formCloseButton = document.querySelector('.form-close-button');
//     const applyNowBtn = document.getElementById('applyNowBtn');
//     const heroSection = document.getElementById('heroSection');
//     const howToApplySection = document.getElementById('howToApplySection');
//     const applicationFormContainer = document.getElementById('applicationFormContainer');

//     const signInLink = document.getElementById('signInLink');
//     const logInLink = document.getElementById('logInLink');
//     const logoutContainer = document.getElementById('logoutContainer');
//     const logoutBtn = document.getElementById('logoutBtn');

//     const viewFormContainer = document.getElementById('viewFormContainer');
//     const editButton = document.getElementById('editButton');
//     const updateButton = document.getElementById('updateButton');
//     const deleteInfoButton = document.getElementById('deleteInfoButton');

//     const updateConfirmationModal = document.getElementById('updateConfirmationModal');
//     const deleteWarningModal = document.getElementById('deleteWarningModal');

//     const confirmUpdateButton = document.getElementById('confirmUpdateButton');
//     const cancelUpdateButton = document.getElementById('cancelUpdateButton');

//     const confirmDeleteButton = document.getElementById('confirmDeleteButton');
//     const cancelDeleteButton = document.getElementById('cancelDeleteButton');

//     // There might be multiple close buttons with the class 'close-button'
//     const closeModalButtons = document.querySelectorAll('.modal .close-button');


//     let isFormSubmitting = false; // Flag to prevent multiple submissions

//     // Function to initialize or retrieve app data from localStorage
//     function getAppData() {
//         const defaultData = {
//             users: [],
//             login_attempts: [],
//             application_submissions: []
//         };
//         try {
//             const data = localStorage.getItem('pawscueAppData');
//             return data ? JSON.parse(data) : defaultData;
//         } catch (e) {
//             console.error("Error parsing app data from localStorage:", e);
//             return defaultData;
//         }
//     }

//     // Function to save app data to localStorage
//     function saveAppData(data) {
//         try {
//             localStorage.setItem('pawscueAppData', JSON.stringify(data));
//         } catch (e) {
//             console.error("Error saving app data to localStorage:", e);
//         }
//     }

//     // Function to display messages (instead of alert)
//     function showMessage(message, isError = false) {
//         let messageBox = document.getElementById('mainMessageBox');
//         if (!messageBox) {
//             messageBox = document.createElement('div');
//             messageBox.id = 'mainMessageBox';
//             messageBox.style.cssText = `
//                 position: fixed;
//                 top: 100px; /* Below header */
//                 left: 50%;
//                 transform: translateX(-50%);
//                 padding: 15px 30px;
//                 border-radius: 8px;
//                 font-size: 16px;
//                 color: #fff;
//                 z-index: 101; /* Above modals */
//                 display: none;
//                 box-shadow: 0 4px 10px rgba(0,0,0,0.2);
//                 text-align: center;
//                 width: fit-content;
//                 min-width: 250px;
//             `;
//             document.body.appendChild(messageBox);
//         }

//         messageBox.textContent = message;
//         messageBox.style.backgroundColor = isError ? '#dc3545' : '#28a745';
//         messageBox.style.display = 'block';

//         setTimeout(() => {
//             messageBox.style.display = 'none';
//         }, 3000);
//     }

//     // Helper to get selected radio button value
//     function getRadioValue(name) {
//         const radio = document.querySelector(`input[name="${name}"]:checked`);
//         return radio ? radio.value : '';
//     }

//     // Helper to set radio button value
//     function setRadioValue(name, value) {
//         const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
//         if (radio) radio.checked = true;
//     }

//     // Helper to get checkbox value
//     function getCheckboxValue(id) {
//         const checkbox = document.getElementById(id);
//         return checkbox ? checkbox.checked : false;
//     }

//     // Helper to set checkbox value
//     function setCheckboxValue(id, value) {
//         const checkbox = document.getElementById(id);
//         if (checkbox) checkbox.checked = value;
//     }

//     // Function to collect form data into the JSON structure
//     function collectFormData() {
//         const loggedInUserId = localStorage.getItem('loggedInUserId');

//         const adopterData = {
//             submissionId: `app_${Date.now()}`, // Unique ID for this submission
//             userId: loggedInUserId, // Link to the logged-in user
//             timestamp: new Date().toISOString(),
//             adopter: {
//                 adopterId: `ADP-${Date.now().toString().slice(-4)}`, // Mock ID
//                 adopterName: document.getElementById("adopterName").value.trim(),
//                 contactNum: document.getElementById("contactNumber").value.trim(),
//                 emailAddress: document.getElementById("emailAddress").value.trim(),
//                 addressDetails: {
//                     adopterAddressId: `HOME-${Date.now().toString().slice(-4)}`, // Mock ID
//                     zipcode: document.getElementById("zipcode").value.trim(),
//                     homeAddress: document.getElementById("homeAddress").value.trim(),
//                     city: document.getElementById("city").value.trim(),
//                     state: document.getElementById("state").value.trim(),
//                     housingStatus: getRadioValue("doYou"),
//                     homePetPolicy: getRadioValue("landlordPets"),
//                     windowScreens: getRadioValue("hasScreens") === 'true',
//                     homeChildrenNum: parseInt(document.getElementById("numChildren").value, 10) || 0,
//                     petLivingArea: getRadioValue("petKept")
//                 },
//                 employmentStatus: getRadioValue("employmentStatus"),
//                 workingHrs: parseInt(document.getElementById("workingHours").value, 10) || 0,
//                 workContactNum: document.getElementById("workContactNumber").value.trim(),
//                 employerName: document.getElementById("employerName").value.trim(),
//                 workAddress: document.getElementById("companyAddress").value.trim(),
//                 petAloneHours: parseInt(document.getElementById("maxHoursAlone").value, 10) || 0,
//                 petCareTaker: getRadioValue("caretaker"),
//                 spouse: null // Default to null, fill if exists
//             },
//             adopterPets: [],
//             householdAdults: []
//         };

//         // Spouse Information
//         if (getRadioValue("hasSpouse") === 'Yes') {
//             adopterData.adopter.spouse = {
//                 spouseId: `SP-${Date.now().toString().slice(-4)}`, // Mock ID
//                 adopterId: adopterData.adopter.adopterId,
//                 spouseName: document.getElementById("spouseName").value.trim(),
//                 spouseEmployerName: document.getElementById("spouseEmployerName").value.trim(),
//                 spouseWorkContactNum: document.getElementById("spouseWorkContactNumber").value.trim(),
//                 spouseCompanyAddress: document.getElementById("spouseCompanyAddress").value.trim(),
//                 spouseWorkingHours: parseInt(document.getElementById("spouseWorkingHours").value, 10) || 0
//             };
//         }

//         // Household Adults (dynamic)
//         if (getRadioValue("otherAdults") === 'Yes') {
//             document.querySelectorAll('#adultInformationSection .adult-info-entry, #additionalAdultsContainer .adult-info-entry-dynamic').forEach((entry, index) => {
//                 adopterData.householdAdults.push({
//                     householdAdultId: `HHAD-${Date.now().toString().slice(-4)}-${index}`, // Mock ID
//                     adopterId: adopterData.adopter.adopterId,
//                     adultName: entry.querySelector('.adult-name').value.trim(),
//                     adultAllergy: entry.querySelector(`input[name="adultAllergic_${index}"]:checked`).value === 'true',
//                     adultWorkContactNum: entry.querySelector('.adult-work-contact-number').value.trim(),
//                     adultEmployerName: entry.querySelector('.adult-employer-name').value.trim(),
//                     adultCompanyAddress: entry.querySelector('.adult-company-address').value.trim(),
//                     adultWorkingHours: parseInt(entry.querySelector('.adult-working-hours').value, 10) || 0
//                 });
//             });
//         }

//         // Adopter Pets (dynamic)
//         if (getRadioValue("ownedDog") === 'Yes') {
//             document.querySelectorAll('#petInformationSection .pet-info-entry, #additionalPetsContainer .pet-info-entry-dynamic').forEach((entry, index) => {
//                 adopterData.adopterPets.push({
//                     petId: `PET-${Date.now().toString().slice(-4)}-${index}`, // Mock ID
//                     adopterId: adopterData.adopter.adopterId,
//                     petBreed: entry.querySelector('.pet-breed').value.trim(),
//                     petAge: parseInt(entry.querySelector('.pet-age').value, 10) || 0,
//                     petSpayNeuterStatus: entry.querySelector(`input[name="spayNeuter_${index}"]:checked`).value,
//                     petYearsOwned: parseInt(entry.querySelector('.pet-years-owned').value, 10) || 0,
//                     petCurrentStatus: entry.querySelector(`input[name="petStatus_${index}"]:checked`).value,
//                     petVaccination: entry.querySelector(`input[name="vaccinated_${index}"]:checked`).value === 'true'
//                 });
//             });
//         }
//         return adopterData;
//     }

//     // Function to populate form fields with submission data
//     function populateForm(submission) {
//         const { adopter, adopterPets, householdAdults } = submission;

//         // Adopter Information
//         document.getElementById("adopterName").value = adopter.adopterName;
//         document.getElementById("contactNumber").value = adopter.contactNum;
//         document.getElementById("emailAddress").value = adopter.emailAddress;
//         setRadioValue("employmentStatus", adopter.employmentStatus);
//         document.getElementById("employerName").value = adopter.employerName;
//         document.getElementById("workContactNumber").value = adopter.workContactNum;
//         document.getElementById("companyAddress").value = adopter.workAddress;
//         document.getElementById("workingHours").value = adopter.workingHrs;

//         // Spouse Information
//         if (adopter.spouse) {
//             setRadioValue("hasSpouse", "Yes");
//             toggleSection(spouseInformationSection, true);
//             document.getElementById("spouseName").value = adopter.spouse.spouseName;
//             document.getElementById("spouseEmployerName").value = adopter.spouse.spouseEmployerName;
//             document.getElementById("spouseWorkContactNumber").value = adopter.spouse.spouseWorkContactNum;
//             document.getElementById("spouseCompanyAddress").value = adopter.spouse.spouseCompanyAddress;
//             document.getElementById("spouseWorkingHours").value = adopter.spouse.spouseWorkingHours;
//         } else {
//             setRadioValue("hasSpouse", "No");
//             toggleSection(spouseInformationSection, false);
//         }

//         // House Information
//         document.getElementById("homeAddress").value = adopter.addressDetails.homeAddress;
//         document.getElementById("city").value = adopter.addressDetails.city;
//         document.getElementById("state").value = adopter.addressDetails.state;
//         document.getElementById("zipcode").value = adopter.addressDetails.zipcode;
//         setRadioValue("doYou", adopter.addressDetails.housingStatus);
//         setRadioValue("landlordPets", adopter.addressDetails.homePetPolicy);
//         setRadioValue("hasScreens", adopter.addressDetails.windowScreens ? 'true' : 'false');
//         document.getElementById("numChildren").value = adopter.addressDetails.homeChildrenNum;
//         setRadioValue("petKept", adopter.addressDetails.petLivingArea);
//         document.getElementById("maxHoursAlone").value = adopter.petAloneHours;
//         setRadioValue("caretaker", adopter.petCareTaker);

//         // Household Adults
//         if (householdAdults && householdAdults.length > 0) {
//             setRadioValue("otherAdults", "Yes");
//             toggleSection(adultInformationSection, true, true);
//             additionalAdultsContainer.innerHTML = ''; // Clear existing dynamic entries
//             householdAdults.forEach((adult, index) => {
//                 if (index === 0) { // First adult always corresponds to the initial fields
//                     document.getElementById(`adultName_0`).value = adult.adultName;
//                     document.getElementById(`adultEmployerName_0`).value = adult.adultEmployerName;
//                     document.getElementById(`adultWorkContactNumber_0`).value = adult.adultWorkContactNum;
//                     document.getElementById(`adultCompanyAddress_0`).value = adult.adultCompanyAddress;
//                     document.getElementById(`adultWorkingHours_0`).value = adult.adultWorkingHours;
//                     setRadioValue(`adultAllergic_0`, adult.adultAllergy ? 'true' : 'false');
//                 } else {
//                     addAdultEntry(); // Add new entry for subsequent adults
//                     const newEntry = additionalAdultsContainer.lastElementChild;
//                     newEntry.querySelector('.adult-name').value = adult.adultName;
//                     newEntry.querySelector('.adult-employer-name').value = adult.adultEmployerName;
//                     newEntry.querySelector('.adult-work-contact-number').value = adult.adultWorkContactNum;
//                     newEntry.querySelector('.adult-company-address').value = adult.adultCompanyAddress;
//                     newEntry.querySelector('.adult-working-hours').value = adult.adultWorkingHours;
//                     newEntry.querySelector(`input[name="adultAllergic_${index}"]`).checked = adult.adultAllergy;
//                 }
//             });
//         } else {
//             setRadioValue("otherAdults", "No");
//             toggleSection(adultInformationSection, false, true);
//         }

//         // Adopter Pets
//         if (adopterPets && adopterPets.length > 0) {
//             setRadioValue("ownedDog", "Yes");
//             toggleSection(petInformationSection, true, true);
//             additionalPetsContainer.innerHTML = ''; // Clear existing dynamic entries
//             adopterPets.forEach((pet, index) => {
//                 if (index === 0) { // First pet always corresponds to the initial fields
//                     document.getElementById(`petBreed_0`).value = pet.petBreed;
//                     document.getElementById(`petAge_0`).value = pet.petAge;
//                     setRadioValue(`spayNeuter_0`, pet.petSpayNeuterStatus);
//                     document.getElementById(`yearsOwned_0`).value = pet.petYearsOwned;
//                     setRadioValue(`petStatus_0`, pet.petCurrentStatus);
//                     setRadioValue(`vaccinated_0`, pet.petVaccination ? 'true' : 'false');
//                 } else {
//                     addPetEntry(); // Add new entry for subsequent pets
//                     const newEntry = additionalPetsContainer.lastElementChild;
//                     newEntry.querySelector('.pet-breed').value = pet.petBreed;
//                     newEntry.querySelector('.pet-age').value = pet.petAge;
//                     newEntry.querySelector(`input[name="spayNeuter_${index}"]`).checked = (pet.petSpayNeuterStatus === 'Spayed' || pet.petSpayNeuterStatus === 'Neutered' || pet.petSpayNeuterStatus === 'Neither');
//                     newEntry.querySelector('.pet-years-owned').value = pet.petYearsOwned;
//                     newEntry.querySelector(`input[name="petStatus_${index}"]`).checked = (pet.petCurrentStatus === 'Alive' || pet.petCurrentStatus === 'Deceased' || pet.petCurrentStatus === 'Rehomed');
//                     newEntry.querySelector(`input[name="vaccinated_${index}"]`).checked = pet.petVaccination;
//                 }
//             });
//         } else {
//             setRadioValue("ownedDog", "No");
//             toggleSection(petInformationSection, false, true);
//         }
//     }


//     function checkLoginStatus() {
//         return localStorage.getItem('isLoggedIn') === 'true';
//     }

//     function setFormSubmittedStatus(status) {
//         localStorage.setItem('applicationSubmitted', status ? 'true' : 'false');
//     }

//     function getFormSubmittedStatus() {
//         return localStorage.getItem('applicationSubmitted') === 'true';
//     }

//     // Get the current logged-in user's application submission
//     function getCurrentUserApplication() {
//         const loggedInUserId = localStorage.getItem('loggedInUserId');
//         const appData = getAppData();
//         return appData.application_submissions.find(submission => submission.userId === loggedInUserId);
//     }

//     function showDefaultSections() {
//         heroSection.classList.remove('hidden');
//         howToApplySection.classList.remove('hidden');
//         applicationFormContainer.classList.add('hidden');
//         viewFormContainer.classList.add('hidden'); 
//         applyNowBtn.textContent = 'Apply Now';
//         if (formCloseButton) {
//             formCloseButton.classList.remove('hidden');
//         }
//     }

//     function initializeAdoptNowPage() {
//         updateNavigationVisibility();
//         const currentUserApplication = getCurrentUserApplication();

//         if (currentUserApplication) {
//             applyNowBtn.textContent = 'View Form';
//             heroSection.classList.remove('hidden');
//             howToApplySection.classList.remove('hidden');
//             applicationFormContainer.classList.add('hidden'); 
//             viewFormContainer.classList.remove('hidden'); 
//             populateForm(currentUserApplication);
//             loadViewMode(); 
//             if (formCloseButton) {
//                 formCloseButton.classList.add('hidden');
//             }
//         } else {
//             applicationFormContainer.classList.add('hidden');
//             viewFormContainer.classList.add('hidden');
//             if (formCloseButton) {
//                 formCloseButton.classList.remove('hidden');
//             }
//             showDefaultSections(); 
//         }
//     }

//     function updateNavigationVisibility() {
//         if (checkLoginStatus()) {
//             if (signInLink) signInLink.classList.add('hidden');
//             if (logInLink) logInLink.classList.add('hidden');
//             if (logoutContainer) logoutContainer.classList.remove('hidden');
//         } else {
//             if (signInLink) signInLink.classList.remove('hidden');
//             if (logInLink) logInLink.classList.remove('hidden');
//             if (logoutContainer) logoutContainer.classList.add('hidden');
//         }
//     }

//     if (applyNowBtn) {
//         applyNowBtn.addEventListener('click', function(event) {
//             event.preventDefault();

//             if (!checkLoginStatus()) {
//                 localStorage.setItem('redirectAfterLogin', 'AdoptNow.html');
//                 window.location.href = 'SignIn.html';
//             } else {
//                 const currentUserApplication = getCurrentUserApplication();
//                 if (currentUserApplication) {
//                     toggleViewFormVisibility();
//                 } else {
//                     toggleApplicationFormVisibility();
//                 }
//             }
//         });
//     }

//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', function(event) {
//             event.preventDefault();
//             localStorage.removeItem('isLoggedIn');
//             localStorage.removeItem('loggedInUserId');
//             localStorage.removeItem('applicationSubmitted');
//             console.log('User logged out.');
//             window.location.href = 'HomePage.html';
//         });
//     }

//     if (form && confirmationModal) {
//         form.addEventListener('submit', function(event) {
//             event.preventDefault();

//             if (form.checkValidity()) {
//                 confirmationModal.style.display = 'flex';
//             } else {
//                 form.reportValidity();
//             }
//         });

//         confirmSubmissionButton.addEventListener('click', function() {
//             if (!isFormSubmitting) {
//                 isFormSubmitting = true;
//                 confirmationModal.style.display = 'none';

//                 const newApplication = collectFormData();
//                 const appData = getAppData();
//                 appData.application_submissions.push(newApplication);
//                 saveAppData(appData);

//                 showMessage('Application submitted successfully!', false);
//                 setFormSubmittedStatus(true);
//                 applyNowBtn.textContent = 'View Form';

//                 // Disable form fields after submission
//                 form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                     if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                         element.disabled = true;
//                     }
//                 });
//                 if (formCloseButton) {
//                     formCloseButton.classList.add('hidden');
//                 }
//                 isFormSubmitting = false;
//                 window.location.href = 'AdoptNow.html'; // Reload page to reflect changes
//             }
//         });

//         cancelSubmissionButton.addEventListener('click', function() {
//             confirmationModal.style.display = 'none';
//             console.log('Application submission cancelled by user.');
//         });

//         // Close modal button for confirmationModal
//         const confirmationModalCloseButton = confirmationModal.querySelector('.close-button');
//         if (confirmationModalCloseButton) {
//             confirmationModalCloseButton.addEventListener('click', function() {
//                 confirmationModal.style.display = 'none';
//             });
//         }


//         window.addEventListener('click', function(event) {
//             if (event.target == confirmationModal) {
//                 confirmationModal.style.display = 'none';
//                 console.log('Application submission cancelled by clicking outside modal.');
//             }
//         });
//     }

//     if (formCloseButton) {
//         formCloseButton.addEventListener('click', function() {
//             showDefaultSections();
//         });
//     }

//     function toggleApplicationFormVisibility() {
//         if (applicationFormContainer.classList.contains('hidden')) {
//             heroSection.classList.add('hidden');
//             howToApplySection.classList.add('hidden');
//             applicationFormContainer.classList.remove('hidden');
//             viewFormContainer.classList.add('hidden'); // Ensure view form is hidden
//             applyNowBtn.textContent = 'Hide Form';
//             form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(element => {
//                 if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' && element.id !== 'applyNowBtn') {
//                     element.disabled = false;
//                 }
//             });
//             if (formCloseButton) {
//                 formCloseButton.classList.remove('hidden');
//             }
//         } else {
//             showDefaultSections();
//         }
//     }

//     function toggleViewFormVisibility() {
//         if (viewFormContainer.classList.contains('hidden')) {
//             heroSection.classList.add('hidden');
//             howToApplySection.classList.add('hidden');
//             applicationFormContainer.classList.add('hidden'); // Ensure application form is hidden
//             viewFormContainer.classList.remove('hidden');
//             applyNowBtn.textContent = 'Hide Form';
//             loadViewMode(); // Ensure view mode is active
//             if (formCloseButton) {
//                 formCloseButton.classList.add('hidden');
//             }
//         } else {
//             showDefaultSections();
//         }
//     }

//     initializeAdoptNowPage();

//     const spouseYesRadio = document.getElementById('spouseYes');
//     const spouseNoRadio = document.getElementById('spouseNo');
//     const spouseInformationSection = document.getElementById('spouseInformationSection');

//     const otherAdultsYesRadio = document.getElementById('otherAdultsYes');
//     const otherAdultsNoRadio = document.getElementById('otherAdultsNo');
//     const adultInformationSection = document.getElementById('adultInformationSection');
//     const additionalAdultsContainer = document.getElementById('additionalAdultsContainer');
//     const addAdultButton = document.getElementById('addAdultButton');
//     const adultButtonContainer = adultInformationSection.querySelector('.button-container');
//     let removeAdultButton = null;

//     const ownedDogYesRadio = document.getElementById('ownedDogYes');
//     const ownedDogNoRadio = document.getElementById('ownedDogNo');
//     const petInformationSection = document.getElementById('petInformationSection');
//     const additionalPetsContainer = document.getElementById('additionalPetsContainer');
//     const addPetButton = document.getElementById('addPetButton');
//     const petButtonContainer = petInformationSection.querySelector('.button-container');
//     let removePetButton = null;


//     function toggleSection(sectionElement, isVisible, manageDynamicFields = false) {
//         if (isVisible) {
//             sectionElement.classList.remove('hidden');
//             sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
//                 if (sectionElement.id === 'spouseInformationSection' && input.id === 'spouseName') {
//                     input.required = true;
//                 } else if (sectionElement.id === 'adultInformationSection' && input.closest('.adult-info-entry') && !input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
//                     input.required = true;
//                 } else if (sectionElement.id === 'petInformationSection' && input.closest('.pet-info-entry')) {
//                      if (input.required !== false) {
//                         input.required = true;
//                      }
//                 }
//             });

//             if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
//                 adultButtonContainer.style.display = 'flex';
//                 updateAdultButtonsVisibility();
//             } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
//                 petButtonContainer.style.display = 'flex';
//                 updatePetButtonsVisibility();
//             }

//         } else {
//             sectionElement.classList.add('hidden');
//             sectionElement.querySelectorAll('input, select, textarea').forEach(input => {
//                 input.required = false;
//                 input.value = '';
//                 if (input.type === 'radio' || input.type === 'checkbox') {
//                     input.checked = false;
//                 }
//             });

//             if (manageDynamicFields && sectionElement.id === 'adultInformationSection') {
//                 additionalAdultsContainer.innerHTML = '';
//                 adultCount = 0;
//                 if (removeAdultButton) {
//                     removeAdultButton.remove();
//                     removeAdultButton = null;
//                 }
//                 adultButtonContainer.style.display = 'none';
//             } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
//                 additionalPetsContainer.innerHTML = '';
//                 petCount = 0;
//                 if (removePetButton) {
//                     removePetButton.remove();
//                     removePetButton = null;
//                 }
//                 petButtonContainer.style.display = 'none';
//             }
//         }
//     }


//     spouseYesRadio.addEventListener('change', function() {
//         toggleSection(spouseInformationSection, this.checked);
//     });
//     spouseNoRadio.addEventListener('change', function() {
//         toggleSection(spouseInformationSection, !this.checked);
//     });
//     // Ensure initial state is correctly set on page load
//     toggleSection(spouseInformationSection, spouseYesRadio.checked);

//     let adultCount = 0;

//     function updateAdultFieldAttributes(element, index) {
//         element.querySelectorAll('[id]').forEach(input => {
//             const originalId = input.id;
//             const newId = originalId.replace(/_\d+$/, '') + '_' + index;
//             input.id = newId;
//         });
//         element.querySelectorAll('[for]').forEach(label => {
//             const originalFor = label.getAttribute('for');
//             const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
//             label.setAttribute('for', newFor);
//         });
//         element.querySelectorAll('[name]').forEach(input => {
//             const originalName = input.name;
//             const newName = originalName.replace(/_\d+$/, '') + '_' + index;
//             input.name = newName;
//         });
//         element.querySelectorAll('input').forEach(input => {
//             input.value = '';
//             if (input.type === 'radio') {
//                 input.checked = false;
//             }
//             if (!input.classList.contains('adult-employer-name') && !input.classList.contains('adult-work-contact-number') && !input.classList.contains('adult-company-address') && !input.classList.contains('adult-working-hours')) {
//                  input.required = true;
//             }
//         });
//     }

//     function addAdultEntry() {
//         adultCount++;
//         const templateAdultEntry = document.querySelector('.adult-info-entry').cloneNode(true);
//         templateAdultEntry.classList.remove('adult-info-entry');
//         templateAdultEntry.classList.add('adult-info-entry-dynamic');

//         updateAdultFieldAttributes(templateAdultEntry, adultCount);
//         additionalAdultsContainer.appendChild(templateAdultEntry);

//         updateAdultButtonsVisibility();
//     }

//     function updateAdultButtonsVisibility() {
//         if (adultCount > 0) {
//             if (!removeAdultButton) {
//                 removeAdultButton = document.createElement('button');
//                 removeAdultButton.type = 'button';
//                 removeAdultButton.classList.add('remove-button');
//                 removeAdultButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
//                 adultButtonContainer.appendChild(removeAdultButton);
//                 removeAdultButton.addEventListener('click', removeLastAdultEntry);
//             }
//         } else {
//             if (removeAdultButton) {
//                 removeAdultButton.remove();
//                 removeAdultButton = null;
//             }
//         }
//     }

//     function removeLastAdultEntry() {
//         const dynamicAdults = additionalAdultsContainer.querySelectorAll('.adult-info-entry-dynamic');
//         if (dynamicAdults.length > 0) {
//             dynamicAdults[dynamicAdults.length - 1].remove();
//             adultCount--;
//             updateAdultButtonsVisibility();
//         }
//     }

//     otherAdultsYesRadio.addEventListener('change', function() {
//         toggleSection(adultInformationSection, this.checked, true);
//     });
//     otherAdultsNoRadio.addEventListener('change', function() {
//         toggleSection(adultInformationSection, !this.checked, true);
//     });
//     addAdultButton.addEventListener('click', addAdultEntry);

//     // Ensure initial state is correctly set on page load
//     toggleSection(adultInformationSection, otherAdultsYesRadio.checked, true);

//     let petCount = 0;

//     function updatePetFieldAttributes(element, index) {
//         element.querySelectorAll('[id]').forEach(input => {
//             const originalId = input.id;
//             const newId = originalId.replace(/_\d+$/, '') + '_' + index;
//             input.id = newId;
//         });
//         element.querySelectorAll('[for]').forEach(label => {
//             const originalFor = label.getAttribute('for');
//             const newFor = originalFor.replace(/_\d+$/, '') + '_' + index;
//             label.setAttribute('for', newFor);
//         });
//         element.querySelectorAll('[name]').forEach(input => {
//             const originalName = input.name;
//             const newName = originalName.replace(/_\d+$/, '') + '_' + index;
//             input.name = newName;
//         });
//         element.querySelectorAll('input').forEach(input => {
//             input.value = '';
//             if (input.type === 'radio') {
//                 input.checked = false;
//             }
//              if (input.required !== false) {
//                 input.required = true;
//              }
//         });
//     }

//     function addPetEntry() {
//         petCount++;
//         const templatePetEntry = document.querySelector('.pet-info-entry').cloneNode(true);
//         templatePetEntry.classList.remove('pet-info-entry');
//         templatePetEntry.classList.add('pet-info-entry-dynamic');

//         updatePetFieldAttributes(templatePetEntry, petCount);
//         additionalPetsContainer.appendChild(templatePetEntry);

//         updatePetButtonsVisibility();
//     }

//     function updatePetButtonsVisibility() {
//         if (petCount > 0) {
//             if (!removePetButton) {
//                 removePetButton = document.createElement('button');
//                 removePetButton.type = 'button';
//                 removePetButton.classList.add('remove-button');
//                 removePetButton.innerHTML = '<i class="bi bi-dash-circle"></i>';
//                 petButtonContainer.appendChild(removePetButton);
//                 removePetButton.addEventListener('click', removeLastPetEntry);
//             }
//         } else {
//             if (removePetButton) {
//                 removePetButton.remove();
//                 removePetButton = null;
//             }
//         }
//     }

//     function removeLastPetEntry() {
//         const dynamicPets = additionalPetsContainer.querySelectorAll('.pet-info-entry-dynamic');
//         if (dynamicPets.length > 0) {
//             dynamicPets[dynamicPets.length - 1].remove();
//             petCount--;
//             updatePetButtonsVisibility();
//         }
//     }

//     ownedDogYesRadio.addEventListener('change', function() {
//         toggleSection(petInformationSection, this.checked, true);
//     });
//     ownedDogNoRadio.addEventListener('change', function() {
//         toggleSection(petInformationSection, !this.checked, true);
//     });
//     addPetButton.addEventListener('click', addPetEntry);

//     // Ensure initial state is correctly set on page load
//     toggleSection(petInformationSection, ownedDogYesRadio.checked, true);


//     function loadViewMode() {
//         const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
//         formInputs.forEach(input => {
//             input.disabled = true;
//         });

//         updateButton.style.display = 'none';
//         deleteInfoButton.style.display = 'none';
//         editButton.style.display = 'block'; // Ensure edit button is visible
//     }

//     editButton.addEventListener('click', () => {
//         const formInputs = document.querySelectorAll('#viewFormContainer input, #viewFormContainer textarea, #viewFormContainer select');
//         formInputs.forEach(input => {
//             input.disabled = false;
//         });

//         updateButton.style.display = 'block';
//         deleteInfoButton.style.display = 'block';
//         editButton.style.display = 'none'; // Hide edit button when in edit mode
//     });

//     updateButton.addEventListener('click', () => {
//         updateConfirmationModal.style.display = 'flex';
//     });

//     confirmUpdateButton.addEventListener('click', () => {
//         const loggedInUserId = localStorage.getItem('loggedInUserId');
//         let appData = getAppData();
//         const existingIndex = appData.application_submissions.findIndex(sub => sub.userId === loggedInUserId);

//         if (existingIndex > -1) {
//             const updatedApplication = collectFormData(); // Re-collect data from the form
//             // Ensure submissionId and timestamp are preserved from the original
//             updatedApplication.submissionId = appData.application_submissions[existingIndex].submissionId;
//             updatedApplication.timestamp = new Date().toISOString(); // Update timestamp on modification

//             appData.application_submissions[existingIndex] = updatedApplication;
//             saveAppData(appData);
//             showMessage('Changes saved successfully.', false);
//             updateConfirmationModal.style.display = 'none';
//             populateForm(updatedApplication); // Re-populate form with updated data
//             loadViewMode();
//         } else {
//             showMessage('Error: Application not found for update.', true);
//             updateConfirmationModal.style.display = 'none';
//             loadViewMode();
//         }
//     });

//     cancelUpdateButton.addEventListener('click', () => {
//         updateConfirmationModal.style.display = 'none';
//     });

//     deleteInfoButton.addEventListener('click', () => {
//         deleteWarningModal.style.display = 'flex';
//     });

//     confirmDeleteButton.addEventListener('click', () => {
//         const loggedInUserId = localStorage.getItem('loggedInUserId');
//         let appData = getAppData();
//         const initialLength = appData.application_submissions.length;
//         appData.application_submissions = appData.application_submissions.filter(sub => sub.userId !== loggedInUserId);

//         if (appData.application_submissions.length < initialLength) {
//             saveAppData(appData);
//             localStorage.removeItem('applicationSubmitted'); // Clear submission status
//             showMessage('Information deleted successfully. Redirecting to application page.', false);
//             deleteWarningModal.style.display = 'none';
//             // Clear form fields (optional, if you want a clean state after deletion)
//             form.reset(); // Resets all form fields
//             window.location.href = 'AdoptNow.html'; // Redirect or refresh to default state
//         } else {
//             showMessage('Error: No application found to delete.', true);
//             deleteWarningModal.style.display = 'none';
//         }
//     });

//     cancelDeleteButton.addEventListener('click', () => {
//         deleteWarningModal.style.display = 'none';
//     });

//     closeModalButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             button.closest('.modal').style.display = 'none';
//         });
//     });

//     // Initial load of the page, ensuring correct form state and navigation visibility
//     initializeAdoptNowPage();

//     document.querySelectorAll('.heart').forEach(heart => {
//         heart.addEventListener('click', () => {
//             heart.classList.toggle('active');
//             const icon = heart.querySelector('i');
//             icon.classList.toggle('fa-regular');
//             icon.classList.toggle('fa-solid');
//         });
//     });
// });

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

    // New elements for edit/delete functionality
    const editSubmissionButton = document.getElementById('editSubmissionButton');
    const deleteSubmissionButton = document.getElementById('deleteSubmissionButton');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const submitApplicationButton = document.getElementById('submitApplicationButton'); // Assuming this is the main submit button's ID

    const deleteWarningModal = document.getElementById('deleteWarningModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

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
        // Ensure action buttons are hidden when form is not visible or in apply mode
        if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
        if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
        if (saveChangesButton) saveChangesButton.classList.add('hidden');
        if (submitApplicationButton) submitApplicationButton.classList.remove('hidden'); // Show original submit
        form.reset(); // Clear form fields when going back to default
        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.disabled = false; // Enable fields for new application
        });
    }

    function initializeAdoptNowPage() {
        if (getFormSubmittedStatus()) {
            applyNowBtn.textContent = 'View Form';
            heroSection.classList.remove('hidden'); // Keep hero/how-to-apply visible initially
            howToApplySection.classList.remove('hidden');
            applicationFormContainer.classList.add('hidden'); // Form remains hidden initially
            if (formCloseButton) {
                formCloseButton.classList.add('hidden');
            }
        } else {
            applicationFormContainer.classList.add('hidden');
            heroSection.classList.remove('hidden'); // Keep hero/how-to-apply visible initially
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

    // Function to collect all form data
    function collectFormData() {
        const data = {};
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.id) { // Only collect if element has an ID
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

    // Function to fill form with data
    function fillFormWithData(data) {
        if (!data) return;
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.id && data[element.id] !== undefined) {
                if (element.type === 'radio') {
                    // Check if the element's name exists in data and its value matches
                    if (data[element.name] !== undefined && element.value === data[element.name]) {
                        element.checked = true;
                    } else {
                        element.checked = false; // Uncheck other radios in the same group
                    }
                } else if (element.type === 'checkbox') {
                    element.checked = data[element.id];
                } else {
                    element.value = data[element.id];
                }
            }
        });
    }

    // Function to save application data to localStorage
    function saveApplicationData(data) {
        localStorage.setItem(applicationDataKey, JSON.stringify(data));
        console.log('Application data saved:', data);
    }

    // Function to load application data from localStorage
    function loadApplicationData() {
        const data = localStorage.getItem(applicationDataKey);
        return data ? JSON.parse(data) : null;
    }

    // Function to toggle form edit mode
    function toggleEditMode(enable) {
        form.querySelectorAll('input, select, textarea').forEach(element => {
            // Only enable/disable elements that are part of the form data, not control buttons
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
            if (formCloseButton) formCloseButton.classList.remove('hidden'); // Allow closing form during edit
        } else { // Exiting edit mode (e.g., after saving)
            if (editSubmissionButton) editSubmissionButton.classList.remove('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.remove('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
            // Re-disable fields after saving/exiting edit mode to return to view state
            form.querySelectorAll('input, select, textarea').forEach(element => {
                if (element.id !== 'confirmSubmission' && element.id !== 'cancelSubmission' &&
                    element.id !== 'applyNowBtn' && element.id !== 'editSubmissionButton' &&
                    element.id !== 'deleteSubmissionButton' && element.id !== 'saveChangesButton' &&
                    element.id !== 'submitApplicationButton') {
                    element.disabled = true;
                }
            });
            if (formCloseButton) formCloseButton.classList.add('hidden'); // Hide close button in view mode
        }
    }

    // Function to save changes made during edit mode
    function saveChangesToAppData() {
        const updatedData = collectFormData();
        saveApplicationData(updatedData);
        alert('Changes saved successfully!'); // Provide user feedback
        toggleEditMode(false); // Go back to view mode after saving
    }

    // Modified viewSubmittedForm to show populated, disabled form with Edit/Delete buttons
    function viewSubmittedForm() {
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form'; // When viewing, button changes to 'Hide Form'

            const savedData = loadApplicationData();
            fillFormWithData(savedData); // Fill the form with saved data

            // Disable all form fields for viewing
            form.querySelectorAll('input, select, textarea').forEach(element => {
                element.disabled = true;
            });

            // Show Edit and Delete buttons, hide Submit and Save Changes buttons
            if (editSubmissionButton) editSubmissionButton.classList.remove('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.remove('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.add('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');

            if (formCloseButton) {
                formCloseButton.classList.add('hidden'); // Hide form close button in view mode
            }
        } else {
            // If already open (and is in view mode), hide it and go back to default sections
            showDefaultSections();
            applyNowBtn.textContent = 'View Form'; // Reset button text when hidden
            // Ensure edit/delete buttons are hidden when form is hidden
            if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.remove('hidden'); // Show submit button
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
        }
    }

    // Existing function, slightly modified to ensure correct button states
    function toggleFormVisibility() {
        // This function is for "Apply Now" state, not "View Form"
        if (applicationFormContainer.classList.contains('hidden')) {
            heroSection.classList.add('hidden');
            howToApplySection.classList.add('hidden');
            applicationFormContainer.classList.remove('hidden');
            applyNowBtn.textContent = 'Hide Form';
            form.querySelectorAll('input, select, textarea').forEach(element => {
                element.disabled = false; // Enable fields for new application
            });
            if (formCloseButton) {
                formCloseButton.classList.remove('hidden');
            }
            // Hide edit/delete/save buttons, show submit
            if (editSubmissionButton) editSubmissionButton.classList.add('hidden');
            if (deleteSubmissionButton) deleteSubmissionButton.classList.add('hidden');
            if (saveChangesButton) saveChangesButton.classList.add('hidden');
            if (submitApplicationButton) submitApplicationButton.classList.remove('hidden');
            form.reset(); // Clear form for new application
        } else {
            showDefaultSections(); // Hide form, show hero/how-to-apply
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
                    viewSubmittedForm(); // Call viewSubmittedForm for already submitted applications
                } else {
                    toggleFormVisibility(); // Call toggleFormVisibility for new applications
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            setLoginStatus(false); 
            localStorage.removeItem('applicationSubmitted'); 
            localStorage.removeItem(applicationDataKey); // Clear saved application data on logout
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

                const submittedData = collectFormData(); // Collect current form data
                saveApplicationData(submittedData); // Save to localStorage

                // Removed form disabling here as it will be handled by viewSubmittedForm on next load
                isFormSubmitting = false;
                window.location.href = 'AdoptNow.html'; // Redirect after submission
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

    // Event listeners for new buttons
    if (editSubmissionButton) {
        editSubmissionButton.addEventListener('click', function() {
            toggleEditMode(true); // Enable edit mode
        });
    }

    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', function() {
            saveChangesToAppData(); // Save changes and exit edit mode
        });
    }

    if (deleteSubmissionButton) {
        deleteSubmissionButton.addEventListener('click', function() {
            if (deleteWarningModal) deleteWarningModal.style.display = 'flex'; // Show delete confirmation
        });
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function() {
            localStorage.removeItem(applicationDataKey); // Clear saved data
            setFormSubmittedStatus(false); // Reset submission status
            console.log('Application data deleted successfully!');
            deleteWarningModal.style.display = 'none';
            form.reset(); // Clear form fields
            showDefaultSections(); // Go back to initial "Apply Now" state
            applyNowBtn.textContent = 'Apply Now'; // Ensure button text is "Apply Now"
        });
    }
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', () => {
            deleteWarningModal.style.display = 'none';
        });
    }

    // Initial load of the page, ensuring correct form state and navigation visibility
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
    let adultCount = 0; // Initialize adult count
    // Removed direct removal of removeAdultButton from global scope, will handle dynamically
    
    const ownedDogYesRadio = document.getElementById('ownedDogYes');
    const ownedDogNoRadio = document.getElementById('ownedDogNo');
    const petInformationSection = document.getElementById('petInformationSection');
    const additionalPetsContainer = document.getElementById('additionalPetsContainer');
    const addPetButton = document.getElementById('addPetButton');
    const petButtonContainer = petInformationSection ? petInformationSection.querySelector('.button-container') : null;
    let petCount = 0; // Initialize pet count
    // Removed direct removal of removePetButton from global scope, will handle dynamically


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
                // No direct removeAdultButton removal here, handled by dynamic element removal
                if (adultButtonContainer) adultButtonContainer.style.display = 'none';
            } else if (manageDynamicFields && sectionElement.id === 'petInformationSection') {
                additionalPetsContainer.innerHTML = '';
                petCount = 0;
                // No direct removePetButton removal here, handled by dynamic element removal
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
});