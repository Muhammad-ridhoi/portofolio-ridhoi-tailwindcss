document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("py-2", "shadow-sm");
      navbar.classList.remove("py-4");
    } else {
      navbar.classList.remove("py-2", "shadow-sm");
      navbar.classList.add("py-4");
    }
  });

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("close-mobile-menu");
  const overlay = document.getElementById("mobile-menu-overlay");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    overlay.classList.remove("opacity-0", "pointer-events-none");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    overlay.classList.add("opacity-0", "pointer-events-none");
  });

  window.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target) &&
      !closeBtn.contains(e.target)
    ) {
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      overlay.classList.add("opacity-0", "pointer-events-none");
    }
  });

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      overlay.classList.add("opacity-0", "pointer-events-none");
    });
  });

  // Typing Effect
  const typingElement = document.getElementById("auto-type");
  const text =
    "Komputer Jaringan, Beginner English, Hotspot Mikrotik DoridoNet.";
  let i = 0;

  function typeLoop() {
    typingElement.textContent = "";
    i = 0;
    function type() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 70);
      } else {
        setTimeout(erase, 2000);
      }
    }
    function erase() {
      if (typingElement.textContent.length > 0) {
        typingElement.textContent = typingElement.textContent.slice(0, -1);
        setTimeout(erase, 30);
      } else {
        setTimeout(typeLoop, 1000);
      }
    }
    type();
  }
  if (typingElement) typeLoop();

  // Lightbox
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const triggerBtn = document.getElementById("openLightbox");

  if (triggerBtn) {
    triggerBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });

    modal.addEventListener("click", (e) => {
      if (!modalContent.contains(e.target)) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    });
  }

  // Scroll Progress
  const scrollProgress = document.getElementById("scroll-progress");
  if (scrollProgress) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + "%";
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const formLoading = document.getElementById("formLoading");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      formLoading.classList.remove("hidden");
      formSuccess.classList.add("hidden");
      setTimeout(() => {
        formLoading.classList.add("hidden");
        formSuccess.classList.remove("hidden");
        contactForm.reset();
      }, 2000);
    });
  }

  // Swiper Sertifikat
  if (typeof Swiper !== "undefined") {
    new Swiper(".sertifikatSwiper", {
      loop: false,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Dapetin elemen loader bar
const topLoader = document.getElementById("top-loader");

// Fungsi buat nampilin loader
function showLoader() {
  // Loader mulai dengan transisi
  topLoader.style.transition = "width 2s ease"; // Efek smooth selama 2 detik
  topLoader.style.width = "25%"; // Mulai dari 25% agar kelihatan sedikit
  setTimeout(() => {
    // Setelah beberapa detik, loader akan melanjutkan ke 100% (untuk smooth)
    topLoader.style.width = "100%"; // Pindah ke 100% setelah delay
  }, 500); // Delay sebelum loader melanjutkan ke 100%
}

// Fungsi buat sembunyiin loader setelah selesai loading
function hideLoader() {
  setTimeout(() => {
    topLoader.style.transition = "width .5 ease"; // Transisi smooth ke 0
    topLoader.style.width = "0"; // Sembunyikan loader bar
  }, 500); // Delay sedikit supaya loader bar kelihatan sebelum disembunyikan
}

// Pindah tab atau scroll ke section
document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      showLoader(); // Tampilkan top loading bar saat pindah tab
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
        hideLoader(); // Sembunyikan top loader bar setelah scroll selesai
      }, 2000); // Delay 2 detik sebelum scroll ke section, biar spinner sempat muncul
    }
  });
});

// Ambil semua tombol filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portofolio-card");

// Fungsi untuk menerapkan filter
function filterPortfolio(category) {
  portfolioItems.forEach((item) => {
    // Menyembunyikan atau menampilkan card berdasarkan kategori
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block"; // Menampilkan item
      setTimeout(() => {
        item.classList.add("opacity-100"); // Menambah opacity setelah loading
      }, 300);
    } else {
      item.style.display = "none"; // Menyembunyikan item
      item.classList.remove("opacity-100");
    }
  });
}

// Event listener untuk setiap tombol filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Ambil kategori dari data-filter pada tombol
    const category = btn.getAttribute("data-filter");
    // Panggil fungsi filter dengan kategori yang sesuai
    filterPortfolio(category);
  });
});

// Panggil filter untuk kategori "all" secara default
filterPortfolio("all");
