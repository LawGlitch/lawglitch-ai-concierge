/**
 * LawGlitch ROI Calculator
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  initCalculator();
});

// Configuration - easily editable
const CALCULATOR_CONFIG = {
  // Cost per agent per month
  agentMonthlyCost: 4000,
  
  // Agent capacity (clients per agent per month)
  agentClientCapacity: 200,
  
  // Hours per agent per month
  hoursPerAgent: 173,
  
  // AI cost per 1000 tokens
  aiCostPerKTokens: 0.002,
  
  // Average tokens per message
  tokensPerMessage: 100,
  
  // Base AI infrastructure cost
  aiBaseCost: 200,
  
  // Email handling cost per 1000 emails (human)
  humanEmailCostPer1K: 500,
  
  // AI email cost per 1000 emails
  aiEmailCostPer1K: 10
};

function initCalculator() {
  const clientsSlider = document.getElementById('clients-slider');
  const messagesSlider = document.getElementById('messages-slider');
  const emailsSlider = document.getElementById('emails-slider');
  
  const clientsValue = document.getElementById('clients-value');
  const messagesValue = document.getElementById('messages-value');
  const emailsValue = document.getElementById('emails-value');
  
  // Result elements
  const humanAgents = document.getElementById('human-agents');
  const humanCost = document.getElementById('human-cost');
  const humanHours = document.getElementById('human-hours');
  const aiTokens = document.getElementById('ai-tokens');
  const aiCost = document.getElementById('ai-cost');
  const savingsAmount = document.getElementById('savings-amount');
  const hoursSaved = document.getElementById('hours-saved');
  const percentSaved = document.getElementById('percent-saved');
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function formatCurrency(num) {
    return '$' + formatNumber(Math.round(num));
  }
  
  function formatTokens(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return Math.round(num / 1000) + 'K';
    }
    return num.toString();
  }
  
  function calculateResults() {
    const clients = parseInt(clientsSlider.value);
    const messages = parseInt(messagesSlider.value);
    const emails = parseInt(emailsSlider.value);
    
    // Update display values
    clientsValue.textContent = formatNumber(clients);
    messagesValue.textContent = messages;
    emailsValue.textContent = formatNumber(emails);
    
    // Human system calculations
    const requiredAgents = Math.ceil(clients / CALCULATOR_CONFIG.agentClientCapacity);
    const totalHumanCost = requiredAgents * CALCULATOR_CONFIG.agentMonthlyCost + 
                          (emails / 1000) * CALCULATOR_CONFIG.humanEmailCostPer1K;
    const totalHumanHours = requiredAgents * CALCULATOR_CONFIG.hoursPerAgent;
    
    // AI system calculations
    const totalMessages = clients * messages;
    const totalTokens = totalMessages * CALCULATOR_CONFIG.tokensPerMessage;
    const aiMessageCost = (totalTokens / 1000) * CALCULATOR_CONFIG.aiCostPerKTokens;
    const aiEmailCost = (emails / 1000) * CALCULATOR_CONFIG.aiEmailCostPer1K;
    const totalAiCost = CALCULATOR_CONFIG.aiBaseCost + aiMessageCost + aiEmailCost;
    
    // Savings
    const savings = totalHumanCost - totalAiCost;
    const percentReduction = Math.round((savings / totalHumanCost) * 100);
    
    // Update UI with animation
    animateValue(humanAgents, requiredAgents);
    animateValue(humanCost, totalHumanCost, formatCurrency);
    animateValue(humanHours, totalHumanHours, formatNumber);
    aiTokens.textContent = formatTokens(totalTokens);
    animateValue(aiCost, totalAiCost, formatCurrency);
    animateValue(savingsAmount, savings, formatCurrency);
    animateValue(hoursSaved, totalHumanHours, formatNumber);
    animateValue(percentSaved, percentReduction);
  }
  
  let animationFrame = null;
  
  function animateValue(element, target, formatter = (v) => v) {
    const current = parseFloat(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
    const diff = target - current;
    const duration = 300;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = current + diff * eased;
      
      element.textContent = formatter(Math.round(value));
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  // Add event listeners to sliders
  clientsSlider.addEventListener('input', calculateResults);
  messagesSlider.addEventListener('input', calculateResults);
  emailsSlider.addEventListener('input', calculateResults);
  
  // Initial calculation
  calculateResults();
  
  // Update slider track fill
  function updateSliderFill(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--gold-start) 0%, var(--gold-end) ${percent}%, hsl(var(--muted)) ${percent}%)`;
  }
  
  [clientsSlider, messagesSlider, emailsSlider].forEach(slider => {
    updateSliderFill(slider);
    slider.addEventListener('input', () => updateSliderFill(slider));
  });
}
