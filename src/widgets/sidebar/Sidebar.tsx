import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <>
        <hr />
        <ul>
            <li>
                <Link to="/dashboards">Dashboards</Link>
            </li>
        </ul>
        <hr />
        </>
    );
}