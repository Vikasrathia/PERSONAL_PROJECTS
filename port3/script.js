
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
      mirror: false,
    })
  
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle-checkbox")
  
    // Check for saved theme preference or use device preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  
    // Function to set the theme
    const setTheme = (isDark) => {
      if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark")
        themeToggle.checked = true
      } else {
        document.documentElement.removeAttribute("data-theme")
        themeToggle.checked = false
      }
    }
  
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme")
  
    if (savedTheme === "dark") {
      setTheme(true)
    } else if (savedTheme === "light") {
      setTheme(false)
    } else {
      // If no saved preference, use device preference
      setTheme(prefersDarkScheme.matches)
    }
  
    // Toggle theme when the checkbox changes
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        setTheme(true)
        localStorage.setItem("theme", "dark")
      } else {
        setTheme(false)
        localStorage.setItem("theme", "light")
      }
    })
  
    // Listen for changes in device theme preference
    prefersDarkScheme.addEventListener("change", (e) => {
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches)
      }
    })
  
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
    const navLinksItems = document.querySelectorAll(".nav-links a")
  
    // Toggle mobile menu
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
  
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active")
        }
      })
    })
  
    // Header scroll effect
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }
    })
  
    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  
    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectItems = document.querySelectorAll(".project-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        button.classList.add("active")
  
        const filterValue = button.getAttribute("data-filter")
  
        projectItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 200)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
              item.style.display = "none"
            }, 200)
          }
        })
      })
    })
  
    // Animate skill progress bars
    const skillBars = document.querySelectorAll(".progress-bar")
  
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
      })
    }
  
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Animate skill bars when skills section is in viewport
    const skillsSection = document.querySelector("#skills")
  
    window.addEventListener("scroll", () => {
      if (skillsSection && isInViewport(skillsSection)) {
        animateSkillBars()
      }
    })
  
    // Trigger once on page load
    if (skillsSection && isInViewport(skillsSection)) {
      animateSkillBars()
    }
  
    // Testimonial slider
    const testimonialTrack = document.querySelector(".testimonial-track")
    const testimonialItems = document.querySelectorAll(".testimonial-item")
    const dots = document.querySelectorAll(".dot")
    let currentIndex = 0
  
    function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`
  
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex)
      })
    }
  
    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index
        updateSlider()
      })
    })
  
    // Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialItems.length
      updateSlider()
    }, 5000)
  
    // Animate counter numbers
    const statNumbers = document.querySelectorAll(".stat-number")
    const statsSection = document.querySelector(".stats")
    let animated = false
  
    function animateNumbers() {
      if (animated) return
  
      statNumbers.forEach((number) => {
        const target = Number.parseInt(number.getAttribute("data-count"))
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 16) // 60fps
        let current = 0
  
        const timer = setInterval(() => {
          current += increment
          number.textContent = Math.floor(current)
  
          if (current >= target) {
            number.textContent = target
            clearInterval(timer)
          }
        }, 16)
      })
  
      animated = true
    }
  
    window.addEventListener("scroll", () => {
      if (statsSection && isInViewport(statsSection)) {
        animateNumbers()
      }
    })
  
    // Check on page load
    if (statsSection && isInViewport(statsSection)) {
      animateNumbers()
    }
  
    // Form validation and submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic form validation
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        if (!name || !email || !subject || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address")
          return
        }
  
        // Form submission would go here
        // For demo purposes, just show a success message
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      })
    }
  })
  
  