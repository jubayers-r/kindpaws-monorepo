import { Menu, MoveUpRight } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import Logo from "../../assets/Logo";
import { Button } from "@radix-ui/themes";
import { NavItems } from "../../data/NavItems";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className=" p-4 flex items-center justify-between">
      {/* logo/ dropdown+logo on mobile */}
      <div className="navbar-start">
        <Logo />
      </div>
      {/* navcenter */}
      <div className="navbar-center hidden lg:flex bg-white rounded-4xl px-10 py-4">
        <ul className="flex gap-2 ">
          {NavItems.map((item, i) => (
            <li key={i} className="hover:text-orange-400">
              {" "}
              <NavLink to={item.href}>{item.label}</NavLink>
              {/* Render dot except after last item */}
              {i !== NavItems.length - 1 && (
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 mx-4"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* navend starts */}
      <div className="navbar-end flex items-center">
        {/* <Button className="btn">Toggle</Button> */}
        <Button className="btn">Login</Button>
        <div className="md:hidden">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-52 bg-white rounded shadow p-2 z-50">
              {NavItems.map((item, i) => (
                <DropdownMenu.Item className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <NavLink key={i} to={item.href}>
                    {item.label}
                  </NavLink>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

      </div>
      {/* navend ends */}
    </div>
  );
};

export default Navbar;
