import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Apointment() {
  const [date, setDate] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [petType, setPetType] = useState("");
  const [time, setTime] = useState("08:00");

  const handleReservation = () => {
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !phone || !email || !petType || !date || !time) {
      toast.error("⚠️ Please fill out all fields before reserving.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("📞 Please enter a valid phone number.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("📧 Please enter a valid email address.");
      return;
    }

    toast.success(
      `🎉 Reservation confirmed for ${name} with a ${petType} on ${date.toLocaleDateString()} at ${time}.`
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto p-10 bg-primary text-white rounded-[2.5rem] relative"
    >
      <h2 className="text-center text-2xl font-bold mb-8">
        Schedule A Visit Today!
      </h2>

      {/* Form Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type Your Full Name"
            className="bg-white border-none text-black placeholder:text-gray-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium">Phone</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+123 888 ..."
            required
            pattern="^\+?[0-9\s\-]{7,15}$" // ✅ allows +123, spaces, dashes
            className="bg-white border-none text-black placeholder:text-gray-300"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@hotmail.com"
            required
            className="bg-white border-none text-black placeholder:text-gray-300"
          />
        </div>

        {/* Pet Type */}
        <div>
          <label className="block mb-2 text-sm font-medium">Pet Type</label>
          <Select onValueChange={setPetType}>
            <SelectTrigger className="bg-white text-black border-none w-full">
              <SelectValue placeholder="Select Pet Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-white border-none text-gray-300"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : "mm/dd/yyyy"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div>
          <label className="block mb-2 text-sm font-medium">Time</label>
          <div className="flex items-center bg-white rounded-md px-3 py-2 text-gray-300">
            <Clock className="mr-2 h-4 w-4 opacity-70" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <Button
          onClick={handleReservation}
          className="px-8 py-3 rounded-full text-white text-lg font-semibold hover:ml-5"
        >
          Start A Reservation →
        </Button>
      </div>
    </motion.div>
  );
}
