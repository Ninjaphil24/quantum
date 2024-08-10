document.getElementById('contact').addEventListener('click', function () {
    document.querySelector('.formContainer').classList.toggle('inactive');
})

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        if (response.ok) {
            document.querySelector('.formContainer').classList.toggle('inactive');
            document.querySelector('.thankYouContainer').classList.toggle('inactive');
        } else {
            const errorData = await response.json();
            alert('There was an error submitting the form: ' + errorData.message);
        }
    } catch (error) {
        alert('An error occurred while submitting the form. Please try again later.');
    }
});
document.getElementById('thankYouClose').addEventListener('click', function () {
    document.querySelector('.thankYouContainer').classList.toggle('inactive');
})
document.getElementById('contactClose').addEventListener('click', function () {
    document.querySelector('.formContainer').classList.toggle('inactive');
})