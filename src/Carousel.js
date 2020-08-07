import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["https://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large); //photos will be an array of strings with photo links
    }
    return { photos };
  }
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };
  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              onClick={this.handleIndexClick} //onclick it captures the index.
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
