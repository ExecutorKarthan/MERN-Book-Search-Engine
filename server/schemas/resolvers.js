const { User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, {userId}, context) => {
      return User.findOne({_id: userId });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    
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

module.exports = resolvers;
