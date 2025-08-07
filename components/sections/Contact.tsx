'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin,  X } from 'lucide-react';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactInfo = {
  email: 'habibtanwir1906@gmail.com',
  phone: '+91 7002135973',
  location: 'Assam, India',
  availability: 'Available for freelance work'
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Habib7442',
    icon: Github,
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/habib-tanwir/',
    icon: Linkedin,
    color: 'hover:text-blue-600'
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/TanwirHabib',
    icon: X,
    color: 'hover:text-blue-400'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if Firebase is properly configured
      const isFirebaseConfigured = process.env.NEXT_PUBLIC_API_KEY &&
                                   process.env.NEXT_PUBLIC_PROJECT_ID &&
                                   process.env.NEXT_PUBLIC_API_KEY !== 'your_api_key_here';

      if (isFirebaseConfigured) {
        // Save form data to Firebase Firestore (collection will be auto-created)
        await addDoc(collection(db, 'contact-messages'), {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          timestamp: serverTimestamp(),
          status: 'unread',
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
          ipAddress: 'client-side', // You can implement server-side IP detection if needed
        });
      } else {
        // Fallback: Log to console (for development)
        console.log('Form submission (Firebase not configured):', {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString()
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <Container>
        <div className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold handwritten text-blue-500">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold handwritten text-green-500">
                  Let's Connect
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  I'm always interested in hearing about new opportunities, 
                  whether that's a full-time position, freelance work, or just a chat about technology.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Mail size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-foreground/70 hover:text-blue-500 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-background border border-notebook-line rounded-lg sketch-border"
                >
                  <div className="p-2 bg-sketch-green/10 rounded-lg">
                    <Phone size={20} className="text-sketch-green" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-foreground/70 hover:text-sketch-green transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-background border border-notebook-line rounded-lg sketch-border"
                >
                  <div className="p-2 bg-sketch-orange/10 rounded-lg">
                    <MapPin size={20} className="text-sketch-orange" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-foreground/70">{contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-4 bg-sketch-green/10 border border-sketch-green/20 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-sketch-green rounded-full animate-pulse" />
                  <p className="font-medium text-sketch-green">{contactInfo.availability}</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold handwritten text-sketch-purple">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 bg-background border border-notebook-line rounded-lg transition-all duration-200 ${social.color} sketch-hover`}
                        aria-label={social.name}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-background border border-notebook-line rounded-xl p-8 sketch-border"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-lg text-center font-medium",
                      submitStatus === 'success'
                        ? "bg-sketch-green/10 text-sketch-green border border-sketch-green/20"
                        : "bg-red-50 text-red-600 border border-red-200"
                    )}
                  >
                    {submitStatus === 'success'
                      ? "✅ Message sent successfully! I'll get back to you soon."
                      : "❌ Please fill in all fields correctly and try again."}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full px-8 py-4 bg-sketch-blue text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
                    "hover:bg-sketch-blue/90 focus:outline-none focus:ring-2 focus:ring-sketch-blue focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "sketch-hover"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
