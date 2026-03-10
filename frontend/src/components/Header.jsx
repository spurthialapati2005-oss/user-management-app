import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="flex justify-between px-10 items-center bg-blue-200 py-5">
      <img className="rounded-full" width="80px" src="https://static.vecteezy.com/system/resources/previews/000/550/535/non_2x/user-icon-vector.jpg" alt="" />
      <ul className="flex gap-6 text-2xl">
        <li>
          <NavLink to="" className={({ isActive }) => (isActive ? "bg-blue-500 text-blue-50 rounded-xl p-2 shadow" : "")}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-user" className={({ isActive }) => (isActive ? "bg-blue-500 text-blue-50 rounded-2xl p-2" : "")}>
            AddUser
          </NavLink>
        </li>

        <li>
          <NavLink to="/users-list" className={({ isActive }) => (isActive ? "bg-blue-500 text-blue-50 rounded-2xl p-2" : "")}>
            UsersList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;