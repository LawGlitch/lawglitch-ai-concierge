import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
  {
    icon: "fa-brands fa-whatsapp",
    title: "WhatsApp Automation",
    description: "Handle thousands of customer conversations simultaneously with intelligent AI responses.",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-500",
  },
  {
    icon: "fa-brands fa-facebook-f",
    title: "Facebook Automation",
    description: "Engage customers on Messenger with personalized, context-aware conversations.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500",
  },
  {
    icon: "fa-brands fa-instagram",
    title: "Instagram Automation",
    description: "Convert DMs into sales with AI-powered responses that understand intent.",
    color: "from-pink-500/20 to-purple-500/10",
    iconColor: "text-pink-500",
  },
  {
    icon: "fa-solid fa-envelope",
    title: "Email Automation",
    description: "Intelligent email sorting, responses, and follow-ups that never miss a lead.",
    color: "from-primary/20 to-accent/10",
    iconColor: "text-primary",
  },
  {
    icon: "fa-solid fa-globe",
    title: "Website Chat",
    description: "24/7 website assistant that qualifies leads and books meetings automatically.",
    color: "from-violet-500/20 to-indigo-500/10",
    iconColor: "text-violet-500",
  },
];

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Automate Every Customer{" "}
            <span className="text-gradient-gold">Touchpoint</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Seamlessly integrate AI across all your communication channels for a unified, 
            intelligent customer experience.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.a
              key={solution.title}
              href="#pricing"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 rounded-2xl bg-card border border-border hover-lift cursor-pointer overflow-hidden ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${solution.icon} text-2xl ${solution.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right text-xs" />
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
