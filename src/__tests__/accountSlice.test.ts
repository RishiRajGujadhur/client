// Import the necessary modules
import { accountSlice } from '../features/account/accountSlice';
import { fetchCurrentUser, signInUser } from '../features/account/accountSlice';

// Describe the test suite for the accountSlice
describe('accountSlice', () => {
    let initialState: any;

    // Set up the initial state before each test
    beforeEach(() => {
        initialState = {
            user: null,
        };
    });

    // Test case: should handle signOut
    it('should handle signOut', () => {
        // Call the reducer with the signOut action
        const state = accountSlice.reducer(initialState, accountSlice.actions.signOut());
        // Expect the user property in the state to be null
        expect(state.user).toBeNull();
    });

    // Test case: should handle setUser
    it('should handle setUser', () => {
        // Define a dummy user object
        const user = {
            token: 'dummyToken',
        };
        // Call the reducer with the setUser action and the dummy user object
        const state = accountSlice.reducer(initialState, accountSlice.actions.setUser(user));
        // Expect the user property in the state to be equal to the dummy user object with additional roles property
        expect(state.user).toEqual({
            ...user,
            roles: [],
        });
    });

    // Test case: should handle fetchCurrentUser.rejected
    it('should handle fetchCurrentUser.rejected', () => {
        // Call the reducer with the fetchCurrentUser.rejected action
        const state = accountSlice.reducer(initialState, fetchCurrentUser.rejected(null, '', undefined));
        // Expect the user property in the state to be null
        expect(state.user).toBeNull();
    });

    // Test case: should handle signInUser.fulfilled
    it('should handle signInUser.fulfilled', () => {
        // Define a dummy user object
        const user = {
            email: 'dummyEmail',
            token: 'dummyToken',
        };
        // Call the reducer with the signInUser.fulfilled action and the dummy user object
        const state = accountSlice.reducer(initialState, signInUser.fulfilled(user, '', {}));
        // Expect the user property in the state to be equal to the dummy user object with additional roles property
        expect(state.user).toEqual({
            ...user,
            roles: [],
        });
    });

    // Test case: should handle fetchCurrentUser.fulfilled
    it('should handle fetchCurrentUser.fulfilled', () => {
        // Define a dummy user object
        const user = {
            email: 'dummyEmail',
            token: 'dummyToken',
        };
        // Call the reducer with the fetchCurrentUser.fulfilled action and the dummy user object
        const state = accountSlice.reducer(initialState, fetchCurrentUser.fulfilled(user, '', undefined));
        // Expect the user property in the state to be equal to the dummy user object with additional roles property
        expect(state.user).toEqual({
            ...user,
            roles: [],
        });
    });

    // Test case: should throw an error for signInUser.rejected
    it('should throw an error for signInUser.rejected', () => {
        // Define an error object
        const error = new Error('Sign in failed');
        // Expect the reducer to throw an error when called with the signInUser.rejected action and the error object
        expect(() => {
            accountSlice.reducer(initialState, signInUser.rejected(error, '', {}));
        }).toThrow(error);
    });
});