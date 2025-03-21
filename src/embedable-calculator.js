/**
 * Price Table Calculator - Standalone Embeddable Version
 * 
 * This script creates a Price Table calculator that can be embedded in any website.
 * It handles calculations for financing with zero down payment.
 */

(function() {
  // Create and append styles to head
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .price-calc-container * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .price-calc-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }

    .price-calc-content {
      padding: 1.5rem;
    }

    .price-calc-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .price-calc-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .price-calc-space-y {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .price-calc-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #111827;
    }

    .price-calc-input-wrapper {
      position: relative;
    }

    .price-calc-currency {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .price-calc-input {
      display: block;
      width: 100%;
      height: 3rem;
      padding: 0 0.75rem 0 2rem;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s ease;
    }

    .price-calc-input:focus {
      border-color: #404040;
      box-shadow: 0 0 0 2px rgba(64, 64, 64, 0.2);
    }

    .price-calc-input[type=number]::-webkit-inner-spin-button, 
    .price-calc-input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .price-calc-input[type=number] {
      -moz-appearance: textfield;
    }

    .price-calc-radio-group {
      display: flex;
      gap: 0.5rem;
    }

    .price-calc-radio-label {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
      background-color: #f9fafb;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .price-calc-radio-label:hover {
      background-color: #f3f4f6;
    }

    .price-calc-radio-label.active {
      border-color: #404040;
      background-color: rgba(64, 64, 64, 0.1);
      color: #404040;
    }

    .price-calc-radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .price-calc-slider-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .price-calc-slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price-calc-slider-value {
      font-size: 1.125rem;
      font-weight: 500;
      color: #404040;
    }

    .price-calc-slider {
      width: 100%;
      height: 4px;
      background-color: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }

    .price-calc-slider-track {
      width: 0%;
      height: 100%;
      background-color: #404040;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .price-calc-slider-thumb {
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #404040;
      border-radius: 50%;
      left: 0%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: grab;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .price-calc-slider-thumb:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.1);
    }

    .price-calc-slider-minmax {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .price-calc-button {
      display: block;
      width: 100%;
      height: 3rem;
      background-color: #404040;
      color: white;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .price-calc-button:hover {
      background-color: #333333;
    }

    .price-calc-results {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      min-height: 300px;
      transition: all 0.3s ease;
    }

    .price-calc-placeholder {
      text-align: center;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .price-calc-results-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .price-calc-result-header {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }

    .price-calc-result-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #404040;
    }

    .price-calc-result-value span {
      font-size: 1rem;
      font-weight: normal;
    }

    .price-calc-separator {
      width: 100%;
      height: 1px;
      background-color: #e5e7eb;
      margin: 0.5rem 0;
    }

    .price-calc-summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .price-calc-summary-label {
      color: #6b7280;
    }

    .price-calc-summary-value {
      font-weight: 500;
    }

    .price-calc-toggle-button {
      width: 100%;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: transparent;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      color: #111827;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .price-calc-toggle-button:hover {
      background-color: #f9fafb;
    }

    .price-calc-toggle-button svg {
      width: 16px;
      height: 16px;
    }

    .price-calc-schedule-container {
      overflow: hidden;
      height: 0;
      transition: height 0.3s ease;
    }

    .price-calc-schedule-table-container {
      max-height: 240px;
      overflow-y: auto;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      margin-top: 1rem;
    }

    .price-calc-schedule-table {
      width: 100%;
      border-collapse: collapse;
      text-align: right;
      font-size: 0.875rem;
    }

    .price-calc-schedule-table th,
    .price-calc-schedule-table td {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .price-calc-schedule-table th {
      text-align: right;
      font-weight: 500;
      color: #6b7280;
    }

    .price-calc-schedule-table th:first-child,
    .price-calc-schedule-table td:first-child {
      text-align: left;
    }

    .price-calc-schedule-table tr:last-child td {
      border-bottom: none;
    }

    @media (max-width: 640px) {
      .price-calc-schedule-table .hide-on-mobile {
        display: none;
      }
    }
  `;
  document.head.appendChild(styleElement);

  // Calculate monthly payment using Price Table formula
  function calculateMonthlyPayment(principal, interestRate, months) {
    // Convert annual interest rate to monthly decimal
    const monthlyRate = interestRate / 100;
    
    // Price table formula: PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    
    // Avoid division by zero
    if (denominator === 0) return principal / months;
    
    return principal * (numerator / denominator);
  }

  // Calculate amortization schedule
  function calculateAmortizationSchedule(principal, interestRate, months) {
    const monthlyRate = interestRate / 100;
    const monthlyPayment = calculateMonthlyPayment(principal, interestRate, months);
    const schedule = [];
    
    let remainingBalance = principal;
    
    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }
    
    return schedule;
  }

  // Format currency
  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  // Main function to create calculator
  function createPriceCalculator(targetElement) {
    // Create container element
    const container = document.createElement('div');
    container.className = 'price-calc-container';
    
    // Create content
    container.innerHTML = `
      <div class="price-calc-content">
        <div class="price-calc-grid">
          <div class="price-calc-space-y">
            <div>
              <label class="price-calc-label" for="purchase-amount">Valor da compra</label>
              <div class="price-calc-input-wrapper">
                <span class="price-calc-currency">R$</span>
                <input id="purchase-amount" class="price-calc-input" type="number" min="0" step="100" value="1000">
              </div>
            </div>
            
            <div>
              <label class="price-calc-label">Taxa de juros mensal</label>
              <div class="price-calc-radio-group" id="interest-rate-group">
                <label class="price-calc-radio-label active" data-value="1">
                  <input class="price-calc-radio-input" type="radio" name="interest-rate" value="1" checked>
                  1%
                </label>
                <label class="price-calc-radio-label" data-value="2">
                  <input class="price-calc-radio-input" type="radio" name="interest-rate" value="2">
                  2%
                </label>
                <label class="price-calc-radio-label" data-value="3">
                  <input class="price-calc-radio-input" type="radio" name="interest-rate" value="3">
                  3%
                </label>
              </div>
            </div>
            
            <div class="price-calc-slider-container">
              <div class="price-calc-slider-header">
                <label class="price-calc-label">Número de parcelas</label>
                <span class="price-calc-slider-value" id="months-value">6</span>
              </div>
              <div class="price-calc-slider" id="months-slider">
                <div class="price-calc-slider-track" style="width: 45.45%"></div>
                <div class="price-calc-slider-thumb" style="left: 45.45%"></div>
              </div>
              <div class="price-calc-slider-minmax">
                <span>1 mês</span>
                <span>12 meses</span>
              </div>
            </div>
            
            <button id="calculate-button" class="price-calc-button">Calcular</button>
          </div>
          
          <div class="price-calc-results" id="calculator-results">
            <div class="price-calc-placeholder">
              Insira os valores ao lado e clique em calcular para visualizar o resultado
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Replace the target element with our calculator
    targetElement.appendChild(container);
    
    // DOM elements
    const purchaseAmountInput = document.getElementById('purchase-amount');
    const interestRateGroup = document.getElementById('interest-rate-group');
    const monthsSlider = document.getElementById('months-slider');
    const monthsValue = document.getElementById('months-value');
    const calculateButton = document.getElementById('calculate-button');
    const resultsContainer = document.getElementById('calculator-results');
    
    // State
    let purchaseAmount = 1000;
    let interestRate = 1;
    let months = 6;
    let isCalculated = false;
    let showSchedule = false;
    let schedule = [];
    
    // Event Listeners
    purchaseAmountInput.addEventListener('change', function() {
      purchaseAmount = parseFloat(this.value) || 0;
      if (isCalculated) calculateResults();
    });
    
    interestRateGroup.addEventListener('click', function(e) {
      const label = e.target.closest('.price-calc-radio-label');
      if (!label) return;
      
      // Update UI
      document.querySelectorAll('.price-calc-radio-label').forEach(el => {
        el.classList.remove('active');
      });
      label.classList.add('active');
      
      // Update radio button
      const radio = label.querySelector('input');
      radio.checked = true;
      
      // Update state
      interestRate = parseFloat(label.dataset.value);
      if (isCalculated) calculateResults();
    });
    
    // Slider functionality
    let isDragging = false;
    
    monthsSlider.addEventListener('mousedown', startDrag);
    monthsSlider.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      document.addEventListener('mousemove', drag);
      document.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);
      drag(e);
    }
    
    function drag(e) {
      if (!isDragging) return;
      
      const slider = monthsSlider;
      const rect = slider.getBoundingClientRect();
      let clientX;
      
      if (e.type.includes('touch')) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      
      // Calculate percentage
      let percentage = (clientX - rect.left) / rect.width;
      percentage = Math.max(0, Math.min(1, percentage));
      
      // Calculate months (1-12)
      months = Math.round(percentage * 11) + 1;
      
      // Update UI
      updateSlider();
      
      if (isCalculated) calculateResults();
    }
    
    function stopDrag() {
      isDragging = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    }
    
    function updateSlider() {
      // Update position and value
      const percentage = (months - 1) / 11;
      monthsSlider.querySelector('.price-calc-slider-track').style.width = `${percentage * 100}%`;
      monthsSlider.querySelector('.price-calc-slider-thumb').style.left = `${percentage * 100}%`;
      monthsValue.textContent = months;
    }
    
    calculateButton.addEventListener('click', function() {
      calculateResults();
    });
    
    function calculateResults() {
      if (purchaseAmount <= 0) return;
      
      const monthlyPayment = calculateMonthlyPayment(purchaseAmount, interestRate, months);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - purchaseAmount;
      
      schedule = calculateAmortizationSchedule(purchaseAmount, interestRate, months);
      
      // Update UI with results
      renderResults(monthlyPayment, totalPayment, totalInterest);
      
      isCalculated = true;
    }
    
    function renderResults(monthlyPayment, totalPayment, totalInterest) {
      resultsContainer.innerHTML = `
        <div class="price-calc-results-content">
          <div>
            <div class="price-calc-result-header">Resultado</div>
            <div class="price-calc-result-value">
              ${formatCurrency(monthlyPayment)} <span>/mês</span>
            </div>
          </div>
          
          <div class="price-calc-separator"></div>
          
          <div class="price-calc-space-y" style="gap: 0.75rem;">
            <div class="price-calc-summary-row">
              <span class="price-calc-summary-label">Valor financiado:</span>
              <span class="price-calc-summary-value">${formatCurrency(purchaseAmount)}</span>
            </div>
            <div class="price-calc-summary-row">
              <span class="price-calc-summary-label">Valor dos juros:</span>
              <span class="price-calc-summary-value">${formatCurrency(totalInterest)}</span>
            </div>
            <div class="price-calc-summary-row">
              <span class="price-calc-summary-label">Valor total:</span>
              <span class="price-calc-summary-value">${formatCurrency(totalPayment)}</span>
            </div>
          </div>
          
          <button id="toggle-schedule" class="price-calc-toggle-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>Ver todas as parcelas</span>
          </button>
          
          <div class="price-calc-schedule-container" id="schedule-container">
            <div class="price-calc-schedule-table-container">
              <table class="price-calc-schedule-table">
                <thead>
                  <tr>
                    <th>Mês</th>
                    <th>Parcela</th>
                    <th class="hide-on-mobile">Amortização</th>
                    <th class="hide-on-mobile">Juros</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody id="schedule-body">
                  ${schedule.map(item => `
                    <tr>
                      <td>${item.month}</td>
                      <td>${formatCurrency(item.payment)}</td>
                      <td class="hide-on-mobile">${formatCurrency(item.principalPayment)}</td>
                      <td class="hide-on-mobile">${formatCurrency(item.interestPayment)}</td>
                      <td>${formatCurrency(item.remainingBalance)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      
      // Add toggle functionality for schedule
      const toggleButton = document.getElementById('toggle-schedule');
      const scheduleContainer = document.getElementById('schedule-container');
      
      toggleButton.addEventListener('click', function() {
        showSchedule = !showSchedule;
        
        if (showSchedule) {
          scheduleContainer.style.height = '300px';
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>Ocultar parcelas</span>
          `;
        } else {
          scheduleContainer.style.height = '0';
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span>Ver todas as parcelas</span>
          `;
        }
      });
    }
  }

  // Function to initialize calculator
  window.initPriceCalculator = function(selector) {
    const targetElement = document.querySelector(selector);
    if (targetElement) {
      createPriceCalculator(targetElement);
    } else {
      console.error(`Element with selector "${selector}" not found.`);
    }
  };
  
  // Auto-initialize if an element with id 'price-calculator' exists
  document.addEventListener('DOMContentLoaded', function() {
    const defaultElement = document.getElementById('price-calculator');
    if (defaultElement) {
      createPriceCalculator(defaultElement);
    }
  });
})();
