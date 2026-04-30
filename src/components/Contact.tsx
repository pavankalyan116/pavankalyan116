import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

// Types
type TFormStatus = "idle" | "loading" | "success" | "error";

interface TContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Constants
const INITIAL_FORM_DATA: TContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const STATUS_RESET_DELAY = 5000;

const Contact = React.memo((): React.ReactElement => {
  const [formData, setFormData] = useState<TContactFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<TFormStatus>("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("loading");

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to send message");

        setStatus("success");
        setFormData(INITIAL_FORM_DATA);
        setTimeout(() => setStatus("idle"), STATUS_RESET_DELAY);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), STATUS_RESET_DELAY);
      }
    },
    [formData],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  return (
    <section id="contact" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get In <span className="text-primary-500">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"
          />
          <p className="mt-4 text-gray-800 dark:text-gray-300">
            Have a question or want to work together? Leave a message.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-10 rounded-3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium ml-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button
              id="contact-submit"
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg hover:shadow-lg hover:from-primary-600 hover:to-secondary-600 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {status === "loading" ? (
                <span className="animate-pulse flex items-center gap-2">Sending...</span>
              ) : status === "success" ? (
                <span className="flex items-center gap-2">
                  <CheckCircle /> Sent successfully
                </span>
              ) : status === "error" ? (
                <span className="flex items-center gap-2">
                  <AlertCircle /> Error, try again
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Message <Send size={18} />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export { Contact };
