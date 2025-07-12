import { DropdownMenu } from "radix-ui";
import { NavItems } from "../../../data/NavItems";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLink } from "react-router";

const MobileMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon " aria-label="Open menu">
          <Menu />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-52 bg-white rounded shadow p-2 z-50">
        {NavItems.map((item, i) => (
          <DropdownMenu.Item
            key={i}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <NavLink to={item.href}>{item.label}</NavLink>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MobileMenu;
