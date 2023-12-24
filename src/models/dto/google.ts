interface GoogleResponse {
  payload: GoogleInfoUser;
}

interface GoogleInfoUser {
  id: string;
  email: string;
  name: string;
}

export { GoogleResponse };
