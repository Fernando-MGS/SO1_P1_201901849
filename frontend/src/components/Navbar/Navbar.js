import './Navbar.css'
export const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img src='https://cdn-icons.flaticon.com/png/512/5013/premium/5013652.png?token=exp=1660975996~hmac=da4cb41eab7738519420613172f8f88f'/>
                </a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" >
                                SO1 KDC
                            </a>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};