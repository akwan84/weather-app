const Header = ({ title, goHome }) => {
    return (
        <div className="header" onClick={() => goHome()}>
            <h1>{title}</h1>
        </div>
    );
}

export default Header; 