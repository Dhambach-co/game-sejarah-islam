// ===================== GLOBAL STATE =====================
let coin = 100;
let currentQuestionIndex = 0;
let currentQuestions = [];
let currentRegion = '';
let allCorrect = true;

// ===================== NAVIGATION =====================
function goToMenu() {
  hideAll();
  document.getElementById('frame-menu').classList.remove('hidden');
}

function goToStartJourney() {
  hideAll();
  document.getElementById('frame-start').classList.remove('hidden');
}

function backToMenu() {
  hideAll();
  document.getElementById('frame-menu').classList.remove('hidden');
}

function backToStart() {
  hideAll();
  document.getElementById('frame-start').classList.remove('hidden');
}

function backToNarrative() {
  hideAll();
  document.getElementById(`frame-narrative-${currentRegion}`).classList.remove('hidden');
}

function hideAll() {
  document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
}

// ===================== REGION OPENERS =====================
function openNarrativePerlak() {
  currentRegion = 'perlak';
  hideAll();
  document.getElementById('frame-narrative-perlak').classList.remove('hidden');
  document.getElementById('deskripsi-perlak').textContent = perlakDescription;
}

function openNarrativeSamudra() {
  currentRegion = 'samudra';
  hideAll();
  document.getElementById('frame-narrative-samudra').classList.remove('hidden');
  document.getElementById('deskripsi-samudra').textContent = samudraDescription;
}

function openNarrativeAceh() {
  currentRegion = 'aceh';
  hideAll();
  document.getElementById('frame-narrative-aceh').classList.remove('hidden');
  document.getElementById('deskripsi-aceh').textContent = acehDescription;
}

function openNarrativeDeli() {
  currentRegion = 'deli';
  hideAll();
  document.getElementById('frame-narrative-deli').classList.remove('hidden');
  document.getElementById('deskripsi-deli').textContent = deliDescription;
}

function openNarrativeSerdang() {
  currentRegion = 'serdang';
  hideAll();
  document.getElementById('frame-narrative-serdang').classList.remove('hidden');
  document.getElementById('deskripsi-serdang').textContent = serdangDescription;
}

function openNarrativeLangkat() {
  currentRegion = 'langkat';
  hideAll();
  document.getElementById('frame-narrative-langkat').classList.remove('hidden');
  document.getElementById('deskripsi-langkat').textContent = langkatDescription;
}

function openNarrativeSiak() {
  currentRegion = 'siak';
  hideAll();
  document.getElementById('frame-narrative-siak').classList.remove('hidden');
  document.getElementById('deskripsi-siak').textContent = siakDescription;
}

function openNarrativeIndragiri() {
  currentRegion = 'indragiri';
  hideAll();
  document.getElementById('frame-narrative-indragiri').classList.remove('hidden');
  document.getElementById('deskripsi-indragiri').textContent = indragiriDescription;
}


// ===================== QUIZ START =====================
function startQuizPerlak() {
  currentRegion = 'perlak';
  currentQuestions = perlakQuestions;
  startQuiz();
}

function startQuizSamudra() {
  currentRegion = 'samudra';
  currentQuestions = samudraQuestions;
  startQuiz();
}

function startQuizAceh() {
  currentRegion = 'aceh';
  currentQuestions = acehQuestions;
  startQuiz();
}

function startQuizDeli() {
  currentRegion = 'deli';
  currentQuestions = deliQuestions;
  startQuiz();
}

function startQuizSerdang() {
  currentRegion = 'serdang';
  currentQuestions = serdangQuestions;
  startQuiz();
}

function startQuizLangkat() {
  currentRegion = 'langkat';
  currentQuestions = langkatQuestions;
  startQuiz();
}

function startQuizSiak() {
  currentRegion = 'siak';
  currentQuestions = siakQuestions;
  startQuiz();
}

function startQuizIndragiri() {
  currentRegion = 'indragiri';
  currentQuestions = indragiriQuestions;
  startQuiz();
}


function startQuiz() {
  currentQuestionIndex = 0;
  coin = 100;
  allCorrect = true;
  document.getElementById('coin').textContent = coin;
  showQuestion();
}

// ===================== SHOW QUESTION =====================
function showQuestion() {
  hideAll();
  if (currentQuestionIndex >= currentQuestions.length) {
    if (allCorrect) {
      document.getElementById('coin-success').textContent = coin;
      document.getElementById('frame-quiz-success').classList.remove('hidden');
      unlockNextRegion();
    } else {
      document.getElementById('coin-fail').textContent = coin;
      document.getElementById('frame-quiz-failed').classList.remove('hidden');
    }
    return;
  }

  const question = currentQuestions[currentQuestionIndex];
  document.getElementById('frame-question').classList.remove('hidden');
  document.getElementById('question-text').textContent = question.text;

  for (let key of ['A', 'B', 'C', 'D']) {
    const btn = document.getElementById(key);
    btn.textContent = key + '. ' + question.options[key];
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
  }

  document.getElementById('feedback').textContent = '';
  document.getElementById('coin').textContent = coin;
}

function checkAnswer(selected) {
  const question = currentQuestions[currentQuestionIndex];
  const correct = question.correct;
  ['A', 'B', 'C', 'D'].forEach(btn => document.getElementById(btn).disabled = true);

  if (selected === correct) {
    document.getElementById('feedback').textContent = 'BENAR! +20';
    document.getElementById(correct).classList.add('correct');
    coin += 20;
  } else {
    document.getElementById('feedback').textContent = 'SALAH! -10';
    document.getElementById(selected).classList.add('wrong');
    document.getElementById(correct).classList.add('correct');
    coin -= 10;
    allCorrect = false;
  }

  document.getElementById('coin').textContent = coin;

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 600);
}

// ===================== UNLOCK NEXT =====================
function unlockNextRegion() {
  const unlockMap = {
    perlak: 'btn-samudra',
    samudra: 'btn-aceh',
    aceh: 'btn-deli',
    deli: 'btn-serdang',
    serdang: 'btn-langkat',
    langkat: 'btn-siak',
    siak: 'btn-indragiri'
  };

  const nextBtnId = unlockMap[currentRegion];
  if (nextBtnId) {
    const nextBtn = document.getElementById(nextBtnId);
    nextBtn.disabled = false;
    nextBtn.classList.remove('locked');
  }
}

let arcadeScore = 0;
let arcadeQuestions = [];
let arcadeIndex = 0;
let arcadeType = 'quiz'; // or 'essay'

const arcadeQuestionPool = [
  { text: "Kesultanan Langkat memiliki istana yang disebut Istana Tanjung Pura.", correct: true },
  { text: "Kerajaan Perlak memiliki dua golongan utama, yaitu Syiah dan Sunni.", correct: true },
  { text: "Kerajaan Aceh Darussalam dikenal sebagai pusat perdagangan dan penyebaran Islam di Asia Tenggara.", correct: true },
  { text: "Kesultanan Deli terkenal sebagai penghasil emas terbesar di Sumatra.", correct: false, explanation: "Kesultanan Deli terkenal sebagai penghasil tembakau berkualitas tinggi, terutama tembakau deli." },
  { text: "Sultan Ma'mun Al Rasyid Perkasa Alam merupakan sultan yang memimpin pada masa kejayaan Kesultanan Deli.", correct: true },
  { text: "Kesultanan Serdang awalnya merupakan bagian dari Kesultanan Deli.", correct: true },
  { text: "Kesultanan Siak mencapai kejayaan pada masa Sultan Syarif Kasim II.", correct: false, explanation: "Puncak kejayaan terjadi pada masa Sultan Syarif Kasim I, sedangkan Sultan Syarif Kasim II adalah sultan terakhir." },
  { text: "Kerajaan Perlak adalah kerajaan Islam pertama di Indonesia.", correct: true },
  { text: "Kesultanan Serdang dikenal sebagai pusat penyebaran agama Kristen di Sumatra Timur.", correct: false, explanation: "Kesultanan Serdang merupakan kerajaan Islam." },
  { text: "Kesultanan Indragiri sempat menjadi bagian dari pengaruh Kerajaan Majapahit.", correct: true },
  { text: "Kesultanan Deli tidak pernah menjalin hubungan dengan Belanda.", correct: false, explanation: "Kesultanan Deli menjalin kerja sama dengan Belanda, terutama dalam pengelolaan perkebunan tembakau." },
  { text: "Sultan Iskandar Muda adalah salah satu raja terbesar dari Kerajaan Aceh Darussalam.", correct: true },
  { text: "Kerajaan Samudra Pasai hanya berdiri selama 20 tahun.", correct: false, explanation: "Berdiri sekitar abad ke-13 sampai 15 M, lebih dari 100 tahun." },
  { text: "Kesultanan Siak Sri Indrapura terletak di wilayah Riau, Sumatra.", correct: true },
  { text: "Kesultanan Langkat berdiri pada abad ke-20.", correct: false, explanation: "Kesultanan Langkat berdiri pada abad ke-19, sekitar tahun 1869." },
  { text: "Kesultanan Indragiri mulai mengalami kemunduran sejak masuknya pengaruh Belanda.", correct: true },
  { text: "Bahasa yang digunakan dalam perdagangan di Samudra Pasai adalah bahasa Arab dan Melayu.", correct: true },
  { text: "Sultan Syarif Kasim II menyumbangkan harta pribadinya untuk kemerdekaan Indonesia.", correct: true },
  { text: "Kerajaan Aceh Darussalam runtuh pada abad ke-17 karena invasi dari Inggris.", correct: false, explanation: "Kerajaan Aceh mulai melemah pada abad ke-17 karena perpecahan internal dan tekanan dari Belanda, bukan Inggris." },
  { text: "Pendiri Kesultanan Serdang adalah Sultan Mahmud Perkasa Alam.", correct: false, explanation: "Pendiri Kesultanan Serdang adalah Tuanku Umar Johan Pahlawan, putra dari Sultan Deli." },
   { text: "Kerajaan Aceh Darussalam mencapai puncak kejayaan pada masa pemerintahan Sultan Iskandar Muda.", correct: true },
  { text: "Kesultanan Langkat runtuh karena diserang oleh kerajaan dari Jawa.", correct: false, explanation: "Kesultanan Langkat runtuh karena revolusi sosial tahun 1946, bukan karena serangan kerajaan dari Jawa." },
  { text: "Letak Kerajaan Samudra Pasai berada di pesisir selatan Pulau Jawa.", correct: false, explanation: "Letak sebenarnya adalah di pesisir utara Aceh." },
  { text: "Kesultanan Indragiri sudah tidak memiliki kekuasaan politik, hanya sebagai warisan budaya dan sejarah.", correct: true },
  { text: "Sultan pertama Kesultanan Indragiri adalah Raja Merlang Sang Nata Pulang.", correct: true },
  { text: "Agama resmi Kesultanan Deli adalah Islam.", correct: true },
  { text: "Bahasa resmi kerajaan Aceh Darussalam adalah bahasa Belanda.", correct: false, explanation: "Bahasa yang digunakan di Kerajaan Aceh adalah bahasa Melayu, bukan Belanda." },
  { text: "Kesultanan Serdang runtuh setelah kemerdekaan Indonesia.", correct: true },
  { text: "Kerajaan Samudra Pasai terkenal sebagai pusat perdagangan dan penyebaran Islam.", correct: true },
  { text: "Kesultanan Siak berdiri sebelum Kerajaan Sriwijaya.", correct: false, explanation: "Kerajaan Sriwijaya berdiri jauh lebih dulu pada abad ke-7, sedangkan Siak berdiri pada abad ke-18." },
  { text: "Kesultanan Langkat tidak pernah memiliki hubungan dengan Kesultanan Deli.", correct: false, explanation: "Kesultanan Langkat memiliki hubungan kekerabatan dan politik dengan Kesultanan Deli." },
  { text: "Kerajaan Aceh Darussalam berdiri pada abad ke-13 Masehi.", correct: false, explanation: "Kerajaan Aceh Darussalam berdiri pada abad ke-16 Masehi, sekitar tahun 1511." },
  { text: "Kerajaan Perlak menjalin hubungan dagang dengan Arab, Persia, dan India.", correct: true },
  { text: "Sultan pertama Kerajaan Perlak adalah Sultan Malik As-Saleh.", correct: false, explanation: "Sultan pertama Perlak adalah Sultan Alaiddin Syed Maulana Abdul Aziz Shah." },
  { text: "Kesultanan Deli berdiri setelah Kerajaan Sriwijaya runtuh.", correct: false, explanation: "Kesultanan Deli berdiri jauh setelah runtuhnya Sriwijaya, sekitar tahun 1630-an." },
  { text: "Kerajaan Samudra Pasai pernah dijajah oleh Belanda pada abad ke-13.", correct: false, explanation: "Belanda belum datang ke Indonesia saat itu." },
  { text: "Kesultanan Siak tidak pernah berhubungan dengan bangsa Eropa.", correct: false, explanation: "Kesultanan Siak pernah berhubungan dan berkonflik dengan Belanda dan Inggris." },
  { text: "Kesultanan Indragiri didirikan setelah masa penjajahan Belanda berakhir.", correct: false, explanation: "Kesultanan Indragiri berdiri sebelum penjajahan Belanda, sekitar abad ke-13 Masehi." },
  { text: "Agama resmi Kesultanan Siak adalah Islam.", correct: true },
  { text: "Kerajaan Samudra Pasai berdiri pada abad ke-13 Masehi.", correct: true },
  { text: "Kesultanan Deli terkenal sebagai penghasil emas terbesar di Sumatra.", correct: false, explanation: "Kesultanan Deli terkenal sebagai penghasil tembakau berkualitas tinggi, terutama tembakau deli." },
  { text: "Kerajaan Aceh Darussalam dikenal sebagai pusat perdagangan dan penyebaran Islam di Asia Tenggara.", correct: true },
  { text: "Kerajaan Perlak memiliki dua golongan utama, yaitu Syiah dan Sunni.", correct: true },
  { text: "Bahasa yang digunakan dalam perdagangan di Samudra Pasai adalah bahasa Arab dan Melayu.", correct: true },
  { text: "Kesultanan Serdang merupakan kerajaan Islam.", correct: true },
  { text: "Kesultanan Indragiri mulai mengalami kemunduran sejak masuknya pengaruh Belanda.", correct: true },
  { text: "Sultan Ma'mun Al Rasyid Perkasa Alam merupakan sultan yang memimpin pada masa kejayaan Kesultanan Deli.", correct: true },
  { text: "Kerajaan Perlak runtuh karena diserang oleh Portugis.", correct: false, explanation: "Kerajaan Perlak bersatu dengan Kerajaan Samudra Pasai." },
  { text: "Kesultanan Langkat berdiri pada abad ke-20.", correct: false, explanation: "Kesultanan Langkat berdiri pada abad ke-19, sekitar tahun 1869." },
  { text: "Kesultanan Serdang dikenal sebagai pusat penyebaran agama Kristen di Sumatra Timur.", correct: false, explanation: "Kesultanan Serdang merupakan kerajaan Islam." },
  { text: "Kesultanan Indragiri tidak pernah berhubungan dengan Kerajaan Malaka.", correct: false, explanation: "Kesultanan Indragiri pernah menjalin hubungan dengan Kerajaan Malaka." },
  { text: "Kerajaan Aceh Darussalam runtuh pada abad ke-17 karena invasi dari Inggris.", correct: false, explanation: "Kerajaan Aceh mulai melemah karena perpecahan internal dan tekanan dari Belanda, bukan Inggris." },
  { text: "Kesultanan Deli tidak pernah menjalin hubungan dengan Belanda.", correct: false, explanation: "Kesultanan Deli menjalin kerja sama dengan Belanda, terutama dalam pengelolaan perkebunan tembakau." },
  { text: "Bahasa resmi yang digunakan di Kerajaan Perlak adalah bahasa Arab.", correct: false, explanation: "Bahasa lokal digunakan, meskipun pengaruh Arab ada." },
  { text: "Kerajaan Perlak dikenal juga dengan nama Peureulak.", correct: true },
  { text: "Kesultanan Serdang berdiri karena konflik suksesi di Kesultanan Deli.", correct: true },
  { text: "Kerajaan Samudra Pasai hanya berdiri selama 20 tahun.", correct: false, explanation: "Kerajaan ini berdiri lebih dari 100 tahun, sejak abad ke-13 sampai 15 Masehi." },
  { text: "Kesultanan Siak mencapai kejayaan pada masa Sultan Syarif Kasim II.", correct: false, explanation: "Puncak kejayaan terjadi pada masa Sultan Syarif Kasim I." },
  { text: "Kesultanan Langkat memiliki istana yang disebut Istana Tanjung Pura.", correct: true },
  { text: "Sultan Syarif Kasim II menyumbangkan harta pribadinya untuk kemerdekaan Indonesia.", correct: true },
   { text: "Kesultanan Langkat runtuh karena diserang oleh kerajaan dari Jawa.", correct: false, explanation: "Kesultanan Langkat runtuh karena revolusi sosial tahun 1946, bukan karena serangan dari Jawa." },
  { text: "Kesultanan Siak Sri Indrapura terletak di wilayah Riau, Sumatra.", correct: true },
  { text: "Kesultanan Siak runtuh karena serangan dari Kerajaan Aceh.", correct: false, explanation: "Kesultanan Siak runtuh karena bergabung dengan Republik Indonesia tahun 1946." },
  { text: "Kesultanan Serdang memiliki hubungan baik dengan Belanda.", correct: true, explanation: "Kesultanan Serdang sempat menjalin kerja sama dengan Belanda dalam bidang pemerintahan." },
  { text: "Kerajaan Perlak adalah kerajaan Islam pertama di Indonesia.", correct: true },
  { text: "Kesultanan Indragiri sudah tidak memiliki kekuasaan politik, hanya sebagai warisan budaya dan sejarah.", correct: true },
  { text: "Kesultanan Indragiri berdiri setelah masa penjajahan Belanda berakhir.", correct: false, explanation: "Kesultanan Indragiri berdiri sekitar abad ke-13 Masehi, sebelum penjajahan Belanda." },
  { text: "Kesultanan Deli masih memiliki garis keturunan yang hidup hingga saat ini.", correct: true },
  { text: "Kesultanan Siak tidak pernah berhubungan dengan bangsa Eropa.", correct: false, explanation: "Kesultanan Siak pernah berhubungan dan berkonflik dengan Belanda dan Inggris." },
  { text: "Kerajaan Aceh Darussalam berdiri pada abad ke-13 Masehi.", correct: false, explanation: "Kerajaan Aceh Darussalam berdiri pada abad ke-16 Masehi, sekitar tahun 1511." },
  { text: "Kesultanan Serdang didirikan pada abad ke-18 Masehi.", correct: true },
  { text: "Kesultanan Indragiri sempat menjadi bagian dari pengaruh Kerajaan Majapahit.", correct: true },
  { text: "Kesultanan Langkat masih memegang kekuasaan politik penuh hingga saat ini.", correct: false, explanation: "Setelah kemerdekaan, kekuasaan politik Kesultanan Langkat berakhir." },
  { text: "Letak Kerajaan Samudra Pasai berada di pesisir selatan Pulau Jawa.", correct: false, explanation: "Letaknya di pesisir utara Aceh." },
  { text: "Sultan pertama Kerajaan Perlak adalah Sultan Malik As-Saleh.", correct: false, explanation: "Sultan pertama Kerajaan Perlak adalah Sultan Alaiddin Syed Maulana Abdul Aziz Shah." },
  { text: "Kesultanan Langkat memiliki hubungan dengan Kesultanan Deli.", correct: true },
  { text: "Kesultanan Siak terkenal sebagai pusat perdagangan dan penyebaran Islam di wilayah timur Sumatra.", correct: true },
  { text: "Sultan Iskandar Muda adalah salah satu raja terbesar dari Kerajaan Aceh Darussalam.", correct: true },
  { text: "Kerajaan Samudra Pasai pernah dijajah oleh Belanda pada abad ke-13.", correct: false, explanation: "Belanda belum datang ke Indonesia saat itu." },
  { text: "Kerajaan Perlak berdiri pada abad ke-15 Masehi.", correct: false, explanation: "Kerajaan Perlak berdiri pada abad ke-9 Masehi." },
  
];

function startArcadeMode() {
  hideAll();
  document.getElementById('frame-arcade').classList.remove('hidden');
}

function startArcadeBenarSalah() {
  startArcadeQuiz();
}

function showArcadeQuestion() {
  hideAll();
  if (arcadeIndex >= arcadeQuestions.length) {
    showArcadeResult();
    return;
  }

  const q = arcadeQuestions[arcadeIndex];
  document.getElementById('frame-arcade-question').classList.remove('hidden');
  document.getElementById('arcade-question-text').textContent = q.text;

  const btnTrue = document.getElementById('arcade-btn-true');
  const btnFalse = document.getElementById('arcade-btn-false');

  btnTrue.disabled = false;
  btnFalse.disabled = false;

  btnTrue.onclick = () => checkArcadeAnswer(true);
  btnFalse.onclick = () => checkArcadeAnswer(false);
}

function checkArcadeAnswer(answer) {
  const correct = arcadeQuestions[arcadeIndex].correct;
  if (answer === correct) arcadeScore += 10;
  arcadeIndex++;
  showArcadeQuestion();
}

function showArcadeResult() {
  hideAll();
  document.getElementById('frame-arcade-result').classList.remove('hidden');
  document.getElementById('arcade-final-score').textContent = arcadeScore;
}

function startArcadeEssay() {
  arcadeType = 'essay';
  hideAll();
  document.getElementById('frame-arcade-essay').classList.remove('hidden');
}

function submitEssayAnswer() {
  const userAnswer = document.getElementById('arcade-essay-input').value;
  console.log('Jawaban Essay:', userAnswer);
  alert('Jawaban kamu sudah direkam!');
  startArcadeMode();
}

// ===================== DESKRIPSI SETIAP KERAJAAN =====================

const perlakDescription = "Kerajaan Perlak adalah kerajaan Islam pertama di Indonesia yang berdiri pada tahun 840 M di wilayah Aceh Timur, Provinsi Aceh. Didirikan oleh Sultan Alaiddin Syed Maulana Abdul Aziz Shah, kerajaan ini berkembang sebagai pusat penyebaran Islam dan perdagangan di Asia Tenggara. Kerajaan Perlak mengalami masa kejayaan melalui hubungan dagang dengan Arab, Persia, dan India. Kerajaan ini kemudian mengalami perpecahan menjadi Perlak Barat dan Perlak Timur karena konflik internal, sebelum akhirnya bersatu kembali dan melebur ke dalam Kerajaan Samudra Pasai pada abad ke-13.";
const samudraDescription = "Kerajaan Samudra Pasai merupakan kerajaan Islam pertama di Asia Tenggara yang berdiri pada abad ke-13 di pesisir utara Aceh. Didirikan oleh Sultan Malik al-Saleh, kerajaan ini menjadi pusat perdagangan dan penyebaran agama Islam. Samudra Pasai terkenal dengan kegiatan perdagangan internasional, khususnya ekspor emas dan lada. Letaknya yang strategis membuat kerajaan ini berkembang pesat dan dikenal luas oleh pedagang dari Timur Tengah, India, dan Tiongkok. Kerajaan ini mulai melemah pada abad ke-15 dan akhirnya takluk oleh Kerajaan Aceh Darussalam.";
const acehDescription = "Kerajaan Aceh Darussalam adalah salah satu kerajaan Islam terbesar dan terkuat di Sumatra yang menjadi pusat pendidikan dan dakwah Islam pada abad ke-16 dan 17. Kerajaan ini didirikan pada tahun 1496 M oleh Sultan Ali Mughayat Syah di ujung utara Pulau Sumatra sebagai bentuk perlawanan terhadap penjajahan Portugis di Malaka. Kerajaan ini mencapai puncak kejayaan pada masa pemerintahan Sultan Iskandar Muda (1607–1636), yang berhasil memperluas wilayah kekuasaan hingga ke Semenanjung Malaya dan menjadikan Aceh sebagai pusat perdagangan dan penyebaran Islam di Asia Tenggara. Setelah wafatnya Iskandar Muda, kerajaan mulai melemah akibat konflik internal dan tekanan dari bangsa Eropa terutama Belanda. Keruntuhan Kerajaan Aceh terjadi secara bertahap hingga akhirnya Sultan terakhir, Sultan Muhammad Daud Syah menyerah kepada Belanda pada tahun 1903.";
const deliDescription = "Kesultanan Deli adalah kerajaan Islam di Sumatera Utara yang didirikan pada tahun 1632 oleh Tuanku Panglima Gocah Pahlawan. Awalnya berada di bawah pengaruh Kesultanan Aceh, Deli kemudian berkembang menjadi kerajaan merdeka yang mencapai puncak kejayaan pada masa Sultan Ma’mun Al Rasyid berkat perdagangan tembakau yang mendunia. Kesultanan ini terkenal dengan warisan budaya dan arsitekturnya, seperti Istana Maimun dan Masjid Raya Al-Mashun di Medan. Meskipun kekuasaan politiknya berakhir pada masa kolonial dan pasca-kemerdekaan, Kesultanan Deli tetap hidup sebagai simbol budaya dan identitas Melayu di Sumatera Utara hingga kini.";
const serdangDescription = "Kesultanan Serdang berdiri pada tahun 1723 M setelah konflik perebutan takhta di Kesultanan Deli, dan didirikan oleh Tuanku Umar Johan Alamsyah yang mendapat dukungan dari para raja urung seperti Sunggal dan Senembah. Kesultanan ini mencapai puncak kejayaan pada masa pemerintahan Sultan Thaf Sinar Baharshah (1817–1850 M), ketika Serdang berkembang dalam perdagangan, penyebaran Islam, dan kehidupan masyarakat yang aman serta makmur. Masa kemunduran dimulai saat munculnya penjajahan Belanda dan konflik internal di bawah Sultan Basyaruddin Shariful Alamsyah (1819–1880 M), hingga akhirnya runtuh pada masa Sultan Sulaiman Syariful Alamsyah (1886–1946 M) setelah Revolusi Sosial 1946, di mana Serdang menyerahkan kekuasaan kepada Republik Indonesia.";
const langkatDescription = "Kesultanan Langkat didirikan pada abad ke-17 oleh Raja Dewa Shahdan, seorang bangsawan Melayu yang kemudian menjadi penguasa pertama wilayah Langkat. Kesultanan ini berkembang menjadi salah satu kerajaan penting di pesisir timur Sumatra, terutama karena letaknya yang strategis dan kekayaan alamnya. Masa kejayaan kesultanan terjadi pada abad ke-19, khususnya saat Sultan Musa memimpin. Pada masa ini, Kesultanan Langkat menjalin kerja sama ekonomi dengan pemerintah kolonial Belanda, terutama dalam sektor perkebunan tembakau Deli yang sangat menguntungkan. Namun, kemunduran mulai tampak pada awal abad ke-20 ketika dominasi Belanda semakin kuat dan peran kesultanan mulai dipinggirkan, hingga akhirnya peran politik Kesultanan Langkat secara perlahan menghilang seiring kemerdekaan Indonesia.";
const siakDescription = "Kesultanan Siak Sri Indrapura adalah kerajaan Islam yang berdiri pada tahun 1723 di wilayah Riau, didirikan oleh Sultan Abdul Jalil Rahmat Syah setelah berpisah dari Johor. Kerajaan ini mencapai masa kejayaan pada abad ke-19 melalui perdagangan internasional dan penyebaran Islam, terutama di bawah Sultan Syarif Kasim I dan Syarif Hasyim. Letaknya yang strategis di jalur Selat Malaka menjadikannya pusat ekonomi dan dakwah Islam. Namun, pengaruh Belanda dan perubahan ekonomi menyebabkan kemundurannya, hingga akhirnya Kesultanan Siak dibubarkan pada 1946 ketika Sultan Syarif Kasim II menyerahkan kekuasaan kepada Republik Indonesia.";
const indragiriDescription = "Kesultanan Indragiri didirikan sekitar abad ke-14 oleh Raja Merlang I, seorang bangsawan Melayu yang pertama kali memeluk Islam di wilayah tersebut. Kesultanan ini mencapai masa kejayaan pada abad ke-16 hingga 17 dengan berkembangnya perdagangan dan kuatnya pengaruh Islam di wilayah pesisir timur Sumatera. Masa kemunduran terjadi sejak abad ke-18 akibat campur tangan Belanda, konflik internal kerajaan, dan berkurangnya kekuasaan sultan hingga akhirnya dihapuskan secara resmi oleh pemerintah Indonesia pada tahun 1946.";

// ===================== QUESTIONS =====================
const perlakQuestions = [
  {
    text: "Kerajaan Perlak berdiri pada tahun...",
    options: {
      A: "1200 M",
      B: "1000 M",
      C: "840 M",
      D: "1500 M"
    },
    correct: "C"
  },
  {
    text: "Siapakah raja pertama Kerajaan Perlak?",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Sultan Malik al-Saleh",
      C: "Sultan Alaiddin Syed Maulana Abdul Aziz Shah",
      D: "Sultan Zainal Abidin"
    },
    correct: "C"
  },
  {
    text: "Kerajaan Perlak berkembang pesat dalam bidang...",
    options: {
      A: "Pertambangan emas",
      B: "Pertanian",
      C: "Perdagangan dan dakwah Islam",
      D: "Perikanan"
    },
    correct: "C"
  },
  {
    text: "Salah satu penyebab runtuhnya Kerajaan Perlak adalah...",
    options: {
      A: "Gunung meletus",
      B: "Serangan dari Belanda",
      C: "Konflik internal dan serangan kerajaan lain",
      D: "Bencana banjir"
    },
    correct: "C"
  },
  {
    text: "Setelah runtuh, wilayah Kerajaan Perlak bergabung dengan...",
    options: {
      A: "Kerajaan Aceh",
      B: "Kerajaan Sriwijaya",
      C: "Kerajaan Majapahit",
      D: "Kerajaan Samudra Pasai"
    },
    correct: "D"
  },
  {
    text: "Kenapa nama “Perlak” digunakan?",
    options: {
      A: "Diambil dari nama sungai",
      B: "Karena banyak pohon perlak",
      C: "Nama raja pertamanya",
      D: "Nama pelabuhan zaman Belanda"
    },
    correct: "B"
  },
  {
    text: "Apa tujuan utama kedatangan Nahkoda Khalifah?",
    options: {
      A: "Menaklukkan kerajaan Hindu",
      B: "Menjalin hubungan diplomatik",
      C: "Berdagang dan menyebarkan Islam",
      D: "Menjadi raja di Perlak"
    },
    correct: "C"
  },
  {
    text: "Apa gelar raja-raja dalam Kerajaan Perlak setelah masuk Islam?",
    options: {
      A: "Meurah",
      B: "Datu",
      C: "Maharaja",
      D: "Sultan"
    },
    correct: "D"
  },
  {
    text: "Kenapa Perlak disebut “Bandar Khalifah”?",
    options: {
      A: "Karena letaknya di Arab",
      B: "Karena banyak ulama tinggal di sana",
      C: "Untuk menghormati Nahkoda Khalifah",
      D: "Karena nama kayu perlak diganti"
    },
    correct: "C"
  },
  {
    text: "Apa penyebab perang saudara di Perlak?",
    options: {
      A: "Serangan Sriwijaya",
      B: "Perselisihan Sunni dan Syiah",
      C: "Krisis ekonomi",
      D: "Kedatangan Belanda"
    },
    correct: "B"
  },
  {
    text: "Apa nama lembaga pendidikan Islam yang didirikan pada masa Sultan Abdurrahim Syah?",
    options: {
      A: "Dayah Cot Kala",
      B: "Dayah Salasari",
      C: "Dayah Bukit Cibrek",
      D: "Dayah Bandar Khalifah"
    },
    correct: "C"
  },
  {
    text: "Siapa perempuan yang jadi pejabat tinggi di Perlak?",
    options: {
      A: "Putri Nurul A’la",
      B: "Putri Ratna Keumala",
      C: "Putri Mayang Seludang",
      D: "Putri Barinsyah"
    },
    correct: "A"
  },
  {
    text: "Apa nama kitab yang jadi sumber sejarah Perlak?",
    options: {
      A: "Hikayat Raja-Raja Pasai",
      B: "Sejarah Melayu",
      C: "Idharul Haq",
      D: "Tajus Salatin"
    },
    correct: "C"
  },
  {
    text: "Apa isi utama naskah Idharul Haq?",
    options: {
      A: "Sejarah Majapahit",
      B: "Silsilah Sultan Perlak dan dakwah Islam",
      C: "Kisah pelaut Cina",
      D: "Ekonomi Sriwijaya"
    },
    correct: "B"
  },
  {
    text: "Siapa tokoh Syiah yang ikut menyebarkan Islam di Perlak?",
    options: {
      A: "Ali bin Abi Thalib",
      B: "Ja’far Shiddiq",
      C: "Hasan al-Basri",
      D: "Malik al-Saleh"
    },
    correct: "B"
  }
];

const samudraQuestions = [
  {
    text: "Pendiri Kerajaan Samudra Pasai adalah...",
    options: {
      A: "Sultan Malik al-Saleh",
      B: "Sultan Iskandar Muda",
      C: "Sultan Muhammad Johan Syah",
      D: "Sultan Mahmud Syah"
    },
    correct: "A"
  },
  {
    text: "Kerajaan Samudra Pasai berdiri pada abad ke...",
    options: {
      A: "10",
      B: "13",
      C: "15",
      D: "17"
    },
    correct: "B"
  },
  {
    text: "Samudra Pasai dikenal sebagai pusat perdagangan karena...",
    options: {
      A: "Letaknya di daerah pegunungan",
      B: "Banyak tambang emas",
      C: "Terletak di jalur perdagangan internasional",
      D: "Dikuasai oleh VOC"
    },
    correct: "C"
  },
  {
    text: "Mata uang yang digunakan di Samudra Pasai adalah...",
    options: {
      A: "Real",
      B: "Dinar emas",
      C: "Dollar",
      D: "Dirham"
    },
    correct: "B"
  },
  {
    text: "Samudra Pasai mulai melemah akibat...",
    options: {
      A: "Gempa bumi",
      B: "Serangan dari Kerajaan Majapahit",
      C: "Perang saudara",
      D: "Serangan dari Portugis"
    },
    correct: "D"
  },
  {
    text: "Apa nama pelabuhan penting di Samudra Pasai?",
    options: {
      A: "Lamuri",
      B: "Pasai",
      C: "Gresik",
      D: "Barus"
    },
    correct: "B"
  },
  {
    text: "Sultan Malik al-Zahir dikenal karena...",
    options: {
      A: "Meninggalkan Islam",
      B: "Menyebarkan Hindu",
      C: "Mengembangkan pendidikan dan dakwah Islam",
      D: "Membentuk VOC"
    },
    correct: "C"
  },
  {
    text: "Kitab atau sumber sejarah yang menyebutkan Samudra Pasai...",
    options: {
      A: "Nagarakretagama",
      B: "Idharul Haq",
      C: "Hikayat Raja-raja Pasai",
      D: "Babad Tanah Jawi"
    },
    correct: "C"
  },
  {
    text: "Bangsa yang pertama kali menjalin hubungan diplomatik dengan Samudra Pasai...",
    options: {
      A: "Belanda",
      B: "Cina",
      C: "Inggris",
      D: "Turki"
    },
    correct: "B"
  },
  {
    text: "Wilayah Samudra Pasai sekarang berada di provinsi...",
    options: {
      A: "Riau",
      B: "Aceh",
      C: "Sumatera Barat",
      D: "Jambi"
    },
    correct: "B"
  },
  {
    text: "Sultan Samudra Pasai yang disebut dalam catatan Ibnu Battuta...",
    options: {
      A: "Malik al-Zahir",
      B: "Malik al-Saleh",
      C: "Iskandar Syah",
      D: "Muhammad Johan Syah"
    },
    correct: "A"
  },
  {
    text: "Bukti kuat pengaruh Arab di Samudra Pasai terlihat dari...",
    options: {
      A: "Mata uang",
      B: "Gelar sultan dan batu nisan berbahasa Arab",
      C: "Istana berarsitektur Hindu",
      D: "Bangunan bercorak Tionghoa"
    },
    correct: "B"
  },
  {
    text: "Samudra Pasai mengalami masa keemasan pada abad...",
    options: {
      A: "12",
      B: "13",
      C: "14",
      D: "15"
    },
    correct: "C"
  },
  {
    text: "Faktor utama kemunduran Samudra Pasai sebelum jatuh ke Portugis adalah...",
    options: {
      A: "Wabah penyakit",
      B: "Perpecahan internal dan serangan Aceh",
      C: "Invasi Jepang",
      D: "Letusan gunung"
    },
    correct: "B"
  },
  {
    text: "Samudra Pasai dikenal juga sebagai kerajaan...",
    options: {
      A: "Perlak",
      B: "Bandar Khalifah",
      C: "Darussalam",
      D: "Islam pertama di Nusantara"
    },
    correct: "D"
  }
];
const acehQuestions = [
  {
    text: "Siapakah pendiri Kerajaan Aceh Darussalam?",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Sultan Agung",
      C: "Sultan Ali Mughayat Syah",
      D: "Sultan Hasanuddin"
    },
    correct: "C"
  },
  {
    text: "Kerajaan Aceh Darussalam berdiri pada tahun...",
    options: {
      A: "1293 M",
      B: "1496 M",
      C: "1511 M",
      D: "1607 M"
    },
    correct: "B"
  },
  {
    text: "Kerajaan Aceh mencapai puncak kejayaan di masa...",
    options: {
      A: "Sultan Ismail",
      B: "Sultan Mahmud Syah",
      C: "Sultan Iskandar Muda",
      D: "Sultan Abdul Jalil"
    },
    correct: "C"
  },
  {
    text: "Apa alasan utama pendirian Kerajaan Aceh Darussalam?",
    options: {
      A: "Melawan penjajahan Portugis",
      B: "Memperluas kekuasaan ke Jawa",
      C: "Menguasai perdagangan rempah-rempah",
      D: "Melawan serangan Majapahit"
    },
    correct: "A"
  },
  {
    text: "Kerajaan Aceh dikenal sebagai pusat...",
    options: {
      A: "Kekaisaran Hindu",
      B: "Pendidikan dan dakwah Islam",
      C: "Perdagangan rempah-rempah eksklusif",
      D: "Pertanian dan peternakan"
    },
    correct: "B"
  },
  {
    text: "Sultan Iskandar Muda memimpin Kerajaan Aceh pada tahun...",
    options: {
      A: "1496–1511",
      B: "1607–1636",
      C: "1636–1650",
      D: "1700–1725"
    },
    correct: "B"
  },
  {
    text: "Setelah Sultan Iskandar Muda wafat, Aceh mengalami...",
    options: {
      A: "Masa kejayaan",
      B: "Masa reformasi",
      C: "Kemunduran akibat konflik internal",
      D: "Perluasan wilayah"
    },
    correct: "C"
  },
  {
    text: "Salah satu peninggalan Aceh yang terkenal adalah...",
    options: {
      A: "Candi Borobudur",
      B: "Masjid Raya Baiturrahman",
      C: "Benteng Marlborough",
      D: "Istana Maimun"
    },
    correct: "B"
  },
  {
    text: "Sultan terakhir Kerajaan Aceh yang menyerah kepada Belanda adalah...",
    options: {
      A: "Sultan Mahmud Syah",
      B: "Sultan Iskandar Tsani",
      C: "Sultan Muhammad Daud Syah",
      D: "Sultan Ali Mughayat Syah"
    },
    correct: "C"
  },
  {
    text: "Wilayah kekuasaan Kerajaan Aceh pada masa jayanya meliputi...",
    options: {
      A: "Seluruh Sumatera",
      B: "Pulau Jawa",
      C: "Sebagian Semenanjung Malaya",
      D: "Kalimantan Timur"
    },
    correct: "C"
  },
  {
    text: "Keruntuhan Kerajaan Aceh terjadi akibat...",
    options: {
      A: "Letusan gunung",
      B: "Konflik internal dan penjajahan Belanda",
      C: "Invasi VOC",
      D: "Krisis ekonomi Asia"
    },
    correct: "B"
  },
  {
    text: "Sultan Iskandar Muda dikenal sebagai sosok yang...",
    options: {
      A: "Berwatak keras dan anti-Islam",
      B: "Lemah dan tidak berpengaruh",
      C: "Bijak, kuat, dan memperluas kekuasaan Aceh",
      D: "Memihak Portugis"
    },
    correct: "C"
  },
  {
    text: "Apa nama hukum yang berlaku di Aceh pada masa Islam?",
    options: {
      A: "Hukum Adat Hindu",
      B: "Hukum Kanun Aceh",
      C: "Undang-Undang Kerajaan Sriwijaya",
      D: "Hukum Majapahit"
    },
    correct: "B"
  },
  {
    text: "Aceh menjadi incaran bangsa Eropa karena...",
    options: {
      A: "Kekayaan mineral",
      B: "Letaknya yang strategis dan sumber rempah",
      C: "Tenaga kerja murah",
      D: "Lautnya dangkal"
    },
    correct: "B"
  },
  {
    text: "Kerajaan Aceh memiliki hubungan dagang dengan negara berikut, kecuali...",
    options: {
      A: "Turki",
      B: "Belanda",
      C: "India",
      D: "Jepang"
    },
    correct: "D"
  }
];
const deliQuestions = [
  {
    text: "Kesultanan Deli berdiri pada tahun…",
    options: {
      A: "1200 M",
      B: "1450 M",
      C: "1632 M",
      D: "1800 M"
    },
    correct: "C"
  },
  {
    text: "Siapakah tokoh yang mendirikan Kesultanan Deli?",
    options: {
      A: "Sultan Hasanuddin",
      B: "Tuanku Gocah Pahlawan",
      C: "Sultan Agung",
      D: "Sultan Ma’mun Al-Rasyid"
    },
    correct: "B"
  },
  {
    text: "Pada masa kejayaannya, Deli dikenal karena hasil…",
    options: {
      A: "Perikanan",
      B: "Perkebunan tembakau",
      C: "Perdagangan garam",
      D: "Tambang emas"
    },
    correct: "B"
  },
  {
    text: "Apa nama istana peninggalan Kesultanan Deli yang terkenal?",
    options: {
      A: "Istana Maimun",
      B: "Istana Bogor",
      C: "Istana Negara",
      D: "Istana Siak"
    },
    correct: "A"
  },
  {
    text: "Salah satu penyebab melemahnya Kesultanan Deli setelah kemerdekaan adalah…",
    options: {
      A: "Bencana alam",
      B: "Perang dengan kerajaan lain",
      C: "Revolusi sosial dan hilangnya kekuasaan politik",
      D: "Kelaparan dan wabah penyakit"
    },
    correct: "C"
  },
  {
    text: "Apa nama suku asli yang banyak mendiami wilayah Kesultanan Deli?",
    options: {
      A: "Suku Minangkabau",
      B: "Suku Jawa",
      C: "Suku Melayu",
      D: "Suku Batak"
    },
    correct: "C"
  },
  {
    text: "Sultan Ma’mun Al-Rasyid dikenal karena membangun…",
    options: {
      A: "Candi Borobudur",
      B: "Masjid Agung Demak",
      C: "Masjid Raya Al Mashun",
      D: "Benteng Marlborough"
    },
    correct: "C"
  },
  {
    text: "Pemindahan ibu kota Kesultanan Deli dari Labuhan Deli ke Medan terjadi pada masa pemerintahan...",
    options: {
      A: "Sultan Amaluddin",
      B: "Sultan Osman Perkasa Alam",
      C: "Sultan Mahmud Al-Rasyid Perkasa Alam",
      D: "Sultan Makmun Al-Rasyid"
    },
    correct: "C"
  },
  {
    text: "Alasan utama pemindahan ibu kota Kesultanan Deli ke Medan adalah...",
    options: {
      A: "Lokasi Medan lebih dekat dengan pantai",
      B: "Medan memiliki tanah subur untuk pertanian",
      C: "Medan lebih strategis dan berkembang sebagai pusat perdagangan dan perkebunan",
      D: "Labuhan Deli sering dilanda bencana alam"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Deli menjadi terkenal karena produksi tembakaunya yang dikenal dengan nama...",
    options: {
      A: "Deli Tobacco",
      B: "Tembakau Langkat",
      C: "Tembakau Emas",
      D: "Aceh Blend"
    },
    correct: "A"
  },
  {
    text: "Dalam Kerajaan Deli, permaisuri sultan diberi gelar...",
    options: {
      A: "Tengku Maha Suri Raja",
      B: "Tengku",
      C: "Tengku Mahkota",
      D: "Syahbandar"
    },
    correct: "A"
  },
  {
    text: "Simbol Kesultanan Deli dikreasikan dan diciptakan semasa Pemerintahan Sultan Makmun Al-Rasyid Perkasa Alamsyah. Salah satu bentuk yang dipakai adalah susunan daun tembakau yang bermakna...",
    options: {
      A: "Kawal utama luar",
      B: "Kemakmuran",
      C: "Kejayaan",
      D: "Sinar petunjuk"
    },
    correct: "C"
  },
  {
    text: "Tuanku Panglima Pasutan memberi gelar datuk untuk 4 suku penduduk asli kerajaan Deli. Keempat suku yang memperoleh gelar itu adalah sebagai berikut, kecuali...",
    options: {
      A: "Daerah Sepuluh Satu Kuta",
      B: "Daerah Serbanyaman",
      C: "Daerah Senembah",
      D: "Daerah Sukapiring"
    },
    correct: "A"
  },
  {
    text: "Kesultanan Deli memisahkan diri dari Aceh secara de facto pada masa pemerintahan...",
    options: {
      A: "Sultan Ismail",
      B: "Sultan Amaluddin",
      C: "Sultan Mahmud Al-Rasyid",
      D: "Sultan Gocah Pahlawan"
    },
    correct: "B"
  },
  {
    text: "Kesultanan Deli juga memiliki bendera sendiri yang berwarna....",
    options: {
      A: "Merah",
      B: "Hijau",
      C: "Biru",
      D: "Kuning"
    },
    correct: "D"
  }
];
const serdangQuestions = [
  {
    text: "Kesultanan Serdang berdiri pada tahun...",
    options: {
      A: "1629 M",
      B: "1669 M",
      C: "1723 M",
      D: "1823 M"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Serdang merupakan pecahan dari Kesultanan...",
    options: {
      A: "Siak",
      B: "Aceh",
      C: "Deli",
      D: "Riau"
    },
    correct: "C"
  },
  {
    text: "Pendiri Kesultanan Serdang adalah...",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Tuanku Panglima Paderap",
      C: "Tuanku Thaf Sinar Baharshah",
      D: "Tuanku Umar Johan Alamsyah"
    },
    correct: "D"
  },
  {
    text: "Kesultanan Serdang mencapai masa keemasan pada masa pemerintahan...",
    options: {
      A: "Tuanku Panglima Pasutan",
      B: "Sultan Thaf Sinar Baharshah",
      C: "Sultan Sulaiman Syariful Alamsyah",
      D: "Sultan Basyaruddin Shariful Alamsyah"
    },
    correct: "B"
  },
  {
    text: "Setelah kemerdekaan Indonesia, Kesultanan Serdang menyerahkan kekuasaan kepada...",
    options: {
      A: "Inggris",
      B: "Kesultanan Deli",
      C: "Belanda",
      D: "Pemerintah Republik Indonesia"
    },
    correct: "D"
  },
  {
    text: "Sultan Sulaiman Syariful Alamsyah memindahkan ibu kota Kesultanan Serdang ke...",
    options: {
      A: "Rantau Panjang",
      B: "Kota Galuh Perbaungan",
      C: "Kampung Besar",
      D: "Medan"
    },
    correct: "B"
  },
  {
    text: "Pada masa Sultan Thaf Sinar Baharshah, Kesultanan Serdang terkenal karena...",
    options: {
      A: "Kekayaan emas dan peraknya",
      B: "Sistem militer yang kuat",
      C: "Perdagangan yang maju dan kehidupan rakyat yang tentram",
      D: "Dukungan terhadap penjajah Belanda"
    },
    correct: "C"
  },
  {
    text: "Apa alasan utama pemindahan ibu kota dari Rantau Panjang ke Kota Galuh?",
    options: {
      A: "Serangan Aceh",
      B: "Keinginan Belanda",
      C: "Sering terjadi banjir",
      D: "Dekat dengan pelabuhan"
    },
    correct: "C"
  },
  {
    text: "Berikut adalah jejak peninggalan Kesultanan Serdang, kecuali …",
    options: {
      A: "Istana Tanjung Putri",
      B: "Istana Darul Arif Rantau Panjang",
      C: "Istana Maimun",
      D: "Istana Darul Arif Kota Galuh Perbaungan"
    },
    correct: "C"
  },
  {
    text: "Mengapa Istana Darul Arif di Kota Galuh hancur?",
    options: {
      A: "Diserang pasukan Aceh",
      B: "Terbakar akibat perang",
      C: "Ditinggalkan rakyat",
      D: "Dibakar oleh Belanda"
    },
    correct: "D"
  },
  {
    text: "Apa isi penting dari Acte van Erkenning 1862 bagi Serdang?",
    options: {
      A: "Menyerahkan wilayah ke Aceh",
      B: "Mengakui Belanda sebagai penguasa",
      C: "Menghapus sistem adat",
      D: "Melarang perdagangan bebas"
    },
    correct: "B"
  },
  {
    text: "Sultan Serdang yang paling dikenal mendukung pergerakan nasional adalah?",
    options: {
      A: "Umar Johan Alamsyah",
      B: "Thaf Sinar Baharshah",
      C: "Basyaruddin Syariful Alamsyah",
      D: "Sulaiman Syariful Alamsyah"
    },
    correct: "D"
  },
  {
    text: "Revolusi Sosial 1946 di Serdang berakhir tanpa kekerasan karena...?",
    options: {
      A: "Istana sudah kosong",
      B: "Sultan melarikan diri",
      C: "Dukungan Sultan pada Republik",
      D: "Serdang bergabung ke Deli"
    },
    correct: "C"
  },
  {
    text: "Siapa Sultan yang menjadikan Serdang pusat dagang ke Semenanjung?",
    options: {
      A: "Sulaiman Syariful Alamsyah",
      B: "Basyaruddin Shariful Alamsyah",
      C: "Thaf Sinar Baharshah",
      D: "Umar Johan Alamsyah"
    },
    correct: "C"
  },
  {
    text: "Istana Serdang yang dibangun di tanah 952 hektar adalah...?",
    options: {
      A: "Istana Tanjung Puteri",
      B: "Istana Darul Arif Rantau Panjang",
      C: "Istana Kota Galuh",
      D: "Replika Istana Serdang"
    },
    correct: "C"
  }
];
const langkatQuestions = [
  {
    text: "Kesultanan Langkat berdiri sekitar abad ke-...",
    options: {
      A: "15",
      B: "16",
      C: "17",
      D: "18"
    },
    correct: "C"
  },
  {
    text: "Siapakah pendiri Kesultanan Langkat?",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Raja Dewa Shahdan",
      C: "Sultan Musa",
      D: "Raja Ali Haji"
    },
    correct: "B"
  },
  {
    text: "Kesultanan Langkat berada di wilayah provinsi mana sekarang?",
    options: {
      A: "Aceh",
      B: "Riau",
      C: "Sumatera Barat",
      D: "Sumatera Utara"
    },
    correct: "D"
  },
  {
    text: "Apa komoditas utama yang membuat Kesultanan Langkat makmur pada masa kejayaan?",
    options: {
      A: "Emas dan perak",
      B: "Rempah-rempah",
      C: "Tembakau dan karet",
      D: "Batu bara"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Langkat runtuh karena peristiwa apa?",
    options: {
      A: "Penjajahan Jepang",
      B: "Perang Aceh",
      C: "Revolusi Sosial Sumatera Timur",
      D: "Serangan Portugis"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Langkat mencapai puncak kejayaannya pada abad ke-19, terutama di masa pemerintahan?",
    options: {
      A: "Raja Dewa Shahdan",
      B: "Sultan Mahmud",
      C: "Sultan Musa",
      D: "Sultan Iskandar Muda"
    },
    correct: "C"
  },
  {
    text: "Salah satu faktor utama yang membuat Kesultanan Langkat mengalami kemajuan ekonomi adalah?",
    options: {
      A: "Penaklukan kerajaan tetangga",
      B: "Perdagangan rempah-rempah dengan India",
      C: "Kerja sama dengan Belanda dalam sektor perkebunan",
      D: "Bantuan dari Kesultanan Aceh"
    },
    correct: "C"
  },
  {
    text: "Istana Kesultanan Langkat yang terkenal dan menjadi simbol budaya Melayu di wilayah itu bernama...",
    options: {
      A: "Istana Maimun",
      B: "Istana Siak",
      C: "Istana Batu",
      D: "Istana Darul Aman"
    },
    correct: "D"
  },
  {
    text: "Salah satu alasan rakyat bangkit melawan Kesultanan Langkat dalam Revolusi Sosial adalah...",
    options: {
      A: "Ketimpangan sosial antara bangsawan dan rakyat",
      B: "Larangan belajar agama di sekolah",
      C: "Penolakan terhadap pengaruh asing",
      D: "Kekuasaan yang diambil oleh Jepang"
    },
    correct: "A"
  },
  {
    text: "Apa nama wilayah tempat berdirinya pusat pemerintahan Kesultanan Langkat?",
    options: {
      A: "Medan",
      B: "Tanjung Pura",
      C: "Labuhan Deli",
      D: "Perbaungan"
    },
    correct: "B"
  },
  {
    text: "Perusahaan Belanda yang mengelola perkebunan besar di Langkat adalah bagian dari …",
    options: {
      A: "Oost-Indische Compagnie",
      B: "Deli Maatschappij",
      C: "Cultuurstelsel",
      D: "VOC"
    },
    correct: "B"
  },
  {
    text: "Dampak utama hubungan erat Langkat dan Belanda bagi rakyat adalah …",
    options: {
      A: "Peluang kerja terbuka",
      B: "Kesejahteraan merata",
      C: "Kemerdekaan berpendapat",
      D: "Penindasan dalam sistem kerja perkebunan"
    },
    correct: "D"
  },
  {
    text: "Perkebunan tembakau Deli di Langkat berkembang pesat karena …",
    options: {
      A: "Teknologi dari Jepang",
      B: "Iklim dan tanah yang subur",
      C: "Pelabuhan militer Belanda",
      D: "Perdagangan dengan Arab"
    },
    correct: "B"
  },
  {
    text: "Setelah keruntuhan kesultanan, warisan budaya Langkat yang masih lestari adalah…",
    options: {
      A: "Tradisi adat Melayu dan bangunan istana",
      B: "Kekuatan militer tradisional",
      C: "Upacara kerajaan",
      D: "Sistem kerja paksa"
    },
    correct: "A"
  },
  {
    text: "Salah satu kelemahan internal yang mempercepat keruntuhan Kesultanan Langkat adalah …",
    options: {
      A: "Ketergantungan pada perdagangan laut",
      B: "Serangan dari Kesultanan Aceh",
      C: "Ketimpangan sosial antara bangsawan dan rakyat",
      D: "Kegagalan Sultan dalam berdiplomasi"
    },
    correct: "C"
  }
];
const siakQuestions = [
  {
    text: "Kesultanan Siak dikenal sebagai pusat penyebaran …",
    options: {
      A: "Hindu",
      B: "Budha",
      C: "Islam",
      D: "Kristen"
    },
    correct: "C"
  },
  {
    text: "Pendiri Kesultanan Siak adalah …",
    options: {
      A: "Sultan Agung",
      B: "Sultan Syarif Kasim II",
      C: "Sultan Abdul Jalil Rahmat Syah",
      D: "Sultan Mahmud Syah"
    },
    correct: "C"
  },
  {
    text: "Sultan terakhir Kesultanan Siak adalah …",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Sultan Syarif Kasim II",
      C: "Sultan Hasanuddin",
      D: "Sultan Zainal Abidin"
    },
    correct: "B"
  },
  {
    text: "Kesultanan Siak menyerahkan wilayahnya kepada Indonesia pada tahun …",
    options: {
      A: "1945",
      B: "1946",
      C: "1947",
      D: "1950"
    },
    correct: "B"
  },
  {
    text: "Istana peninggalan Kesultanan Siak bernama …",
    options: {
      A: "Istana Maimun",
      B: "Istana Sriwijaya",
      C: "Istana Asserayah Hasyimiyah",
      D: "Istana Kuto Besak"
    },
    correct: "C"
  },
  {
    text: "Sungai yang menjadi pusat kegiatan Kesultanan Siak adalah Sungai …",
    options: {
      A: "Batanghari",
      B: "Siak",
      C: "Musi",
      D: "Indragiri"
    },
    correct: "B"
  },
  {
    text: "Istana Siak memiliki gaya arsitektur campuran, kecuali …",
    options: {
      A: "Melayu",
      B: "Eropa",
      C: "Cina",
      D: "Timur Tengah"
    },
    correct: "C"
  },
  {
    text: "Tujuan Sultan Syarif Kasim II menyerahkan wilayah Siak ke Indonesia adalah...",
    options: {
      A: "Mendukung kemerdekaan RI",
      B: "Ingin pindah ke Malaysia",
      C: "Menghindari perang saudara",
      D: "Menolak penjajahan Inggris"
    },
    correct: "A"
  },
  {
    text: "Kesultanan Siak terletak di jalur perdagangan strategis, yaitu...",
    options: {
      A: "Selat Sunda",
      B: "Laut Jawa",
      C: "Selat Makassar",
      D: "Selat Malaka"
    },
    correct: "D"
  },
  {
    text: "Sultan Syarif Hasyim dikenal karena...",
    options: {
      A: "Memindahkan ibu kota ke Pekanbaru",
      B: "Mendorong pendidikan dan modernisasi",
      C: "Menghapuskan sistem Islam tradisional",
      D: "Mendirikan aliansi dengan Portugis"
    },
    correct: "B"
  },
  {
    text: "Salah satu warisan budaya Kesultanan Siak adalah alat musik...",
    options: {
      A: "Angklung Sunda",
      B: "Gamelan Jawa",
      C: "Komet buatan Eropa",
      D: "Caklempong"
    },
    correct: "C"
  },
  {
    text: "Perjanjian politik antara Siak dan Belanda berdampak pada...",
    options: {
      A: "Siak bebas dari kolonialisme Eropa",
      B: "Belanda diusir dari Selat Malaka",
      C: "Siak menjadi pusat Islam di Asia Tenggara",
      D: "Kekuasaan sultan dibatasi secara resmi"
    },
    correct: "D"
  },
  {
    text: "Sultan Abdul Jalil Rahmat Syah mendirikan Siak setelah...",
    options: {
      A: "Melarikan diri dari konflik internal Johor",
      B: "Menjadi panglima Kesultanan Aceh",
      C: "Menang perang melawan Belanda",
      D: "Diangkat oleh VOC sebagai penguasa"
    },
    correct: "A"
  },
  {
    text: "Bukti bahwa Kesultanan Siak terbuka terhadap budaya luar adalah...",
    options: {
      A: "Melarang bahasa Arab di istana",
      B: "Istana bercorak Eropa-Melayu-Mughal",
      C: "Menghapus adat Melayu demi Islam",
      D: "Menggunakan senjata dari Ternate"
    },
    correct: "B"
  },
  {
    text: "Hubungan erat antara Kesultanan Siak dan dunia Islam luar tampak dari...",
    options: {
      A: "Larangan belajar ke Timur Tengah",
      B: "Penggunaan sistem kasta dalam birokrasi",
      C: "Pemindahan makam sultan ke Mekkah",
      D: "Penyebaran naskah-naskah fiqih dan tasawuf"
    },
    correct: "D"
  }
];
const indragiriQuestions = [
  {
    text: "Kesultanan Indragiri didirikan sekitar abad ke berapa?",
    options: {
      A: "12",
      B: "14",
      C: "16",
      D: "18"
    },
    correct: "B"
  },
  {
    text: "Siapa pendiri Kesultanan Indragiri?",
    options: {
      A: "Raja Merlang I",
      B: "Sultan Mahmud Syah",
      C: "Sultan Abdul Jalil",
      D: "Raja Dewa Shahdan"
    },
    correct: "A"
  },
  {
    text: "Di mana letak Kesultanan Indragiri sekarang?",
    options: {
      A: "Sumatera Barat",
      B: "Sumatera Selatan",
      C: "Riau",
      D: "Aceh"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Indragiri mencapai masa kejayaan pada abad ke-...",
    options: {
      A: "15",
      B: "16",
      C: "17",
      D: "18"
    },
    correct: "C"
  },
  {
    text: "Apa penyebab kemunduran Kesultanan Indragiri?",
    options: {
      A: "Serangan dari Portugis",
      B: "Bencana alam",
      C: "Campur tangan Belanda dan konflik internal",
      D: "Invasi dari Kerajaan Siak"
    },
    correct: "C"
  },
  {
    text: "Kesultanan Indragiri dihapuskan secara resmi oleh pemerintah Indonesia pada tahun...",
    options: {
      A: "1945",
      B: "1946",
      C: "1948",
      D: "1950"
    },
    correct: "B"
  },
  {
    text: "Apa peran penting Kesultanan Indragiri dalam penyebaran Islam di Sumatera?",
    options: {
      A: "Menyebarkan Islam ke wilayah pedalaman",
      B: "Mendirikan pesantren di Jawa",
      C: "Mengirim utusan ke Turki",
      D: "Membangun masjid di Afrika"
    },
    correct: "A"
  },
  {
    text: "Salah satu peninggalan budaya Indragiri adalah...",
    options: {
      A: "Istana Maimun",
      B: "Istana Siak",
      C: "Istana Raja Merlang",
      D: "Masjid Raya Rengat"
    },
    correct: "D"
  },
  {
    text: "Siapakah tokoh penting selain Raja Merlang dalam sejarah Indragiri?",
    options: {
      A: "Sultan Iskandar Muda",
      B: "Sultan Syarif Kasim II",
      C: "Sultan Muhammad Syah",
      D: "Sultan Abdul Wahab"
    },
    correct: "D"
  },
  {
    text: "Wilayah kekuasaan Indragiri mencakup daerah mana?",
    options: {
      A: "Aceh dan Sumatera Barat",
      B: "Riau dan sebagian Jambi",
      C: "Sumatera Utara dan Malaka",
      D: "Palembang dan Riau"
    },
    correct: "B"
  },
  {
    text: "Kesultanan Indragiri terkenal akan perdagangan...",
    options: {
      A: "Emas dan perak",
      B: "Rempah-rempah",
      C: "Lada dan hasil hutan",
      D: "Ikan dan garam"
    },
    correct: "C"
  },
  {
    text: "Pengaruh Belanda membuat Indragiri kehilangan...",
    options: {
      A: "Akses ke laut",
      B: "Kedaulatan politik",
      C: "Pusat perdagangan",
      D: "Hubungan dengan Aceh"
    },
    correct: "B"
  },
  {
    text: "Indragiri termasuk ke dalam wilayah provinsi modern yang disebut...",
    options: {
      A: "Riau",
      B: "Jambi",
      C: "Bengkulu",
      D: "Lampung"
    },
    correct: "A"
  },
  {
    text: "Sistem pemerintahan Indragiri diatur berdasarkan...",
    options: {
      A: "Adat dan Islam",
      B: "Sistem kerajaan Hindu",
      C: "Hukum kolonial Belanda",
      D: "Demokrasi parlementer"
    },
    correct: "A"
  },
  {
    text: "Bagaimana hubungan Kesultanan Indragiri dengan kerajaan-kerajaan Islam lainnya di Sumatera?",
    options: {
      A: "Bermusuhan dan bersaing",
      B: "Bekerja sama dalam perdagangan dan dakwah Islam",
      C: "Tidak memiliki hubungan",
      D: "Menjadi bagian dari Kerajaan Majapahit"
    },
    correct: "B"
  }
];
