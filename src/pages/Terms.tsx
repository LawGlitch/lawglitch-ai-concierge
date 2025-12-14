const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-1">
              <span className="text-2xl font-serif font-bold text-foreground">Law</span>
              <span className="text-2xl font-serif font-bold text-gradient-gold">Glitch</span>
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <i className="fas fa-arrow-left mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service & Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">Terms of Service</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to LawGlitch. By accessing and using our services, you agree to be bound by these Terms of Service.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">1. Service Description</h3>
              <p>
                LawGlitch provides enterprise AI automation solutions for customer support operations. Our services include but are not limited to WhatsApp automation, email automation, and multi-channel customer engagement tools.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">2. User Responsibilities</h3>
              <p>
                Users agree to use our services in compliance with all applicable laws and regulations. Misuse of our AI systems or attempts to circumvent security measures are strictly prohibited.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">3. Service Level Agreements</h3>
              <p>
                Enterprise clients receive custom SLAs as part of their subscription. Standard uptime guarantees and support response times are outlined in individual service agreements.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-foreground">Privacy Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Data Collection</h3>
              <p>
                We collect information necessary to provide our services, including contact information, usage data, and conversation logs for AI training purposes. All data is encrypted and stored securely.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">Data Usage</h3>
              <p>
                Your data is used solely to provide and improve our services. We do not sell personal information to third parties. AI models may be trained on anonymized data to improve response quality.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">Data Security</h3>
              <p>
                We implement industry-standard security measures including SOC 2 compliance, end-to-end encryption, and regular security audits to protect your data.
              </p>
              <h3 className="text-lg font-semibold text-foreground mt-6">Contact</h3>
              <p>
                For privacy-related inquiries, please contact us at{" "}
                <a href="mailto:contact@lawglitch.in" className="text-primary hover:underline">
                  contact@lawglitch.in
                </a>
              </p>
            </div>
          </section>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LawGlitch. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Terms;
