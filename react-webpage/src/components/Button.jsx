function Button({usage, funct}) {
    if (usage == 'play')
        return(
            <div className="button">
                <img title='Play notes' src='./assets/image/play.svg' onClick={funct} draggable={false}></img>
            </div>
        )

    if (usage == 'reset')
        return(
            <div className="button">
                <img title='Reset notes' src='./assets/image/reset.svg' onClick={funct} draggable={false}></img>
            </div>
        )
}

export default Button;