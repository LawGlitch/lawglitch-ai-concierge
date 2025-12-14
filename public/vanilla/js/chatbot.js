/**
 * LawGlitch Chatbot
 * Vanilla JavaScript with fallback system
 */

// Configuration
const CHATBOT_CONFIG = {
  webhookURL: 'https://automation.lawglitch.in/webhook/28afcc8a-0cc1-4d77-915e-519d966090c9/chat',
  timeout: 3000,
  persona: {
    name: 'Mira',
    tagline: 'AI Automation Specialist'
  }
};

// Fallback conversation flow
const CHATBOT_RESPONSES = {
  initial: {
    message: "Hi! I'm Mira, your AI Automation Specialist. How can I help you today?",
    options: [
      { label: "Learn about our services", value: "services" },
      { label: "Get a custom quote", value: "pricing" },
      { label: "See ROI calculator", value: "calculator" },
      { label: "Book a consultation", value: "booking" }
    ]
  },
  services: {
    message: "We offer comprehensive AI automation across multiple channels. Our solutions include WhatsApp, Facebook, Instagram, Email, and Website Chat automation - all powered by advanced AI that learns your business.",
    options: [
      { label: "WhatsApp Automation", value: "whatsapp" },
      { label: "Email Automation", value: "email" },
      { label: "Get pricing info", value: "pricing" },
      { label: "Back to menu", value: "initial" }
    ]
  },
  whatsapp: {
    message: "Our WhatsApp Automation handles customer inquiries 24/7, books appointments, and provides instant support through the WhatsApp Business API. Average response time drops from hours to seconds!",
    options: [
      { label: "See other services", value: "services" },
      { label: "Get a quote", value: "pricing" },
      { label: "Book consultation", value: "booking" }
    ]
  },
  email: {
    message: "Our Email Automation intelligently routes emails, sends personalized auto-responses, and creates follow-up sequences. It handles 90% of routine inquiries automatically.",
    options: [
      { label: "See other services", value: "services" },
      { label: "Get a quote", value: "pricing" },
      { label: "Book consultation", value: "booking" }
    ]
  },
  pricing: {
    message: "We offer custom enterprise pricing based on your scale and requirements. Most clients see 70-90% cost reduction compared to traditional support teams. Let me connect you with our team for a personalized quote.",
    options: [
      { label: "Book a consultation", value: "booking" },
      { label: "Try ROI calculator", value: "calculator" },
      { label: "Learn more about services", value: "services" }
    ]
  },
  calculator: {
    message: "Great choice! Our ROI calculator can show you exactly how much you could save. I'll scroll you to it now.",
    options: [
      { label: "Get a custom quote", value: "pricing" },
      { label: "Book consultation", value: "booking" },
      { label: "Back to menu", value: "initial" }
    ],
    action: "scrollToCalculator"
  },
  booking: {
    message: "Excellent! I'd love to connect you with our team. Please fill out the quick form below and we'll reach out within 24 hours with available time slots.",
    showBookingForm: true
  }
};

// State
let chatState = {
  isOpen: false,
  messages: [],
  currentFlow: 'initial'
};

document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
});

function initChatbot() {
  const chatFab = document.getElementById('chat-fab');
  const chatWidget = document.getElementById('chat-widget');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatOptions = document.getElementById('chat-options');
  const chatBooking = document.getElementById('chat-booking');
  const bookingForm = document.getElementById('booking-form');
  
  // CTA buttons that open chat
  const headerCta = document.getElementById('header-cta');
  const mobileCta = document.getElementById('mobile-cta');
  const pricingCta = document.getElementById('pricing-cta');
  
  // Open chat on FAB click
  chatFab.addEventListener('click', openChatWidget);
  
  // Open chat on CTA buttons
  [headerCta, mobileCta, pricingCta].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openChatWidget);
    }
  });
  
  // Close chat
  chatClose.addEventListener('click', closeChatWidget);
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && chatState.isOpen) {
      closeChatWidget();
    }
  });
  
  // Handle booking form submit
  bookingForm.addEventListener('submit', handleBookingSubmit);
}

function openChatWidget() {
  const chatFab = document.getElementById('chat-fab');
  const chatWidget = document.getElementById('chat-widget');
  
  chatState.isOpen = true;
  chatFab.style.display = 'none';
  chatWidget.classList.add('active');
  
  // Show initial message if first time
  if (chatState.messages.length === 0) {
    showResponse('initial');
  }
}

function closeChatWidget() {
  const chatFab = document.getElementById('chat-fab');
  const chatWidget = document.getElementById('chat-widget');
  
  chatState.isOpen = false;
  chatWidget.classList.remove('active');
  setTimeout(() => {
    chatFab.style.display = 'flex';
  }, 300);
}

// Make this available globally for main.js
window.openChatWidget = openChatWidget;

function addMessage(content, role) {
  const chatMessages = document.getElementById('chat-messages');
  
  const messageEl = document.createElement('div');
  messageEl.className = `chat-message ${role}`;
  messageEl.textContent = content;
  
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  chatState.messages.push({ role, content });
}

function addUserMessage(content) {
  addMessage(content, 'user');
  // Try to match intent and respond
  handleUserInput(content);
}

// Make this available globally
window.addUserMessage = addUserMessage;

function handleUserInput(input) {
  const lower = input.toLowerCase();
  
  // Simple intent matching
  if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
    showResponse('pricing');
  } else if (lower.includes('whatsapp')) {
    showResponse('whatsapp');
  } else if (lower.includes('email')) {
    showResponse('email');
  } else if (lower.includes('service') || lower.includes('what do you')) {
    showResponse('services');
  } else if (lower.includes('book') || lower.includes('consult') || lower.includes('demo')) {
    showResponse('booking');
  } else if (lower.includes('calculator') || lower.includes('save') || lower.includes('roi')) {
    showResponse('calculator');
  } else {
    // Default response
    showResponse('services');
  }
}

function showResponse(flowKey) {
  const response = CHATBOT_RESPONSES[flowKey];
  if (!response) return;
  
  const chatOptions = document.getElementById('chat-options');
  const chatBooking = document.getElementById('chat-booking');
  
  // Add assistant message
  setTimeout(() => {
    addMessage(response.message, 'assistant');
    
    // Handle special actions
    if (response.action === 'scrollToCalculator') {
      setTimeout(() => {
        const calculator = document.getElementById('calculator');
        if (calculator) {
          closeChatWidget();
          setTimeout(() => {
            calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 400);
        }
      }, 1000);
    }
    
    // Show booking form or options
    if (response.showBookingForm) {
      chatOptions.style.display = 'none';
      chatBooking.style.display = 'block';
    } else if (response.options) {
      chatBooking.style.display = 'none';
      showOptions(response.options);
    }
  }, 500);
  
  chatState.currentFlow = flowKey;
}

function showOptions(options) {
  const chatOptions = document.getElementById('chat-options');
  chatOptions.innerHTML = '';
  chatOptions.style.display = 'flex';
  
  options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'chat-option-btn';
    btn.textContent = option.label;
    btn.style.animationDelay = `${index * 0.05}s`;
    btn.addEventListener('click', () => handleOptionClick(option));
    chatOptions.appendChild(btn);
  });
}

function handleOptionClick(option) {
  // Add user's selection as a message
  addMessage(option.label, 'user');
  
  // Show corresponding response
  showResponse(option.value);
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('booking-name').value;
  const email = document.getElementById('booking-email').value;
  const company = document.getElementById('booking-company').value;
  const message = document.getElementById('booking-message').value;
  
  const chatBooking = document.getElementById('chat-booking');
  const chatOptions = document.getElementById('chat-options');
  
  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;
  
  try {
    // Here you would normally send to Supabase
    // For now, simulate success
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    e.target.reset();
    chatBooking.style.display = 'none';
    
    // Show confirmation
    addMessage(`Thanks ${name}! We've received your request and will email you at ${email} within 24 hours with available consultation times.`, 'assistant');
    
    // Show follow-up options
    showOptions([
      { label: "Learn more about services", value: "services" },
      { label: "Try ROI calculator", value: "calculator" },
      { label: "Back to menu", value: "initial" }
    ]);
    
  } catch (error) {
    addMessage("Sorry, there was an error submitting your request. Please try again or email us directly at contact@lawglitch.in", 'assistant');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}
