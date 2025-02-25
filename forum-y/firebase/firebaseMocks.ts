export const mockAuth: any = {
  currentUser: {
    uid: "mock-uid-12345",
    email: "mockuser@example.com",
    displayName: "Mock User",
    emailVerified: true,
    phoneNumber: "+1234567890",
    photoURL: "https://example.com/mock-photo.jpg",
    providerData: [
      {
        providerId: "password",
        uid: "mock-uid-12345",
        displayName: "Mock User",
        email: "mockuser@example.com",
        phoneNumber: "+1234567890",
        photoURL: "https://example.com/mock-photo.jpg",
      },
    ],
  },
  signInWithEmailAndPassword: (email: string, password: string) => {
    if (email === "mockuser@example.com" && password === "password") {
      return Promise.resolve({ user: mockAuth.currentUser });
    } else {
      return Promise.reject(new Error("Invalid email or password"));
    }
  },
  signOut: () => {
    mockAuth.currentUser = null;
    return Promise.resolve();
  },
  // Properly handle `onAuthStateChanged` to simulate how it works in Firebase
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Immediately invoke the listener with the current user state
    if (typeof callback === 'function') {
      setTimeout(() => {
        callback(mockAuth.currentUser);  // Mimic the async behavior of Firebase
      }, 0);
    } else {
      throw new Error('Listener must be a function');
    }

    // Return a function to unsubscribe (to simulate Firebase behavior)
    return () => {
      // no-op, since it's a mock
    };
  },
  app: {}, // Dummy app object
  name: "mock-auth",
  config: {},
  setPersistence: (persistence: any) => Promise.resolve(),
  signInWithPopup: (provider: any) => Promise.resolve({ user: mockAuth.currentUser }),
  signInWithRedirect: (provider: any) => Promise.resolve(),
  getRedirectResult: () => Promise.resolve({ user: mockAuth.currentUser }),
  signInWithPhoneNumber: (phoneNumber: string, appVerifier: any) =>
    Promise.resolve({ user: mockAuth.currentUser, verificationId: "mock-verification-id" }),
};

export const mockFirestore: any = {
  collection: (collectionName: string) => ({
    doc: (docId: string) => ({
      get: () =>
        Promise.resolve({
          id: docId,
          data: () => ({ id: docId, field1: "value1", field2: "value2" }),
        }),
      set: (data: any) => Promise.resolve({}),
      update: (data: any) => Promise.resolve({}),
      delete: () => Promise.resolve(),
    }),
    add: (data: any) => Promise.resolve({ id: "mock-doc-id", ...data }),
  }),
};

export const mockStorage: any = {
  ref: (path: string) => ({
    getDownloadURL: () => Promise.resolve("https://example.com/mock-image.jpg"),
    put: (file: any) => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve("https://example.com/mock-image.jpg") } }),
    delete: () => Promise.resolve(),
  }),
};