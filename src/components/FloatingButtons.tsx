import { Phone, MessageCircle } from "lucide-react"

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
      <a
        href="https://wa.me/918695577650"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href="tel:+918695577650"
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Call Now"
      >
        <Phone size={24} />
      </a>
    </div>
  )
}
