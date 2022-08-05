import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar} from  '../Navbar';


class HomePage extends React.Component {
    componentDidMount() {
      
    }

    render() {
       
        return (
            <div>
            <Navbar/>
            <div className="container home-container">
             
               <div className='row'>
               <div className='col-md-5 separar-button'>  </div>
               <div className='col-md-5'> </div>
               <br/>
               <div className='col-md-4 separar-button'>
               <Link to="/Parent"><button className='btn btn-primary'><i class="fa fa-male"></i> Parents </button></Link></div>
               <div className='col-md-5'> </div>
               <br/>
               <div className='col-md-4 separar-button'>
               <Link to="/Child"><button className='btn btn-primary'> <i class="fa fa-child"></i> Childs </button></Link></div>
               </div>

            </div>
            </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };