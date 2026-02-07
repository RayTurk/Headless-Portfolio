'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  honeypot?: string;
}

const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>({ status: 'idle' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceOptions = [
    'Web Development',
    'WordPress Customization',
    'Full-Stack Application',
    'Consulting',
    'Other',
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (formData.honeypot) {
      // Honeypot field filled - likely spam
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormState({
        status: 'error',
        message: 'Please fix the errors above',
      });
      return;
    }

    setFormState({ status: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState({
        status: 'success',
        message: 'Thanks for reaching out! I\'ll get back to you soon.',
      });

      setFormData({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: '',
        honeypot: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState({ status: 'idle' });
      }, 5000);
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Failed to send message. Please try again.',
      });
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name Field */}
      <motion.div custom={0} variants={fieldVariants} className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-surface-200">
          Your Name
        </label>
        <motion.input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-100 placeholder-surface-500 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 hover:border-surface-700/50',
            errors.name && 'border-red-500/50 focus:ring-red-500/50'
          )}
          placeholder="Ray Turk"
          whileFocus={{ scale: 1.01 }}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.name}
          </motion.p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div custom={1} variants={fieldVariants} className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-surface-200">
          Email Address
        </label>
        <motion.input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-100 placeholder-surface-500 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 hover:border-surface-700/50',
            errors.email && 'border-red-500/50 focus:ring-red-500/50'
          )}
          placeholder="ray@example.com"
          whileFocus={{ scale: 1.01 }}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* Service Field */}
      <motion.div custom={2} variants={fieldVariants} className="space-y-2">
        <label htmlFor="service" className="block text-sm font-medium text-surface-200">
          Service Interested In
        </label>
        <motion.select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-100 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 hover:border-surface-700/50',
            'appearance-none cursor-pointer',
            errors.service && 'border-red-500/50 focus:ring-red-500/50'
          )}
          whileFocus={{ scale: 1.01 }}
        >
          <option value="">Select a service...</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </motion.select>
        {errors.service && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.service}
          </motion.p>
        )}
      </motion.div>

      {/* Budget Field */}
      <motion.div custom={3} variants={fieldVariants} className="space-y-2">
        <label htmlFor="budget" className="block text-sm font-medium text-surface-200">
          Budget Range
        </label>
        <motion.select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-100 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 hover:border-surface-700/50',
            'appearance-none cursor-pointer',
            errors.budget && 'border-red-500/50 focus:ring-red-500/50'
          )}
          whileFocus={{ scale: 1.01 }}
        >
          <option value="">Select a range...</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </motion.select>
        {errors.budget && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.budget}
          </motion.p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div custom={4} variants={fieldVariants} className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-surface-200">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-surface-900/50 border border-surface-800/50 text-surface-100 placeholder-surface-500 transition-all duration-200 resize-none',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 hover:border-surface-700/50',
            errors.message && 'border-red-500/50 focus:ring-red-500/50'
          )}
          placeholder="Tell me about your project..."
          whileFocus={{ scale: 1.01 }}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {formState.status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-gap-3 gap-3"
          >
            <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-sm">{formState.message}</p>
          </motion.div>
        )}

        {formState.status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-gap-3 gap-3"
          >
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{formState.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.div custom={5} variants={fieldVariants}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={formState.status === 'loading'}
          disabled={formState.status === 'loading'}
          icon={<Send size={18} />}
          iconPosition="right"
          className="w-full"
        >
          {formState.status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
