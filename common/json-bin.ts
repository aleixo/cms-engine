import { TSchema } from "../../dist";

const fetchBins = async () => {
  return await fetch(
    "https://api.jsonbin.io/v3/c/63189bdee13e6063dc9ebbcd/bins",
    {
      headers: new Headers({
        "X-Master-Key":
          "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.",
      }),
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch(console.warn);
};

const readBin = async (binId: string) => {
  return await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    headers: new Headers({
      "X-Master-Key":
        "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.",
    }),
    method: "GET",
  })
    .then((res) => res.json())
    .catch(console.warn);
};

const createBin = async (schema: TSchema, name: string) => {
  return fetch("https://api.jsonbin.io/v3/b", {
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.",
      "X-Collection-Id": "63189bdee13e6063dc9ebbcd",
      "X-Bin-Name": name,
    }),
    method: "POST",
    body: JSON.stringify(schema),
  })
    .then((res) => res.json())
    .catch(console.warn);
};

const updateBin = async (schema: TSchema, binId: string) => {
  return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    headers: new Headers({
      "X-Master-Key":
        "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.",
      "Content-Type": "application/json",
    }),
    method: "PUT",
    body: JSON.stringify(schema),
  })
    .then((res) => res.json())
    .catch(console.warn);
};

const deleteBin = async (binId: string) => {
  return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    headers: new Headers({
      "X-Master-Key":
        "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.",
      "Content-Type": "application/json",
    }),
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch(console.warn);
};

export { deleteBin, updateBin, fetchBins, createBin, readBin };
