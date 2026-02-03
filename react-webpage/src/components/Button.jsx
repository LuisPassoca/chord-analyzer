function Button({usage, funct}) {
  

    return(
        <div className="button">
            <img title='Play chord' src='./assets/image/play.svg' onClick={funct} draggable={false}></img>
        </div>
    )
}

export default Button;