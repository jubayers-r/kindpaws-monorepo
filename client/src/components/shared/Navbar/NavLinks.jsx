import { NavLink } from "react-router";
import { NavItems } from "../../../data/NavItems";
import { useAuth } from "@/hooks/useAuth";

const NavLinks = () => {
  const { user } = useAuth();

  // make a copy instead of mutating NavItems
  const items = [...NavItems];

  if (user) {
    items.push(
      { label: "Dashboard", href: "/dashboard" },
      { label: "Contact Us", href: "/contact-us" }
    );
  }

  return (
    <ul className="flex gap-2">
      {items.map((item, i) => (
        <li key={i} className="hover:text-amber-500">
          <NavLink to={item.href}>{item.label}</NavLink>
          {i !== items.length - 1 && (
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 lg:mx-4"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
