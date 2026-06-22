const slider = document.getElementById('info-slider');

if (slider) {
  const levels = document.querySelectorAll('.content-level');
  const stepLabels = document.querySelectorAll('.slider-step');
  const levelMap = {
    1: 'minimal',
    2: 'short',
    3: 'medium',
    4: 'long',
  };

  const updateAboutDepth = () => {
    const sliderValue = Number(slider.value);
    const selectedLevel = levelMap[sliderValue];

    const progress = ((sliderValue - Number(slider.min)) / (Number(slider.max) - Number(slider.min))) * 100;
    slider.style.setProperty('--slider-progress', `${progress}%`);

    levels.forEach((level) => {
      const isActive = level.dataset.level === selectedLevel;
      level.style.display = isActive ? 'block' : 'none';
      level.classList.toggle('is-active', isActive);
    });

    stepLabels.forEach((step) => {
      step.classList.toggle('is-active', Number(step.dataset.step) <= sliderValue);
    });
  };

  slider.addEventListener('input', updateAboutDepth);
  updateAboutDepth();
}
