import { NavLink } from "react-router";
import { NavItems } from "../../../data/NavItems";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/auth/AuthContext";

const NavLinks = () => {
  const { user } = useAuth();

  return (
    <ul className="flex gap-2">
     
      {NavItems.map((item, i) => (
        <li key={i} className="hover:text-amber-500">
          {" "}
          <NavLink to={item.href}>{item.label}</NavLink>
          {/* Render dot except after last item */}
          {i !== NavItems.length - 1 && (
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
