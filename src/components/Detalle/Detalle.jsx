import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Navbar} from '../Navbar';
import config from "config";


class Detalle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            DetalleProducto: [],
            cveinsumo: "",
            cantidad: 1,
          Error:false,
          _Id:0
         
        };
  
    }
    

    
    componentDidMount() {
       
        const json = this.props.location.state.Name;
           
      if (json !=null){
     
            if (this.props.location.state.idChild == 0){
                this.setState({ _Id_Parent: this.props.location.state.idParent,
                    _name: this.props.location.state.Name,_Status:this.props.location.state.status, Seo_friendly:this.props.location.state.Seo_friendly, 
                    _createdate:this.props.location.state.createdate, _upd_da: this.props.location.state.upd_date,Creador: this.props.location.state.creador ,Error:true    
                })
               
            
            }else{
                this.setState({ _Id:this.props.location.state.idChild,
                    _name: this.props.location.state.Name, Seo_friendly:this.props.location.state.Seo_friendly,Error:true   
                })
    }
    
    }
        
     window.scrollTo(0, 0);   
    }
    

    render() {
       

        return (
            <div>
                <Navbar/>
               
                <div className="container productos-in ficha-tecnica">
                {this.state.Error ==true && 
                        <div className="row row-r-25 ficha-info">
                    <div className="astra-titulo">  {this.state._Id==0 ? this.state._Id_Parent: this.state._Id} </div>
                    <div className="astra-breadcumbs"><label className="label-en-rojo2"><Link to="/" style={{ textDecoration: 'none' }}> Inicio /</Link><Link to={this.state._Id!=0 ? '/Child':'/Parent'} style={{ textDecoration: 'none' }}> {this.state._Id!=0 ? 'Child':'Parent'} /</Link></label> {this.state._Id!=0 ? this.state._Id: this.state._Id_Parent} </div>
                    
                            <div className="col-md col-r-25 ficha-contenedor-imagen">
                                <img className="card-img" src={'public/img/img_dummy/dummy.jpg' } />                                
                            </div>
                            <div className="col-md col-r-25 ficha-contenedor-imagen-descripcion">
                               
                                <div>
                                    <div className="ficha-info-titulo"> {this.state._Id!=0 ? this.state._Id: this.state._Id_Parent}</div>
                                  <div className="ficha-info-precio">
                                    </div>
                                     
                                </div>
                                
                                <div className="ficha-info-block">
                                   
                                    <div className="card-componente-subtitulo">                                        
                                       
                                        <div className="ficha-info-disponibilidad">
                                            
                              
                                <span className="span-disponibilidad-disponible">{this.state._name}</span> 
                           

                                        </div>
                                    </div><br/>
                                    
                                </div>
                                
                                <div className="ficha-info-block">
                                    <div className="card-componente-subtitulo">Información del {this.state._Id!=0 ? 'Child':'Parent'}</div>
                                    <div className="ficha-info-texto">  
                                    
                                    Name: {this.state._name}
                                    </div>
                                    <div className="ficha-info-texto">  
                                      Seo friendly:{this.state.Seo_friendly}
                                 
                                    </div>
                                </div>
    
                                <br />  
                                
                            </div>
                        </div>}
                           
                            <br/>
                       
                </div>
                <br/><br/><br/><br/>
                

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

const connectedDetalle = connect(mapStateToProps)(Detalle);
export {connectedDetalle as Detalle};