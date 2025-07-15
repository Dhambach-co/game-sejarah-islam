// === Splash & Loader ===
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

window.onload = async function () {
  showScreen("splash-screen");
  setTimeout(async () => {
    await loadSoal();
    wilayahData = soal["deskripsi wilayah"].kerajaan; // Ambil data wilayah
    progress = wilayahData.map((_, i) => i === 0); // Hanya wilayah pertama yang terbuka
    showScreen("main-menu");
  }, 2000);
};

// === Global State ===
let soal = null;
let wilayahData = [];
let progress = [];
let currentWilayahIndex = 0;
let score = 0;
let kesalahan = 0;
let currentSoal = [];
let currentIdx = 0;

// === Arcade State ===
let arcadeType = "";
let arcadeIndex = 0;
let arcadeScore = 0;
let timer; // Timer untuk arcade

// === Load Soal ===
async function loadSoal() {
  const res = await fetch("data/soal.json"); // Pastikan path ke soal.json benar
  soal = await res.json();
}

// === Menu Navigasi ===
function goToMenu() {
  clearInterval(timer); // Pastikan timer berhenti saat kembali ke menu
  showScreen("main-menu");
}
function openArcade() {
  showScreen("arcade-menu");
}
function openExplore() {
  // loadExplore(); // Fungsi ini belum ada di HTML, jadi dikomentari atau ditambahkan
  // showScreen("explore-screen"); // Layar ini juga belum ada
  alert("Fitur Eksplorasi akan segera hadir!"); // Placeholder
}
function openSettings() {
  // loadSettings(); // Fungsi ini belum ada di HTML, jadi dikomentari atau ditambahkan
  showScreen("settings-screen");
}

// === Journey ===
function startJourney() {
  showScreen("journey-screen");
  const container = document.getElementById("map-container");
  container.innerHTML = "";
  wilayahData.forEach((kerajaan, i) => {
    const btn = document.createElement("button");
    btn.textContent = kerajaan.nama;
    btn.disabled = !progress[i];
    btn.onclick = () => bukaWilayah(i);
    container.appendChild(btn);
  });
}

function bukaWilayah(i) {
  currentWilayahIndex = i;
  score = 0;
  kesalahan = 0;
  document.getElementById("wilayah-title").textContent = wilayahData[i].nama;
  document.getElementById("wilayah-desc").textContent = wilayahData[i].deskripsi || "Deskripsi tidak ditemukan.";
  showScreen("narration-screen");
}

function mulaiQuiz() {
  showScreen("quiz-screen");
  // Pastikan kunci di soal.json sesuai dengan format nama kerajaan
  const namaWilayahUntukKunci = wilayahData[currentWilayahIndex].nama.toLowerCase().replace(/ /g, "_");
  currentSoal = soal["quiz_data"][namaWilayahUntukKunci]?.questions || [];

  currentIdx = 0;
  if (currentSoal.length > 0) {
    tampilSoal();
  } else {
    document.getElementById("quiz-soal").textContent = "Soal belum tersedia untuk wilayah ini.";
    document.getElementById("quiz-opsi").innerHTML = "";
    document.getElementById("quiz-progress").textContent = "";
  }
}

function tampilSoal() {
  const soalObj = currentSoal[currentIdx];
  document.getElementById("quiz-soal").textContent = soalObj.soal;
  const opsi = document.getElementById("quiz-opsi");
  opsi.innerHTML = "";

  soalObj.pilihan.forEach((opsiText) => {
    const btn = document.createElement("button");
    btn.textContent = opsiText;
    btn.onclick = () => cekJawaban(opsiText, soalObj.jawaban);
    opsi.appendChild(btn);
  });

  document.getElementById("quiz-progress").textContent = `Soal ${currentIdx + 1} dari ${currentSoal.length}`;
}

function cekJawaban(jawabanUser, jawabanBenar) {
  const opsi = document.getElementById("quiz-opsi").children;
  Array.from(opsi).forEach((btn) => {
    if (btn.textContent === jawabanBenar) {
      btn.style.backgroundColor = "lightgreen";
    } else if (btn.textContent === jawabanUser) {
      btn.style.backgroundColor = "red";
    }
  });

  if (jawabanUser === jawabanBenar) {
    score += 20;
  } else {
    score -= 10;
    kesalahan++;
  }

  setTimeout(() => {
    currentIdx++;
    if (currentIdx < currentSoal.length) {
      tampilSoal();
    } else {
      selesaiQuiz();
    }
  }, 1000);
}

function selesaiQuiz() {
  document.getElementById("result-score").textContent = score;
  if (kesalahan <= 3) {
    showScreen("result-screen");
    if (currentWilayahIndex + 1 < progress.length) {
      progress[currentWilayahIndex + 1] = true;
    }
  } else {
    showScreen("fail-screen");
  }
}
function shuffleArray(array) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}


// === Arcade Mode Logic ===
function startArcade(type) {
  arcadeType = type;
  arcadeIndex = 0;
  arcadeScore = 0;
  clearInterval(timer); // Hentikan timer sebelumnya jika ada

  if (arcadeType === "true_false") {
    showScreen("arcade-quiz-tf");
    document.getElementById("total-questions").textContent = soal.arcade.true_false.length; // Set total questions
    tampilArcadeSoalTF();
  } else if (arcadeType === "essay") {
    showScreen("arcade-quiz-essay");
    document.getElementById("total-essays").textContent = soal.arcade.essay.length; // Set total essays
    tampilArcadeSoalEssay();
  }
}

// Arcade Benar/Salah
function tampilArcadeSoalTF() {
  clearInterval(timer); // Pastikan timer sebelumnya berhenti
  const data = soal.arcade.true_false;
  if (arcadeIndex >= data.length) {
    selesaiArcade();
    return;
  }
  const soalObj = data[arcadeIndex];

  document.getElementById("tf-question-text").textContent = soalObj.text;
  document.getElementById("current-question").textContent = arcadeIndex + 1;

  let sisa = 10; // Waktu 10 detik
  document.getElementById("timer-count-tf").textContent = sisa;
  timer = setInterval(() => {
    sisa--;
    document.getElementById("timer-count-tf").textContent = sisa;
    if (sisa <= 0) {
      clearInterval(timer);
      // Jika waktu habis, anggap jawaban salah dan lanjut
      lanjutArcade();
    }
  }, 1000);
}

function checkTFAnswer(userAnswer) {
  clearInterval(timer); // Hentikan timer saat jawaban diberikan
  const soalObj = soal.arcade.true_false[arcadeIndex];
  if (userAnswer === soalObj.correct) {
    arcadeScore++;
  }
  lanjutArcade();
}

function lanjutArcade() {
  arcadeIndex++;
  tampilArcadeSoalTF(); // Panggil lagi untuk soal berikutnya atau selesai
}

function selesaiArcade() {
  showScreen("arcade-result");
  const total = arcadeType === "true_false" ? soal.arcade.true_false.length : soal.arcade.essay.length;
  const nilai = Math.round((arcadeScore / total) * 100);
  const grade = nilai >= 90 ? "A" : nilai >= 75 ? "B" : nilai >= 60 ? "C" : "D";
  document.getElementById("arcade-score").textContent = `Skor: ${arcadeScore} dari ${total}`;
  document.getElementById("arcade-grade").textContent = `Indikator: ${grade}`;
}

// Arcade Essay
function tampilArcadeSoalEssay() {
  clearInterval(timer);
  const data = soal.arcade.essay;
  if (arcadeIndex >= data.length) {
    selesaiArcade();
    return;
  }

  const soalObj = data[arcadeIndex];
  let currentEssayJawaban = Array.from({ length: soalObj.answer.length }, () => "");

  document.getElementById("essay-question-text").textContent = soalObj.question;
  document.getElementById("current-essay").textContent = arcadeIndex + 1;

  const jawabanBoxContainer = document.getElementById("jawaban-box-container");
  jawabanBoxContainer.innerHTML = "";
  currentEssayJawaban.forEach(() => {
    const box = document.createElement("div");
    box.className = "jawaban-box";
    box.textContent = "";
    jawabanBoxContainer.appendChild(box);
  });

  const hurufContainer = document.getElementById("pilihan-huruf");
  hurufContainer.innerHTML = "";

  // Tambahkan huruf acak agar lebih banyak
  const hurufBenar = soalObj.answer.toUpperCase().split("");
  const hurufTambahan = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let semuaHuruf = [...hurufBenar];
  while (semuaHuruf.length < hurufBenar.length + 5) {
    const hurufRandom = hurufTambahan[Math.floor(Math.random() * hurufTambahan.length)];
    semuaHuruf.push(hurufRandom);
  }
  semuaHuruf = shuffleArray(semuaHuruf);

  let currentInputIndex = 0;

  function updateJawabanBox() {
    const boxes = document.getElementsByClassName("jawaban-box");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = currentEssayJawaban[i] || "";
    }
  }

  function handleHurufKlik(huruf) {
    if (huruf === "⌫") {
      if (currentInputIndex > 0) {
        currentInputIndex--;
        currentEssayJawaban[currentInputIndex] = "";
        updateJawabanBox();
      }
    } else {
      if (currentInputIndex < currentEssayJawaban.length) {
        currentEssayJawaban[currentInputIndex] = huruf;
        currentInputIndex++;
        updateJawabanBox();
        if (!currentEssayJawaban.includes("")) {
          cekJawabanEssay();
        }
      }
    }
  }

  semuaHuruf.forEach((huruf) => {
    const btn = document.createElement("button");
    btn.textContent = huruf;
    btn.className = "huruf-button";
    btn.onclick = () => handleHurufKlik(huruf);
    hurufContainer.appendChild(btn);
  });

  // Tambahkan tombol backspace
  const tombolBackspace = document.createElement("button");
  tombolBackspace.textContent = "⌫";
  tombolBackspace.className = "huruf-button";
  tombolBackspace.onclick = () => handleHurufKlik("⌫");
  hurufContainer.appendChild(tombolBackspace);

  function cekJawabanEssay() {
    clearInterval(timer);
    const jawabanUser = currentEssayJawaban.join("").toUpperCase();
    const jawabanBenar = soalObj.answer.toUpperCase();

    if (jawabanUser === jawabanBenar) {
      arcadeScore++;
    }

    setTimeout(() => {
      arcadeIndex++;
      tampilArcadeSoalEssay();
    }, 1000);
  }

  // Timer 15 detik
  let sisa = 15;
  document.getElementById("timer-count-essay").textContent = sisa;
  timer = setInterval(() => {
    sisa--;
    document.getElementById("timer-count-essay").textContent = sisa;
    if (sisa <= 0) {
      clearInterval(timer);
      cekJawabanEssay();
    }
  }, 1000);
}



function cekJawabanEssay() {
  clearInterval(timer);
  const jawabanUser = document.getElementById("arcade-jawaban-essay").value.trim().toLowerCase();
  const jawabanBenar = soal.arcade.essay[arcadeIndex].answer.toLowerCase();

  if (jawabanUser === jawabanBenar) {
    arcadeScore++;
  }

  lanjutArcadeEssay();
}

function lanjutArcadeEssay() {
  arcadeIndex++;
  tampilArcadeSoalEssay(); // Panggil lagi untuk soal berikutnya atau selesai
}

// === Explore (Placeholder) ===
function loadExplore() {
  const konten = document.getElementById("explore-content");
  konten.innerHTML = "<p>Konten eksplorasi akan ditambahkan di sini.</p>";
}

// === Settings (Placeholder) ===
function loadSettings() {
  const panel = document.getElementById("settings-content");
  panel.innerHTML = "<p>Pengaturan akan tersedia di sini.</p>";
}
