import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "COO, TechVentures Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "LawGlitch transformed our customer support entirely. We reduced response times by 85% while handling 3x more inquiries. The ROI was visible within the first month.",
    stats: "85% faster responses",
  },
  {
    name: "Michael Chen",
    role: "CEO, GlobalRetail Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The AI understands context like no other solution we've tried. Our customers can't tell they're talking to an AI, and our support costs dropped by 70%.",
    stats: "70% cost reduction",
  },
  {
    name: "Emily Rodriguez",
    role: "VP Operations, FinanceFirst",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "Implementation was seamless, and the team at LawGlitch provided white-glove support throughout. Our customer satisfaction scores have never been higher.",
    stats: "98% satisfaction rate",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Trusted by Industry{" "}
            <span className="text-gradient-gold">Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how enterprises are transforming their customer operations with our AI solutions.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift"
            >
              {/* Quote */}
              <div className="mb-6">
                <i className="fas fa-quote-left text-primary/20 text-3xl" />
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              {/* Stats Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <i className="fas fa-chart-line text-xs" />
                {testimonial.stats}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <i className="fas fa-building text-primary" />
            <span className="text-sm">500+ Enterprise Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-message text-primary" />
            <span className="text-sm">10M+ Conversations Automated</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-star text-primary" />
            <span className="text-sm">4.9/5 Average Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
