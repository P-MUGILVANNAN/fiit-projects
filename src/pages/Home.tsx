import type React from "react";
import { motion, animate } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowRight, Star, Users, Award, Phone } from "lucide-react";
import Modal from "../components/Modal";
import arduino from "../assets/arduino.webp";
import aichat from "../assets/ai-chat.avif";
import iot from "../assets/iot-home.png";
import working from "../assets/working.jpg";
import { Link } from "react-router-dom";

// Animation variants for the stats cards
const statsVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -5,
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

const Counter = ({
  from = 0,
  to,
  duration = 4,
}: {
  from?: number;
  to: number;
  duration?: number;
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Import animate from framer-motion at the top: import { animate } from "framer-motion";
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => count.set(latest),
    });

    return () => controls.stop();
  }, [from, to]);

  return <motion.span>{rounded}</motion.span>;
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          phone: formData.get("phone"),
          project_type: formData.get("project_type"),
          subject: "New Project Consultation Request from Homepage",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user
    }
  };

  const featuredProjects = [
    {
      title: "IoT Smart Home System",
      category: "IEEE Project",
      description:
        "Complete home automation using IoT sensors and mobile app control",
      image: iot,
    },
    {
      title: "AI-Powered Chatbot",
      category: "Final Year",
      description: "Machine learning chatbot with natural language processing",
      image: aichat,
    },
    {
      title: "Arduino Weather Station",
      category: "Mini Project",
      description:
        "Real-time weather monitoring with data logging capabilities",
      image: arduino,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Student Innovation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop solution for academic projects, consultations, and
              technical workshops
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Get Free Consultation
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              Explore our most popular and innovative project solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link to={"/projects"}>
                    <button className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center">
                      View Details
                      <ArrowRight className="ml-1" size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About FIIT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About FIIT Projects
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are dedicated to empowering students with innovative project
                solutions, comprehensive consultations, and hands-on technical
                workshops. Our mission is to bridge the gap between academic
                learning and practical implementation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  custom={0}
                  variants={statsVariants}
                  className="text-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <motion.h3
                    className="font-semibold text-gray-900 text-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.6,
                    }}
                  >
                    <Counter to={500} />+
                  </motion.h3>
                  <p className="text-gray-600">Students Helped</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  custom={1}
                  variants={statsVariants}
                  className="text-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="text-green-600" size={24} />
                  </div>
                  <motion.h3
                    className="font-semibold text-gray-900 text-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.6,
                    }}
                  >
                    <Counter to={200} />+
                  </motion.h3>
                  <p className="text-gray-600">Projects Completed</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  custom={2}
                  variants={statsVariants}
                  className="text-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="text-yellow-600" size={24} />
                  </div>
                  <motion.h3
                    className="font-semibold text-gray-900 text-2xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      delay: 0.5,
                    }}
                  >
                    <Counter from={0} to={4.9} duration={1.5} />
                    /5
                  </motion.h3>
                  <p className="text-gray-600">Student Rating</p>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={working}
                alt="Students working on projects"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get expert guidance and turn your ideas into reality with our
            comprehensive project solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Free Consultation
            </button>
            <a
              href="tel:+918695577650"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2" size={20} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Free Project Consultation"
      >
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
              Thank You!
            </h3>
            <p className="text-gray-600">
              We'll contact you within 24 hours to discuss your project
              requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="hidden"
              name="access_key"
              value="3cbe8692-73ad-42ad-86e1-922d5668b31f"
            />
            <input
              type="hidden"
              name="subject"
              value="New Project Consultation Request"
            />

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
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
                type="email"
                name="email"
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
                type="tel"
                name="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="project_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Type
              </label>
              <select
                id="project_type"
                name="project_type"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Project Type</option>
                <option value="ieee">IEEE Project</option>
                <option value="final-year">Final Year Project</option>
                <option value="mini">Mini Project</option>
                <option value="hardware">Hardware Project</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Request
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
