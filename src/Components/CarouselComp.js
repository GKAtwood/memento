import React, { Component } from 'react';
import  Carousel  from 'react-slick';



 class CarouselComp extends Component {
    render (props) {
    
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div >

        <Carousel {...settings}>
            {this.props.entries.map(entry=>
            {return (entry.image && <div className="whatever"><img src={entry.image} alt={entry.title}/>Hello</div>  )}
            )}
        </Carousel>
        </div>
    )
}

}



  export default CarouselComp;