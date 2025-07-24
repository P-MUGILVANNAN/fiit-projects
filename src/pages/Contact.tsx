import type React from "react";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "3cbe8692-73ad-42ad-86e1-922d5668b31f", // Replace with your actual key
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          from_name: "FIIT Contact Form",
          botcheck: formData.get("botcheck"), // Anti-spam field
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error("Form submission failed:", result.message);
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with our team for any questions or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      1st Floor, 8, Kamaraja Nagar Main Rd, opposite Dr.
                      AGARWAL's EYE HOSPITAL, Reddiar Garden, Kamaraj Nagar,
                      Avadi, Tamil Nadu 600071
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Phone className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+918695577650"
                        className="hover:text-blue-600"
                      >
                        +91 86955 77650
                      </a>
                      <br />
                      <a
                        href="tel:+918695577620"
                        className="hover:text-blue-600"
                      >
                        +91 86955 77620
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Mail className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:fiit.avadi@gmail.com"
                        className="hover:text-blue-600"
                      >
                        fiit.avadi@gmail.com
                      </a>
                      <br />
                      <a
                        href="mailto:connect@gmail.com"
                        className="hover:text-blue-600"
                      >
                        connect@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Working Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 9:00 PM
                      <br />
                      Sunday: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+918695577650"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  <Phone className="mr-2" size={20} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/918695577650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  <svg
                    className="mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Web3Forms hidden fields */}
                <input
                  type="hidden"
                  name="access_key"
                  value="3cbe8692-73ad-42ad-86e1-922d5668b31f"
                />
                <input
                  type="hidden"
                  name="from_name"
                  value="FIIT Contact Form"
                />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="project-inquiry">Project Inquiry</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="workshop">Workshop Registration</option>
                    <option value="assignment">Assignment Help</option>
                    <option value="hardware">Hardware Projects</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your project requirements or questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Send className="mr-2" size={20} />
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Find Us
        </h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4204.483529286643!2d80.09378947536402!3d13.116152411691973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52627994491221%3A0x9d835057cf902724!2sFIIT!5e1!3m2!1sen!2sin!4v1753346306770!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FIIT Projects Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How quickly can you deliver a project?
            </h3>
            <p className="text-gray-600">
              Project delivery time depends on complexity. Simple projects take
              3-5 days, while complex ones may take 2-3 weeks. We provide
              realistic timelines during consultation.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Do you provide source code and documentation?
            </h3>
            <p className="text-gray-600">
              Yes, we provide complete source code, detailed documentation, user
              manuals, and technical support for all our projects.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Can you customize existing projects?
            </h3>
            <p className="text-gray-600">
              We can modify and customize any of our existing projects to meet
              your specific requirements and academic guidelines.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept bank transfers, UPI payments, credit/debit cards, and
              online payment gateways. Payment plans are available for larger
              projects.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
