// Importing toast CSS for styling for subscribing
function handleSubscription(event) {
    event.preventDefault();
    const toastMessage = document.getElementById('toast-message');
    toastMessage.style.display = 'block';
    setTimeout(() => {
        toastMessage.style.display = 'none';
    }, 3000);
}

// Adding event listener to the subscription form
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            form.reset(); 
            const toast = new bootstrap.Toast(document.getElementById('successToast'));
            toast.show();
        } else {
            alert("Oops! Something went wrong.");
        }
    } catch (error) {
        alert("There was an error submitting the form.");
        console.error(error);
    }
});

