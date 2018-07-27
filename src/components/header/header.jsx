import React, { Component } from 'react';
import photoPerfil from '../../images/ariel/me.jpg';
import facebook from '../../images/icons/facebook-icon.svg';

class Header extends Component{
    render(){
        return (
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-greenLigth">
                    <a href="#" className="position-img"><img className="profile-img" src={photoPerfil} alt="Eu" /></a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse" id="navbarColor02" style={{paddingLeft: 150 +'px'}}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Sobre mim</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Experiências</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Educação</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Habilidades</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projetos</a>
                            </li>
                        </ul>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div>
                    <h3 className="h3">Ariel Coelho de Souza Júnior</h3>
                    <div className="col-md-12">
                    <ul className="social-network social-circle">
                        <li><a href="#" className="icoFacebook" title="Facebook">F</a></li>
                        <li><a href="#" className="icoTwitter" title="Twitter">T</a></li>
                        <li><a href="#" className="icoLinkedin" title="Linkedin">L</a></li>
                    </ul>				
				</div>
                </div>
            </header>
        );
    }
}

export default Header;