const hook = (instanceContext: any) => async () => {
  return await fetch('https://api.chucknorris.io/jokes/random').then((res) => res.json());
};

export default hook;
