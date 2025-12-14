import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onChatOpen: () => void;
}

const PricingSection = ({ onChatOpen }: PricingSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    "Custom AI training on your data",
    "Multi-channel integration",
    "Advanced analytics dashboard",
    "Priority 24/7 support",
    "Custom workflow automation",
    "Dedicated success manager",
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Header */}
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Custom Enterprise{" "}
            <span className="text-gradient-gold">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Every enterprise is unique. Your pricing depends on your scale, complexity, 
            and specific automation requirements.
          </p>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-3xl border border-border shadow-elevated p-8 md:p-12 max-w-3xl mx-auto"
          >
            {/* What's Included */}
            <div className="mb-10">
              <h3 className="text-xl font-serif font-semibold mb-6">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-xs text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-8" />

            {/* CTA */}
            <div>
              <p className="text-muted-foreground mb-6">
                Talk to Mira, our AI specialist, to get a personalized quote based on your needs.
              </p>
              <Button
                onClick={onChatOpen}
                size="lg"
                className="bg-gradient-gold text-secondary-foreground hover:opacity-90 transition-opacity px-8 py-6 text-lg font-medium shadow-gold"
              >
                <i className="fas fa-comments mr-3" />
                Get Your Custom Quote
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No commitment required. We'll respond within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <i className="fas fa-lock text-primary" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-file-contract text-primary" />
              <span>Custom SLAs Available</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-headset text-primary" />
              <span>White-Glove Onboarding</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
