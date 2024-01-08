

const button = document.querySelector('#modify') 
 
button.addEventListener('click', e => { 
	document.getElementById('modify').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
}) 


document.getElementById('modify').addEventListener('click', function() {
    document.getElementById('bookingForm').style.display = 'block'; // Toon het formulier
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Dezelfde code als voorheen om de form data te verwerken

    document.getElementById('bookingForm').style.display = 'none'; // Verberg het formulier weer
    document.getElementById('annuleren').style.display = 'none';
});
