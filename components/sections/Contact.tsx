'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin,  X, Terminal } from 'lucide-react';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactInfo = {
  email: 'habibtanwir1906@gmail.com',
  phone: '+91 7002135973',
  location: 'Assam, India',
  availability: 'STATUS: AVAILABLE_FOR_HIRE'
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Habib7442',
    icon: Github,
    color: 'hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/habib-tanwir/',
    icon: Linkedin,
    color: 'hover:text-neon-blue'
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/TanwirHabib',
    icon: X,
    color: 'hover:text-neon-blue'
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
    <section id="contact" className="py-20 relative overflow-hidden">
      <Container>
        <div className="space-y-12 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron text-neon-blue tracking-widest uppercase glitch" data-text="Initialize_Comms">
              Initialize_Comms
            </h2>
            <div className="w-32 h-1 bg-neon-blue mx-auto shadow-[0_0_10px_var(--neon-blue)]" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-rajdhani">
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
                <h3 className="text-2xl font-semibold font-orbitron text-neon-yellow tracking-wider">
                  &lt;CONNECTION_DETAILS /&gt;
                </h3>
                <p className="text-foreground/70 leading-relaxed font-rajdhani">
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
                  className="flex items-center space-x-4 p-4 bg-black/40 border border-neon-blue/30 hover:border-neon-pink/50 transition-colors group"
                >
                  <div className="p-2 bg-neon-blue/10 rounded-none group-hover:bg-neon-pink/10 transition-colors">
                    <Mail size={20} className="text-neon-blue group-hover:text-neon-pink transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium font-vt323 text-neon-blue tracking-wide">EMAIL_ADDRESS</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-foreground/70 hover:text-neon-pink transition-colors font-rajdhani"
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
                  className="flex items-center space-x-4 p-4 bg-black/40 border border-neon-blue/30 hover:border-neon-pink/50 transition-colors group"
                >
                  <div className="p-2 bg-neon-blue/10 rounded-none group-hover:bg-neon-pink/10 transition-colors">
                    <Phone size={20} className="text-neon-blue group-hover:text-neon-pink transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium font-vt323 text-neon-blue tracking-wide">PHONE_NUMBER</p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-foreground/70 hover:text-neon-pink transition-colors font-rajdhani"
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
                  className="flex items-center space-x-4 p-4 bg-black/40 border border-neon-blue/30 hover:border-neon-pink/50 transition-colors group"
                >
                  <div className="p-2 bg-neon-blue/10 rounded-none group-hover:bg-neon-pink/10 transition-colors">
                    <MapPin size={20} className="text-neon-blue group-hover:text-neon-pink transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium font-vt323 text-neon-blue tracking-wide">LOCATION_COORDS</p>
                    <p className="text-foreground/70 font-rajdhani">{contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-4 bg-neon-green/5 border border-neon-green/30"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-neon-green rounded-none animate-pulse shadow-[0_0_5px_var(--neon-green)]" />
                  <p className="font-medium text-neon-green font-vt323 tracking-widest">{contactInfo.availability}</p>
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
                <h4 className="text-lg font-semibold font-orbitron text-neon-purple tracking-wider">
                  ESTABLISH_UPLINK
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
                        whileHover={{ y: -2, scale: 1.1, borderColor: "var(--neon-pink)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 bg-black/40 border border-neon-blue/30 transition-all duration-200 ${social.color} group`}
                        aria-label={social.name}
                      >
                        <Icon size={20} className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
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
              className="bg-black/60 border border-neon-blue/30 p-8 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-50" />
              <div className="absolute top-0 left-0 bg-neon-blue/20 px-2 py-1 text-xs font-vt323 text-neon-blue">
                TRANSMISSION_MODULE
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-medium text-neon-blue font-vt323 uppercase tracking-widest">
                      Sender_Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-neon-blue/30 text-foreground focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] transition-all duration-200 font-rajdhani"
                      placeholder="ENTER_NAME"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium text-neon-blue font-vt323 uppercase tracking-widest">
                      Sender_Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/40 border border-neon-blue/30 text-foreground focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] transition-all duration-200 font-rajdhani"
                      placeholder="ENTER_EMAIL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-medium text-neon-blue font-vt323 uppercase tracking-widest">
                    Subject_Line *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-neon-blue/30 text-foreground focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] transition-all duration-200 font-rajdhani"
                    placeholder="ENTER_SUBJECT"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium text-neon-blue font-vt323 uppercase tracking-widest">
                    Message_Content *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/40 border border-neon-blue/30 text-foreground focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] transition-all duration-200 resize-none font-rajdhani"
                    placeholder="TYPE_MESSAGE_HERE..."
                  />
                </div>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 border text-center font-vt323 text-lg tracking-wide",
                      submitStatus === 'success'
                        ? "bg-neon-green/10 text-neon-green border-neon-green/50"
                        : "bg-red-500/10 text-red-500 border-red-500/50"
                    )}
                  >
                    {submitStatus === 'success'
                      ? "> TRANSMISSION_SUCCESSFUL. STANDBY_FOR_RESPONSE."
                      : "> ERROR: TRANSMISSION_FAILED. CHECK_INPUTS."}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px var(--neon-blue)" }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full px-8 py-4 bg-neon-blue/10 border border-neon-blue text-neon-blue font-bold transition-all duration-200 flex items-center justify-center space-x-2 font-orbitron tracking-widest uppercase",
                    "hover:bg-neon-blue hover:text-black",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>INITIATE_SEND</span>
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
