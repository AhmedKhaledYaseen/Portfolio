// ==========================================================================
// Ahmed Khaled Yaseen - Portfolio Interactive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuDrawer.classList.remove('opacity-0', 'pointer-events-none');
        const drawerPanel = mobileMenuDrawer.querySelector('.drawer-panel');
        if (drawerPanel) {
          drawerPanel.classList.remove('translate-x-full');
        }
      }, 10);
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.add('opacity-0', 'pointer-events-none');
      const drawerPanel = mobileMenuDrawer.querySelector('.drawer-panel');
      if (drawerPanel) {
        drawerPanel.classList.add('translate-x-full');
      }
      setTimeout(() => {
        mobileMenuDrawer.classList.add('hidden');
      }, 300);
      document.body.classList.remove('overflow-hidden');
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Smooth Scrolling for Hash Links
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scrollspy: Highlight Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('#desktop-nav a');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('bg-primary-container', 'text-on-primary-container', 'font-semibold');
            link.classList.remove('text-on-surface-variant', 'font-normal');
          } else {
            link.classList.remove('bg-primary-container', 'text-on-primary-container', 'font-semibold');
            link.classList.add('text-on-surface-variant');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation();

  // Contact Form Submission Handler with real Gmail delivery
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitBtnIcon = document.getElementById('submit-btn-icon');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('name')?.value || '';
      const emailVal = document.getElementById('email')?.value || '';
      const subjectVal = document.getElementById('subject')?.value || 'Portfolio Contact Inquiry';
      const messageVal = document.getElementById('message')?.value || '';

      // Button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-80', 'cursor-wait');
        if (submitBtnText) submitBtnText.textContent = 'Sending to Gmail...';
        if (submitBtnIcon) submitBtnIcon.textContent = 'hourglass_empty';
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/ahmed.khaled2011k@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            _subject: `Portfolio Message from ${nameVal}: ${subjectVal}`,
            message: messageVal
          })
        });

        if (response.ok) {
          if (formFeedback) {
            formFeedback.innerHTML = `
              <div class="flex items-center justify-center gap-2 font-bold mb-1 text-secondary">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Message Delivered to Ahmed's Gmail!</span>
              </div>
              <p>Thank you ${nameVal}! Your message has been sent directly to <strong>ahmed.khaled2011k@gmail.com</strong>. I will reply to you soon.</p>
            `;
            formFeedback.classList.remove('hidden');
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
        } else {
          throw new Error('Direct submission failed');
        }
      } catch (err) {
        // Resilient Fallback: If adblocker or network error, open directly in Gmail Compose!
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ahmed.khaled2011k@gmail.com&su=${encodeURIComponent("Portfolio: " + subjectVal)}&body=${encodeURIComponent("Name: " + nameVal + "\nEmail: " + emailVal + "\n\nMessage:\n" + messageVal)}`;
        window.open(gmailComposeUrl, '_blank');
        if (formFeedback) {
          formFeedback.innerHTML = `
            <div class="flex items-center justify-center gap-2 font-bold mb-1 text-secondary">
              <span class="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>Opened in Gmail!</span>
            </div>
            <p>Your message was prepared in a new Gmail compose tab addressed to <strong>ahmed.khaled2011k@gmail.com</strong>. Click Send in Gmail to finish!</p>
          `;
          formFeedback.classList.remove('hidden');
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-80', 'cursor-wait');
          if (submitBtnText) submitBtnText.textContent = 'Send to My Gmail';
          if (submitBtnIcon) submitBtnIcon.textContent = 'send';
        }
      }
    });
  }
});

// Toast notification helper for copying email
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.classList.remove('translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 3000);
    } else {
      alert('Email copied: ' + email);
    }
  }).catch(() => {
    prompt('Copy email:', email);
  });
}
