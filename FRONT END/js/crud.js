const CONTACTS_URL = 'https://mycontact-app-backend.onrender.com/api/contacts'; // Update for Render API URL

// Create a new contact
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const contact = { name, email, phone };
    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(CONTACTS_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });

        if (response.ok) {
            fetchContacts(); // Reload contacts after saving new one
        } else {
            alert('Error creating contact');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Fetch all contacts
async function fetchContacts() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert("You need to be logged in to view contacts.");
        return;
    }

    const response = await fetch(CONTACTS_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const contacts = await response.json();
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = ''; // Clear the list before displaying

        contacts.forEach(contact => {
            const contactItem = document.createElement('li');
            contactItem.className = 'flex justify-between items-center';
            contactItem.innerHTML = `
                <span>${contact.name} (${contact.email}, ${contact.phone})</span>
                <button onclick="deleteContact('${contact._id}')" class="text-red-500">Delete</button>
                <button onclick="openUpdateModal('${contact._id}')" class="text-blue-500 ml-4">Update</button>
            `;
            contactsList.appendChild(contactItem);
        });
    } else {
        alert('Error fetching contacts');
    }
}

// Show Contacts Button Event Listener
document.getElementById('show-contacts-btn').addEventListener('click', () => {
    fetchContacts(); // Fetch contacts when button is clicked
});

// Delete a contact
async function deleteContact(contactId) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert("You need to be logged in to delete contacts.");
        return;
    }

    if (!contactId) {
        alert("Invalid contact ID");
        return;
    }

    try {
        const response = await fetch(`${CONTACTS_URL}/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            fetchContacts(); // Reload contacts after deletion
        } else {
            const data = await response.json();
            alert('Error deleting contact: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Open Update Modal and Pre-fill contact data
function openUpdateModal(contactId) {
    const modal = document.getElementById('update-modal');
    const name = document.getElementById('update-name');
    const email = document.getElementById('update-email');
    const phone = document.getElementById('update-phone');

    if (!contactId) {
        alert("Invalid contact ID");
        return;
    }

    fetch(`${CONTACTS_URL}/${contactId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
    .then(res => res.json())
    .then(contact => {
        if (contact && contact._id) {
            name.value = contact.name;
            email.value = contact.email;
            phone.value = contact.phone;
            document.getElementById('update-contact-id').value = contact._id;
            modal.classList.remove('hidden');
        } else {
            alert("Contact not found.");
        }
    })
    .catch(error => {
        alert("Error fetching contact data: " + error.message);
    });
}

// Close Update Modal
document.getElementById('close-update-modal').addEventListener('click', () => {
    document.getElementById('update-modal').classList.add('hidden');
});

// Handle Update Contact
document.getElementById('update-contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const contactId = document.getElementById('update-contact-id').value;
    const name = document.getElementById('update-name').value;
    const email = document.getElementById('update-email').value;
    const phone = document.getElementById('update-phone').value;

    if (!contactId || !name || !email || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    const contact = { name, email, phone };
    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${CONTACTS_URL}/${contactId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });

        if (response.ok) {
            fetchContacts(); // Reload contacts after update
            document.getElementById('update-modal').classList.add('hidden');
        } else {
            const data = await response.json();
            alert('Error updating contact: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
