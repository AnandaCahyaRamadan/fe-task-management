<template>
  <div class="font-jakarta">

    <!-- NAVBAR -->
    <nav
      class="backdrop-blur-lg bg-white/70 w-full shadow-sm px-6 py-4 flex justify-between items-center transition"
    >
      <h1 class="text-2xl font-bold text-primary">Taskify</h1>

      <div class="hidden md:flex space-x-6 font-medium">
        <a href="#features" class="hover:text-primary transition">Fitur</a>
        <a href="#why" class="hover:text-primary transition">Keunggulan</a>
        <a href="#testimonial" class="hover:text-primary transition">Testimonial</a>
        <a href="#pricing" class="hover:text-primary transition">Pricing</a>
        <a href="#faq" class="hover:text-primary transition">FAQ</a>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/login"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="hidden md:inline-block px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
        >
          Daftar
        </router-link>
      </div>
    </nav>

    <!-- HERO -->
    <section
      class="pt-32 pb-20 px-6 bg-gradient-to-b from-primary/10 to-white"
    >
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <!-- LEFT TEXT -->
        <div class="space-y-6" v-intersect="reveal">
          <h2 class="text-4xl md:text-5xl font-bold text-primary leading-tight reveal">
            Kelola Tugas dengan Cara yang Lebih Pintar dan Efisien
          </h2>

          <p class="text-gray-600 text-lg reveal delay-100">
            Taskify membantu Anda merencanakan, memonitor, dan menuntaskan pekerjaan
            dengan alur kerja yang terstruktur — cocok untuk individu maupun tim kecil.
          </p>

          <div class="flex gap-4 justify-center md:justify-start reveal delay-200">
            <router-link
              to="/register"
              class="px-4 py-2 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-secondary transition shadow"
            >
              Mulai Sekarang
            </router-link>

            <a
              href="#features"
              class="px-4 py-2 border border-primary text-primary rounded-lg text-lg hover:bg-primary hover:text-white transition"
            >
              Lihat Fitur
            </a>
          </div>
        </div>

        <!-- RIGHT ILLUSTRATION -->
        <div class="flex justify-center" v-intersect="reveal">
          <img
            src="https://snacknation.com/wp-content/uploads/2020/12/Best-Task-Management-Software-Platforms.png"
            class="w-100 drop-shadow-xl hover:scale-105 transition reveal"
            alt="illustration"
          />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="px-6 py-20 bg-white">
      <h3 class="text-3xl text-center font-bold text-primary mb-12" v-intersect="reveal">Fitur Utama</h3>

      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div
          class="group p-6 rounded-xl border shadow hover:shadow-xl transition hover:-translate-y-1 bg-white"
          v-intersect="reveal"
        >
          <h4 class="text-xl font-semibold text-primary group-hover:scale-105 transition">Kelola Tugas</h4>
          <p class="text-gray-600 mt-2">Tambah, edit, atur prioritas dan deadline dengan mudah.</p>
        </div>

        <div
          class="group p-6 rounded-xl border shadow hover:shadow-xl transition hover:-translate-y-1 bg-white"
          v-intersect="reveal"
        >
          <h4 class="text-xl font-semibold text-primary group-hover:scale-105 transition">Kolaborasi Tim</h4>
          <p class="text-gray-600 mt-2">Assign tugas, pantau progres, dan berkolaborasi dalam tim.</p>
        </div>

        <div
          class="group p-6 rounded-xl border shadow hover:shadow-xl transition hover:-translate-y-1 bg-white"
          v-intersect="reveal"
        >
          <h4 class="text-xl font-semibold text-primary group-hover:scale-105 transition">Dashboard Statistik</h4>
          <p class="text-gray-600 mt-2">Grafik penyelesaian tugas dan metrik produktivitas.</p>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE -->
    <section id="why" class="px-6 py-20 bg-gray-50">
      <h3 class="text-3xl text-center font-bold text-primary mb-4" v-intersect="reveal">Kenapa Memilih Taskify?</h3>
      <p class="text-center text-gray-600 max-w-3xl mx-auto mb-12" v-intersect="reveal">
        Dirancang ringan, cepat, dan mudah digunakan oleh siapa saja — fokus pada hasil, bukan keribetan.
      </p>

      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div class="p-6 rounded-xl bg-white shadow hover:shadow-lg transition" v-intersect="reveal">
          <h4 class="font-bold text-primary text-lg">⚡ Sangat Responsif</h4>
          <p class="text-gray-600 mt-2">Optimal di semua ukuran layar.</p>
        </div>

        <div class="p-6 rounded-xl bg-white shadow hover:shadow-lg transition" v-intersect="reveal">
          <h4 class="font-bold text-primary text-lg">🎨 UI Modern</h4>
          <p class="text-gray-600 mt-2">Desain rapi & enak dilihat.</p>
        </div>

        <div class="p-6 rounded-xl bg-white shadow hover:shadow-lg transition" v-intersect="reveal">
          <h4 class="font-bold text-primary text-lg">🚀 Performa Cepat</h4>
          <p class="text-gray-600 mt-2">Dibangun dengan teknologi modern seperti Vue 3.</p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="testimonial" class="px-6 py-20 bg-white">
      <h3 class="text-3xl text-center font-bold text-primary mb-6" v-intersect="reveal">Apa Kata Pengguna</h3>

      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div class="p-6 bg-gray-50 rounded-xl shadow" v-intersect="reveal">
          <p class="text-gray-700">"Taskify membantu tim kami menyelesaikan sprint tepat waktu. UI-nya ringan dan mudah digunakan."</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">SR</div>
            <div>
              <div class="font-semibold">Siti R.</div>
              <div class="text-sm text-gray-500">Project Manager</div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow" v-intersect="reveal">
          <p class="text-gray-700">"Ringkas, tidak bertele-tele. Fitur reminder-nya berguna sekali untuk deadline tugas harian."</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">AH</div>
            <div>
              <div class="font-semibold">Andi H.</div>
              <div class="text-sm text-gray-500">Freelancer</div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 rounded-xl shadow" v-intersect="reveal">
          <p class="text-gray-700">"Cocok untuk tim kecil kami. Statistiknya membantu evaluasi mingguan."</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">RN</div>
            <div>
              <div class="font-semibold">Rina N.</div>
              <div class="text-sm text-gray-500">Founder</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING (Simple: Free & Pro) -->
    <section id="pricing" class="px-6 py-20 bg-gray-50">
      <h3 class="text-3xl text-center font-bold text-primary mb-6" v-intersect="reveal">Pricing</h3>
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-8" v-intersect="reveal">
        Pilih paket yang sesuai: mulai dari penggunaan pribadi hingga tim yang butuh fitur lanjutan.
      </p>

      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <!-- Free -->
        <div class="p-6 bg-white rounded-xl border shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-xl font-semibold">Free</h4>
              <p class="text-gray-500 text-sm">Cocok untuk pengguna individu</p>
            </div>
            <div class="text-2xl font-bold text-primary">Rp0</div>
          </div>

          <ul class="mt-4 space-y-2 text-gray-600">
            <li>• Manajemen tugas dasar</li>
            <li>• deadline</li>
            <li>• Dashboard dasar</li>
          </ul>

          <div class="mt-6">
            <router-link to="/register" class="block text-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition">
              Daftar Gratis
            </router-link>
          </div>
        </div>

        <!-- Pro -->
        <div class="p-6 bg-white rounded-xl border shadow-xl transform scale-[1.01]">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-xl font-semibold">Pro</h4>
              <p class="text-gray-500 text-sm">Untuk tim dan pengguna profesional</p>
            </div>
            <div class="text-2xl font-bold text-primary">Rp10.000 / bulan</div>
          </div>

          <ul class="mt-4 space-y-2 text-gray-600">
            <li>• Semua fitur Free</li>
            <li>• Tambah Member</li>
          </ul>

          <div class="mt-6">
            <router-link to="/register" class="block text-center px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
              Coba Pro
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ (Accordion) -->
    <section id="faq" class="px-6 py-20 bg-white">
      <h3 class="text-3xl text-center font-bold text-primary mb-6" v-intersect="reveal">FAQ</h3>
      <div class="max-w-3xl mx-auto space-y-4">
        <div v-for="(item, idx) in faqs" :key="idx" class="border rounded-xl overflow-hidden" v-intersect="reveal">
          <button
            class="w-full text-left px-5 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
            @click="toggleFaq(idx)"
          >
            <span class="font-medium">{{ item.q }}</span>
            <svg :class="{'transform rotate-180': openFaq === idx}" class="h-5 w-5 transition" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" />
            </svg>
          </button>
          <div class="px-5 py-4 text-gray-600" v-show="openFaq === idx" v-cloak>
            {{ item.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 py-20 text-center bg-primary text-white">
      <h3 class="text-3xl font-bold">Mulai Tingkatkan Produktivitas Anda</h3>
      <p class="mt-3 text-white/90">Daftar sekarang dan buat manajemen tugas jadi lebih mudah.</p>

      <router-link
        to="/register"
        class="mt-6 inline-block bg-white text-primary px-8 py-3 rounded-xl text-lg font-medium hover:bg-gray-100 transition shadow"
      >
        Buat Akun Gratis
      </router-link>
    </section>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-gray-300 py-4 text-center">
      <p>© 2025 Taskify — Aplikasi Manajemen Tugas</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "LandingPage",
  setup() {
    // FAQ data
    const faqs = ref([
      {
        q: "Apakah Taskify gratis?",
        a: "Ada paket Free dengan fitur dasar. Paket Pro menyediakan fitur tambahan untuk tim dan akses API."
      },
      {
        q: "Apakah bisa digunakan untuk tim?",
        a: "Bisa. Paket Free cocok untuk penggunaan individual atau tim kecil, sedangkan Pro mendukung multi-tim dan role management."
      },
    ]);

    const openFaq = ref(null);

    function toggleFaq(i) {
      openFaq.value = openFaq.value === i ? null : i;
    }

    // Simple scroll reveal using IntersectionObserver
    function revealOnScroll(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    }

    onMounted(() => {
      const observer = new IntersectionObserver(revealOnScroll, {
        threshold: 0.12
      });

      document.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
      });
    });

    return {
      faqs,
      openFaq,
      toggleFaq
    };
  },
  directives: {
    // directive untuk observe element (bisa dipakai di template)
    intersect: {
      mounted(el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                el.classList.add("is-revealed");
                obs.unobserve(el);
              }
            });
          },
          { threshold: 0.12 }
        );
        obs.observe(el);
      }
    }
  }
};
</script>

<style scoped>
/* Scroll reveal effect */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 600ms cubic-bezier(.2,.9,.2,1), transform 600ms cubic-bezier(.2,.9,.2,1);
}

/* small stagger via data-delay class if needed */
.reveal.delay-100 {
  transition-delay: 100ms;
}
.reveal.delay-200 {
  transition-delay: 200ms;
}

/* when revealed */
.is-revealed {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* hide v-cloak content initially */
[v-cloak] { display: none; }
</style>
