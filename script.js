function calculateAge() {
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    resultDiv.textContent = '';
    errorDiv.textContent = '';

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    if (!day || !month || !year) {
        errorDiv.textContent = 'Please fill in all fields';
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    if (birthDate > currentDate) {
        errorDiv.textContent = 'Birth date cannot be in the future';
        return;
    }

    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
        errorDiv.textContent = 'Please enter a valid date';
        return;
    }

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
        ageDays += prevMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    resultDiv.textContent ='Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days';
} 

document.getElementById('month').addEventListener('change', function() {
    const monthInput = parseInt(this.value);
    const dayInput = document.getElementById('day');
    const yearInput = document.getElementById('year');
    
    if (monthInput && yearInput.value) {
        const lastDay = new Date(yearInput.value, monthInput, 0).getDate();
        dayInput.max = lastDay;
        if (parseInt(dayInput.value) > lastDay) {
            dayInput.value = lastDay;
        }
    }
});