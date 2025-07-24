import type React from "react";
import { useState } from "react";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";

export default function Consultations() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "3cbe8692-73ad-42ad-86e1-922d5668b31f", // Replace with your actual access key
          name: formData.get("name"),
          email: formData.get("email"),
          course: formData.get("course"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Consultations
          </h1>
          <p className="text-lg text-gray-600">
            Get expert guidance for your academic projects and technical
            challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Book Your Free Consultation
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Consultation Booked!
                </h3>
                <p className="text-gray-600">
                  Our expert will contact you within 2 hours to schedule your
                  free consultation session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="access_key"
                  value="3cbe8692-73ad-42ad-86e1-922d5668b31f"
                />{" "}
                {/* Optional: Can also include in the fetch body */}
                <input
                  type="hidden"
                  name="subject"
                  value="New Consultation Request"
                />
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
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
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course/Department
                  </label>
                  <select
                    id="course"
                    name="course"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your course</option>
                    <option value="computer-science">
                      Computer Science Engineering
                    </option>
                    <option value="electronics">
                      Electronics & Communication
                    </option>
                    <option value="electrical">Electrical Engineering</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="information-technology">
                      Information Technology
                    </option>
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
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project requirements or questions..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Book Free Consultation
                </button>
              </form>
            )}
          </div>

          {/* Consultation Benefits */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Get
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    30-minute one-on-one consultation with our expert
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Project feasibility analysis and recommendations
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Technology stack suggestions and guidance
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Timeline and milestone planning
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Resource requirements and cost estimation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-green-500 mr-3 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700">
                    Follow-up support and guidance
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact us directly for urgent project assistance
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+918695577650"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  <Phone className="mr-2" size={20} />
                  Call Now: +91 86955 77650
                </a>

                <a
                  href="https://wa.me/918695577650"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src={student1}
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-gray-600 text-sm">CSE Final Year</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The consultation helped me choose the perfect project topic and
                technology stack. The guidance was invaluable!"
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src={student2}
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya</h4>
                  <p className="text-gray-600 text-sm">ECE 3rd Year</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Excellent support and clear explanations. They helped me
                understand complex concepts easily."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src={student3}
                  alt="Student"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Anita Patel</h4>
                  <p className="text-gray-600 text-sm">IT Final Year</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Professional service with quick response. My project was
                completed successfully with their guidance."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
