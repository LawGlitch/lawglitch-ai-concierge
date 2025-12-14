import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const CalculatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [clients, setClients] = useState(500);
  const [messagesPerConvo, setMessagesPerConvo] = useState(15);
  const [emailsPerMonth, setEmailsPerMonth] = useState(2000);

  // Calculations based on industry averages
  const HUMAN_COST_PER_AGENT = 3500; // Monthly salary
  const HUMAN_TICKETS_PER_DAY = 40;
  const AI_COST_PER_1000_TOKENS = 0.002;
  const TOKENS_PER_MESSAGE = 150;
  const HOURS_PER_AGENT_PER_DAY = 8;

  const totalMessages = clients * messagesPerConvo;
  const totalInteractions = totalMessages + emailsPerMonth;

  // Human calculations
  const ticketsPerMonth = totalInteractions / 30;
  const humansRequired = Math.ceil(ticketsPerMonth / (HUMAN_TICKETS_PER_DAY * 22));
  const humanMonthlyCost = humansRequired * HUMAN_COST_PER_AGENT;
  const humanHoursConsumed = Math.round((totalInteractions / HUMAN_TICKETS_PER_DAY) * (HOURS_PER_AGENT_PER_DAY / HUMAN_TICKETS_PER_DAY) * 30);

  // AI calculations
  const totalTokens = totalInteractions * TOKENS_PER_MESSAGE * 2; // Input + output
  const aiTokenCost = (totalTokens / 1000) * AI_COST_PER_1000_TOKENS;
  const aiInfraCost = 49 + (totalInteractions > 5000 ? 100 : 0) + (totalInteractions > 10000 ? 150 : 0);
  const aiTotalCost = Math.round(aiTokenCost + aiInfraCost);

  // Savings
  const monthlySavings = humanMonthlyCost - aiTotalCost;
  const hoursSaved = humanHoursConsumed;

  const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <span>
        {prefix}{displayValue.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section id="our-mission" className="py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            ROI Calculator
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            See Your Potential{" "}
            <span className="text-gradient-gold">Savings</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Adjust the sliders to match your current operations and discover 
            how much you could save with AI automation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
              <h3 className="text-xl font-serif font-semibold mb-8">Your Current Operations</h3>
              
              <div className="space-y-8">
                {/* Clients Slider */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Clients per month
                    </label>
                    <span className="text-lg font-semibold text-primary">{clients.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[clients]}
                    onValueChange={(value) => setClients(value[0])}
                    min={100}
                    max={10000}
                    step={100}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>100</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Messages Slider */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Average messages per conversation
                    </label>
                    <span className="text-lg font-semibold text-primary">{messagesPerConvo}</span>
                  </div>
                  <Slider
                    value={[messagesPerConvo]}
                    onValueChange={(value) => setMessagesPerConvo(value[0])}
                    min={5}
                    max={50}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Emails Slider */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Emails sent per month
                    </label>
                    <span className="text-lg font-semibold text-primary">{emailsPerMonth.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[emailsPerMonth]}
                    onValueChange={(value) => setEmailsPerMonth(value[0])}
                    min={500}
                    max={50000}
                    step={500}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>500</span>
                    <span>50,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Human System */}
              <div className="bg-muted/50 rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <i className="fas fa-user-group text-destructive" />
                  </div>
                  <h4 className="text-lg font-serif font-semibold">Human System</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={humansRequired} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Agents Required</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-destructive">
                      <AnimatedNumber value={humanMonthlyCost} prefix="$" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Monthly Cost</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={humanHoursConsumed} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Hours/Month</div>
                  </div>
                </div>
              </div>

              {/* AI System */}
              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-robot text-primary" />
                  </div>
                  <h4 className="text-lg font-serif font-semibold">AI System</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-foreground">
                      ~<AnimatedNumber value={Math.round(totalTokens / 1000)} suffix="k" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Tokens Used</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-primary">
                      <AnimatedNumber value={aiTotalCost} prefix="$" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Total Cost</div>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl">
                    <div className="text-2xl font-bold text-foreground">24/7</div>
                    <div className="text-xs text-muted-foreground mt-1">Availability</div>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-gradient-gold rounded-2xl p-6 text-secondary">
                <div className="text-center">
                  <div className="text-sm font-medium opacity-80 mb-2">Your Monthly Savings</div>
                  <div className="text-4xl md:text-5xl font-serif font-bold mb-2">
                    $<AnimatedNumber value={monthlySavings > 0 ? monthlySavings : 0} />
                  </div>
                  <div className="text-sm opacity-80">
                    + <AnimatedNumber value={hoursSaved} /> human hours saved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
