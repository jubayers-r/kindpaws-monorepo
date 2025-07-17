import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Share2, Globe } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const contactItems = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "+880 18669-65359",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Mohakhali DOHS, Dhaka",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "juabyer.shikder.007@gmail.com",
  },
];

const socialIcons = [
  <a
    href="https://linkedin.com/in/jubayer-shikder"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 text-black flex items-center justify-center hover:text-primary"
  >
    <FaLinkedinIn className="w-4 h-4" />
  </a>,
  <a
    href="https://x.com/jubayers_r"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 text-black flex items-center justify-center hover:text-primary"
  >
    <FaXTwitter className="w-4 h-4" />
  </a>,
  <a
    href="https://facebook.com/jubayers.r"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 text-black flex items-center justify-center hover:text-primary"
  >
    <FaFacebookF className="w-4 h-4" />{" "}
  </a>,
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 text-black flex items-center justify-center hover:text-primary"
  >
    <FaInstagram className="w-4 h-4" />
  </a>,
];

export default function ContactUs() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            We’re Here for You and Your Future Pet
          </h2>
          <p className="text-muted-foreground max-w-md">
            Have questions about adoption, campaigns, or caring for your new
            companion? Reach out — our team is ready to help you every paw-step
            of the way.
          </p>
          <div className="mt-6 space-y-5">
            {contactItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="p-3 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </span>
                <p className="text-base text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="p-3 rounded-full bg-primary/10 text-primary">
              <Share2 className="w-4 h-4" />
            </span>
            <div className="flex gap-4">
              {socialIcons.map((icon, i) => (
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 text-black flex items-center justify-center hover:text-primary"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-muted/50 border-none shadow-sm">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-semibold text-primary">
                Your queries are important to us
              </h3>
              <p className="text-sm text-muted-foreground">
                Your email address will not be published. Required fields are
                marked *
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input placeholder="E-mail*" type="email" required />
              </div>
              <Input placeholder="Phone numer" type="url" />
              <Textarea placeholder="Message*" rows={5} required />
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Send Us Message →
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
