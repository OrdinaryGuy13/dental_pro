// Mengimpor library model-viewer langsung dari internet (CDN)
import 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';

// =========================================================================
// 1. INISIALISASI ELEMEN HTML
// =========================================================================
const container = document.getElementById('threejs-container');
const fileInput = document.getElementById('upload-model');
const resetBtn = document.getElementById('btn-reset-canvas');
const objectImage = document.getElementById('object-image');
const bottomImage = document.getElementById('bottom-image');


const modelAwalDefault = '/assets/model/Gigi_Full.glb';
let currentObjectURL = null;

// =========================================================================
// 2. SETUP MODEL VIEWER
// =========================================================================
const modelViewer = document.createElement('model-viewer');
modelViewer.id = 'main-model';
modelViewer.setAttribute('src', modelAwalDefault);
modelViewer.setAttribute('alt', 'Model 3D Interaktif Google');
modelViewer.setAttribute('camera-controls', 'true');
modelViewer.setAttribute('auto-rotate', 'true');
modelViewer.setAttribute('shadow-intensity', '1');
modelViewer.setAttribute('camera-orbit', '0deg 75deg 45m');
modelViewer.setAttribute('min-camera-orbit', 'auto auto 30m');
modelViewer.setAttribute('max-camera-orbit', 'auto auto 60m');

modelViewer.style.width = '100%';
modelViewer.style.height = '100%';
modelViewer.style.display = 'block';
modelViewer.style.transition = 'opacity 0.4s ease-in-out';
modelViewer.style.opacity = '1';

// =========================================================================
// 3. DATABASE HOTSPOT OBJEK
// =========================================================================
const databaseHotspotObjek = {
  '/assets/model/Gigi_Full.glb': [
    { slot: 'hotspot-2', position: '-0.552m -0.151m 4.092m', text: 'Insisivus Sentral Kanan RA', targetModel: '/img/objek-pink.glb' },
    { slot: 'hotspot-3', position: '-1.636m -0.056m 3.770m', text: 'Insisivus Lateral Kanan RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-4', position: '-2.393m -.0325m 3.244m', text: 'Kaninus Kanan RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-5', position: '-2.968m 0.226m 2.248m', text: 'Premolar 1 Kanan RA', targetModel: '/assets/model/Premolar_1_Kanan_RA.glb' },
    { slot: 'hotspot-6', position: '-3.371m 0.372m 1.213m', text: 'Premolar 2 Kanan RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-7', position: '-3.800m 0.681m 0.0169m', text: 'Molar 1 Kanan RA', targetModel: '/assets/model/Molar_1_Kanan_RA.glb' },
    { slot: 'hotspot-8', position: '-3.980m 0.871m -1.707m', text: 'Molar 2 Kanan RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-9', position: '-4.086m 1.198m -3.009m', text: 'Molar 3 Kanan RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-1', position: '0.590m -0.153m 4.08m', text: 'Insisivus Sentral Kiri RA', targetModel: '/assets/model/Insisivus_1_Kiri_RA.glb' },
    { slot: 'hotspot-11', position: '1.596m -0.056m 3.818m', text: 'Insisivus Lateral Kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-12', position: '2.479m 0.0636m 3.157m', text: 'Kaninus kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-13', position: '3.0770m 0.281m 2.102m', text: 'Premolar 1 Kiri RA', targetModel: '/assets/model/Premolar_1_Kiri_RA.glb' },
    { slot: 'hotspot-14', position: '3.492m 0.433m 1.044m', text: 'Premolar 2 Kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-15', position: '3.866m 0.669m -0.201m', text: 'Molar 1 Kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-16', position: '3.968m 0.878m -1.707m', text: 'Molar 2 Kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-17', position: '4.079m 1.153m -3.136m', text: 'Molar 3 Kiri RA', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-18', position: '3.991m 0.564m -3.225m', text: 'Molar 3 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-19', position: '3.872m 0.230m -1.992m', text: 'Molar 2 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-20', position: '3.712m -0.069m -0.443m', text: 'Molar 1 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-21', position: '3.229m -0.402m 1.077m', text: 'Premolar 2 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-22', position: '2.939m -0.697m 2.156m', text: 'Premolar 1 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-23', position: '2.221m -0.892m 3.031m', text: 'Kaninus Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-24', position: '1.299m -1.045m 3.594m', text: 'Insisivus 2 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-25', position: '0.427m -1.052m 3.744m', text: 'Insisivus 1 Kiri RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-26', position: '-0.413m -1.010m 3.742m', text: 'Insisivus 1 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-27', position: '-1.214m -0.993m 3.55m', text: 'Insisivus 2 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-28', position: '-2.164m -0.996m 3.129m', text: 'Kaninus Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-29', position: '-2.893m -0.580m 2.162m', text: 'Premolar 1 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-30', position: '-3.224m -0.329m 1.115m', text: 'Premolar 2 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-31', position: '-3.598m 0.005m -0.181m', text: 'Molar 1 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-32', position: '-3.855m 0.368m -1.934m', text: 'Molar 2 Kanan RB', targetModel: '/img/objek-biru.glb' },
    { slot: 'hotspot-33', position: '-3.968m 0.660m -3.292m', text: 'Molar 3 Kanan RB', targetModel: '/img/objek-biru.glb' }
  ],
  '/assets/model/Insisivus_1_Kiri_RA.glb': [
    { slot: 'hotspot-1', position: '0.249m 6.130m -1.531m', text: 'Apeks Akar' },
    { slot: 'hotspot-2', position: '0.128m 2.175m 0.884m', text: 'Apeks Akar' },
    { slot: 'hotspot-3', position: '0.431m -0.094m 1.471m', text: 'Garis Servikal' },
    { slot: 'hotspot-4', position: '0.349m -1.152m 1.979m', text: 'Puncak Labial' },
    { slot: 'hotspot-5', position: '1.188m -2.784m 1.782m', text: 'Alur Mesio-Labial' },
    { slot: 'hotspot-6', position: '-0.464m -3.149m 2.288m', text: 'Alur Disto-Labial' },
    { slot: 'hotspot-7', position: '-1.649m -4.671m 2.047m', text: 'Titik Kontak Mesial' },
    { slot: 'hotspot-8', position: '1.871m -3.837m 1.319m', text: 'Titik Kontak Distal' },
    { slot: 'hotspot-9', position: '-0.237m -1.198m -1.851m', text: 'Garis Servikal' },
    { slot: 'hotspot-10', position: '-0.239m -1.994m -1.656m', text: 'Puncak Palatal' },
    { slot: 'hotspot-11', position: '-0.831m -3.129m 0.229m', text: 'Foramen Coecum Distal' },
    { slot: 'hotspot-12', position: '-1.603m -3.593m 0.399m', text: 'Lingir Marginal Distal' },
    { slot: 'hotspot-13', position: '-1.603m -3.593m 0.399m', text: 'Foramen Coecum Mesial' },
    { slot: 'hotspot-14', position: '-0.094m -3.817m 0.631m', text: 'Fosa Palatal' },
    { slot: 'hotspot-15', position: '-0.031m -4.821m 0.963m', text: 'Tepi Insisal Palatal' },
    { slot: 'hotspot-16', position: '-0.551m -5.166m 1.382m', text: 'Tepi Insisal Labial' },
    { slot: 'hotspot-17', position: '1.188m -3.254m -0.546m', text: 'Lingir Marginal Mesial' },
    { slot: 'hotspot-18', position: '0.361m -2.167m -1.527m', text: 'Singulum' },
    { slot: 'hotspot-19', position: '-1.656m 1.169m -0.172m', text: 'Alur Perkembangan Mesial' },
    { slot: 'hotspot-20', position: '-0.803m -1.525m -1.600m', text: 'Puncak Palatal' },
    { slot: 'hotspot-21', position: '-1.465m -2.827m -0.146m', text: 'Foramen Coecum Mesial' },
    { slot: 'hotspot-22', position: '-1.772m -3.723m 0.575m', text: 'Lingir Marginal Mesial' },
    { slot: 'hotspot-23', position: '-2.1131m -3.423m 1.482m', text: 'Titik Kontak Mesial' },
    { slot: 'hotspot-24', position: '-1.934m -4.308m 0.997m', text: 'Tepi Insisal Palatal' },
    { slot: 'hotspot-25', position: '-0.620m -5.119m 1.698m', text: 'Tepi Insisal Labial' },
    { slot: 'hotspot-26', position: '-1.230m -1.196m 2.177m', text: 'Puncak Labial' }
  ],
  '/assets/model/Premolar_1_Kanan_RA.glb': [
    { slot: 'hotspot-1', position: '2.673m 0.352m -1.793m', text: 'Garis Servikal' },
    { slot: 'hotspot-2', position: '3.087m -1.255m -1.667m', text: 'Puncak Bukal' },
    { slot: 'hotspot-3', position: '1.062m -3.545m -2.383m', text: 'Alur Mesio-bukal' },
    { slot: 'hotspot-4', position: '3.272m -3.213m 0.357m', text: 'Alur Disto-Bukal' },
    { slot: 'hotspot-5', position: '3.308m -3.066m 1.332m', text: 'Titik Kontak Distal' },
    { slot: 'hotspot-6', position: '-2.327m 0.510m 2.137m', text: 'Garis Servikal' },
    { slot: 'hotspot-7', position: '-2.245m -0.935m 2.693m', text: 'Puncak Palatal' },
    { slot: 'hotspot-8', position: '0.315m -2.142m 2.962m', text: 'Lingir Marginal Distal' },
    { slot: 'hotspot-9', position: '-2.066m -3.087m 2.446m', text: 'Tonjol Palatal' },
    { slot: 'hotspot-10', position: '2.326m -4.066m 0.991m', text: 'Lingir Tonjol Disto Bukal' },
    { slot: 'hotspot-11', position: '1.301m -4.674m 0.059m', text: 'Tonjol Bukal' },
    { slot: 'hotspot-12', position: '-1.275m -3.665m -0.902m', text: 'Lingir Marginal Mesial' }
  ],
  '/assets/model/Molar_1_Kanan_RA.glb': [
    { slot: 'hotspot-1', position: '1.2989m 2.9820m 1.4404m', text: 'Akar Mesio Bukal' },
    { slot: 'hotspot-2', position: '-0.5595m 3.0004m -1.1656m', text: 'Akar Palatal' },
    { slot: 'hotspot-3', position: '-0.7038m 2.4809m 2.2580m', text: 'Akar Disto-Bukal' },
    { slot: 'hotspot-4', position: '0.3700m 0.8792m 1.0386m', text: 'Bifurkasi' },
    { slot: 'hotspot-5', position: '1.7063m 0.7821m 0.2295m', text: 'Alur Perkembangan Mesial' },
    { slot: 'hotspot-6', position: '1.3643m -0.8998m 1.5750m', text: 'Garis Servikal' },
    { slot: 'hotspot-7', position: '2.1974m -1.6945m 0.8575m', text: 'Titik Kontak Bukal' },
    { slot: 'hotspot-8', position: '0.8283m -3.1378m 1.7632m', text: 'Alur Perkembangan Bukal' },
    { slot: 'hotspot-9', position: '2.4014m -3.2917m -0.5827m', text: 'Sisi Distal' },
    { slot: 'hotspot-10', position: '-1.5652m -3.7013m -0.0175m', text: 'Sisi Mesial' },
    { slot: 'hotspot-11', position: '-0.0998m -4.0295m 1.6974m', text: 'Tonjol Mesio-Bukal' },
    { slot: 'hotspot-12', position: '0.6083m -3.9394m 1.1412m', text: 'Tonjol Mesio-Palatal' },
    { slot: 'hotspot-13', position: '2.2714m -3.1560m 0.7400m', text: 'Tonjol Disto-Bukal' },
    { slot: 'hotspot-14', position: '1.8578m -4.0554m 0.4764m', text: 'Tonjol Disto-Palatal' },
    { slot: 'hotspot-15', position: '-1.4890m 2.1940m 0.9404m', text: 'Akar Disto-Bukal' },
    { slot: 'hotspot-16', position: '-0.6993m 2.5959m -2.3816m', text: 'Akar Palatal' },
    { slot: 'hotspot-17', position: '1.2544m 1.9545m -0.3241m', text: 'Akar Mesio-Bukal' },
    { slot: 'hotspot-18', position: '-0.4778m 0.7407m -2.2595m', text: 'Alur Perkembangan Palatal' },
    { slot: 'hotspot-19', position: '-0.8856m -2.6989m -2.6989m', text: 'Tonjol Carabeli' },
    { slot: 'hotspot-20', position: '-1.3111m -3.1720m -2.4782m', text: 'Alur dari Tonjol Carabeli' },
    { slot: 'hotspot-21', position: '1.0622m -3.2651m -2.5757m', text: 'Tonjol Disto-Palatal' },
    { slot: 'hotspot-22', position: '-0.7525m -3.6744m -2.2042m', text: 'Tonjol Mesio-Palatal' }
  ],
  '/img/objek-biru.glb': [
    { slot: 'hotspot-1', position: '0m 0.1m 0.5m', text: 'Info Objek Biru - Sensor Inti' },
    { slot: 'hotspot-2', position: '-0.2m 0.9m 0m', text: 'Kembali ke Menu Utama 🏠', targetModel: modelAwalDefault }
  ],
  '/img/objek-pink.glb': [
    { slot: 'hotspot-1', position: '0m 0.1m 0.5m', text: 'Info Objek Pink' },
    { slot: 'hotspot-2', position: '-0.2m 0.9m 0m', text: 'Kembali ke Menu Utama 🏠', targetModel: modelAwalDefault }
  ],
  '/img/objek-hijau.glb': [
    { slot: 'hotspot-1', position: '0m 0.1m 0.5m', text: 'Info Objek Hijau' },
    { slot: 'hotspot-2', position: '-0.2m 0.9m 0m', text: 'Kembali ke Menu Utama 🏠', targetModel: modelAwalDefault }
  ]
};

// =========================================================================
// 4. DATABASE GAMBAR PNG
// =========================================================================
const databaseGambarObjek = {
  '/assets/model/Gigi_Full.glb': '/assets/img/Nomenklatur_Gigi.png',
  '/assets/model/Insisivus_1_Kiri_RA.glb': '/assets/img/kiri_atas/Kiri_Atas_1.png',
  '/assets/model/Premolar_1_Kanan_RA.glb': '/assets/img/kanan_atas/Kanan_Atas_4.png',
  '/assets/model/Premolar_1_Kiri_RA.glb': '/assets/img/kiri_atas/Kiri_Atas_4.png',
  '/assets/model/Molar_1_Kanan_RA.glb': '/assets/img/kanan_atas/Kanan_Atas_6.png',
  '/img/objek-hijau.glb': '/assets/img/objek-hijau.png',
  '/img/objek-pink.glb': '/assetsc/img/objek-pink.png',
  '/img/objek-biru.glb': '/assets/img/objek-biru.png'
};

// =========================================================================
// 5. FUNGSI MENGGANTI GAMBAR PNG
// =========================================================================
function gantiGambarObjek(jalurModel, gambarOverride = null) {
  if (!objectImage || !bottomImage) return;

  const gambarBaru = gambarOverride || databaseGambarObjek[jalurModel];
  bottomImage.style.transition = 'opacity 0.25s ease';
  bottomImage.style.opacity = '0';

  if (!gambarBaru) {
    setTimeout(() => {
      objectImage.removeAttribute('src');
      bottomImage.style.display = 'none';
    }, 250);
    return;
  }

  const gambarPreload = new Image();
  gambarPreload.onload = () => {
    objectImage.src = gambarBaru;
    bottomImage.style.display = 'flex';
    requestAnimationFrame(() => {
      bottomImage.style.opacity = '1';
    });
  };

  gambarPreload.onerror = () => {
    console.warn('PNG tidak ditemukan:', gambarBaru);
    objectImage.removeAttribute('src');
    bottomImage.style.display = 'none';
  };

  gambarPreload.src = gambarBaru;
}

// =========================================================================
// 6. RENDER HOTSPOT SESUAI MODEL AKTIF
// =========================================================================
function renderHotspotSesuaiObjek(jalurModel, apakahManual = false) {
  const hotspotLama = modelViewer.querySelectorAll('.hotspot-point');
  hotspotLama.forEach((h) => h.remove());

  if (apakahManual) return;

  const dataHotspotAktif = databaseHotspotObjek[jalurModel];
  if (!dataHotspotAktif) return;

  dataHotspotAktif.forEach((data) => {
    const hotspotElement = document.createElement('button');
    hotspotElement.className = 'hotspot-point';
    hotspotElement.setAttribute('slot', data.slot);
    hotspotElement.setAttribute('data-position', data.position);
    hotspotElement.setAttribute('data-visibility-attribute', 'visible');

    hotspotElement.addEventListener('click', (event) => {
      event.stopPropagation();
      if (data.targetModel) {
        gantiModelAplikasi(data.targetModel, false, data.targetImage || null);
      }
    });

    const annotationDiv = document.createElement('div');
    annotationDiv.className = 'hotspot-annotation';
    annotationDiv.innerText = data.text;

    hotspotElement.appendChild(annotationDiv);
    modelViewer.appendChild(hotspotElement);
  });
}

// =========================================================================
// 7. FUNGSI UTAMA MENGGANTI MODEL + PNG
// =========================================================================
function gantiModelAplikasi(jalurBaru, apakahManual = false, gambarOverride = null) {
  modelViewer.style.opacity = '0';

  if (bottomImage) {
    bottomImage.style.transition = 'opacity 0.25s ease';
    bottomImage.style.opacity = '0';
  }

  setTimeout(() => {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = null;
    }

    modelViewer.setAttribute('src', jalurBaru);
    renderHotspotSesuaiObjek(jalurBaru, apakahManual);
    gantiGambarObjek(jalurBaru, gambarOverride);

    if (resetBtn) {
      resetBtn.style.display = (jalurBaru === modelAwalDefault) ? 'none' : 'block';
    }
  }, 400);
}

// =========================================================================
// 8. EVENT LISTENER & EKSEKUSI AWAL
// =========================================================================
modelViewer.addEventListener('load', () => {
  modelViewer.style.opacity = '1';
  const modelAktif = modelViewer.getAttribute('src');
  if (modelAktif) {
    gantiGambarObjek(modelAktif);
  }
});

if (fileInput) {
  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      currentObjectURL = URL.createObjectURL(files[0]);
      gantiModelAplikasi(currentObjectURL, true, null);
    }
  });
}

if (resetBtn) {
  resetBtn.style.display = 'none';
  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    gantiModelAplikasi(modelAwalDefault, false);
    modelViewer.setAttribute('camera-orbit', '0deg 75deg 45m');
    if (fileInput) fileInput.value = '';
  });
}

// Render model & gambar awal
renderHotspotSesuaiObjek(modelAwalDefault, false);
gantiGambarObjek(modelAwalDefault);
container.appendChild(modelViewer);

// =========================================================================
// 9. WEBSITE LOADING SCREEN ANIMATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBar = document.getElementById('loading-bar');
  const loadingPercent = document.getElementById('loading-percent');
  const loadingText = document.getElementById('loading-text');

  let progress = 0;

  function updateLoadingText(value) {
    if (value < 30) loadingText.textContent = 'Memulai aplikasi...';
    else if (value < 60) loadingText.textContent = 'Memuat objek 3D...';
    else if (value < 90) loadingText.textContent = 'Menyiapkan hotspot...';
    else loadingText.textContent = 'Hampir selesai...';
  }

  const loadingInterval = setInterval(() => {
    if (progress < 70) progress += 2;
    else if (progress < 90) progress += 1;
    else if (progress < 100) progress += 0.5;

    const value = Math.min(Math.floor(progress), 100);
    loadingBar.style.width = value + '%';
    loadingPercent.textContent = value;
    updateLoadingText(value);

    if (value >= 100) {
      clearInterval(loadingInterval);
      loadingText.textContent = 'Selesai';
      setTimeout(() => {
        loadingScreen.classList.add('loaded');
      }, 500);
    }
  }, 40);
});