// Clear session on page load to ensure the user is logged out if the page is refreshed or left
window.onload = () => {
    if (!localStorage.getItem('accessToken')) {
        // Ensure the user is logged out when the page loads
        document.getElementById('auth-section').classList.remove('hidden');
        document.getElementById('app-section').classList.add('hidden');
    } else {
        // If there is a token, show the app section
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('app-section').classList.remove('hidden');
    }
};

// Add logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('accessToken'); // Clear the access token from localStorage
    alert('You have been logged out.');
    window.location.reload(); // Reload the page to reflect changes (or redirect to login page)
});
