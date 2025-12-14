const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-serif font-bold text-secondary-foreground">
                Law
              </span>
              <span className="text-2xl font-serif font-bold text-gradient-gold">
                Glitch
              </span>
            </a>
            <p className="text-secondary-foreground/70 max-w-md leading-relaxed">
              Transform your customer operations into profit centers with 
              enterprise-grade AI automation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#our-mission" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@lawglitch.in" 
                  className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-envelope text-sm" />
                  contact@lawglitch.in
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-file-alt text-sm" />
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {currentYear} LawGlitch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-secondary-foreground/50 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-lg" />
            </a>
            <a 
              href="#" 
              className="text-secondary-foreground/50 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
