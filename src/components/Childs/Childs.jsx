import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import config from "config";
import { Navbar } from '../Navbar';
import { authheader_post } from '../../_helpers';
import { authHeader_get } from '../../_helpers';
import Swal from 'sweetalert2'

 class Childs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			listaParents: [],
			listachilds: [],
			listaParentsBusqueda:[],
			it_parent:0,
			buscarProy: "",
			ordenar: 1,
			lineasPorPagina: 10,
			pagina:1,
			numPaginas:0,
			paginacion_paginacion: 5,
         	paginacion_pagina: 1,
			arrayPagination:[],
			imagencoti: 'ico-cotizaciones-tran',
			errorCtJr:false
		};

		this.onChangebuscarProy = this.onChangebuscarProy.bind(this);
		
		this.onPaginationAdelante = this.onPaginationAdelante.bind(this);
		this.onPaginationAtras = this.onPaginationAtras.bind(this);
		
		this.onPaginationPagAdelante = this.onPaginationPagAdelante.bind(this);
        this.onPaginationPagAtras = this.onPaginationPagAtras.bind(this);

		this.setPagination = this.setPagination.bind(this);
		this.setPaginationFilters = this.setPaginationFilters.bind(this);
		

     }

     onPaginationPagAdelante() {
      if (this.state.paginacion_pagina < this.state.paginacion_paginacion * this.state.paginacion_pagina) {
        this.setState({
          paginacion_pagina: (this.state.paginacion_pagina += 1)
        })    
      }  
    }
    
    onPaginationPagAtras() {
      if (this.state.paginacion_pagina > 0) {
        this.setState({
          paginacion_pagina: (this.state.paginacion_pagina -= 1)
        })    
      }
    }
    onPaginationNum(num){
		this.setState({
            pagina: num
        });
	
	
	}

	onPaginationAdelante(){
		if(this.state.pagina < this.state.numPaginas){
			
			this.setState({
				pagina: this.state.pagina += 1
			});
		}
		
	}
	
	onPaginationAtras(){
		if(this.state.pagina > 1){
		
			this.setState({
				pagina: this.state.pagina -= 1
			});
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0); 
	    this.getParents();
	}

	
	

	onChangebuscarProy(e) {
        this.setState({
            buscarProy: e.target.value
        });

		this.setPaginationFilters(e.target.value,this.state.buscarStatus)
    }


	alertConfirm(mensaje,status) {  
        Swal.fire({  
            title: 'Aviso!',
            type: status,
            text: mensaje,
            icon: status,
            showCancelButton: false,
            showConfirmButton: false,
			showCloseButton: true
        });  
    }
	
	sortObject(key){
		this.state.listaParents.sort((name1, name2) => {
			return this.compareObjects(name1, name2, key)
		});

		this.state.ordenar = -1 * this.state.ordenar

		this.setState({
			listaParents: this.state.listaParents
		})
	}



	

	compareObjects(object1, object2, key) {
		const obj1 = object1[key].toUpperCase()
		const obj2 = object2[key].toUpperCase()

		if (obj1 < obj2) {
			return this.state.ordenar * -1
		}
		if (obj1 > obj2) {
			return this.state.ordenar * 1
		}
		return 0
	}

	setPaginationFilters(buscarProy){
		var response = [];
		var listaParents=[];		
		response = this.state.listaParentsBusqueda.map((item, index) => {
			if(	
				(buscarProy == "" || ((item.name).toLowerCase()).includes(buscarProy.toLowerCase())) ||
				(buscarProy == "" || ((item.seo_friendly).toLowerCase()).includes(buscarProy.toLowerCase()))
            )
			
		
			{
			
				listaParents.push(item)
			}
		}) 


		this.setPagination(listaParents)
	}
	
	setPagination(response){
	    
		var pag = Math.ceil(response.length / this.state.lineasPorPagina)
		var arr = [];

		for (let index = 0; index <= pag; index++) {
			var ele = {
				number : index
			}
			arr.push(ele)
		}
       
		this.setState({
			listaParents:response,
			arrayPagination : arr,
			numPaginas : pag,
			pagina:1
		})
	}

    SetHijos(buscarPadre, listahijos){
		var response = [];
		var listaParents=[];		
		response = listahijos.map((item, index) => {
			if(	
				(buscarPadre == "" || String(item.property_category_id).includes(buscarPadre))
            )
			{
			
				listaParents.push(item)
			}
		}) 
     console.log(listaParents)
     this.setState({listachilds : listaParents})
		
	}
	
	
	
	
   getchilds(id_parent,idx){
	   if (this.state.imagencoti !='ico-cotizaciones-giro'){
	var requestOptions = authHeader_get();
	fetch(`${config.apiUrl}/Parents`, requestOptions) 
	.then(response => response.json())
	.then(response => {
		this.setState({
			it_parent:idx,
			imagencoti:'ico-cotizaciones-giro',
			errorCtJr:true		
		})
        this.SetHijos(id_parent, response.data)

	
	})
	.catch(error=> console.log("lista hijos:"+error), this.setState({
		errorCtJr:false
	}))
}else{
		this.setState({
			it_parent:"",
			imagencoti:'ico-cotizaciones-tran',
			errorCtJr:false		
		})
	}
   }

  


   getParents(){
		var requestOptions = authHeader_get();
		fetch(`${config.apiUrl}/Chids`,requestOptions )
		.then(response => response.json())
		.then(response => {
		
			 
			this.setState({
				listaParents: response.results,
				listaParentsBusqueda: response.results,ErrorParents: true		
			})

			this.setPagination(response.results)

		})
		.catch(error=> console.log("lista hijos:"+error), this.setState({ErrorParents:false}))

	}
    
	

	
 
	render() { let options = [];
		this.state.errorCtJr == true &&	
	this.state.listachilds.map((it) => {
		options.push(
		<tr>									
                <td className="center-tex">                        
                         { it.property_category_id} 
						 </td> 
						<td className="center-tex" >
							<Link className="label-en-verde" 
                             to={{pathname: "/Detalle", state: {idParent:  it.property_category_id,Name:it.name,status: it.active_record, Seo_friendly:it.seo_friendly, createdate: it.created_at,
                                upd_date:it.updated_at , creador: it.created_by,idChild:0,  isHijo: false} }}
                           
                            >
								{it.name}
							</Link>
		
						</td>
						<td className="center-tex priority-4"> {it.seo_friendly} </td> 
                        <td className="center-tex"> <div className={it.active_record ==true ? 'label-en-verde-2' : 'label-en-rojo'}> {it.active_record == true ? 'Activo' : 'Inactivo'} </div></td> 
						<td className="priority-5 center-tex">{it.created_at}</td>
                        <td className="priority-5 center-tex">{it.updated_at}</td>
                        <td className="center-tex"><div className="label-en-amarillo"> {it.created_by} </div></td>
		   </tr>

           
		)
		  
	   });

	 
	   
		
	 
		return (
			
			<div>
				
				<Navbar />
				 
				<div className="container productos-in ficha-tecnica">
					<div class="row align-items-center r-margin-bottom">
						<div className="productos-header-titulo">
							<div className="astra-titulo">Childs</div>
							<div className="astra-breadcumbs">
								<label className="label-en-rojo2">
									<Link to="/" style={{ textDecoration: 'none' }}> Inicio /</Link>									
								</label> Childs
							</div>							
						</div>	
					</div>
					<br/>
					<div className="row">     
                        <div className="col-sm-6">
                                          
                        </div>
                        
						<div className="col-sm-6 row">
						<div className="col-sm-6">
							 
						
							
						</div>
						<div className="col-sm-6">
					
						</div>
                                        
                       </div>                      
                   </div>
					<br/>

					<div className="container row">
						<div className="col-sm-6 separar-div-m">
                                   <div class="input-group input-text-con-icono-derecha separar-div-m">
									
										<input className="form-control" value={this.state.buscarProy} onChange={this.onChangebuscarProy} type="text" placeholder="Buscar por name/seo friendly" aria-describedby="lupita" />
										<div class="input-group-append">
											<span class="input-group-text img-buscal" id="lupita"><i class="fa fa-search" aria-hidden="true"></i></span>
										</div>
									</div>
						</div>
						<div className="col-sm-6 row">
                             <div className="col-sm-4 separar-div-m">
							
							 </div>
							 <div className="col-sm-3 separar-div-m">
							
							 </div>
						</div>
					</div>
      
					
					<div className="card-componente-tabla-estados table-responsive">
              				<table>
               				 <thead className="card-gris">
								<tr>
									<th>ID Parent </th>
									<th >Name <i class="fa fa-fw fa-sort" onClick={(e) => this.sortObject('name')}></i> </th>
								    <th >Seo friendly</th> 
								</tr>
							</thead>
							<tbody>
								{this.state.ErrorParents ==true &&
								this.state.listaParents.map((item, index) => {
									if (
										( index >= (this.state.pagina - 1) * this.state.lineasPorPagina ) 
										&&
										( index < (this.state.pagina) * this.state.lineasPorPagina )
									  ){
										 
		return	  <React.Fragment>
		 <tr className='card-separad-lin'  key={index} >	
         <td className="center-tex">  
         { this.state.imagencoti== 'ico-cotizaciones-tran' && 		
						 <i className="accordion-toggle fa fa-chevron-right"
						 onClick={() =>this.getchilds(item.property_category, item.id)}  
						 data-toggle="collapse" data-target={"#demo"+item.id } 
						 aria-hidden="true"> { item.id}</i>
						 }
						 { this.state.it_parent == item.id   && 
						 <i className="accordion-toggle fa fa-chevron-down" 
						 onClick={() =>this.getchilds(item.property_category, item.id)}
						 data-toggle="collapse" data-target={"#demo"+item.id } 
				
                         >{ item.id} </i> 
                         
						 } </td> 
	           <td className="center-tex" >
							<Link className="label-en-verde" 
                             to={{pathname: "/Detalle", state: {idParent: 0,Name:item.name,status: item.active_record, Seo_friendly:item.seo_friendly, createdate: item.created_at,
                                upd_date:item.updated_at , creador: item.created_by,idChild:item.id,  isHijo: false} }}
                            >
								{item.name}
							</Link>
						</td>
				<td className="center-tex"> {item.seo_friendly} </td>   

		</tr> 
		<tr>
				<td colspan={8} className="hiddenRow">
				<div className="accordian-body collapse" id={"demo"+item.id} > 
				<div className="card-componente-tabla-estados table-responsive">				
				 <table>
                 <thead  className="card-gris-t" >
							
                                <tr>
									
									<th className="tesinsd">ID Parent </th>
									<th >Name </th>
								    <th  className="priority-5">Seo friendly</th> 
									<th>Status</th>
                                    <th className="priority-5">Creation date</th>
                                    <th className="priority-5">Update date</th>
									<th >Created by</th>
									<th></th>
								</tr>
							</thead>
				<tbody>
			    						   
								{options}										 
				
				</tbody>
				</table>
				</div>
				</div>
				</td>   
				</tr> </React.Fragment>
				 
									}
									
									
																	
								}
								
								
								
								
								)
								
								
								}

                               						
								


							</tbody>
						</table>
						{this.state.numPaginas >1 &&
						<div className="productos-content-main-paginacion">
						<nav aria-label="Page navigation example">
                          <ul class="pagination">
                            <li class="page-item" onClick={this.onPaginationAtras}>
                              <a  class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
							{
								this.state.arrayPagination.map((item, index) =>{
									if(index > 0){
											if(
											(
												( index == ( ( this.state.paginacion_paginacion * ( this.state.paginacion_pagina - 1 ) ) - 1 ) )
												&&
												index > 0
											)
											){
											return (
												<li class="page-item" key={item.number} onClick={() => this.onPaginationPagAtras()} >
												<a class="page-link" href="#">
													...
												</a>
												</li>
											);
											}
				
											if(
												( ( index >= ( this.state.paginacion_paginacion * ( this.state.paginacion_pagina - 1 ) ) ) && index > 0)
												&&
												( index < ( this.state.paginacion_paginacion * this.state.paginacion_pagina ) )
											){
												return (
												<li class="page-item" key={item.number} onClick={() => this.onPaginationNum(item.number)} >
													<a class="page-link" href="#">
													{item.number}
													</a>
												</li>
												);
											}
											
											if(index == ( this.state.paginacion_paginacion * this.state.paginacion_pagina ) ){
											return (
												<li class="page-item" key={item.number} onClick={() => this.onPaginationPagAdelante()} >
												<a class="page-link" href="#">
													...
												</a>
												</li>
											);
											}
				
									}								
								})
							}
							
                            <li class="page-item" onClick={this.onPaginationAdelante}>
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
						</div>
						}
					</div>
				</div> 
	          
              
			    
			   
				<br/><br/><br/><br/><br/><br/>
      



				
									
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

const conectChilds = connect(mapStateToProps)(Childs);
export { conectChilds as Childs };
