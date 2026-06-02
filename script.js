/**
 * Shreya Srivastava Portfolio - Enhanced Interactive Features
 * Includes: Theme Toggle, Typing Animation, Contact Form, PDF Resume, Mobile Menu, etc.
 */

// ========================================
// DOM Content Loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  });
  
  // Initialize EmailJS (REPLACE WITH YOUR PUBLIC KEY)
  emailjs.init("YOUR_PUBLIC_KEY"); // Get from emailjs.com
  
  // Initialize all components
  initMobileMenu();
  initSmoothScrolling();
  initResumeDownload();
  initCounterAnimation();
  initCustomCursor();
  initNavActiveHighlight();
  initParticleEffect();
  initThemeToggle();
  initTypingAnimation();
  initContactForm();
  
});

// ========================================
// 1. Theme Toggle (Dark/Light Mode)
// ========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      localStorage.setItem('theme', 'light');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

// ========================================
// 2. Typing Animation
// ========================================
function initTypingAnimation() {
  const words = [
    "Data Analyst 📊",
    "SQL Expert 💾",
    "Python Developer 🐍",
    "Power BI Specialist 📈",
    "Problem Solver 🧠"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingText = document.querySelector('.typing-text');
  
  if (!typingText) return;
  
  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
      return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }
  
  typeEffect();
}

// // ========================================
// // 3. Contact Form with EmailJS
// // ========================================
// emailjs.init({
//   publicKey: "YOUR_PUBLIC_KEY_HERE"  // Get this from Account → API Keys
// });
// function initContactForm() {
//   const form = document.getElementById('contactForm');
//   const statusDiv = document.getElementById('formStatus');
  
//   if (!form) return;
  
//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const name = document.getElementById('userName').value;
//     const email = document.getElementById('userEmail').value;
//     const message = document.getElementById('userMessage').value;
    
//     statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
//     statusDiv.className = 'form-status';
    
//     // Template parameters for EmailJS
//     const templateParams = {
//       from_name: name,
//       from_email: email,
//       message: message,
//       to_name: 'Shreya Srivastava'
//     };
    
//     // REPLACE WITH YOUR SERVICE ID, TEMPLATE ID
//     emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//       .then(function(response) {
//         statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
//         statusDiv.className = 'form-status success';
//         form.reset();
        
//         setTimeout(() => {
//           statusDiv.innerHTML = '';
//         }, 5000);
//       })
//       .catch(function(error) {
//         console.error('EmailJS Error:', error);
//         statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send message. Please try again or email me directly.';
//         statusDiv.className = 'form-status error';
//       });
//   });
// }

// ========================================
// 4. Mobile Menu Toggle
// ========================================
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');
      
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !mobileBtn.contains(event.target)) {
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          const icon = mobileBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
}

// ========================================
// 5. Smooth Scrolling
// ========================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        history.pushState(null, null, href);
        
        const navLinks = document.getElementById('navLinks');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        if (navLinks && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          if (mobileBtn) {
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });
}

// ========================================
// 6. Resume Download (Real PDF)
// ========================================
function initResumeDownload() {
  const downloadBtn1 = document.getElementById('downloadResumeBtn');
  const downloadBtn2 = document.getElementById('resumeDownloadBtn2');
  
  const downloadFunction = function(e) {
    if (e) e.preventDefault();
    generatePDFResume();
  };
  
  if (downloadBtn1) downloadBtn1.addEventListener('click', downloadFunction);
  if (downloadBtn2) downloadBtn2.addEventListener('click', downloadFunction);
}

function generatePDFResume() {
  // Create a temporary div for PDF content
  const resumeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Shreya Srivastava - Resume</title>
      <style>
        body {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          color: #1e293b;
          line-height: 1.5;
        }
        h1 { color: #4f46e5; font-size: 28px; margin-bottom: 5px; }
        h2 { color: #4f46e5; font-size: 18px; border-bottom: 2px solid #4f46e5; padding-bottom: 5px; margin-top: 20px; }
        .title { color: #64748b; font-size: 16px; margin-bottom: 20px; }
        .contact { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px; color: #475569; font-size: 14px; }
        .section { margin-bottom: 20px; }
        .item { margin-bottom: 15px; }
        .item-header { font-weight: bold; display: flex; justify-content: space-between; }
        .company { color: #4f46e5; }
        .date { color: #64748b; font-size: 12px; }
        ul { margin-top: 5px; padding-left: 20px; }
        li { margin-bottom: 5px; color: #475569; }
        .skill-tag { display: inline-block; background: #eef2ff; padding: 2px 10px; border-radius: 15px; font-size: 12px; margin: 3px; }
      </style>
    </head>
    <body>
      <h1>Shreya Srivastava</h1>
      <div class="title">Data Analyst | SQL | Python | Power BI</div>
      <div class="contact">
        <span>📧 shreya.srivastava@example.edu</span>
        <span>📞 +91 98765 43210</span>
        <span>🔗 linkedin.com/in/shreya-analytics</span>
      </div>
      
      <div class="section">
        <h2>Professional Summary</h2>
        <p>Results-oriented Data Analyst with hands-on experience in SQL, Python, Excel, and Power BI. Skilled at cleaning, analyzing, and visualizing complex datasets to surface actionable insights.</p>
      </div>
      
      <div class="section">
        <h2>Technical Skills</h2>
        <div>
          <span class="skill-tag">SQL</span> <span class="skill-tag">Python</span> <span class="skill-tag">Pandas</span>
          <span class="skill-tag">Power BI</span> <span class="skill-tag">Tableau</span> <span class="skill-tag">Excel</span>
          <span class="skill-tag">PostgreSQL</span> <span class="skill-tag">MySQL</span> <span class="skill-tag">Git</span>
        </div>
      </div>
      
      <div class="section">
        <h2>Experience</h2>
        <div class="item">
          <div class="item-header"><span>Data Science & Analytics Intern <span class="company">Future Interns</span></span><span class="date">May 2026</span></div>
          <ul><li>Completed structured internship in Data Science & Analytics with EDA, data cleaning, and analytical reporting.</li></ul>
        </div>
        <div class="item">
          <div class="item-header"><span>Data Analytics Virtual Internship <span class="company">ApexPlanet Software</span></span><span class="date">Apr 2026</span></div>
          <ul><li>End-to-end data analytics workflows covering cleaning, EDA, and visualization.</li></ul>
        </div>
        <div class="item">
          <div class="item-header"><span>Data Analytics Job Simulation <span class="company">Deloitte (Forage)</span></span><span class="date">Apr 2026</span></div>
          <ul><li>Simulated Deloitte's analytics and risk practice on real-world business scenarios.</li></ul>
        </div>
      </div>
      
      <div class="section">
        <h2>Projects</h2>
        <div class="item">
          <div class="item-header">Google Search Trends Analysis</div>
          <ul><li>Investigated seasonal keyword trends across 12 months, uncovering high-demand periods for targeted marketing.</li></ul>
        </div>
        <div class="item">
          <div class="item-header">Pizza Sales Performance Analysis</div>
          <ul><li>Analyzed sales volume and revenue across pizza categories, identified best-selling items.</li></ul>
        </div>
        <div class="item">
          <div class="item-header">Movie Industry Trends Analysis</div>
          <ul><li>Cleaned and explored large dataset analyzing genre distribution and ratings trends.</li></ul>
        </div>
      </div>
      
      <div class="section">
        <h2>Education</h2>
        <div class="item">
          <div class="item-header">B.Tech - Computer Science <span class="company">Bhagwant University</span><span class="date">Expected 2027</span></div>
          <div>CGPA: 7.25 / 10</div>
        </div>
        <div class="item">
          <div class="item-header">Diploma - Computer Science <span class="company">Board of Technical Education, UP</span><span class="date">Completed 2024</span></div>
          <div>Percentage: 78.24%</div>
        </div>
      </div>
      
      <div class="section">
        <h2>Certifications</h2>
        <ul>
          <li>Data Science & Analytics Internship — Future Interns</li>
          <li>Data Analytics Virtual Internship — ApexPlanet Software</li>
          <li>Data Analytics Job Simulation — Deloitte via Forage</li>
          <li>GenAI Powered Data Analytics — Tata via Forage</li>
          <li>SQL Certification — HackerRank</li>
          <li>Data Analytics Certification — Skill Nation</li>
        </ul>
      </div>
    </body>
    </html>
  `;
  
  const win = window.open('', '_blank');
  win.document.write(resumeHTML);
  win.document.close();
  win.print();
  
  showNotification('✓ Resume PDF generated! You can save it now.', '#10b981');
}

function showNotification(message, color) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = color;
  notification.style.color = 'white';
  notification.style.padding = '12px 24px';
  notification.style.borderRadius = '40px';
  notification.style.fontSize = '0.9rem';
  notification.style.fontWeight = '600';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  notification.style.animation = 'fadeInUp 0.3s ease';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) notification.parentNode.removeChild(notification);
    }, 300);
  }, 2000);
}

// ========================================
// 7. Counter Animation
// ========================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = counter.innerText;
    const numericValue = parseInt(target);
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const updateCounter = () => {
      current += increment;
      if (current < numericValue) {
        counter.innerText = Math.ceil(current) + (target.includes('+') ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ========================================
// 8. Custom Cursor
// ========================================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
  });
  
  const hoverElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      cursor.style.background = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'var(--primary)';
    });
  });
}

// ========================================
// 9. Active Navigation Link Highlight
// ========================================
function initNavActiveHighlight() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// 10. Particle Effect for Hero Section
// ========================================
function initParticleEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.backgroundColor = `rgba(99, 102, 241, ${Math.random() * 0.5})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
    hero.appendChild(particle);
  }
}