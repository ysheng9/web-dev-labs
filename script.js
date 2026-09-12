// Ye Sheng - Lab 4 Graduate Extension
// ZIP code validation using RegExp.test()

const zipInput = document.getElementById('zip');
const zipPattern = /^\d{5}$/;

zipInput.addEventListener('input', () => {
  const isValidZip = zipPattern.test(zipInput.value);
  console.log('ZIP value:', zipInput.value, '| valid:', isValidZip);
});