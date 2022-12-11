import React from "react"

const imagePath = [
        'images/angry.png',
        'images/confused.png',
        'images/cry.png',
        'images/desapointed.png',
        'images/disgusted.png',
        'images/happy.png',
        'images/jealouse.png',
        'images/loving.png',
        'images/nervous.png',
        'images/sad.png',
        'images/sick.png',
        'images/surprised.png',
        'images/tired.png',
        'images/scared.png',
    
    ]

class EmotionsSet extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emojies:props
        }
    }

    render(){
        console.log(this.props.emojies);
        const {emojiesList} = this.props
        return(
            <>
            {
                emojiesList.map(item=> console.log(item);)
            }
            
            
            </>
        )
    }
}


export default EmotionsSet


