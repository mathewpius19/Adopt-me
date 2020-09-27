import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  state = { loading: true, showModal: false };
  componentDidMount() {
    //throw new Error("mathew lol");
    pet
      .animal(this.props.id) //this.props represent when info come from the parent  to the child(it is immtuable or read-only )
      //promise we get from the API
      .then(({ animal }) => {
        this.setState({
          // this.setState overwrites this.state and turns loading from true to false. This is called shallow merging
          name: animal.name,
          url: animal.url,
          animal: animal.type,
          location: `${animal.contact.address.city},${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false, //When we first load the page we put it on loading:true and then after we get the details its set to loading false
        });
      }, console.error);
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });//sets show modal to true
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading......</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal}-${breed}-${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, Im a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}//will show nothing if youre not showing the modal
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
