"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.2 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // The form will be handled by Netlify automatically
      // This is just to control the UI state
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Have questions about our project? Interested in collaboration? Get in touch with the L.I.S.A. team.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 bg-[#252525] rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  
                  {formStatus === "success" ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/20 text-green-400 rounded-full mb-4">
                        <Send size={24} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-gray-300">
                        Thank you for your message. We'll get back to you as soon as possible.
                      </p>
                      <button
                        className="mt-6 text-[#2563eb] hover:underline"
                        onClick={() => setFormStatus("idle")}
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      data-netlify="true"
                      name="contact"
                      method="POST"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-colors text-white"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-colors text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-colors text-white"
                          placeholder="What's this about?"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-colors text-white"
                          placeholder="Your message..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className={`w-full py-3 px-6 bg-[#2563eb] text-white rounded-lg flex items-center justify-center transition-colors ${
                          formStatus === "submitting"
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-[#1d4ed8]"
                        }`}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </button>
                      
                      {formStatus === "error" && (
                        <p className="text-red-400 text-sm mt-2">
                          An error occurred. Please try again.
                        </p>
                      )}
                    </form>
                  )}
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-gray-300 mb-8">
                      Feel free to reach out to us through any of the following channels.
                      We're always interested in discussing our project, potential collaborations,
                      or answering any questions.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Email</h3>
                        <p className="text-gray-300">
                          <a href="mailto:ishvish001@gmail.com" className="hover:text-[#2563eb] transition-colors">
                            ishvish001@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Location</h3>
                        <p className="text-gray-300">
                          NYIT<br />
                          1855 Broadway<br />
                          New York, NY 10018
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-[#2563eb]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Office Hours</h3>
                        <p className="text-gray-300">
                          Monday - Friday: 9:00 AM - 5:00 PM<br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6 bg-[#252525] rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Is the L.I.S.A. project open source?</h3>
              <p className="text-gray-300">
                Yes, all our design files, firmware, and documentation are available under the NYIT License.
                You can contact us for the files.
              </p>
            </Card>
            
            <Card className="p-6 bg-[#252525] rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Can I use your designs for commercial purposes?</h3>
              <p className="text-gray-300">
                Yes, the NYIT License allows for commercial use. However, we appreciate attribution and 
                would love to hear about your applications!
              </p>
            </Card>
            
            <Card className="p-6 bg-[#252525] rounded-xl">
              <h3 className="text-xl font-semibold mb-2">How long does it take to 3D print the arm components?</h3>
              <p className="text-gray-300">
                With standard settings (0.2mm layer height, 15% infill), each arm set takes approximately 8-10 hours to print.
                We recommend using PETG or ABS filament for better durability.
              </p>
            </Card>
            
            <Card className="p-6 bg-[#252525] rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Is your team available for consulting or collaboration?</h3>
              <p className="text-gray-300">
                Yes, we're open to collaboration opportunities and consulting projects. Please reach out through
                the contact form with details about your proposal.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 