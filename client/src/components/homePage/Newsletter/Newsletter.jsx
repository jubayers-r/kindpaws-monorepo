import { MailPlus, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/newsletter-bg.jpg"; // use your actual image path

const Newsletter = () => {
  return (
    <section
      className="w-full rounded-4xl overflow-hidden p-6 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Left side: Icon + Title */}
      <div className="flex items-center gap-4 text-white">
        <div className="bg-white rounded-full p-10 shadow-md">
          <MailPlus className="text-primary w-10 h-10" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl md:text-5xl font-semibold text-white max-w-md">
            Subscribe To Our Newsletter
          </h2>
        </div>
      </div>

      {/* Right side: Input + Button */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-xl flex items-center bg-white rounded-full overflow-hidden shadow-md"
      >
        <Input
          type="email"
          placeholder="Email Address"
          className="rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-10 py-8 flex-grow text-gray-700"
        />
        <Button
          type="submit"
          className="rounded-none rounded-r-full bg-primary hover:bg-secondary text-white px-6 py-8 text-sm font-semibold tracking-wide"
        >
          DISCOVER NOW <Send className="w-4 h-4 ml-2 " />
        </Button>
      </form>
    </section>
  );
};

export default Newsletter;
