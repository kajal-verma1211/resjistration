// // public/password-strength.js
//     document.getElementById('password').addEventListener('input', function() {
//     const password = this.value;
//     const strengthText = document.getElementById('password-strength');
    
//     const getPasswordStrength = (password) => {
//       const minLength = 8;
//       const hasUpperCase = /[A-Z]/.test(password);
//       const hasLowerCase = /[a-z]/.test(password);
//       const hasNumber = /[0-9]/.test(password);
//       const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//       let strength = 0;
//       if (password.length >= minLength) strength++;
//       if (hasUpperCase) strength++;
//       if (hasLowerCase) strength++;
//       if (hasNumber) strength++;
//       if (hasSpecialChar) strength++;
      
//       if (strength <= 2) return 'Weak';
//       if (strength === 3) return 'Medium';
//       if (strength >= 4) return 'Strong';
//     };
  
//     const strength = getPasswordStrength(password);
//     strengthText.textContent = `Password strength: ${strength}`;
//     strengthText.style.color = strength === 'Strong' ? 'green' : strength === 'Medium' ? 'orange' : 'red';
//   });
  