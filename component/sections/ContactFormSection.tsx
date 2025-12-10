'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import Button from '../button/PrimaryButton';
import axiosInstance from '@/lib/axios/axiosInstance';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await axiosInstance.post("/contact", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      console.log("API Response:", response.data);
      toast.success("Your message has been sent successfully!");
      setSubmitStatus("success");
      // Clear form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 2500);

    } catch (error) {
      console.error("Form submit error:", error);
      toast.error("Failed to send your message. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-foreground text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-24">
          {/* Form Section - 7 columns */}
          <div className="md:col-span-8">
            <h2 className="md:text-2xl font-semibold text-lg mb-8">Please fulfil the form below.</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-md mb-2">
                  Your Name (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#F5F5F5] rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Your Email (required)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#F5F5F5] rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm mb-2">
                  Subject (required)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#F5F5F5] rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Your Message (required)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-transparent border border-[#F5F5F5] rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  placeholder="Enter your message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button 
                type="submit"
                label={isSubmitting ? 'Sending...' : 'Send'} 
                className='px-12 text-white'
                disabled={isSubmitting}
              />

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm mt-4">Message sent successfully! We'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-4">Please fill in all required fields correctly.</p>
              )}
            </form>
          </div>

          {/* Contact Information Section - 5 columns */}
          <div className="md:col-span-4 space-y-12">
            {/* Before Contacting Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
                Before Contacting Us
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every detail of our service embodies the spirit of Switzerland renowned for its precision, punctuality, and warmth. 
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-6 uppercase tracking-wider">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {/* Address - First Field */}
                <div className="text-sm">
                  <p className="text-white mb-1">Address:</p>
                  <p className="text-[#848484]">
                    Spitalstrasse 31, Schlieren, 8952, Switzerland
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-white" />
                  <span className="text-[#848484]">+41 76 318 08 82</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-[#848484]">info@alpine-prestige-rides.ch</span>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-[#848484]">Mon-Sun: 24 Hours</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}