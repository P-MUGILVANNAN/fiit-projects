import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">FIIT PROJECTS</h3>
            <p className="text-gray-300 mb-4">
              Empowering student innovation through comprehensive project solutions, consultations, and technical
              workshops.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+918695577650" className="text-blue-400 hover:text-blue-300">
                <Phone size={20} />
              </a>
              <a href="mailto:fiit.avadi@gmail.com" className="text-blue-400 hover:text-blue-300">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white">
                  Projects
                </a>
              </li>
              <li>
                <a href="/consultations" className="text-gray-300 hover:text-white">
                  Consultations
                </a>
              </li>
              <li>
                <a href="/workshops" className="text-gray-300 hover:text-white">
                  Workshops
                </a>
              </li>
              <li>
                <a href="/assignments" className="text-gray-300 hover:text-white">
                  Assignments
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>+91 86955 77650</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>fiit.avadi@gmail.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>1st Floor, 8, Kamaraja Nagar Main Rd, opposite Dr. AGARWAL's EYE HOSPITAL, Reddiar Garden, Kamaraj Nagar, Avadi, Tamil Nadu 600071</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} FIIT PROJECTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
