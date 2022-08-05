import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (             


<div className="container row ">

    <div className="col-sm-12 col-md-8" id="login_img">
        
            <img className="img-fluid" src={'https://doorvel.com/static/media/registerbanner-min.be2190f7f536e383cbac.webp'} alt="logo" />
        
    </div>
     
    <div className="col-sm-12 col-md-4">
        <br /><br /><br /><br />
        <div className="login-inc">
          <h5>BIENVENIDO A ISA</h5>
            <form className="form-group" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label className="usuario-lab" htmlFor="username"><span>Correo</span></label> <br />
                    <input type="text" className="form-control-u" name="username" placeholder="usuario@gmail.com" value={username} onChange={this.handleChange} />
                    {submitted && !username &&
                        <div className="help-block">Usuario es Requerido</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <br />
                    <label className="lal-contraseña" htmlFor="password">Contraseña</label> <br />
                    <div class="input-group input-pass">
<input type='password' value={password} onChange={this.handleChange} name="password"class="form-control sinborde-right" placeholder="************"  aria-describedby="btnGroupAddon"/>

<div class="input-group-prepend">
<div className="lupa-login"> </div>
</div>
</div>
{submitted && !password &&
                        <div className="lab-contraseña">Contraseña es Requerida</div>
                    }                         
                    <br />
                   
                    <br />

                    <label className="lbl-recordar"><input type="checkbox" id="cbox1" value="first_checkbox" /> Recordar mi usuario</label>
                </div>
                <br />
                <div className="form-group">
                    <button className="btn btn-primary"><label className="lbl-portal"><span>Iniciar sesión</span></label> </button>
                    {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
                <br/>
                <div className="form-group d-flex justify-content-center">
                    <label className="recordar-contraseña" data-toggle="modal" data-target="#modalClienteRecuperar">¿Olvidaste tu contraseña?</label>                                    
                </div>
                <br />
                
                <div className="form-group d-flex justify-content-center">
                  
                </div>
                    
                    
                

            </form>



        </div>                        

    </div>

</div>


        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 