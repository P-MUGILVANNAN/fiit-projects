import type React from "react";
import { useState } from "react";
import { Cpu, Wifi, Camera, Zap, Phone, Mail } from "lucide-react";
import Modal from "../components/Modal";
import smart_home from "../assets/smart-home.png";
import weather from "../assets/arduino.webp";
import smart_agri from "../assets/iot-agri.jpg";
import security from "../assets/arduino-security.png";
import plant from "../assets/Automatic-Plant-Watering-Project-using-Arduino.png";
import traffice from "../assets/traffice.jpg";
import face from "../assets/face-recognition.jpg";
import voice from "../assets/voice-assistant.webp";
import survilance from "../assets/survillance.jpg";
import line_robo from "../assets/line-follower-robot.webp";
import obstacle from "../assets/obstacle-avoiding-robot.webp";
import robo_arm from "../assets/robo-arm.webp";

export default function Hardware() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hardwareCategories = [
    {
      id: 1,
      title: "IoT Projects",
      icon: <Wifi size={32} />,
      description:
        "Internet of Things projects with sensors, connectivity, and cloud integration",
      projects: [
        {
          title: "Smart Home Automation",
          description: "Complete home automation with mobile app control",
          image: smart_home,
          components: ["ESP32", "Sensors", "Relays", "Mobile App"],
        },
        {
          title: "Weather Monitoring System",
          description: "Real-time weather data collection and analysis",
          image: weather,
          components: [
            "Arduino",
            "Weather Sensors",
            "WiFi Module",
            "Cloud Dashboard",
          ],
        },
        {
          title: "Smart Agriculture System",
          description: "Automated irrigation and crop monitoring",
          image: smart_agri,
          components: ["Soil Sensors", "Water Pumps", "ESP32", "Mobile Alerts"],
        },
      ],
      color: "blue",
    },
    {
      id: 2,
      title: "Arduino Projects",
      icon: <Cpu size={32} />,
      description:
        "Microcontroller-based projects for automation and control systems",
      projects: [
        {
          title: "Security Alarm System",
          description:
            "Motion detection with SMS alerts and camera integration",
          image: security,
          components: ["Arduino Uno", "PIR Sensor", "GSM Module", "Buzzer"],
        },
        {
          title: "Automatic Plant Watering",
          description: "Soil moisture-based automatic watering system",
          image: plant,
          components: ["Arduino", "Soil Sensor", "Water Pump", "LCD Display"],
        },
        {
          title: "Traffic Light Controller",
          description: "Intelligent traffic management with timer control",
          image: traffice,
          components: [
            "Arduino",
            "LED Lights",
            "Timer Circuit",
            "Push Buttons",
          ],
        },
      ],
      color: "green",
    },
    {
      id: 3,
      title: "Raspberry Pi Projects",
      icon: <Camera size={32} />,
      description: "Single-board computer projects for advanced applications",
      projects: [
        {
          title: "Face Recognition System",
          description: "AI-powered face detection and recognition system",
          image: face,
          components: ["Raspberry Pi 4", "Camera Module", "Python", "OpenCV"],
        },
        {
          title: "Voice Assistant",
          description: "Custom voice assistant with smart home control",
          image: voice,
          components: ["Raspberry Pi", "USB Microphone", "Speaker", "Python"],
        },
        {
          title: "Surveillance System",
          description: "Multi-camera surveillance with motion detection",
          image: survilance,
          components: [
            "Raspberry Pi",
            "Multiple Cameras",
            "Storage",
            "Web Interface",
          ],
        },
      ],
      color: "purple",
    },
    {
      id: 4,
      title: "Robotics Projects",
      icon: <Zap size={32} />,
      description:
        "Robotic systems with sensors, actuators, and intelligent control",
      projects: [
        {
          title: "Line Following Robot",
          description: "Autonomous robot that follows a predefined path",
          image: line_robo,
          components: ["Arduino", "IR Sensors", "Motors", "Chassis"],
        },
        {
          title: "Obstacle Avoidance Robot",
          description: "Smart robot that navigates around obstacles",
          image: obstacle,
          components: ["Ultrasonic Sensor", "Servo Motor", "Arduino", "Wheels"],
        },
        {
          title: "Robotic Arm",
          description:
            "Programmable robotic arm with multiple degrees of freedom",
          image: robo_arm,
          components: [
            "Servo Motors",
            "Arduino",
            "Joystick",
            "Mechanical Parts",
          ],
        },
      ],
      color: "orange",
    },
  ];

  const handleInquiry = (category: any) => {
    setSelectedCategory(category);
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
          access_key: "3cbe8692-73ad-42ad-86e1-922d5668b31f", // Replace with your actual key
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          college: formData.get("college"),
          project_interest: formData.get("project_interest"),
          requirements: formData.get("requirements"),
          category: selectedCategory?.title,
          subject: `Hardware Project Inquiry: ${formData.get(
            "project_interest"
          )}`,
          from_name: "FIIT Hardware Projects",
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
          setSelectedCategory(null);
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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-50 to-blue-100 text-blue-600 border-blue-200",
      green: "from-green-50 to-green-100 text-green-600 border-green-200",
      purple: "from-purple-50 to-purple-100 text-purple-600 border-purple-200",
      orange: "from-orange-50 to-orange-100 text-orange-600 border-orange-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hardware Projects
          </h1>
          <p className="text-lg text-gray-600">
            Explore our comprehensive collection of hardware and embedded system
            projects
          </p>
        </div>

        {/* Hardware Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {hardwareCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-gradient-to-br ${getColorClasses(
                category.color
              )} border rounded-lg p-8`}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">{category.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {category.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.components.map((component, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleInquiry(category)}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Get Quote & Details
              </button>
            </div>
          ))}
        </div>

        {/* Why Choose Our Hardware Projects */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Hardware Projects?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quality Components
              </h3>
              <p className="text-gray-600 text-sm">
                We use only genuine, high-quality electronic components
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Complete Solutions
              </h3>
              <p className="text-gray-600 text-sm">
                Hardware, software, documentation, and support included
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Testing & Validation
              </h3>
              <p className="text-gray-600 text-sm">
                All projects are thoroughly tested before delivery
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Technical Support
              </h3>
              <p className="text-gray-600 text-sm">
                Ongoing technical support and troubleshooting
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Requirement Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                We analyze your project requirements and specifications
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Design & Planning
              </h3>
              <p className="text-gray-600 text-sm">
                Create detailed circuit design and component selection
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Development & Testing
              </h3>
              <p className="text-gray-600 text-sm">
                Build, program, and thoroughly test the hardware
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery & Support
              </h3>
              <p className="text-gray-600 text-sm">
                Deliver complete project with documentation and support
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
          setIsSubmitted(false);
        }}
        title={`${selectedCategory?.title || ""} Inquiry`}
      >
        {selectedCategory && (
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
                  Inquiry Submitted!
                </h3>
                <p className="text-gray-600 mb-4">
                  Our hardware expert will contact you within 2 hours with
                  detailed information and pricing.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="tel:+918695577650"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="mr-1" size={16} />
                    Call Now
                  </a>
                  <a
                    href="mailto:fiit.avadi@gmail.com"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="mr-1" size={16} />
                    Email Us
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div
                    className={`bg-gradient-to-r ${getColorClasses(
                      selectedCategory.color
                    )} p-4 rounded-lg mb-4`}
                  >
                    <div className="flex items-center">
                      {selectedCategory.icon}
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">
                          {selectedCategory.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {selectedCategory.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get detailed information about components, pricing,
                    timeline, and technical specifications.
                  </p>
                </div>

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
                    value={`Hardware Project Inquiry: ${selectedCategory.title}`}
                  />
                  <input
                    type="hidden"
                    name="from_name"
                    value="FIIT Hardware Projects"
                  />
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
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
                      htmlFor="college"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      College/University
                    </label>
                    <input
                      id="college"
                      name="college"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="project_interest"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Specific Project Interest
                    </label>
                    <select
                      id="project_interest"
                      name="project_interest"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a project</option>
                      {selectedCategory.projects.map(
                        (project: any, index: any) => (
                          <option key={index} value={project.title}>
                            {project.title}
                          </option>
                        )
                      )}
                      <option value="custom">Custom Project</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your specific requirements, features needed, timeline, etc."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
