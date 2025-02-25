import { mockAuth, mockFirestore, mockStorage } from "./firebaseMocks";

const firestore = mockFirestore;
const auth = mockAuth;
const storage = mockStorage;

export { firestore, auth, storage };