// =============================================
// KISAH BAHAGIA — konfigurasi yang perlu diganti
// =============================================
const CONFIG = {
  // Ganti dengan nomor WhatsApp bisnis, format internasional tanpa + atau spasi.
  whatsappNumber: "6281234567890",
  // Ganti dengan URL Instagram resmi Kisah Bahagia.
  instagramUrl: "https://www.instagram.com/",
};

const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Portfolio filter
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".work-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "block" : "none";
    });
  });
});

// Modal helpers
function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".view-work").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = button.dataset.title;
    document.getElementById("modalDesc").textContent = button.dataset.desc;
    openModal(document.getElementById("storyModal"));
  });
});

const packageInfo = {
  Essential: "Paket untuk kebutuhan dokumentasi inti. Cocok untuk acara yang lebih intimate dan pasangan yang menginginkan dokumentasi momen-momen utama.",
  Signature: "Paket pilihan untuk dokumentasi yang lebih menyeluruh dengan dua content creator, wedding highlights, serta konten foto dan video.",
  Premium: "Paket dengan coverage lebih panjang dan tim lebih lengkap untuk menangkap lebih banyak momen dari awal hingga akhir acara."
};
document.querySelectorAll(".package-button").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.package;
    document.getElementById("packageModalTitle").textContent = name;
    document.getElementById("packageModalDesc").textContent = packageInfo[name];
    const message = `Halo Kisah Bahagia! Saya tertarik dengan paket ${name}. Boleh minta informasi lebih lanjut mengenai harga, fasilitas, dan ketersediaan tanggal?`;
    document.getElementById("packageWhatsapp").href = whatsappLink(message);
    openModal(document.getElementById("packageModal"));
  });
});
document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => closeModal(button.closest(".modal")));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") document.querySelectorAll(".modal.open").forEach(closeModal);
});

function whatsappLink(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
document.getElementById("contactWhatsapp").href = whatsappLink(
  "Halo Kisah Bahagia! Saya ingin konsultasi mengenai jasa Wedding Content Creator. Berikut detail acara saya:\nNama:\nTanggal acara:\nLokasi:\nPaket yang diminati:\n"
);
document.getElementById("instagramLink").href = CONFIG.instagramUrl;
document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal animation
const revealTargets = document.querySelectorAll(".intro-main,.intro-photo,.section-heading,.work-card,.package-card,.steps article,.testimonial-card,.faq-list");
revealTargets.forEach(el => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("visible"));
}
