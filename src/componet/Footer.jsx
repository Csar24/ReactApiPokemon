
import "./Style/footer.css"

import { Link } from "react-router-dom"
function Footer(){

    return(
        <div className="menu-footer">
            <nav className="menu">
                <ul className="contenedor-enlaces">
                    <li>
                        <Link to="/" >@©1995 - 2025 Pokemon</Link>
                    </li>
                    <li>
                        <Link to="/Nosotros" >The Pokemon Compani</Link>
                    </li>                                      
                </ul>
            </nav>

        </div>
        
    )

}
export default Footer