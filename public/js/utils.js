// ── Utility Functions ──

const Utils = {
  formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
  },

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  showToast(message, icon = '✅', duration = 2500) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  animateElement(el, animationClass) {
    el.classList.remove(animationClass);
    void el.offsetWidth; // trigger reflow
    el.classList.add(animationClass);
  }
};
