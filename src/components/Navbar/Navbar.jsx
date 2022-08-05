import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
        render() {
      
            return (             
<header>
				<nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
					<div className="container" >
					
					    <a className="navbar-brand text-brand" >
					      <a href="/" > <img className='navbar-logo cursor-p' src={'https://doorvel.com/static/media/Doorvel-logo.1d27291fcd824f56239d.png'}/></a>   
						</a>
						
						
						<div className="navbar-collapse collapse justify-content-center navbar-rigt-menu" id="navbarDefault">
                        <div className='separar-button'> <Link to=""><i className="fa fa-home" aria-hidden="true"></i> {" "} Inicio </Link> </div>
                        <div className='separar-button'>  </div>
                        <div className='separar-button'> <Link to="login"><i className="fa fa-sign-in" aria-hidden="true"></i> {" "} Cerrar Sesión </Link> </div>
					    
						</div>
						
                            

						<button className="navbar-toggler collapsed" type="button"  data-bs-toggle="offcanvas"
						 data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
								<i className="fa fa-bars" aria-hidden="true"></i>
	
						</button>
              
					</div>
					
				</nav>
			
				<div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Menu</h5> 
                 
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
 
  
  <div className='separar-button'> <Link to="login"><i className="fa fa-sign-in" aria-hidden="true"></i> {" "} Cerrar Sesión </Link> </div>									


  </div>
</div>
		  </header>
          
      
      
     );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectednav = connect(mapStateToProps)(Navbar);
export { connectednav as Navbar };
