//Import needed modules
const { User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  //Create a mechanism to query data from the database
  Query: {
    me: async (parent, {userId}, context) => {
      return User.findOne({_id: userId });
    },
  },

  //Define mutations to adjust the data in the database
  Mutation: {
    //Create a mutation to log a user in
    login: async (parent, { email, password }) => {
      //Get a user's data from the database - search by user email
      const user = await User.findOne({ email });
      //If there is no user, return an error
      if (!user) {
        throw AuthenticationError;
      }
      //Check to ensure the user has entered the correct password
      const correctPw = await user.isCorrectPassword(password);
      //Return an error if there an incorrect password was entered
      if (!correctPw) {
        throw AuthenticationError;
      }
      //Create a token for the user and return it
      const token = signToken(user);
      return { token, user };
    },
    
    //Create a mutation to add a user and its token to the database
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    saveBook: async (parent, {input}, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate({
          _id: context.user._id
        }, {
          $push: {
            savedBooks: input
          }
        },
        {
          new: true, runValidators: true
        });
        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeBook: async (parent, { userId, bookId }, context) => {
      if(context.user){
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: 
            { savedBooks: {
                bookId: bookId,
              }, 
            }, 
          },
          { new: true }
        );
      }
    },
  },
};

//Export module for use
module.exports = resolvers;