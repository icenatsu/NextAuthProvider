const Navbar = () : JSX.Element => {
    return (
        <nav style={{display: 'flex', justifyContent: "center", padding: "20px", width: "100%"}}>
          <p><a href="/" style={{padding: "10px"}}>Home</a></p>
          <p><a href="/Form" style={{padding: "10px"}}>Inscription / Se connecter</a></p>
          <p><a href="/List" style={{padding: "10px"}}>List</a></p>
        </nav>
    );
};

export default Navbar;