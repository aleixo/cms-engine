const hook = (instanceContext: any) => async (data) => {
  return await fetch('https://api.chucknorris.io/jokes/random').then((res) => res.json());
};

export default hook;
