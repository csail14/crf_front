import React, {Component} from 'react';

class Dropdown extends Component {
    container = React.createRef()
    state = {
        open: false
    }
    handleButtonClick = () => {
        this.setState((state) => {
            return {
                open: !state.open
            }
        })
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside)
    }

    handleClickOutside = (event) => {
        if (
            this.container.current &&
            !this.container.current.contains(event.target)
        ) {
            this.setState({
                open: false
            })
        }
    }

    placelink = (obj) => {
        return (
            <>
                <a href={obj.link} key={obj.id} className={"dropdown_text"}>{obj.title}</a>
                <br/>
            </>
        )
    }

    render() {
        return <div className={"container"} ref={this.container}>
            <div className={"dropdown_div"}>
                <p className={"dropdown_text dropdown_title"}>{this.props.data.title}</p>
                <button type={"button"} className={"button"} onClick={this.handleButtonClick}>
                    ☰
                </button>
            </div>
            {this.state.open && <div className={"dropdown"} style={{display: "flex",flexDirection: "column",alignItems:"baseline", width: "95%",}}>
                {this.props.data.links.map(link => {
                    return (
                        this.placelink(link)
                    )
                })}
            </div>}
        </div>;
    }
}

export default Dropdown;