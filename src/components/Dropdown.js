import React, {Component} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
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
                <a key={obj.id} href={obj.link} className={"dropdown_link_div"}>
                    <p>{obj.title}</p>
                </a>
                <br/>
            </>
        )
    }

    render() {
        return <div className={"container"} ref={this.container}>
            <div className={"dropdown_div"}  onClick={this.handleButtonClick}>
                <p className={"dropdown_text dropdown_title"}>{this.props.data.title}</p>
                <p  className={"arrow_icon"}>
                    {!this.state.open && <AiFillCaretDown/>}
                    {this.state.open && <AiFillCaretUp/>}
                </p>
            </div>
            {this.state.open && <div className={"dropdown"}>
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