import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/dashboards">Dashboards</Link>
            </li>
            <li>
                <Link to="/dashboards/1">Dashboard Details</Link>
            </li>
        </ul>
    );
}