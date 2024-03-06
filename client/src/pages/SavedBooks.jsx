//Imported needed modules
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import {QUERY_GET_ME} from '../utils/queries'
import {REMOVE_BOOK} from '../utils/mutations';

//Create a constant to display the books saved by a user
const SavedBooks = () => {
  //Get the user information via its authentication token
  const token = Auth.getToken()
  const user = Auth.getProfile(token)
  //Query the all the user's data from the database
  const {loading, data} = useQuery(QUERY_GET_ME, {
    variables: {_id: user.data._id}
  })
  //Create a mutation to handle removing a book from a user's saved books
  const [removeBook, {error}] = useMutation(REMOVE_BOOK)
  //Save the user's information to a constant. If there is no data, return an empty object
  const userData = data?.me || {};
  //Define a length based on the data a user has
  const userDataLength = Object.keys(userData).length;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    //Check if the user is logged in and then adjust behavior accordingly
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    //Try to remove the selected book from the user's list
    try {
      const {data} = await removeBook({
        variables: {
          userId: userData._id, 
          bookId: bookId}
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
      //Reload the window to update the view
      window.location.reload();
    } 
    //If the try fails, display an error
    catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  //Create a return that outlines the javascript to be passed to the web browser
  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      {/*Create a headline informing the user as to how many books they have*/}
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        {/*Create a card to hold the data of a saved book*/}
        <Row>
          {userData.savedBooks.map((book, id) => {
            return (
              <Col key = {id} md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

//Export the module for use
export default SavedBooks;