import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import "./styles.css";

class City extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName:""
        };
    }

    changeCity(name){
        this.setState({cityName:name})
        console.log(this.state.cityName);

        this.props.setCityName(name)
    }

    render() {
        return (
            <>
                <div id="game-cards">

                    <div id="button">
                    <Link to="/cityTemp" id="link">
                        <button className="nav-btn" onClick={() => this.changeCity('Gaza')}>
                            <div>
                                <h1>Gaza City</h1>
                            </div>
                        </button>
                    </Link>
                    </div>

                    <div id="button">
                    <Link to="/cityTemp" id="link">
                        <button className="nav-btn" onClick={() => this.changeCity('London')}>
                            <div>
                                <h1>London City</h1>
                            </div>
                        </button>
                    </Link>
                    </div>

                    <div id="button">
                    <Link to="/cityTemp" id="link">
                        <button className="nav-btn" onClick={() => this.changeCity('München')}>
                            <div>
                                <h1>München City</h1>
                            </div>
                        </button>
                    </Link>
                    </div>
                    
                </div>
            </>
        );
    }
}

const stateToProps = (state) => {
    return {
      cityNameToGetTemp: state.cityTemp.cityName,
    };
};
  
const dispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setCityName: (cityName) => {
                return { type: "CHANGE_CITY_NAME", payload: cityName };
            },
        },
        dispatch
    );
};

export default connect(stateToProps, dispatchToProps)(City);