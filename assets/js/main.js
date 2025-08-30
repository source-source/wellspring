
// Init EmailJS
document.addEventListener('DOMContentLoaded', () => {
  if (window.emailjs) {
    emailjs.init('d4g_Dm4jh0bj2U3a7');
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // BMI Calculator
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');
  if (bmiForm && bmiResult) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const heightVal = parseFloat(document.getElementById('height').value);
      const weightVal = parseFloat(document.getElementById('weight').value);
      const unit = document.getElementById('heightUnit').value;

      if (!heightVal || !weightVal || heightVal <= 0 || weightVal <= 0) {
        bmiResult.textContent = 'Please enter valid height and weight values.';
        return;
      }

      let meters = unit === 'cm' ? heightVal / 100 : heightVal;
      const bmi = weightVal / (meters * meters);
      const rounded = Math.round(bmi * 10) / 10;

      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      bmiResult.innerHTML = `<strong>Your BMI is ${rounded}</strong> — ${category}`;
    });
  }

  // Contact form via EmailJS
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(contactForm);
      const payload = {
        name: form.get('name'),
        email: form.get('email'),
        subject: form.get('subject'),
        message: form.get('message'),
      };

      try {
        await emailjs.send('service_036e7i7', 'template_jpro4u3', payload);
        contactStatus.textContent = 'Thanks! Your message has been sent.';
        contactForm.reset();
      } catch (err) {
        contactStatus.textContent = 'Sorry, something went wrong. Please try again later.';
        console.error(err);
      }
    });
  }



 document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

  
  // Appointment form via EmailJS
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentStatus = document.getElementById('appointmentStatus');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = new FormData(appointmentForm);
      const payload = {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        date: form.get('date'),
        message: form.get('message'),
      };

      try {
        await emailjs.send('service_036e7i7', 'template_tnvn598', payload);
        appointmentStatus.textContent = 'Request sent! We will contact you to confirm.';
        appointmentForm.reset();
      } catch (err) {
        appointmentStatus.textContent = 'Unable to send right now. Please call us or try again later.';
        console.error(err);
      }
    });
  }
});
