import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import Lottie from 'lottie-react';
import robotAnimation from './../../public/animation/Robot says hello.json';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

// --- NEW GreetingRobot Component ---
const GreetingRobot = () => {
  const [greeting, setGreeting] = useState("Hello there!");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Placeholder for Text-to-Speech ---
  const speakGreeting = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // Normal speech rate
      utterance.pitch = 1.0; // Normal pitch

      // Optional: Find a robotic voice
      // const voices = window.speechSynthesis.getVoices();
      // utterance.voice = voices.find(voice => voice.name.includes('Google US English')); // Example, adjust as needed

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis API not supported in this browser.");
    }
  };

  useEffect(() => {
    // Automatically say hello when component mounts
    speakGreeting(greeting);
    // You could also add a delay here, or trigger on scroll into view
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 rounded-2xl glass-effect text-center relative overflow-hidden min-h-[400px]">
      
      {/* Background radial gradient for subtle effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-800/30 to-transparent opacity-50 z-0 animate-fade-in-slow"></div>

      {/* Lottie Robot Animation */}
      <div 
        className={`w-80 h-80 flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 
                    ${isSpeaking ? 'scale-105' : 'scale-100'}`}
        style={{
          transform: isSpeaking ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)',
          filter: isSpeaking ? 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.7))' : 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))'
        }}
      >
        <Lottie 
          animationData={robotAnimation} 
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white relative z-10">
        <span className={`transition-colors duration-300 ${isSpeaking ? 'text-cyan-400' : 'text-white'}`}>
          {greeting}
        </span>
      </h3>
      <p className="text-lg text-muted-foreground max-w-sm relative z-10">
        I'm Aura, Vanshika's AI companion. Glad to see you here! Feel free to send a message.
      </p>

      {/* Optional: A button to re-trigger the greeting */}
      <Button 
        onClick={() => speakGreeting(greeting)} 
        disabled={isSpeaking}
        className="mt-6 gradient-nebula hover:opacity-90 transition-opacity glow-effect relative z-10"
      >
        {isSpeaking ? "Speaking..." : "Say Hello Again"}
      </Button>
    </div>
  );
};
// --- END GreetingRobot Component ---

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent! 🚀",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's create something amazing together. Reach out and let's discuss your next project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT COLUMN: Contact Form */}
          <motion.div
            className="relative p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-75"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
                backgroundSize: '300% 300%',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-10"
            >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-heading font-semibold mb-8 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-purple-500" />
                Send Vanshika a <span className="gradient-text ml-2">Message</span>
              </h3>
            </motion.div>
            
            {/* Name Field */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10 ${
                  focusedField === 'name' ? 'text-purple-400' : 'text-muted-foreground'
                }`} />
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="glass-effect border-accent/30 focus:border-purple-500 pl-11 h-12 transition-all duration-300 hover:border-purple-400/50"
                />
                {focusedField === 'name' && (
                  <motion.div
                    layoutId="inputHighlight"
                    className="absolute inset-0 border-2 border-purple-500 rounded-md pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10 ${
                  focusedField === 'email' ? 'text-purple-400' : 'text-muted-foreground'
                }`} />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="glass-effect border-accent/30 focus:border-purple-500 pl-11 h-12 transition-all duration-300 hover:border-purple-400/50"
                />
                {focusedField === 'email' && (
                  <motion.div
                    layoutId="inputHighlight"
                    className="absolute inset-0 border-2 border-purple-500 rounded-md pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative">
                <Textarea
                  placeholder="Your Project Idea / Inquiry"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={7}
                  className="glass-effect border-accent/30 focus:border-purple-500 resize-none transition-all duration-300 hover:border-purple-400/50"
                />
                {focusedField === 'message' && (
                  <motion.div
                    layoutId="inputHighlight"
                    className="absolute inset-0 border-2 border-purple-500 rounded-md pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-nebula hover:opacity-90 transition-all duration-300 glow-effect h-12 text-lg group relative overflow-hidden"
                size="lg"
              >
                <motion.span 
                  className="flex items-center justify-center gap-2"
                  animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                    </>
                  )}
                </motion.span>
              </Button>
            </motion.div>
          </motion.form>
          </motion.div>

          {/* RIGHT COLUMN: Greeting Robot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GreetingRobot />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;