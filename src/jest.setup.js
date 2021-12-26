/* eslint-disable no-undef */

jest.mock("pg", () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock("./initConfig.js", () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return {
    bot: {},
    client: mClient,
    RichEmbed: {},
  };
});
