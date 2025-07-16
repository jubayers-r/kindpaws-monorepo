import { NavItems } from '@/data/NavItems';
import {Link} from 'react-router';

const QuickLinks = () => {
    return (
      <div className="flex flex-col gap-5 items-center text-center">
          <h3 className="font-[Paytone_One] text-xl">Quicklinks</h3>
          <ul className="flex flex-col gap-2">
            {NavItems.map((item, i) => (
              <li key={i}>
                <Link to={item.href} className="hover:text-amber-500 ">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default QuickLinks;