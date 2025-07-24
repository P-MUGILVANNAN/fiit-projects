import type React from "react";
import { useState } from "react";
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react";
import Modal from "../components/Modal";
import iot_arduino from "../assets/arduino-iot.jpg";
import mobile_app from "../assets/mobile-app.png";
import blockchain from "../assets/block-chain-tech.png";
import machine from "../assets/machine-learning.jpg";
import web from "../assets/web-development.png";
import datascience from "../assets/data-sceince.jpeg";

export default function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const upcomingWorkshops = [
    {
      id: 1,
      title: "IoT Development with Arduino",
      date: "2024-02-15",
      time: "10:00 AM - 4:00 PM",
      duration: "6 hours",
      participants: "25",
      location: "FIIT Iyyappanthangal",
      price: "₹1,999",
      description:
        "Learn to build IoT projects using Arduino, sensors, and cloud connectivity. Hands-on workshop with real projects.",
      topics: [
        "Arduino Programming",
        "Sensor Integration",
        "WiFi Connectivity",
        "Cloud Data Storage",
        "Mobile App Integration",
      ],
      image: iot_arduino,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      date: "2024-02-22",
      time: "9:00 AM - 5:00 PM",
      duration: "8 hours",
      participants: "30",
      location: "Online + FIIT Lab",
      price: "₹2,499",
      description:
        "Comprehensive introduction to machine learning with Python, covering algorithms, data preprocessing, and model deployment.",
      topics: [
        "Python for ML",
        "Data Preprocessing",
        "Supervised Learning",
        "Model Evaluation",
        "Deployment Strategies",
      ],
      image: machine,
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      date: "2024-03-01",
      time: "10:00 AM - 6:00 PM",
      duration: "8 hours",
      participants: "40",
      location: "FIIT Lab, Tech Center",
      price: "₹1,799",
      description:
        "Full-stack web development workshop covering HTML, CSS, JavaScript, React, and Node.js with project deployment.",
      topics: [
        "HTML5 & CSS3",
        "JavaScript ES6+",
        "React.js",
        "Node.js & Express",
        "Database Integration",
      ],
      image: web,
    },
  ];

  const pastWorkshops = [
    {
      id: 4,
      title: "Blockchain Development",
      date: "2024-01-20",
      participants: "35",
      rating: "4.8/5",
      image: blockchain,
    },
    {
      id: 5,
      title: "Mobile App Development",
      date: "2024-01-15",
      participants: "28",
      rating: "4.9/5",
      image: mobile_app,
    },
    {
      id: 6,
      title: "Data Science with Python",
      date: "2024-01-10",
      participants: "42",
      rating: "4.7/5",
      image: datascience,
    },
  ];

  const handleRegister = (workshop: any) => {
    setSelectedWorkshop(workshop);
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
          course: formData.get("course"),
          workshop: selectedWorkshop?.title,
          workshop_date: selectedWorkshop?.date,
          workshop_price: selectedWorkshop?.price,
          subject: `Workshop Registration: ${selectedWorkshop?.title}`,
          from_name: "FIIT Workshops",
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
          setSelectedWorkshop(null);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Workshops
          </h1>
          <p className="text-lg text-gray-600">
            Hands-on learning experiences to enhance your technical skills
          </p>
        </div>

        {/* Upcoming Workshops */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Workshops
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={workshop.image || "/placeholder.svg"}
                  alt={workshop.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {workshop.title}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {workshop.price}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{workshop.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2" size={16} />
                      <span>
                        {new Date(workshop.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2" size={16} />
                      <span>
                        {workshop.time} ({workshop.duration})
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2" size={16} />
                      <span>Max {workshop.participants} participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2" size={16} />
                      <span>{workshop.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(workshop)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Workshops */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Past Workshops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={workshop.image || "/placeholder.svg"}
                  alt={workshop.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {workshop.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2" size={16} />
                      <span>
                        {new Date(workshop.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2" size={16} />
                      <span>{workshop.participants} participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-500 mr-2">★</span>
                      <span>{workshop.rating} rating</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workshop Benefits */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Attend Our Workshops?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p className="text-gray-600 text-sm">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Hands-on Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Practical projects and real-world applications
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Flexible Schedule
              </h3>
              <p className="text-gray-600 text-sm">
                Weekend and evening sessions available
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certificate</h3>
              <p className="text-gray-600 text-sm">
                Completion certificate for your portfolio
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWorkshop(null);
          setIsSubmitted(false);
        }}
        title={`Register for ${selectedWorkshop?.title || ""}`}
      >
        {selectedWorkshop && (
          <div>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-600 mb-4">
                  You'll receive a confirmation email with workshop details and
                  payment instructions.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Workshop:</strong> {selectedWorkshop.title}
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(selectedWorkshop.date).toLocaleDateString()}
                    <br />
                    <strong>Price:</strong> {selectedWorkshop.price}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <img
                    src={selectedWorkshop.image || "/placeholder.svg"}
                    alt={selectedWorkshop.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Workshop Details
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedWorkshop.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {selectedWorkshop.time}
                      </p>
                      <p>
                        <strong>Duration:</strong> {selectedWorkshop.duration}
                      </p>
                      <p>
                        <strong>Location:</strong> {selectedWorkshop.location}
                      </p>
                      <p>
                        <strong>Price:</strong> {selectedWorkshop.price}
                      </p>
                    </div>
                  </div>
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
                    value={`Workshop Registration: ${selectedWorkshop.title}`}
                  />
                  <input
                    type="hidden"
                    name="from_name"
                    value="FIIT Workshops"
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
                      htmlFor="course"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Course/Department
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <option value="information-technology">
                        Information Technology
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Processing..." : "Register Now"}
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
