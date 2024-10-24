<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen bg-discord">
      <h1 class="text-4xl font-bold mb-10">Button Clicker</h1>
      <p 
        class="text-2xl mb-4 transition-transform duration-500" 
        :class="{'scale-125 opacity-100': animatedScore, 'opacity-100': true}"
      >
        Score: {{ Math.floor(score) }}
      </p>
      <img src="./assets/buttonatas.png" alt="Vino" class="h-24 w-24 ml-1 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-90" @click="scoreTambah">
      <div class="flex flex-row space-x-4 mt-4">
        <button 
          class="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center hover:bg-blue-900 hover:scale-105 transition duration-300 active:scale-90"
          :class="{'filter grayscale': level >= max}" 
          @click="upgradeLaptop">
          <img src="./assets/pixellaptop.png" alt="" class="h-7">
          Laptop 
          <p class="mt-1 text-xxs">Level: {{ level }}</p>
          <p class="mt-1 text-xxs"> Add 1 score per click</p>
          <p class="mt-1 text-xxs"> ${{ Math.floor(upgradeCost) }}</p>
        </button>
        <button 
          class="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center hover:bg-blue-900 hover:scale-105 transition duration-300 active:scale-90"
          :class="{'filter grayscale': level2 >= max}" 
          @click="upgradePC">
          <img src="./assets/pc.png" alt="" class="h-8">
          Computer
          <p class="mt-1 text-xxs">Level: {{ level2 }}</p>
          <p class="mt-1 text-xxs"> Add 2 score per click</p>
          <p class="mt-1 text-xxs"> ${{ Math.floor(upgradeHarga) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const max = 999;
const score = ref(0);
const scorePC = ref(1);
const upgradeCost = ref(10);
const upgradeHarga = ref(100);
const level = ref(0);
const level2 = ref(0);
const animatedScore = ref(false);

const loadProgress = () => {
  const savedProgress = localStorage.getItem('userProgress');
  if (savedProgress) {
    const userProgress = JSON.parse(savedProgress);
    score.value = userProgress.score || 0;
    level.value = userProgress.level || 0;
    level2.value = userProgress.level2 || 0;
    scorePC.value = userProgress.scorePC || 1;
    upgradeCost.value = userProgress.upgradeCost || 10;
    upgradeHarga.value = userProgress.upgradeHarga || 100;
  }
};

// Menyimpan progres setiap kali skor berubah
const saveProgress = () => {
  const userProgress = {
    score: score.value,
    level: level.value,
    level2: level2.value,
    scorePC: scorePC.value,
    upgradeCost: upgradeCost.value,
    upgradeHarga: upgradeHarga.value,
  };
  localStorage.setItem('userProgress', JSON.stringify(userProgress));
};

const scoreTambah = () => {
  score.value += scorePC.value;
  updateTitle();
  animatedScore.value = true;
  setTimeout(() => {
    animatedScore.value = false;
  }, 100);
  saveProgress();

const upgradeLaptop = () => {
  if (level.value >= max) {
    showAlert();
    return;
  }

  if (score.value >= upgradeCost.value) {
    score.value -= upgradeCost.value;
    scorePC.value += 1;                
    upgradeCost.value = Math.ceil(upgradeCost.value * 1.1);
    level.value += 1;    
    saveProgress();
  } else {
    alert('Score tidak cukup! tambah lagi score mu.');
  }
};

const upgradePC = () => {
  if (level2.value >= max) {
    showAlert();
    return;
  }

  if (score.value >= upgradeHarga.value) {
    score.value -= upgradeHarga.value; 
    scorePC.value += 2;                
    upgradeHarga.value = Math.ceil(upgradeHarga.value * 1.1);
    level2.value += 1;    
    saveProgress();
  } else {
    alert('Score tidak cukup! tambah lagi score mu.');
  }
};

const showAlert = () => {
  alert('Button sudah mencapai level maksimal!');
};

const updateTitle = () => {
  setTimeout(() => {
    document.title = `${Math.floor(score.value)} Score - Button Clicker` 
  }, 2500);
};

onMounted(() => {
  loadProgress();
});
</script>

<style scoped>
</style>
