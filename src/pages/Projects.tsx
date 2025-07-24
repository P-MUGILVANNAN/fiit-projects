import type React from "react";
import { useState } from "react";
import { Eye, Phone, ShoppingCart } from "lucide-react";
import Modal from "../components/Modal";
import smart_traffic from "../assets/smart-traffice.webp";
import block_chain from "../assets/blockchain-vote.png";
import iot_agri from "../assets/iot-agri.jpg";
import ai_medical from "../assets/ai-diagnosis.png";
import smart_home from "../assets/smart-home.png";
import e_learning from "../assets/e-learning.png";
import arduino_security from "../assets/arduino-security.png";
import weather from "../assets/arduino.webp";
import smart_park from "../assets/smart-parking.webp";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const projects = {
    ieee: [
      {
        id: 1,
        title: "Smart Traffic Management System",
        description:
          "AI-powered traffic optimization using computer vision and IoT sensors",
        fullDescription:
          "A comprehensive traffic management solution that uses computer vision to analyze traffic patterns, IoT sensors for real-time monitoring, and AI algorithms to optimize signal timing. The system reduces traffic congestion by up to 40% and includes a mobile app for real-time traffic updates.",
        image: smart_traffic,
      },
      {
        id: 2,
        title: "Blockchain-based Voting System",
        description:
          "Secure and transparent digital voting platform using blockchain technology",
        fullDescription:
          "A decentralized voting system built on blockchain technology ensuring transparency, security, and immutability of votes. Features include voter authentication, real-time vote counting, and audit trails. The system prevents vote tampering and ensures election integrity.",
        image: block_chain,
      },
      {
        id: 3,
        title: "IoT-based Smart Agriculture",
        description:
          "Automated farming system with soil monitoring and irrigation control",
        fullDescription:
          "An intelligent agriculture system that monitors soil moisture, temperature, humidity, and pH levels using IoT sensors. The system automatically controls irrigation, fertilizer distribution, and provides crop health analytics through a web dashboard and mobile app.",
        image: iot_agri,
      },
    ],
    finalYear: [
      {
        id: 4,
        title: "AI-Powered Medical Diagnosis",
        description:
          "Machine learning system for early disease detection from medical images",
        fullDescription:
          "A deep learning-based medical diagnosis system that analyzes X-rays, CT scans, and MRI images to detect diseases like pneumonia, tumors, and fractures. The system achieves 95% accuracy and includes a user-friendly interface for healthcare professionals.",
        image: ai_medical,
      },
      {
        id: 5,
        title: "Smart Home Automation",
        description:
          "Complete home automation system with voice control and mobile app",
        fullDescription:
          "A comprehensive home automation solution featuring voice control, mobile app integration, energy monitoring, security system integration, and AI-based learning of user preferences. Compatible with Alexa, Google Assistant, and custom voice commands.",
        image: smart_home,
      },
      {
        id: 6,
        title: "E-Learning Platform with AR/VR",
        description:
          "Immersive learning experience using augmented and virtual reality",
        fullDescription:
          "An innovative e-learning platform that combines traditional online learning with AR/VR technologies. Students can explore 3D models, conduct virtual experiments, and participate in immersive simulations. Includes progress tracking and adaptive learning algorithms.",
        image: e_learning,
      },
    ],
    mini: [
      {
        id: 7,
        title: "Arduino-based Security System",
        description:
          "Home security system with motion detection and SMS alerts",
        fullDescription:
          "A cost-effective home security system using Arduino, PIR sensors, and GSM module. Features include motion detection, door/window sensors, SMS alerts, and a simple web interface for monitoring. Perfect for small homes and apartments.",
        image: arduino_security,
      },
      {
        id: 8,
        title: "Weather Monitoring Station",
        description: "Real-time weather data collection and display system",
        fullDescription:
          "A compact weather monitoring station that measures temperature, humidity, pressure, wind speed, and rainfall. Data is displayed on an LCD screen and uploaded to a cloud dashboard for remote monitoring and historical analysis.",
        image: weather,
      },
      {
        id: 9,
        title: "Smart Parking System",
        description:
          "Automated parking slot detection using ultrasonic sensors",
        fullDescription:
          "An intelligent parking management system that detects available parking slots using ultrasonic sensors and displays the information on LED boards and a mobile app. Includes automatic billing and reservation features.",
        image: smart_park,
      },
    ],
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
          access_key: "3cbe8692-73ad-42ad-86e1-922d5668b31f", // Replace with your actual access key
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          project: selectedProject?.title,
          subject: `Project Inquiry: ${selectedProject?.title}`,
          from_name: "FIIT Projects Website",
          botcheck: formData.get("botcheck"), // Anti-spam field
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
          setSelectedProject(null);
        }, 2000);
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

  const renderProjectCards = (projectList: any[], _category: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projectList.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <button
              onClick={() => handleViewDetails(project)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors inline-flex items-center"
            >
              <ShoppingCart className="mr-2" size={16} />
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-gray-600">
            Explore our comprehensive collection of academic and research
            projects
          </p>
        </div>

        {/* IEEE Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            IEEE Projects
          </h2>
          {renderProjectCards(projects.ieee, "IEEE")}
        </section>

        {/* Final Year Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Final Year Projects
          </h2>
          {renderProjectCards(projects.finalYear, "Final Year")}
        </section>

        {/* Mini Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Mini Projects
          </h2>
          {renderProjectCards(projects.mini, "Mini")}
        </section>
      </div>

      {/* Project Details Modal */}
      <Modal
        isOpen={isModalOpen && selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
          setIsSubmitted(false);
        }}
        title={selectedProject?.title || ""}
      >
        {selectedProject && (
          <div>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Request Submitted!
                </h3>
                <p className="text-gray-600">
                  We'll contact you within 24 hours with project details and
                  pricing.
                </p>
              </div>
            ) : (
              <>
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-6">
                  {selectedProject.fullDescription}
                </p>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Request Project Details
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Web3Forms hidden fields */}
                    <input
                      type="hidden"
                      name="access_key"
                      value="3cbe8692-73ad-42ad-86e1-922d5668b31f"
                    />
                    <input
                      type="hidden"
                      name="subject"
                      value={`Project Inquiry: ${selectedProject.title}`}
                    />
                    <input
                      type="hidden"
                      name="from_name"
                      value="FIIT Projects Website"
                    />
                    <input type="checkbox" name="botcheck" className="hidden" />

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="project"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Selected Project
                      </label>
                      <input
                        id="project"
                        name="project"
                        type="text"
                        value={selectedProject.title}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                          isLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? "Submitting..." : "Submit Request"}
                      </button>
                      <a
                        href="tel:+918695577650"
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-center inline-flex items-center justify-center"
                      >
                        <Phone className="mr-2" size={16} />
                        Call Now
                      </a>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
